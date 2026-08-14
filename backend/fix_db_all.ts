// Importa el cliente MySQL con soporte de promesas
import mysql from 'mysql2/promise';
// Importa dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
// Importa el módulo path para construir rutas de archivos
import path from 'node:path';

// Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define la función asíncrona que corrige la codificación de varias tablas
async function fixAllEncoding() {
    try {
        // Muestra un mensaje indicando que se está conectando a la base de datos
        console.log("Conectando a la base de datos...");
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

        // Muestra un mensaje indicando que se corrige la tabla de horarios
        console.log("Corrigiendo tabla de horarios...");
        // Vacía la tabla de horarios
        await db.execute('TRUNCATE TABLE horarios');
        // Inserta los horarios con el texto correctamente codificado
        await db.execute(`
            INSERT INTO horarios (dia, hora, actividad) VALUES 
            ('Domingo', '10:00:00', 'Culto General'),
            ('Miércoles', '18:00:00', 'Culto de Doctrina'),
            ('Viernes', '17:00:00', 'Estudio Bíblico'),
            ('Sábado', '17:00:00', 'Reunión de Jóvenes')
        `);

        // Muestra un mensaje indicando que se corrige la tabla de galería
        console.log("Corrigiendo tabla de galeria...");
        // Vacía la tabla de galería
        await db.execute('TRUNCATE TABLE galeria');
        // Inserta las imágenes de la galería con el texto correctamente codificado
        await db.execute(`
            INSERT INTO galeria (titulo, imagen_url, destacada, orden) VALUES
            ('Alabanza y Adoración', '/img/galeria-congregacion.webp', 1, 1),
            ('Grupos de Jóvenes', '/img/galeria-jovenes.webp', 0, 2),
            ('Ministerio Infantil', '/img/galeria-infantil.webp', 0, 3),
            ('Ministerio de Mujeres', '/img/galeria-mujeres.webp', 0, 4),
            ('Bautizos', '/img/galeria-bautizos.webp', 0, 5),
            ('Eventos Especiales', '/img/galeria-congregacion.webp', 1, 6)
        `);

        // Muestra un mensaje indicando que los datos se arreglaron correctamente
        console.log("¡Datos arreglados exitosamente!");
        // Termina el proceso con éxito
        process.exit(0);
    } catch (error) {
        // Muestra el error ocurrido al arreglar la base de datos
        console.error("Error arreglando base de datos:", error);
        // Termina el proceso con código de error
        process.exit(1);
    }
}

// Ejecuta la función que corrige la codificación de todas las tablas
fixAllEncoding();
