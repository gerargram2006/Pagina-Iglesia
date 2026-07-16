/**
 * Backend Server - Express.js API para Iglesia Asamblea de Dios
 *
 * Este archivo define el servidor backend que maneja:
 *   1. Conexión a la base de datos MySQL (iglesia_db)
 *   2. Endpoint GET /api/eventos - Lista todos los eventos de la iglesia
 *   3. Endpoint POST /api/auth/login - Autenticación de usuarios con bcrypt + JWT
 *
 * Stack:
 *   - Express 5: Framework web para Node.js
 *   - MySQL2: Driver de MySQL con soporte para promesas
 *   - bcrypt: Librería para hashing y comparación de contraseñas
 *   - jsonwebtoken: Librería para generar y verificar tokens JWT
 *   - cors: Middleware para habilitar Cross-Origin Resource Sharing
 *   - dotenv: Librería para cargar variables de entorno desde .env
 *
 * Variables de entorno requeridas (.env):
 *   - DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME: Conexión a MySQL
 *   - JWT_SECRET: Secreto para firmar tokens JWT (debe ser seguro en producción)
 *
 * Endpoints:
 *   GET  /api/eventos     → [{id, title, description, date, location, image}, ...]
 *   POST /api/auth/login  → {message, token, user: {id, name, email, rol}}
 */

// Carga las variables de entorno desde el archivo .env ubicado un nivel arriba
// Esto permite usar process.env.DB_HOST, process.env.JWT_SECRET, etc.
require('dotenv').config({ path: '../.env' });

// Importa Express - framework web minimalista para Node.js
const express = require('express');
// Importa MySQL2 - driver de MySQL con soporte para callbacks y promesas
const mysql = require('mysql2');
// Importa CORS - middleware para habilitar peticiones cross-origin (frontend → backend)
const cors = require('cors');
// Importa bcrypt - librería para hashing seguro de contraseñas (algoritmo Blowfish)
const bcrypt = require('bcrypt');
// Importa jsonwebtoken - librería para crear y verificar tokens JWT
const jwt = require('jsonwebtoken');
// Importa middleware de autenticación
const { verificarToken } = require('./middleware/auth');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware: habilita CORS para todas las rutas (permite que el frontend en otro puerto acceda)
app.use(cors());

// Middleware: parsea automáticamente el body de peticiones con Content-Type: application/json
// Convierte el body de JSON string a objeto JavaScript accesible en req.body
app.use(express.json());

/**
 * Conexión a la base de datos MySQL usando variables de entorno.
 * Estas variables se definen en el archivo .env en la raíz del proyecto.
 */
const db = mysql.createConnection({
    host: process.env.DB_HOST,       // Host de MySQL (ej: localhost o 127.0.0.1)
    port: process.env.DB_PORT,       // Puerto de MySQL (ej: 3306)
    user: process.env.DB_USER,       // Usuario de MySQL (ej: root)
    password: process.env.DB_PASSWORD, // Contraseña de MySQL
    database: process.env.DB_NAME    // Nombre de la base de datos (iglesia_db)
});

/**
 * Intenta establecer la conexión con MySQL.
 * Si falla, lanza un error que detiene el servidor.
 * Si tiene éxito, imprime un mensaje de confirmación.
 */
db.connect((err) => {
    // Si hay error de conexión, lanza la excepción (detiene el servidor)
    if (err) throw err;
    // Imprime mensaje de éxito con el puerto de conexión
    console.log(`Conectado a MySQL en el puerto ${process.env.DB_PORT}.`);
});

/**
 * Endpoint GET /api/eventos
 *
 * Retorna todos los eventos almacenados en la tabla 'eventos' de la base de datos.
 * Los eventos se muestran en el home y en la página de eventos del frontend.
 *
 * Respuesta exitosa (200):
 *   [{ id: 1, title: "...", description: "...", date: "...", location: "...", image: "..." }, ...]
 *
 * Respuesta de error (500):
 *   { error: "mensaje de error de MySQL" }
 */
app.get('/api/eventos', (req, res) => {
    // Ejecuta una consulta SQL para obtener todos los registros de la tabla eventos
    db.query('SELECT * FROM eventos', (err, results) => {
        // Si hay error en la consulta, retorna error 500 (Internal Server Error)
        if (err) return res.status(500).json(err);
        // Si todo está bien, retorna el array de eventos como JSON
        res.json(results);
    });
});

/**
 * Endpoint POST /api/auth/login
 *
 * Autentica un usuario con email y contraseña.
 *
 * Flujo:
 *   1. Recibe email y password del body de la petición.
 *   2. Busca el usuario por email en la tabla 'usuarios'.
 *   3. Si no existe, retorna error 401.
 *   4. Compara la contraseña ingresada con el hash bcrypt almacenado.
 *   5. Si no coincide, retorna error 401.
 *   6. Si es válida, genera un token JWT con id y rol del usuario.
 *   7. Retorna el token JWT y los datos del usuario (sin contraseña).
 *
 * Body esperado:
 *   { "email": "admin@iglesia.com", "password": "123456" }
 *
 * Respuesta exitosa (200):
 *   {
 *     "message": "Bienvenido",
 *     "token": "eyJhbGciOiJIUzI1NiIs...",
 *     "user": { "id": 1, "name": "Admin", "email": "admin@iglesia.com", "rol": "admin" }
 *   }
 *
 * Respuestas de error:
 *   400: { "error": "Email y contraseña son requeridos" }
 *   401: { "error": "Usuario no encontrado" } o { "error": "Contraseña incorrecta" }
 *   500: { "error": "Error del servidor" }
 */
