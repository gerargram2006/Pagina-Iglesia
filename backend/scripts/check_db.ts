// Importa el cliente MySQL con soporte de promesas
import mysql from 'mysql2/promise';
// Importa dotenv para cargar las variables de entorno
import dotenv from 'dotenv';
// Importa el módulo path para construir rutas de archivos
import path from 'node:path';

// Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define la función asíncrona que comprueba la codificación de los datos
async function checkEncoding() {
    try {
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

        // Muestra el encabezado de la sección de eventos
        console.log("--- EVENTOS ---");
        // Consulta los títulos y descripciones de los eventos
        const [eventos] = await db.execute('SELECT titulo, descripcion FROM eventos');
        // Muestra los eventos obtenidos
        console.log(eventos);

        // Muestra el encabezado de la sección de pastores
        console.log("--- PASTORES ---");
        // Consulta los nombres y biografías de los pastores
        const [pastores] = await db.execute('SELECT nombre, biografia FROM pastores');
        // Muestra los pastores obtenidos
        console.log(pastores);

        // Muestra el encabezado de la sección de horarios
        console.log("--- HORARIOS ---");
        // Consulta los días y actividades de los horarios
        const [horarios] = await db.execute('SELECT dia, actividad FROM horarios');
        // Muestra los horarios obtenidos
        console.log(horarios);

        // Muestra el encabezado de la sección de galería
        console.log("--- GALERIA ---");
        // Consulta los títulos de la galería
        const [galeria] = await db.execute('SELECT titulo FROM galeria');
        // Muestra la galería obtenida
        console.log(galeria);

        // Termina el proceso con éxito
        process.exit(0);
    } catch (error) {
        // Muestra el error ocurrido al comprobar la base de datos
        console.error("Error comprobando BD:", error);
        // Termina el proceso con código de error
        process.exit(1);
    }
}

// Ejecuta la función que comprueba la codificación
checkEncoding();
