import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

async function resetearPassword(): Promise<void> {
  try {
    console.log("1. Generando nueva llave maestra para '123456'...");
    const nuevoHash = await bcrypt.hash('123456', 10);

    console.log("2. Conectando a la bóveda de datos...");
    const db = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: Number(process.env.DB_PORT) || 3306,
      charset: 'utf8mb4',
    });

    console.log("3. Forzando la cerradura...");
    await db.execute(
      "UPDATE usuarios SET password = ? WHERE email = 'admin@iglesia.com'",
      [nuevoHash]
    );

    console.log("¡ÉXITO TOTAL! Tu contraseña ahora es 100% seguro: 123456");
    process.exit(0);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Ocurrió un error:", message);
    process.exit(1);
  }
}

resetearPassword();
