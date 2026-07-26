import express, { Request, Response } from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verificarToken } from './middleware/auth';

dotenv.config({ path: '../.env' });

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  charset: 'utf8mb4',
});

db.connect((err) => {
  if (err) throw err;
  console.log(`Conectado a MySQL en el puerto ${process.env.DB_PORT}.`);
});

interface UsuarioRow {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

app.get('/api/eventos', (_req: Request, res: Response) => {
  db.query('SELECT * FROM eventos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email y contraseña son requeridos' });
    return;
  }

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });

    const rows = results as UsuarioRow[];
    if (rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const usuario = rows[0]!;
    const claveValida = await bcrypt.compare(password, usuario.password);

    if (!claveValida) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, rol: usuario.rol },
      process.env.JWT_SECRET as string,
      { expiresIn: '2h' }
    );

    res.json({
      message: 'Bienvenido',
      token,
      user: {
        id: usuario.id,
        name: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
      },
    });
  });
});

app.post('/api/eventos', verificarToken, (req: Request, res: Response) => {
  const { titulo, descripcion, fecha, lugar, imagen_url } = req.body;
  db.query(
    'INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) VALUES (?, ?, ?, ?, ?)',
    [titulo, descripcion, fecha, lugar, imagen_url],
    (err, result) => {
      if (err) return res.status(500).json(err);
      const insertResult = result as mysql.ResultSetHeader;
      res.json({ id: insertResult.insertId, titulo, descripcion, fecha, lugar, imagen_url });
    }
  );
});

app.put('/api/eventos/:id', verificarToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha, lugar, imagen_url } = req.body;
  db.query(
    'UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, lugar = ?, imagen_url = ? WHERE id = ?',
    [titulo, descripcion, fecha, lugar, imagen_url, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

app.delete('/api/eventos/:id', verificarToken, (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('DELETE FROM eventos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.get('/api/pastores', (_req: Request, res: Response) => {
  db.query('SELECT * FROM pastores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/pastores', verificarToken, (req: Request, res: Response) => {
  const { nombre, cargo, biografia, foto_url } = req.body;
  db.query(
    'INSERT INTO pastores (nombre, cargo, biografia, foto_url) VALUES (?, ?, ?, ?)',
    [nombre, cargo, biografia, foto_url],
    (err, result) => {
      if (err) return res.status(500).json(err);
      const insertResult = result as mysql.ResultSetHeader;
      res.json({ id: insertResult.insertId, nombre, cargo, biografia, foto_url });
    }
  );
});

app.put('/api/pastores/:id', verificarToken, (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, cargo, biografia, foto_url } = req.body;
  db.query(
    'UPDATE pastores SET nombre = ?, cargo = ?, biografia = ?, foto_url = ? WHERE id = ?',
    [nombre, cargo, biografia, foto_url, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ success: true });
    }
  );
});

app.delete('/api/pastores/:id', verificarToken, (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('DELETE FROM pastores WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.post('/api/mensajes', (req: Request, res: Response) => {
  const { nombre, email, asunto, mensaje } = req.body;

  if (!nombre || !email || !mensaje) {
    res.status(400).json({ error: 'Nombre, email y mensaje son requeridos' });
    return;
  }

  // La tabla no tiene columna 'asunto', se incluye al inicio del mensaje
  const mensajeCompleto = asunto ? `[${asunto}] ${mensaje}` : mensaje;

  db.query(
    'INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)',
    [nombre, email, mensajeCompleto],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al guardar el mensaje' });
      const insertResult = result as mysql.ResultSetHeader;
      res.json({ id: insertResult.insertId, nombre, email, asunto, mensaje });
    }
  );
});

app.get('/api/mensajes', verificarToken, (_req: Request, res: Response) => {
  db.query('SELECT * FROM mensajes_contacto ORDER BY fecha_envio DESC', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.delete('/api/mensajes/:id', verificarToken, (req: Request, res: Response) => {
  const { id } = req.params;
  db.query('DELETE FROM mensajes_contacto WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ success: true });
  });
});

app.listen(3000, () => {
  console.log('Servidor Backend corriendo en http://localhost:3000');
});
