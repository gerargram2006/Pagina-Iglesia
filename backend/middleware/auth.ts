// Importa los tipos de Express para las peticiones, respuestas y siguientes middlewares
import { type NextFunction, type Request, type Response } from 'express';
// Importa jsonwebtoken para verificar los tokens de autenticación
import jwt from 'jsonwebtoken';
// Importa la configuración global (incluye el secreto JWT)
import { config } from '../config';

// Define la estructura de los datos que contiene el token JWT
interface JwtPayload {
  // Identificador del usuario
  id: number;
  // Rol del usuario
  rol: string;
}

// Tipo de petición autenticada: agrega el usuario decodificado a la petición
export type AuthenticatedRequest = Request & { user?: JwtPayload };

// Middleware que verifica el token JWT en el encabezado Authorization de cada petición protegida
export function verificarToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  // Lee el encabezado Authorization de la petición
  const authorization = req.header('authorization');
  // Separa el esquema ("Bearer") del token en la cabecera
  const [scheme, token] = authorization?.split(' ') ?? [];

  // Si el esquema no es "Bearer" o no hay token
  if (scheme !== 'Bearer' || !token) {
    // Responde con error 401 pidiendo un token válido
    res.status(401).json({ error: 'Se requiere un token de acceso válido.' });
    // Detiene la ejecución del middleware
    return;
  }

  try {
    // Verifica el token con el secreto de la configuración y obtiene los datos del usuario
    const payload = jwt.verify(token, config.jwtSecret);

    // Si el token no tiene la estructura esperada
    if (typeof payload === 'string' || typeof payload.id !== 'number' || typeof payload.rol !== 'string') {
      // Responde con error 401 indicando que el token es inválido
      res.status(401).json({ error: 'Token inválido.' });
      // Detiene la ejecución del middleware
      return;
    }

    // Guarda los datos del usuario en la petición para las rutas siguientes
    req.user = { id: payload.id, rol: payload.rol };
    // Pasa al siguiente middleware o ruta
    next();
  } catch {
    // Responde con error 401 si el token es inválido o está expirado
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
}
