import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: number;
  rol: string;
}

export function verificarToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    res.status(403).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    return;
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    res.status(403).json({ error: 'Acceso denegado. Formato de token inválido.' });
    return;
  }

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    (req as Request & { user: JwtPayload }).user = decodificado;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}
