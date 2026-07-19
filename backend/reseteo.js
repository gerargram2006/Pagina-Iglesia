/**
 * Script reseteo.js - Reseteo de contraseña del usuario admin.
 *
 * Este script actualiza la contraseña del usuario admin@iglesia.com
 * en la base de datos MySQL, generando un nuevo hash bcrypt.
 *
 * Uso:
 *   cd backend && node reseteo.js
 *
 * Flujo:
 *   1. Genera un hash bcrypt de la contraseña '123456' con 10 salt rounds.
 *   2. Se conecta a MySQL usando las credenciales del archivo .env.
 *   3. Ejecuta un UPDATE para cambiar la contraseña del usuario admin.
 *   4. Muestra mensaje de éxito o error.
 *
 * NOTA: Este script es para emergencias o desarrollo. En producción,
 *       usar el panel de administración para gestionar contraseñas.
 */

// Importa bcrypt - librería para hashing seguro de contraseñas
const bcrypt = require('bcrypt');
// Importa mysql2/promise - versión con soporte de promesas para async/await
const mysql = require('mysql2/promise');
// Carga las variables de entorno desde el archivo .env (un nivel arriba)
require('dotenv').config({ path: '../.env' });

/**
 * Función principal asíncrona que resetea la contraseña del admin.
 * Usa async/await para un flujo secuencial claro y manejo de errores con try/catch.
 */
async function resetearPassword() {
    try {
        // Paso 1: Genera un nuevo hash bcrypt de la contraseña '123456'
        console.log("1. Generando nueva llave maestra para '123456'...");
        const nuevoHash = await bcrypt.hash('123456', 10); // 10 salt rounds
        
        // Paso 2: Se conecta a MySQL usando las credenciales del .env
        console.log("2. Conectando a la bóveda de datos...");
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,       // Host de MySQL (ej: localhost)
            user: process.env.DB_USER,       // Usuario de MySQL (ej: root)
            password: process.env.DB_PASSWORD, // Contraseña de MySQL
            database: process.env.DB_NAME,   // Nombre de la BD (iglesia_db)
            port: process.env.DB_PORT        // Puerto de MySQL (ej: 3307)
        });

        // Paso 3: Actualiza la contraseña del usuario admin en la BD
        console.log("3. Forzando la cerradura...");
        // Usa ? como parámetro para prevenir SQL injection
        await db.execute(
            "UPDATE usuarios SET password = ? WHERE email = 'admin@iglesia.com'", 
            [nuevoHash] // El hash se pasa como parámetro seguro
        );
        
        // Paso 4: Muestra mensaje de éxito
        console.log("¡ÉXITO TOTAL! Tu contraseña ahora es 100% seguro: 123456");
        // Termina el proceso con código 0 (éxito)
        process.exit(0);
    } catch (error) {
        // Si ocurre cualquier error, muestra el mensaje y termina con código 1 (error)
        console.error("Ocurrió un error:", error.message);
        process.exit(1);
    }
}

// Ejecuta la función principal de reseteo
resetearPassword();