app.post('/api/auth/login', (req, res) => {
    // Extrae email y password del body de la petición (parseado por express.json())
    const { email, password } = req.body;

    // Validación: verifica que ambos campos estén presentes
    if (!email || !password) {
        // Si falta email o password, retorna error 400 (Bad Request)
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Ejecuta una consulta SQL para buscar el usuario por email
    // Se usa ? como parámetro para prevenir SQL injection
    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        // Si hay error en la consulta SQL, retorna error 500
        if (err) return res.status(500).json({ error: 'Error del servidor' });

        // Si no se encontró ningún usuario con ese email, retorna error 401
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        // Obtiene el primer resultado (debería ser el único usuario con ese email)
        const usuario = results[0];

        // Compara la contraseña ingresada con el hash bcrypt almacenado en la BD
        // bcrypt.compare() descifra el hash y compara internamente
        // Retorna true si coinciden, false si no
        const claveValida = await bcrypt.compare(password, usuario.password);

        // Si la contraseña no es válida, retorna error 401 (Unauthorized)
        if (!claveValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Si las credenciales son válidas, genera un token JWT
        // Payload: id y rol del usuario (no incluir contraseña)
        // Secreto: JWT_SECRET del archivo .env
        // Opciones: expira en 2 horas por seguridad
        const token = jwt.sign(
            { id: usuario.id, rol: usuario.rol }, // Payload del token
            process.env.JWT_SECRET,                // Secreto para firmar
            { expiresIn: '2h' }                    // Caducidad del token
        );

        // Retorna respuesta exitosa con token y datos del usuario
        // Nota: NO se retorna la contraseña hasheada por seguridad
        res.json({
            message: 'Bienvenido',
            token: token,
            user: {
                id: usuario.id,           // ID del usuario
                name: usuario.nombre,     // Nombre del usuario (columna 'nombre' en MySQL)
                email: usuario.email,     // Email del usuario
                rol: usuario.rol          // Rol (admin, superadmin, etc.)
            }
        });
});
});

// --- ENDPOINTS PARA EVENTOS ---

// Crear evento (Protegido)
app.post('/api/eventos', verificarToken, (req, res) => {
    const { titulo, descripcion, fecha, lugar, imagen_url } = req.body;
    db.query(
        'INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) VALUES (?, ?, ?, ?, ?)',
        [titulo, descripcion, fecha, lugar, imagen_url],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, titulo, descripcion, fecha, lugar, imagen_url });
        }
    );
});

// Actualizar evento (Protegido)
app.put('/api/eventos/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, fecha, lugar, imagen_url } = req.body;
    db.query(
        'UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, lugar = ?, imagen_url = ? WHERE id = ?',
        [titulo, descripcion, fecha, lugar, imagen_url, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

// Borrar evento (Protegido)
app.delete('/api/eventos/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM eventos WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- ENDPOINTS PARA PASTORES ---

// Obtener todos los pastores
app.get('/api/pastores', (req, res) => {
    db.query('SELECT * FROM pastores', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Crear pastor (Protegido)
app.post('/api/pastores', verificarToken, (req, res) => {
    const { nombre, cargo, biografia, foto_url } = req.body;
    db.query(
        'INSERT INTO pastores (nombre, cargo, biografia, foto_url) VALUES (?, ?, ?, ?)',
        [nombre, cargo, biografia, foto_url],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ id: result.insertId, nombre, cargo, biografia, foto_url });
        }
    );
});

// Actualizar pastor (Protegido)
app.put('/api/pastores/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    const { nombre, cargo, biografia, foto_url } = req.body;
    db.query(
        'UPDATE pastores SET nombre = ?, cargo = ?, biografia = ?, foto_url = ? WHERE id = ?',
        [nombre, cargo, biografia, foto_url, id],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ success: true });
        }
    );
});

// Borrar pastor (Protegido)
app.delete('/api/pastores/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pastores WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

// --- ENDPOINTS PARA MENSAJES ---

// Obtener mensajes (Protegido)
app.get('/api/mensajes', verificarToken, (req, res) => {
    db.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Borrar mensaje (Protegido)
app.delete('/api/mensajes/:id', verificarToken, (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM mensajes_contacto WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ success: true });
    });
});

/**
 * Inicia el servidor Express en el puerto 3000.
 * El frontend (Vite en puerto 5173) se conecta a través del proxy configurado en vite.config.js.
 */
app.listen(3000, () => {
    // Imprime mensaje de confirmación cuando el servidor está listo
    console.log('Servidor Backend corriendo en http://localhost:3000');
});
