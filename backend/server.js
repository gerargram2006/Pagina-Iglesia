// Le decimos que busque la caja fuerte un nivel arriba
require('dotenv').config({ path: '../.env' });

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión usando variables de entorno
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) throw err;
    console.log(`¡Escudos activados! Conectado a MySQL en el puerto ${process.env.DB_PORT}.`);
});

// Endpoint 1: Traer los eventos para el Home
app.get('/api/eventos', (req, res) => {
    db.query('SELECT * FROM eventos', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

// Endpoint 2: Validar el Login (¡NUEVO y SEGURO!)
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Error del servidor' });
        if (results.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

        const usuario = results[0];

        // Aquí bcrypt compara la clave que escribiste con la encriptada de la BD
        // Nota: Como insertamos '123456' en texto plano antes, esta prueba fallará hasta que insertemos una clave encriptada.
        const claveValida = await bcrypt.compare(password, usuario.password);

        if (!claveValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Si todo está bien, generamos el "Pase VIP"
        const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, process.env.JWT_SECRET, { expiresIn: '2h' });

        res.json({
            message: 'Bienvenido',
            token: token,
            user: { id: usuario.id, name: usuario.name, email: usuario.email, rol: usuario.rol }
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor Backend corriendo en http://localhost:3000');
});