// Importa bcrypt para encriptar la nueva contraseña
import bcrypt from 'bcrypt';
// Importa el cliente MySQL con soporte de promesas
import mysql from 'mysql2/promise';
// Importa dotenv para cargar las variables de entorno
import dotenv from 'dotenv';

// Carga las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Define la función asíncrona que restablece la contraseña del administrador
async function resetearPassword(): Promise<void> {
  try {
    // Muestra el paso 1: generar la nueva llave maestra
    console.log("1. Generando nueva llave maestra para '123456'...");
    // Encripta la contraseña '123456' con 10 rondas de sal
    const nuevoHash = await bcrypt.hash('123456', 10);

    // Muestra el paso 2: conectar a la base de datos
    console.log("2. Conectando a la bóveda de datos...");
    // Crea la conexión a la base de datos usando las variables de entorno
    const db = await mysql.createConnection({
      // Host del servidor de base de datos
      host: process.env.DB_HOST,
      // Usuario de la base de datos
      user: process.env.DB_USER,
      // Contraseña de la base de datos
      password: process.env.DB_PASSWORD,
      // Nombre de la base de datos
      database: process.env.DB_NAME,
      // Puerto de la base de datos (por defecto 3306)
      port: Number(process.env.DB_PORT) || 3306,
      // Fuerza el juego de caracteres UTF-8 completo
      charset: 'utf8mb4',
    });

    // Muestra el paso 3: actualizar la contraseña del administrador
    console.log("3. Forzando la cerradura...");
    // Actualiza la contraseña del administrador con el nuevo hash
    await db.execute(
      "UPDATE usuarios SET password = ? WHERE email = 'admin@iglesia.com'",
      [nuevoHash]
    );

    // Muestra un mensaje indicando que la contraseña fue restablecida
    console.log("¡ÉXITO TOTAL! Tu contraseña ahora es 100% seguro: 123456");
    // Termina el proceso con éxito
    process.exit(0);
  } catch (error) {
    // Convierte el error a un mensaje legible
    const message = error instanceof Error ? error.message : String(error);
    // Muestra el error ocurrido
    console.error("Ocurrió un error:", message);
    // Termina el proceso con código de error
    process.exit(1);
  }
}

// Ejecuta la función que restablece la contraseña
resetearPassword();
