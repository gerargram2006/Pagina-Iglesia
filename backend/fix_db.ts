import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function fixEncoding() {
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

        console.log("Borrando slides actuales...");
        await db.execute('TRUNCATE TABLE slides');

        console.log("Insertando slides con codificación correcta...");
        await db.execute(`
            INSERT INTO slides (titulo, subtitulo, imagen_url, btn_principal, btn_secundario, orden, activo) VALUES
            ('Bienvenido a \\nAsamblea de Dios', 'Descubre el propósito que Dios tiene para tu vida. Un lugar para crecer, servir y amar en comunidad.', '/img/galeria-congregacion.webp', 'Conéctate', 'Saber más', 1, 1),
            ('Noche de \\nJóvenes', 'Únete a nosotros este sábado para un tiempo de adoración, juegos y palabra diseñada para ti.', '/img/galeria-jovenes.webp', 'Ver Horarios', 'Ver Galería', 2, 1),
            ('Siguiente Paso: \\nBautizos', 'Inscríbete para nuestra próxima ceremonia de bautizos en agua y declara tu fe públicamente.', '/img/galeria-bautizos.webp', 'Inscribirme', '¿Qué es el bautizo?', 3, 1),
            ('Ministerio \\nInfantil', 'Un espacio seguro y divertido donde tus hijos aprenderán sobre el amor de Jesús.', '/img/galeria-infantil.webp', 'Conocer más', 'Horarios', 4, 1)
        `);

        console.log("¡Datos arreglados exitosamente!");
        process.exit(0);
    } catch (error) {
        console.error("Error arreglando base de datos:", error);
        process.exit(1);
    }
}

fixEncoding();
