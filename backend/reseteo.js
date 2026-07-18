const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' }); // Lee tus contraseñas del .env

async function resetearPassword() {
    try {
        console.log("1. Generando nueva llave maestra para '123456'...");
        const nuevoHash = await bcrypt.hash('123456', 10);
        
        console.log("2. Conectando a la bóveda de datos...");
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        console.log("3. Forzando la cerradura...");
        await db.execute(
            "UPDATE usuarios SET password = ? WHERE email = 'admin@iglesia.com'", 
            [nuevoHash]
        );
        
        console.log("¡ÉXITO TOTAL! Tu contraseña ahora es 100% seguro: 123456");
        process.exit(0);
    } catch (error) {
        console.error("Ocurrió un error:", error.message);
        process.exit(1);
    }
}

resetearPassword();