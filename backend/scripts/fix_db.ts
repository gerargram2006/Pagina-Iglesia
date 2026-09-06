// Importa el cliente MySQL con soporte de promesas
import mysql from 'mysql2/promise';
// Importa dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
// Importa el módulo path para construir rutas de archivos
import path from 'node:path';

// Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define la función asíncrona que corrige la codificación de los slides
async function fixEncoding() {
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

        // Muestra un mensaje indicando que se van a borrar los slides actuales
        console.log("Borrando slides actuales...");
        // Vacía la tabla de slides
        await db.execute('TRUNCATE TABLE slides');

        // Muestra un mensaje indicando que se insertarán los slides
        console.log("Insertando slides con codificación correcta...");
        // Inserta los slides con el texto correctamente codificado
        await db.execute(`
            INSERT INTO slides (titulo, subtitulo, imagen_url, btn_principal, btn_secundario, orden, activo) VALUES
            ('Bienvenido a \\nAsamblea de Dios', 'Descubre el propósito que Dios tiene para tu vida. Un lugar para crecer, servir y amar en comunidad.', '/img/galeria-congregacion.webp', 'Conéctate', 'Saber más', 1, 1),
            ('Noche de \\nJóvenes', 'Únete a nosotros este sábado para un tiempo de adoración, juegos y palabra diseñada para ti.', '/img/galeria-jovenes.webp', 'Ver Horarios', 'Ver Galería', 2, 1),
            ('Siguiente Paso: \\nBautizos', 'Inscríbete para nuestra próxima ceremonia de bautizos en agua y declara tu fe públicamente.', '/img/galeria-bautizos.webp', 'Inscribirme', '¿Qué es el bautizo?', 3, 1),
            ('Ministerio \\nInfantil', 'Un espacio seguro y divertido donde tus hijos aprenderán sobre el amor de Jesús.', '/img/galeria-infantil.webp', 'Conocer más', 'Horarios', 4, 1)
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

// Ejecuta la función que corrige la codificación
fixEncoding();
