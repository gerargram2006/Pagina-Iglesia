import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function checkEncoding() {
    try {
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
            charset: 'utf8mb4',
        });

        console.log("--- EVENTOS ---");
        const [eventos] = await db.execute('SELECT titulo, descripcion FROM eventos');
        console.log(eventos);

        console.log("--- PASTORES ---");
        const [pastores] = await db.execute('SELECT nombre, biografia FROM pastores');
        console.log(pastores);

        console.log("--- HORARIOS ---");
        const [horarios] = await db.execute('SELECT dia, actividad FROM horarios');
        console.log(horarios);

        console.log("--- GALERIA ---");
        const [galeria] = await db.execute('SELECT titulo FROM galeria');
        console.log(galeria);

        process.exit(0);
    } catch (error) {
        console.error("Error comprobando BD:", error);
        process.exit(1);
    }
}

checkEncoding();
