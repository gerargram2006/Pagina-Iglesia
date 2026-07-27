import { type NextFunction, type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';

interface JwtPayload {
  id: number;
  rol: string;
}

export type AuthenticatedRequest = Request & { user?: JwtPayload };

export function verificarToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authorization = req.header('authorization');
  const [scheme, token] = authorization?.split(' ') ?? [];

  if (scheme !== 'Bearer' || !token) {
    res.status(401).json({ error: 'Se requiere un token de acceso válido.' });
    return;
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret);

    if (typeof payload === 'string' || typeof payload.id !== 'number' || typeof payload.rol !== 'string') {
      res.status(401).json({ error: 'Token inválido.' });
      return;
    }

    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}
