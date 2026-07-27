import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Falta la variable de entorno obligatoria: ${name}`);
  }

  return value;
}

function getPort(value: string | undefined): number {
  if (!value) return 3000;

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT debe ser un número de puerto válido.');
  }

  return port;
}

const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

export const config = {
  port: getPort(process.env.PORT),
  jwtSecret: requireEnv('JWT_SECRET'),
  corsOrigins,
  database: {
    host: requireEnv('DB_HOST'),
    port: getPort(process.env.DB_PORT),
    user: requireEnv('DB_USER'),
    password: requireEnv('DB_PASSWORD'),
    database: requireEnv('DB_NAME'),
  },
};
