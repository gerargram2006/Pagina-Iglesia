// Importa dotenv para cargar las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
// Importa el módulo path para construir rutas de archivos
import path from 'node:path';

// Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Devuelve una variable de entorno obligatoria o lanza un error si falta
function requireEnv(name: string): string {
  // Lee la variable de entorno y elimina los espacios alrededor
  const value = process.env[name]?.trim();

  // Si la variable no tiene valor
  if (!value) {
    // Lanza un error indicando qué variable de entorno falta
    throw new Error(`Falta la variable de entorno obligatoria: ${name}`);
  }

  // Devuelve el valor de la variable de entorno
  return value;
}

// Convierte un valor de texto en un número de puerto válido
function getPort(value: string | undefined): number {
  // Si no se proporciona valor, usa el puerto por defecto 3000
  if (!value) return 3000;

  // Convierte el texto a número
  const port = Number(value);
  // Si el número no es un entero o está fuera del rango de puertos válidos
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    // Lanza un error indicando que el puerto no es válido
    throw new Error('PORT debe ser un número de puerto válido.');
  }

  // Devuelve el puerto validado
  return port;
}

// Obtiene la lista de orígenes permitidos para CORS (con valores por defecto para desarrollo)
const corsOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173,http://127.0.0.1:5173')
  // Divide la cadena por comas para obtener cada origen
  .split(',')
  // Elimina los espacios alrededor de cada origen
  .map((origin) => origin.trim())
  // Descarta los orígenes vacíos
  .filter(Boolean);

// Exporta la configuración global de la aplicación
export const config = {
  // Puerto donde correrá el servidor
  port: getPort(process.env.PORT),
  // Secreto para firmar y verificar los tokens JWT
  jwtSecret: requireEnv('JWT_SECRET'),
  // Lista de orígenes permitidos para CORS
  corsOrigins,
  // Configuración de conexión a la base de datos
  database: {
    // Host del servidor de base de datos
    host: requireEnv('DB_HOST'),
    // Puerto de la base de datos
    port: getPort(process.env.DB_PORT),
    // Usuario de la base de datos
    user: requireEnv('DB_USER'),
    // Contraseña de la base de datos
    password: requireEnv('DB_PASSWORD'),
    // Nombre de la base de datos
    database: requireEnv('DB_NAME'),
  },
};
