import express, { type NextFunction, type Request, type Response } from 'express';
import cors, { type CorsOptions } from 'cors';
import mysql, { type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from './config';
import { verificarToken } from './middleware/auth';

interface UsuarioRow extends RowDataPacket {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol: string;
}

interface EventoRow extends RowDataPacket {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  lugar: string | null;
  imagen_url: string | null;
}

interface PastorRow extends RowDataPacket {
  id: number;
  nombre: string;
  cargo: string;
  biografia: string | null;
  foto_url: string | null;
}

interface MensajeRow extends RowDataPacket {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha_envio: string;
}

interface EventoInput {
  titulo: string;
  descripcion: string | null;
  fecha: string;
  lugar: string;
  imagen_url: string | null;
}

interface PastorInput {
  nombre: string;
  cargo: string;
  biografia: string | null;
  foto_url: string | null;
}

interface MensajeInput {
  nombre: string;
  email: string;
  asunto: string | null;
  mensaje: string;
}

type HttpError = Error & { status?: number };
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

const app = express();
const db = mysql.createPool({
  ...config.database,
  charset: 'utf8mb4',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const corsOptions: CorsOptions = {
  origin(origin, callback) {
    if (!origin || config.corsOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(createHttpError(403, 'Origen no autorizado.'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86_400,
};

function createHttpError(status: number, message: string): HttpError {
  const error = new Error(message) as HttpError;
  error.status = status;
  return error;
}

function asyncHandler(handler: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction): void => {
    void handler(req, res, next).catch(next);
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function requireBody(body: unknown): Record<string, unknown> {
  if (!isRecord(body)) throw createHttpError(400, 'El cuerpo de la solicitud debe ser un objeto JSON.');
  return body;
}

function requiredText(value: unknown, field: string, maxLength: number): string {
  if (typeof value !== 'string') throw createHttpError(400, `${field} es obligatorio.`);

  const text = value.trim();
  if (!text) throw createHttpError(400, `${field} es obligatorio.`);
  if (text.length > maxLength) throw createHttpError(400, `${field} no puede superar ${maxLength} caracteres.`);

  return text;
}

function optionalText(value: unknown, field: string, maxLength: number): string | null {
  if (value === undefined || value === null || value === '') return null;
  return requiredText(value, field, maxLength);
}

function optionalUrl(value: unknown, field: string): string | null {
  const url = optionalText(value, field, 255);
  if (!url) return null;

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      throw createHttpError(400, `${field} debe usar http o https.`);
    }
  } catch (error) {
    if ((error as HttpError).status) throw error;
    throw createHttpError(400, `${field} debe ser una URL válida.`);
  }

  return url;
}

function requireEmail(value: unknown): string {
  const email = requiredText(value, 'Email', 100).toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) throw createHttpError(400, 'Email no es válido.');
  return email;
}

function requireDateTime(value: unknown): string {
  const dateTime = requiredText(value, 'Fecha', 25);
  const parts = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(dateTime);

  if (!parts) throw createHttpError(400, 'Fecha debe tener el formato AAAA-MM-DD HH:MM.');

  const [, year, month, day, hour, minute, second = '00'] = parts;
  const parsed = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  const valid = parsed.getFullYear() === Number(year)
    && parsed.getMonth() === Number(month) - 1
    && parsed.getDate() === Number(day)
    && parsed.getHours() === Number(hour)
    && parsed.getMinutes() === Number(minute)
    && parsed.getSeconds() === Number(second);

  if (!valid) throw createHttpError(400, 'Fecha no es válida.');
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

function requireId(value: unknown): number {
  if (typeof value !== 'string') throw createHttpError(400, 'Identificador no válido.');
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) throw createHttpError(400, 'Identificador no válido.');
  return id;
}

function validateEvento(body: unknown): EventoInput {
  const data = requireBody(body);
  return {
    titulo: requiredText(data.titulo, 'Título', 150),
    descripcion: optionalText(data.descripcion, 'Descripción', 5_000),
    fecha: requireDateTime(data.fecha),
    lugar: requiredText(data.lugar, 'Lugar', 150),
    imagen_url: optionalUrl(data.imagen_url, 'URL de imagen'),
  };
}

function validatePastor(body: unknown): PastorInput {
  const data = requireBody(body);
  return {
    nombre: requiredText(data.nombre, 'Nombre', 100),
    cargo: requiredText(data.cargo, 'Cargo', 100),
    biografia: optionalText(data.biografia, 'Biografía', 5_000),
    foto_url: optionalUrl(data.foto_url, 'URL de foto'),
  };
}

function validateMensaje(body: unknown): MensajeInput {
  const data = requireBody(body);
  return {
    nombre: requiredText(data.nombre, 'Nombre', 100),
    email: requireEmail(data.email),
    asunto: optionalText(data.asunto, 'Asunto', 150),
    mensaje: requiredText(data.mensaje, 'Mensaje', 5_000),
  };
}

async function requireAffected(result: ResultSetHeader, resource: string): Promise<void> {
  if (result.affectedRows === 0) throw createHttpError(404, `${resource} no encontrado.`);
}

app.disable('x-powered-by');
app.use(cors(corsOptions));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', asyncHandler(async (_req, res) => {
  await db.query('SELECT 1');
  res.json({ status: 'ok' });
}));

app.get('/api/eventos', asyncHandler(async (_req, res) => {
  const [eventos] = await db.execute<EventoRow[]>(
    'SELECT id, titulo, descripcion, fecha, lugar, imagen_url FROM eventos ORDER BY fecha ASC'
  );
  res.json(eventos);
}));

app.post('/api/auth/login', asyncHandler(async (req, res) => {
  const data = requireBody(req.body);
  const email = requireEmail(data.email);
  const password = requiredText(data.password, 'Contraseña', 200);
  const [usuarios] = await db.execute<UsuarioRow[]>(
    'SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  const usuario = usuarios[0];

  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    throw createHttpError(401, 'Credenciales inválidas.');
  }

  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, config.jwtSecret, { expiresIn: '2h' });
  res.json({
    message: 'Bienvenido',
    token,
    user: { id: usuario.id, name: usuario.nombre, email: usuario.email, rol: usuario.rol },
  });
}));

app.post('/api/eventos', verificarToken, asyncHandler(async (req, res) => {
  const evento = validateEvento(req.body);
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) VALUES (?, ?, ?, ?, ?)',
    [evento.titulo, evento.descripcion, evento.fecha, evento.lugar, evento.imagen_url]
  );
  res.status(201).json({ id: result.insertId, ...evento });
}));

