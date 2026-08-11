import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function fixAllEncoding() {
    try {
        console.log("Conectando a la base de datos...");
        const db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: Number(process.env.DB_PORT) || 3306,
            charset: 'utf8mb4',
        });

        console.log("Corrigiendo tabla de horarios...");
        await db.execute('TRUNCATE TABLE horarios');
        await db.execute(`
            INSERT INTO horarios (dia, hora, actividad) VALUES 
            ('Domingo', '10:00:00', 'Culto General'),
            ('Miércoles', '18:00:00', 'Culto de Doctrina'),
            ('Viernes', '17:00:00', 'Estudio Bíblico'),
            ('Sábado', '17:00:00', 'Reunión de Jóvenes')
        `);

        console.log("Corrigiendo tabla de galeria...");
        await db.execute('TRUNCATE TABLE galeria');
        await db.execute(`
            INSERT INTO galeria (titulo, imagen_url, destacada, orden) VALUES
            ('Alabanza y Adoración', '/img/galeria-congregacion.webp', 1, 1),
            ('Grupos de Jóvenes', '/img/galeria-jovenes.webp', 0, 2),
            ('Ministerio Infantil', '/img/galeria-infantil.webp', 0, 3),
            ('Ministerio de Mujeres', '/img/galeria-mujeres.webp', 0, 4),
            ('Bautizos', '/img/galeria-bautizos.webp', 0, 5),
            ('Eventos Especiales', '/img/galeria-congregacion.webp', 1, 6)
        `);

        console.log("¡Datos arreglados exitosamente!");
        process.exit(0);
    } catch (error) {
        console.error("Error arreglando base de datos:", error);
        process.exit(1);
    }
}

fixAllEncoding();