app.put('/api/eventos/:id', verificarToken, asyncHandler(async (req, res) => {
  const id = requireId(req.params.id);
  const evento = validateEvento(req.body);
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, lugar = ?, imagen_url = ? WHERE id = ?',
    [evento.titulo, evento.descripcion, evento.fecha, evento.lugar, evento.imagen_url, id]
  );
  await requireAffected(result, 'Evento');
  res.json({ id, ...evento });
}));

app.delete('/api/eventos/:id', verificarToken, asyncHandler(async (req, res) => {
  const id = requireId(req.params.id);
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM eventos WHERE id = ?', [id]);
  await requireAffected(result, 'Evento');
  res.status(204).send();
}));

app.get('/api/pastores', asyncHandler(async (_req, res) => {
  const [pastores] = await db.execute<PastorRow[]>(
    'SELECT id, nombre, cargo, biografia, foto_url FROM pastores ORDER BY id ASC'
  );
  res.json(pastores);
}));

app.post('/api/pastores', verificarToken, asyncHandler(async (req, res) => {
  const pastor = validatePastor(req.body);
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO pastores (nombre, cargo, biografia, foto_url) VALUES (?, ?, ?, ?)',
    [pastor.nombre, pastor.cargo, pastor.biografia, pastor.foto_url]
  );
  res.status(201).json({ id: result.insertId, ...pastor });
}));

app.put('/api/pastores/:id', verificarToken, asyncHandler(async (req, res) => {
  const id = requireId(req.params.id);
  const pastor = validatePastor(req.body);
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE pastores SET nombre = ?, cargo = ?, biografia = ?, foto_url = ? WHERE id = ?',
    [pastor.nombre, pastor.cargo, pastor.biografia, pastor.foto_url, id]
  );
  await requireAffected(result, 'Pastor');
  res.json({ id, ...pastor });
}));

app.delete('/api/pastores/:id', verificarToken, asyncHandler(async (req, res) => {
  const id = requireId(req.params.id);
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM pastores WHERE id = ?', [id]);
  await requireAffected(result, 'Pastor');
  res.status(204).send();
}));

app.post('/api/mensajes', asyncHandler(async (req, res) => {
  const mensaje = validateMensaje(req.body);
  const cuerpo = mensaje.asunto ? `[${mensaje.asunto}] ${mensaje.mensaje}` : mensaje.mensaje;
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)',
    [mensaje.nombre, mensaje.email, cuerpo]
  );
  res.status(201).json({ id: result.insertId, ...mensaje });
}));

app.get('/api/mensajes', verificarToken, asyncHandler(async (_req, res) => {
  const [mensajes] = await db.execute<MensajeRow[]>(
    'SELECT id, nombre, email, mensaje, fecha_envio FROM mensajes_contacto ORDER BY fecha_envio DESC'
  );
  res.json(mensajes);
}));

app.delete('/api/mensajes/:id', verificarToken, asyncHandler(async (req, res) => {
  const id = requireId(req.params.id);
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM mensajes_contacto WHERE id = ?', [id]);
  await requireAffected(result, 'Mensaje');
  res.status(204).send();
}));

app.use((_req, _res, next) => next(createHttpError(404, 'Ruta no encontrada.')));

app.use((error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  const status = error.status ?? 500;
  if (status >= 500) console.error(error);
  res.status(status).json({ error: status >= 500 ? 'Ocurrió un error interno.' : error.message });
});

async function start(): Promise<void> {
  const connection = await db.getConnection();
  connection.release();

  app.listen(config.port, () => {
    console.log(`Servidor Backend corriendo en http://localhost:${config.port}`);
  });
}

void start().catch((error: unknown) => {
  console.error('No se pudo conectar a la base de datos:', error);
  process.exitCode = 1;
});
