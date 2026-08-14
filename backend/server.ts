// Importa Express y sus tipos de TypeScript para crear el servidor HTTP y manejar peticiones
import express, { type NextFunction, type Request, type Response } from 'express';
// Importa el middleware CORS para permitir peticiones desde otros dominios
import cors, { type CorsOptions } from 'cors';
// Importa el cliente MySQL con promesas para interactuar con la base de datos
import mysql, { type ResultSetHeader, type RowDataPacket } from 'mysql2/promise';
// Importa bcrypt para encriptar y verificar contraseñas
import bcrypt from 'bcrypt';
// Importa el módulo path para manejar rutas de archivos
import path from 'node:path';
// Importa jsonwebtoken para generar y verificar tokens de autenticación
import jwt from 'jsonwebtoken';
// Importa la configuración global (puerto, secretos, credenciales de base de datos)
import { config } from './config';
// Importa el middleware que valida el token JWT en rutas protegidas
import { verificarToken } from './middleware/auth';
// Importa el middleware de subida de archivos (multer)
import { upload } from './middleware/upload';

// Define la estructura de un registro de la tabla "usuarios"
interface UsuarioRow extends RowDataPacket {
  // Identificador único del usuario
  id: number;
  // Nombre del usuario
  nombre: string;
  // Correo electrónico del usuario
  email: string;
  // Contraseña encriptada del usuario
  password: string;
  // Rol del usuario (admin, etc.)
  rol: string;
}

// Define la estructura de un registro de la tabla "eventos"
interface EventoRow extends RowDataPacket {
  // Identificador único del evento
  id: number;
  // Título del evento
  titulo: string;
  // Descripción opcional del evento
  descripcion: string | null;
  // Fecha del evento
  fecha: string;
  // Lugar opcional del evento
  lugar: string | null;
  // URL opcional de la imagen del evento
  imagen_url: string | null;
}

// Define la estructura de un registro de la tabla "pastores"
interface PastorRow extends RowDataPacket {
  // Identificador único del pastor
  id: number;
  // Nombre del pastor
  nombre: string;
  // Cargo del pastor
  cargo: string;
  // Biografía opcional del pastor
  biografia: string | null;
  // URL opcional de la foto del pastor
  foto_url: string | null;
}

// Define la estructura de un registro de la tabla "mensajes_contacto"
interface MensajeRow extends RowDataPacket {
  // Identificador único del mensaje
  id: number;
  // Nombre de quien envía el mensaje
  nombre: string;
  // Correo de quien envía el mensaje
  email: string;
  // Contenido del mensaje
  mensaje: string;
  // Fecha en que se envió el mensaje
  fecha_envio: string;
}

// Define la estructura de un registro de la tabla "anuncios"
interface AnuncioRow extends RowDataPacket {
  // Identificador único del anuncio
  id: number;
  // Título del anuncio
  titulo: string;
  // Descripción opcional del anuncio
  descripcion: string | null;
  // URL opcional de la imagen del anuncio
  imagen_url: string | null;
  // Fecha de creación del anuncio
  fecha_creacion: string;
}

// Define la estructura de un registro de la tabla "recursos"
interface RecursoRow extends RowDataPacket {
  // Identificador único del recurso
  id: number;
  // Título del recurso
  titulo: string;
  // Descripción opcional del recurso
  descripcion: string | null;
  // Tipo del recurso (imagen, PDF, etc.)
  tipo: string;
  // URL del archivo del recurso
  archivo_url: string;
  // Fecha de creación del recurso
  fecha_creacion: string;
}

// Define la estructura de un registro de la tabla "slides"
interface SlideRow extends RowDataPacket {
  // Identificador único del slide
  id: number;
  // Título del slide
  titulo: string;
  // Subtítulo opcional del slide
  subtitulo: string | null;
  // URL de la imagen del slide
  imagen_url: string;
  // Texto opcional del botón principal
  btn_principal: string | null;
  // Texto opcional del botón secundario
  btn_secundario: string | null;
  // Orden de aparición del slide
  orden: number;
  // Indica si el slide está activo (1) o inactivo (0)
  activo: number;
}

// Define la estructura de un registro de la tabla "horarios"
interface HorarioRow extends RowDataPacket {
  // Identificador único del horario
  id: number;
  // Día de la semana del horario
  dia: string;
  // Hora del horario
  hora: string;
  // Actividad programada
  actividad: string;
}

// Define la estructura de un registro de la tabla "galeria"
interface GaleriaRow extends RowDataPacket {
  // Identificador único de la imagen
  id: number;
  // Título de la imagen
  titulo: string;
  // URL de la imagen
  imagen_url: string;
  // Indica si la imagen es destacada (1) o no (0)
  destacada: number;
  // Orden de aparición de la imagen
  orden: number;
}

// Define los datos validados para crear o actualizar un evento
interface EventoInput {
  // Título del evento
  titulo: string;
  // Descripción opcional del evento
  descripcion: string | null;
  // Fecha del evento
  fecha: string;
  // Lugar del evento
  lugar: string;
  // URL opcional de la imagen del evento
  imagen_url: string | null;
}

// Define los datos validados para crear o actualizar un pastor
interface PastorInput {
  // Nombre del pastor
  nombre: string;
  // Cargo del pastor
  cargo: string;
  // Biografía opcional del pastor
  biografia: string | null;
  // URL opcional de la foto del pastor
  foto_url: string | null;
}

// Define los datos validados para enviar un mensaje de contacto
interface MensajeInput {
  // Nombre de quien envía el mensaje
  nombre: string;
  // Correo de quien envía el mensaje
  email: string;
  // Asunto opcional del mensaje
  asunto: string | null;
  // Contenido del mensaje
  mensaje: string;
}

// Define los datos validados para crear o actualizar un anuncio
interface AnuncioInput {
  // Título del anuncio
  titulo: string;
  // Descripción opcional del anuncio
  descripcion: string | null;
  // URL opcional de la imagen del anuncio
  imagen_url: string | null;
}

// Define los datos validados para crear o actualizar un recurso
interface RecursoInput {
  // Título del recurso
  titulo: string;
  // Descripción opcional del recurso
  descripcion: string | null;
  // Tipo del recurso
  tipo: string;
  // URL del archivo del recurso
  archivo_url: string;
}

// Define los datos validados para crear o actualizar un slide
interface SlideInput {
  // Título del slide
  titulo: string;
  // Subtítulo opcional del slide
  subtitulo: string | null;
  // URL opcional de la imagen del slide
  imagen_url: string | null;
  // Texto opcional del botón principal
  btn_principal: string | null;
  // Texto opcional del botón secundario
  btn_secundario: string | null;
  // Orden de aparición del slide
  orden: number;
  // Indica si el slide está activo (1) o inactivo (0)
  activo: number;
}

// Define los datos validados para crear o actualizar un horario
interface HorarioInput {
  // Día de la semana del horario
  dia: string;
  // Hora del horario
  hora: string;
  // Actividad programada
  actividad: string;
}

// Define los datos validados para crear o actualizar una imagen de galería
interface GaleriaInput {
  // Título de la imagen
  titulo: string;
  // URL opcional de la imagen
  imagen_url: string | null;
  // Indica si la imagen es destacada (1) o no (0)
  destacada: number;
  // Orden de aparición de la imagen
  orden: number;
}

// Tipo de error HTTP que incluye un código de estado opcional
type HttpError = Error & { status?: number };
// Tipo para manejadores de rutas asíncronos
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

// Crea la aplicación de Express
const app = express();
// Crea un pool (grupo) de conexiones a la base de datos MySQL
const db = mysql.createPool({
  // Usa las credenciales de la configuración (host, usuario, contraseña, etc.)
  ...config.database,
  // Fuerza el juego de caracteres UTF-8 completo (ñ, tildes, emojis)
  charset: 'utf8mb4',
  // Espera si no hay conexiones libres en lugar de fallar
  waitForConnections: true,
  // Máximo de 10 conexiones simultáneas
  connectionLimit: 10,
  // Sin límite de peticiones en espera
  queueLimit: 0,
});

// Escucha el evento que se dispara al crear cada conexión del pool
// Fuerza UTF-8 en cada conexión nueva para evitar problemas con ñ, tildes, etc.
db.on('connection', (connection) => {
  // Ejecuta SET NAMES utf8mb4 en la conexión recién creada
  void connection.query('SET NAMES utf8mb4');
});

// Define las opciones de CORS para controlar qué orígenes pueden acceder a la API
const corsOptions: CorsOptions = {
  // Función que valida el origen de cada petición
  origin(origin, callback) {
    // Si no hay origen (petición del servidor) o está en la lista permitida, se autoriza
    if (!origin || config.corsOrigins.includes(origin)) {
      // Autoriza la petición
      callback(null, true);
      // Sale de la función de validación
      return;
    }

    // Rechaza los orígenes que no están permitidos
    callback(createHttpError(403, 'Origen no autorizado.'));
  },
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Cabeceras permitidas en las peticiones
  allowedHeaders: ['Content-Type', 'Authorization'],
  // Tiempo (en segundos) que el navegador guarda la respuesta preflight
  maxAge: 86_400,
};

// Crea un error HTTP con código de estado y mensaje
function createHttpError(status: number, message: string): HttpError {
  // Crea un error normal con el mensaje
  const error = new Error(message) as HttpError;
  // Le asigna el código de estado HTTP
  error.status = status;
  // Devuelve el error con el código de estado
  return error;
}

// Envuelve un manejador asíncrono para que los errores se pasen a Express
function asyncHandler(handler: AsyncHandler) {
  // Devuelve una función que Express puede ejecutar
  return (req: Request, res: Response, next: NextFunction): void => {
    // Ejecuta el manejador y envía los errores al siguiente middleware
    void handler(req, res, next).catch(next);
  };
}

// Comprueba si un valor es un objeto plano (y no un array o null)
function isRecord(value: unknown): value is Record<string, unknown> {
  // Devuelve true solo si el valor es un objeto que no es null ni un array
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Extrae el cuerpo de la petición y lo valida como objeto JSON
function requireBody(body: unknown): Record<string, unknown> {
  // Lanza un error 400 si el cuerpo no es un objeto JSON
  if (!isRecord(body)) throw createHttpError(400, 'El cuerpo de la solicitud debe ser un objeto JSON.');
  // Devuelve el cuerpo validado
  return body;
}

// Valida que un texto sea obligatorio, no vacío y no exceda el máximo de caracteres
function requiredText(value: unknown, field: string, maxLength: number): string {
  // Lanza un error 400 si el valor no es texto
  if (typeof value !== 'string') throw createHttpError(400, `${field} es obligatorio.`);

  // Elimina los espacios al inicio y al final del texto
  const text = value.trim();
  // Lanza un error 400 si el texto quedó vacío
  if (!text) throw createHttpError(400, `${field} es obligatorio.`);
  // Lanza un error 400 si el texto supera la longitud máxima permitida
  if (text.length > maxLength) throw createHttpError(400, `${field} no puede superar ${maxLength} caracteres.`);

  // Devuelve el texto limpio y validado
  return text;
}

// Valida un texto opcional: devuelve null si viene vacío o ausente
function optionalText(value: unknown, field: string, maxLength: number): string | null {
  // Si el valor no está presente devuelve null
  if (value === undefined || value === null || value === '') return null;
  // Si el valor existe aplica la validación de texto obligatorio
  return requiredText(value, field, maxLength);
}

// Valida una URL opcional: puede ser una ruta local o una URL http/https
function optionalUrl(value: unknown, field: string): string | null {
  // Obtiene el texto opcional (máximo 255 caracteres)
  const url = optionalText(value, field, 255);
  // Si no hay URL devuelve null
  if (!url) return null;

  // Acepta rutas internas de la aplicación (uploads e imágenes locales)
  if (url.startsWith('/uploads/') || url.startsWith('/img/')) return url;

  try {
    // Intenta interpretar el texto como una URL
    const parsed = new URL(url);
    // Rechaza protocolos que no sean http o https
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      // Lanza un error 400 indicando el protocolo permitido
      throw createHttpError(400, `${field} debe usar http o https.`);
    }
  } catch (error) {
    // Si el error ya trae un código HTTP, lo re-lanza tal cual
    if ((error as HttpError).status) throw error;
    // Lanza un error 400 si la URL no es válida
    throw createHttpError(400, `${field} debe ser una URL válida.`);
  }

  // Devuelve la URL validada
  return url;
}

// Valida que un valor sea un correo electrónico con formato correcto
function requireEmail(value: unknown): string {
  // Valida el texto del correo (máximo 100 caracteres) y lo pasa a minúsculas
  const email = requiredText(value, 'Email', 100).toLowerCase();
  // Expresión regular del formato de un correo electrónico
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Lanza un error 400 si el formato del correo no coincide
  if (!emailPattern.test(email)) throw createHttpError(400, 'Email no es válido.');
  // Devuelve el correo validado
  return email;
}

// Valida que un valor sea una fecha/hora con formato AAAA-MM-DD HH:MM[:SS]
function requireDateTime(value: unknown): string {
  // Valida el texto de la fecha (máximo 25 caracteres)
  const dateTime = requiredText(value, 'Fecha', 25);
  // Extrae las partes de la fecha mediante una expresión regular
  const parts = /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})(?::(\d{2}))?$/.exec(dateTime);

  // Lanza un error 400 si el formato de la fecha no coincide
  if (!parts) throw createHttpError(400, 'Fecha debe tener el formato AAAA-MM-DD HH:MM.');

  // Descompone año, mes, día, hora, minuto y segundo (el segundo por defecto es "00")
  const [, year, month, day, hour, minute, second = '00'] = parts;
  // Construye un objeto Date con las partes (el mes va de 0 a 11)
  const parsed = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(second));
  // Comprueba que la fecha construida coincida con el año original
  const valid = parsed.getFullYear() === Number(year)
    // Comprueba que coincida con el mes original
    && parsed.getMonth() === Number(month) - 1
    // Comprueba que coincida con el día original
    && parsed.getDate() === Number(day)
    // Comprueba que coincida con la hora original
    && parsed.getHours() === Number(hour)
    // Comprueba que coincida con el minuto original
    && parsed.getMinutes() === Number(minute)
    // Comprueba que coincida con el segundo original
    && parsed.getSeconds() === Number(second);

  // Lanza un error 400 si la fecha no es válida (por ejemplo, el día 32)
  if (!valid) throw createHttpError(400, 'Fecha no es válida.');
  // Devuelve la fecha normalizada en formato AAAA-MM-DD HH:MM:SS
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

// Valida que un identificador sea un número entero positivo
function requireId(value: unknown): number {
  // Lanza un error 400 si el identificador no es texto
  if (typeof value !== 'string') throw createHttpError(400, 'Identificador no válido.');
  // Convierte el texto a número
  const id = Number(value);
  // Lanza un error 400 si no es un entero positivo seguro
  if (!Number.isSafeInteger(id) || id < 1) throw createHttpError(400, 'Identificador no válido.');
  // Devuelve el identificador validado
  return id;
}

// Valida los datos recibidos para crear o actualizar un evento
function validateEvento(body: unknown): EventoInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el evento con todos sus campos validados
  return {
    // Valida el título (obligatorio, máximo 150 caracteres)
    titulo: requiredText(data.titulo, 'Título', 150),
    // Valida la descripción (opcional, máximo 5000 caracteres)
    descripcion: optionalText(data.descripcion, 'Descripción', 5_000),
    // Valida la fecha del evento
    fecha: requireDateTime(data.fecha),
    // Valida el lugar (obligatorio, máximo 150 caracteres)
    lugar: requiredText(data.lugar, 'Lugar', 150),
    // Valida la URL de la imagen (opcional)
    imagen_url: optionalUrl(data.imagen_url, 'URL de imagen'),
  };
}

// Valida los datos recibidos para crear o actualizar un pastor
function validatePastor(body: unknown): PastorInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el pastor con todos sus campos validados
  return {
    // Valida el nombre (obligatorio, máximo 100 caracteres)
    nombre: requiredText(data.nombre, 'Nombre', 100),
    // Valida el cargo (obligatorio, máximo 100 caracteres)
    cargo: requiredText(data.cargo, 'Cargo', 100),
    // Valida la biografía (opcional, máximo 5000 caracteres)
    biografia: optionalText(data.biografia, 'Biografía', 5_000),
    // Valida la URL de la foto (opcional)
    foto_url: optionalUrl(data.foto_url, 'URL de foto'),
  };
}

// Valida los datos recibidos para enviar un mensaje de contacto
function validateMensaje(body: unknown): MensajeInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el mensaje con todos sus campos validados
  return {
    // Valida el nombre (obligatorio, máximo 100 caracteres)
    nombre: requiredText(data.nombre, 'Nombre', 100),
    // Valida el correo electrónico
    email: requireEmail(data.email),
    // Valida el asunto (opcional, máximo 150 caracteres)
    asunto: optionalText(data.asunto, 'Asunto', 150),
    // Valida el mensaje (obligatorio, máximo 5000 caracteres)
    mensaje: requiredText(data.mensaje, 'Mensaje', 5_000),
  };
}

// Valida los datos recibidos para crear o actualizar un anuncio
function validateAnuncio(body: unknown): AnuncioInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el anuncio con todos sus campos validados
  return {
    // Valida el título (obligatorio, máximo 150 caracteres)
    titulo: requiredText(data.titulo, 'Título', 150),
    // Valida la descripción (opcional, máximo 5000 caracteres)
    descripcion: optionalText(data.descripcion, 'Descripción', 5_000),
    // Valida la URL de la imagen (opcional)
    imagen_url: optionalUrl(data.imagen_url, 'URL de imagen'),
  };
}

// Valida los datos recibidos para crear o actualizar un recurso
function validateRecurso(body: unknown): RecursoInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Valida la URL del archivo (opcional)
  const archivo_url = optionalUrl(data.archivo_url, 'URL de archivo');
  // Lanza un error 400 si no se proporcionó ningún archivo
  if (!archivo_url) throw createHttpError(400, 'El archivo es obligatorio.');
  // Devuelve el recurso con todos sus campos validados
  return {
    // Valida el título (obligatorio, máximo 150 caracteres)
    titulo: requiredText(data.titulo, 'Título', 150),
    // Valida la descripción (opcional, máximo 5000 caracteres)
    descripcion: optionalText(data.descripcion, 'Descripción', 5_000),
    // Valida el tipo (obligatorio, máximo 50 caracteres)
    tipo: requiredText(data.tipo, 'Tipo', 50),
    // Usa la URL de archivo validada
    archivo_url,
  };
}

// Valida los datos recibidos para crear o actualizar un slide
function validateSlide(body: unknown): SlideInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el slide con todos sus campos validados
  return {
    // Valida el título (obligatorio, máximo 200 caracteres)
    titulo: requiredText(data.titulo, 'Título', 200),
    // Valida el subtítulo (opcional, máximo 5000 caracteres)
    subtitulo: optionalText(data.subtitulo, 'Subtítulo', 5_000),
    // Valida la URL de la imagen (opcional)
    imagen_url: optionalUrl(data.imagen_url, 'URL de imagen'),
    // Valida el texto del botón principal (opcional, máximo 100 caracteres)
    btn_principal: optionalText(data.btn_principal, 'Botón principal', 100),
    // Valida el texto del botón secundario (opcional, máximo 100 caracteres)
    btn_secundario: optionalText(data.btn_secundario, 'Botón secundario', 100),
    // Convierte el orden a número (usa 0 si el valor no es válido)
    orden: typeof data.orden === 'number' ? data.orden : (typeof data.orden === 'string' ? Number(data.orden) || 0 : 0),
    // Convierte "activo" a 1 (verdadero) o 0 (falso)
    activo: data.activo === '0' || data.activo === 0 || data.activo === false ? 0 : 1,
  };
}

// Valida los datos recibidos para crear o actualizar un horario
function validateHorario(body: unknown): HorarioInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve el horario con todos sus campos validados
  return {
    // Valida el día (obligatorio, máximo 20 caracteres)
    dia: requiredText(data.dia, 'Día', 20),
    // Valida la hora (obligatorio, máximo 20 caracteres)
    hora: requiredText(data.hora, 'Hora', 20),
    // Valida la actividad (obligatorio, máximo 100 caracteres)
    actividad: requiredText(data.actividad, 'Actividad', 100),
  };
}

// Valida los datos recibidos para crear o actualizar una imagen de galería
function validateGaleria(body: unknown): GaleriaInput {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(body);
  // Devuelve la imagen de galería con todos sus campos validados
  return {
    // Valida el título (obligatorio, máximo 150 caracteres)
    titulo: requiredText(data.titulo, 'Título', 150),
    // Valida la URL de la imagen (opcional)
    imagen_url: optionalUrl(data.imagen_url, 'URL de imagen'),
    // Convierte "destacada" a 1 (verdadero) o 0 (falso)
    destacada: data.destacada === '1' || data.destacada === 1 || data.destacada === true ? 1 : 0,
    // Convierte el orden a número (usa 0 si el valor no es válido)
    orden: typeof data.orden === 'number' ? data.orden : (typeof data.orden === 'string' ? Number(data.orden) || 0 : 0),
  };
}

// Lanza un error 404 si la operación no afectó a ninguna fila de la base de datos
function requireAffected(result: ResultSetHeader, resource: string): void {
  // Lanza un error 404 si no se modificó ninguna fila
  if (result.affectedRows === 0) throw createHttpError(404, `${resource} no encontrado.`);
}

// Oculta el encabezado que revela que el servidor usa Express
app.disable('x-powered-by');
// Habilita CORS con las opciones configuradas
app.use(cors(corsOptions));
// Permite leer cuerpos de petición en formato JSON (máximo 100kb)
app.use(express.json({ limit: '100kb' }));
// Permite leer formularios codificados en URL
app.use(express.urlencoded({ extended: true }));
// Sirve los archivos subidos desde la carpeta "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta de salud: comprueba que el servidor y la base de datos respondan
app.get('/api/health', asyncHandler(async (_req, res) => {
  // Ejecuta una consulta trivial contra la base de datos
  await db.query('SELECT 1');
  // Responde con estado "ok"
  res.json({ status: 'ok' });
}));

// Obtiene todos los eventos ordenados por fecha
app.get('/api/eventos', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los eventos
  const [eventos] = await db.execute<EventoRow[]>(
    'SELECT id, titulo, descripcion, fecha, lugar, imagen_url FROM eventos ORDER BY fecha ASC'
  );
  // Devuelve la lista de eventos
  res.json(eventos);
}));

// Ruta de inicio de sesión: autentica al usuario y devuelve un token JWT
app.post('/api/auth/login', asyncHandler(async (req, res) => {
  // Obtiene el cuerpo de la petición validado como objeto
  const data = requireBody(req.body);
  // Valida el correo electrónico
  const email = requireEmail(data.email);
  // Valida la contraseña (obligatoria, máximo 200 caracteres)
  const password = requiredText(data.password, 'Contraseña', 200);
  // Busca al usuario por su correo electrónico
  const [usuarios] = await db.execute<UsuarioRow[]>(
    'SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ? LIMIT 1',
    [email]
  );
  // Toma el primer usuario encontrado
  const usuario = usuarios[0];

  // Si el usuario no existe o la contraseña no coincide
  if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
    // Lanza un error 401 de credenciales inválidas
    throw createHttpError(401, 'Credenciales inválidas.');
  }

  // Genera un token JWT que expira en 2 horas
  const token = jwt.sign({ id: usuario.id, rol: usuario.rol }, config.jwtSecret, { expiresIn: '2h' });
  // Responde con el token y los datos del usuario
  res.json({
    message: 'Bienvenido',
    token,
    user: { id: usuario.id, name: usuario.nombre, email: usuario.email, rol: usuario.rol },
  });
}));

// Crea un nuevo evento (requiere token y puede incluir una imagen)
app.post('/api/eventos', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida los datos del evento
  const evento = validateEvento(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    evento.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Inserta el evento en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) VALUES (?, ?, ?, ?, ?)',
    [evento.titulo, evento.descripcion, evento.fecha, evento.lugar, evento.imagen_url]
  );
  // Responde con el id del nuevo evento y sus datos
  res.status(201).json({ id: result.insertId, ...evento });
}));

// Actualiza un evento existente (requiere token y puede incluir una imagen)
app.put('/api/eventos/:id', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida el id del evento de la URL
  const id = requireId(req.params.id);
  // Valida los datos del evento
  const evento = validateEvento(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    evento.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Actualiza el evento en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE eventos SET titulo = ?, descripcion = ?, fecha = ?, lugar = ?, imagen_url = ? WHERE id = ?',
    [evento.titulo, evento.descripcion, evento.fecha, evento.lugar, evento.imagen_url, id]
  );
  // Lanza un error 404 si el evento no existe
  await requireAffected(result, 'Evento');
  // Responde con el evento actualizado
  res.json({ id, ...evento });
}));

// Elimina un evento por su id (requiere token)
app.delete('/api/eventos/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del evento de la URL
  const id = requireId(req.params.id);
  // Elimina el evento de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM eventos WHERE id = ?', [id]);
  // Lanza un error 404 si el evento no existe
  await requireAffected(result, 'Evento');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// Obtiene todos los pastores ordenados por id
app.get('/api/pastores', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los pastores
  const [pastores] = await db.execute<PastorRow[]>(
    'SELECT id, nombre, cargo, biografia, foto_url FROM pastores ORDER BY id ASC'
  );
  // Devuelve la lista de pastores
  res.json(pastores);
}));

// Crea un nuevo pastor (requiere token y puede incluir una foto)
app.post('/api/pastores', verificarToken, upload.single('foto'), asyncHandler(async (req, res) => {
  // Valida los datos del pastor
  const pastor = validatePastor(req.body);
  // Si se subió un archivo de foto
  if (req.file) {
    // Guarda la URL del archivo subido
    pastor.foto_url = `/uploads/${req.file.filename}`;
  }
  // Inserta el pastor en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO pastores (nombre, cargo, biografia, foto_url) VALUES (?, ?, ?, ?)',
    [pastor.nombre, pastor.cargo, pastor.biografia, pastor.foto_url]
  );
  // Responde con el id del nuevo pastor y sus datos
  res.status(201).json({ id: result.insertId, ...pastor });
}));

// Actualiza un pastor existente (requiere token y puede incluir una foto)
app.put('/api/pastores/:id', verificarToken, upload.single('foto'), asyncHandler(async (req, res) => {
  // Valida el id del pastor de la URL
  const id = requireId(req.params.id);
  // Valida los datos del pastor
  const pastor = validatePastor(req.body);
  // Si se subió un archivo de foto
  if (req.file) {
    // Guarda la URL del archivo subido
    pastor.foto_url = `/uploads/${req.file.filename}`;
  }
  // Actualiza el pastor en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE pastores SET nombre = ?, cargo = ?, biografia = ?, foto_url = ? WHERE id = ?',
    [pastor.nombre, pastor.cargo, pastor.biografia, pastor.foto_url, id]
  );
  // Lanza un error 404 si el pastor no existe
  await requireAffected(result, 'Pastor');
  // Responde con el pastor actualizado
  res.json({ id, ...pastor });
}));

// Elimina un pastor por su id (requiere token)
app.delete('/api/pastores/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del pastor de la URL
  const id = requireId(req.params.id);
  // Elimina el pastor de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM pastores WHERE id = ?', [id]);
  // Lanza un error 404 si el pastor no existe
  await requireAffected(result, 'Pastor');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// Ruta pública: registra un mensaje de contacto del formulario
app.post('/api/mensajes', asyncHandler(async (req, res) => {
  // Valida los datos del mensaje
  const mensaje = validateMensaje(req.body);
  // Combina el asunto con el mensaje si existe asunto
  const cuerpo = mensaje.asunto ? `[${mensaje.asunto}] ${mensaje.mensaje}` : mensaje.mensaje;
  // Inserta el mensaje de contacto en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO mensajes_contacto (nombre, email, mensaje) VALUES (?, ?, ?)',
    [mensaje.nombre, mensaje.email, cuerpo]
  );
  // Responde con el id del nuevo mensaje y sus datos
  res.status(201).json({ id: result.insertId, ...mensaje });
}));

// Obtiene todos los mensajes de contacto ordenados del más reciente al más antiguo (requiere token)
app.get('/api/mensajes', verificarToken, asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los mensajes de contacto
  const [mensajes] = await db.execute<MensajeRow[]>(
    'SELECT id, nombre, email, mensaje, fecha_envio FROM mensajes_contacto ORDER BY fecha_envio DESC'
  );
  // Devuelve la lista de mensajes
  res.json(mensajes);
}));

// Elimina un mensaje de contacto por su id (requiere token)
app.delete('/api/mensajes/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del mensaje de la URL
  const id = requireId(req.params.id);
  // Elimina el mensaje de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM mensajes_contacto WHERE id = ?', [id]);
  // Lanza un error 404 si el mensaje no existe
  await requireAffected(result, 'Mensaje');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// Obtiene todos los anuncios ordenados del más reciente al más antiguo
app.get('/api/anuncios', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los anuncios
  const [anuncios] = await db.execute<AnuncioRow[]>(
    'SELECT id, titulo, descripcion, imagen_url, fecha_creacion FROM anuncios ORDER BY fecha_creacion DESC'
  );
  // Devuelve la lista de anuncios
  res.json(anuncios);
}));

// Crea un nuevo anuncio (requiere token y puede incluir una imagen)
app.post('/api/anuncios', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida los datos del anuncio
  const anuncio = validateAnuncio(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    anuncio.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Inserta el anuncio en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO anuncios (titulo, descripcion, imagen_url) VALUES (?, ?, ?)',
    [anuncio.titulo, anuncio.descripcion, anuncio.imagen_url]
  );
  // Responde con el id del nuevo anuncio y sus datos
  res.status(201).json({ id: result.insertId, ...anuncio });
}));

// Actualiza un anuncio existente (requiere token y puede incluir una imagen)
app.put('/api/anuncios/:id', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida el id del anuncio de la URL
  const id = requireId(req.params.id);
  // Valida los datos del anuncio
  const anuncio = validateAnuncio(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    anuncio.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Actualiza el anuncio en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE anuncios SET titulo = ?, descripcion = ?, imagen_url = ? WHERE id = ?',
    [anuncio.titulo, anuncio.descripcion, anuncio.imagen_url, id]
  );
  // Lanza un error 404 si el anuncio no existe
  await requireAffected(result, 'Anuncio');
  // Responde con el anuncio actualizado
  res.json({ id, ...anuncio });
}));

// Elimina un anuncio por su id (requiere token)
app.delete('/api/anuncios/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del anuncio de la URL
  const id = requireId(req.params.id);
  // Elimina el anuncio de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM anuncios WHERE id = ?', [id]);
  // Lanza un error 404 si el anuncio no existe
  await requireAffected(result, 'Anuncio');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// Obtiene todos los recursos ordenados del más reciente al más antiguo
app.get('/api/recursos', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los recursos
  const [recursos] = await db.execute<RecursoRow[]>(
    'SELECT id, titulo, descripcion, tipo, archivo_url, fecha_creacion FROM recursos ORDER BY fecha_creacion DESC'
  );
  // Devuelve la lista de recursos
  res.json(recursos);
}));

// Crea un nuevo recurso (requiere token y puede incluir un archivo)
app.post('/api/recursos', verificarToken, upload.single('archivo'), asyncHandler(async (req, res) => {
  // Si se subió un archivo
  if (req.file) {
    // Guarda la URL del archivo en el cuerpo de la petición
    req.body.archivo_url = `/uploads/${req.file.filename}`;
  }
  // Valida los datos del recurso
  const recurso = validateRecurso(req.body);
  // Inserta el recurso en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO recursos (titulo, descripcion, tipo, archivo_url) VALUES (?, ?, ?, ?)',
    [recurso.titulo, recurso.descripcion, recurso.tipo, recurso.archivo_url]
  );
  // Responde con el id del nuevo recurso y sus datos
  res.status(201).json({ id: result.insertId, ...recurso });
}));

// Actualiza un recurso existente (requiere token y puede incluir un archivo)
app.put('/api/recursos/:id', verificarToken, upload.single('archivo'), asyncHandler(async (req, res) => {
  // Valida el id del recurso de la URL
  const id = requireId(req.params.id);
  // Si se subió un archivo
  if (req.file) {
    // Guarda la URL del archivo en el cuerpo de la petición
    req.body.archivo_url = `/uploads/${req.file.filename}`;
  }
  // Valida los datos del recurso
  const recurso = validateRecurso(req.body);
  // Actualiza el recurso en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE recursos SET titulo = ?, descripcion = ?, tipo = ?, archivo_url = ? WHERE id = ?',
    [recurso.titulo, recurso.descripcion, recurso.tipo, recurso.archivo_url, id]
  );
  // Lanza un error 404 si el recurso no existe
  await requireAffected(result, 'Recurso');
  // Responde con el recurso actualizado
  res.json({ id, ...recurso });
}));

// Elimina un recurso por su id (requiere token)
app.delete('/api/recursos/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del recurso de la URL
  const id = requireId(req.params.id);
  // Elimina el recurso de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM recursos WHERE id = ?', [id]);
  // Lanza un error 404 si el recurso no existe
  await requireAffected(result, 'Recurso');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// ── SLIDES ──────────────────────────────────────────────────────
// Separador visual que marca el inicio de las rutas de slides

// Obtiene todos los slides ordenados por su orden de aparición
app.get('/api/slides', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los slides
  const [slides] = await db.execute<SlideRow[]>(
    'SELECT id, titulo, subtitulo, imagen_url, btn_principal, btn_secundario, orden, activo FROM slides ORDER BY orden ASC'
  );
  // Devuelve la lista de slides
  res.json(slides);
}));

// Crea un nuevo slide (requiere token y puede incluir una imagen)
app.post('/api/slides', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida los datos del slide
  const slide = validateSlide(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    slide.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Inserta el slide en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO slides (titulo, subtitulo, imagen_url, btn_principal, btn_secundario, orden, activo) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [slide.titulo, slide.subtitulo, slide.imagen_url, slide.btn_principal, slide.btn_secundario, slide.orden, slide.activo]
  );
  // Responde con el id del nuevo slide y sus datos
  res.status(201).json({ id: result.insertId, ...slide });
}));

// Actualiza un slide existente (requiere token y puede incluir una imagen)
app.put('/api/slides/:id', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida el id del slide de la URL
  const id = requireId(req.params.id);
  // Valida los datos del slide
  const slide = validateSlide(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    slide.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Actualiza el slide en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE slides SET titulo = ?, subtitulo = ?, imagen_url = ?, btn_principal = ?, btn_secundario = ?, orden = ?, activo = ? WHERE id = ?',
    [slide.titulo, slide.subtitulo, slide.imagen_url, slide.btn_principal, slide.btn_secundario, slide.orden, slide.activo, id]
  );
  // Lanza un error 404 si el slide no existe
  await requireAffected(result, 'Slide');
  // Responde con el slide actualizado
  res.json({ id, ...slide });
}));

// Elimina un slide por su id (requiere token)
app.delete('/api/slides/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del slide de la URL
  const id = requireId(req.params.id);
  // Elimina el slide de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM slides WHERE id = ?', [id]);
  // Lanza un error 404 si el slide no existe
  await requireAffected(result, 'Slide');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// ── HORARIOS ────────────────────────────────────────────────────
// Separador visual que marca el inicio de las rutas de horarios

// Obtiene todos los horarios ordenados por id
app.get('/api/horarios', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista los horarios
  const [horarios] = await db.execute<HorarioRow[]>(
    'SELECT id, dia, hora, actividad FROM horarios ORDER BY id ASC'
  );
  // Devuelve la lista de horarios
  res.json(horarios);
}));

// Crea un nuevo horario (requiere token)
app.post('/api/horarios', verificarToken, asyncHandler(async (req, res) => {
  // Valida los datos del horario
  const horario = validateHorario(req.body);
  // Inserta el horario en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO horarios (dia, hora, actividad) VALUES (?, ?, ?)',
    [horario.dia, horario.hora, horario.actividad]
  );
  // Responde con el id del nuevo horario y sus datos
  res.status(201).json({ id: result.insertId, ...horario });
}));

// Actualiza un horario existente (requiere token)
app.put('/api/horarios/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del horario de la URL
  const id = requireId(req.params.id);
  // Valida los datos del horario
  const horario = validateHorario(req.body);
  // Actualiza el horario en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE horarios SET dia = ?, hora = ?, actividad = ? WHERE id = ?',
    [horario.dia, horario.hora, horario.actividad, id]
  );
  // Lanza un error 404 si el horario no existe
  await requireAffected(result, 'Horario');
  // Responde con el horario actualizado
  res.json({ id, ...horario });
}));

// Elimina un horario por su id (requiere token)
app.delete('/api/horarios/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id del horario de la URL
  const id = requireId(req.params.id);
  // Elimina el horario de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM horarios WHERE id = ?', [id]);
  // Lanza un error 404 si el horario no existe
  await requireAffected(result, 'Horario');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// ── GALERÍA ─────────────────────────────────────────────────────
// Separador visual que marca el inicio de las rutas de galería

// Obtiene todas las imágenes de la galería ordenadas por su orden de aparición
app.get('/api/galeria', asyncHandler(async (_req, res) => {
  // Ejecuta la consulta SQL que lista las imágenes de la galería
  const [galeria] = await db.execute<GaleriaRow[]>(
    'SELECT id, titulo, imagen_url, destacada, orden FROM galeria ORDER BY orden ASC'
  );
  // Devuelve la lista de imágenes
  res.json(galeria);
}));

// Crea una nueva imagen en la galería (requiere token y puede incluir una imagen)
app.post('/api/galeria', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida los datos de la imagen
  const item = validateGaleria(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    item.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Inserta la imagen en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'INSERT INTO galeria (titulo, imagen_url, destacada, orden) VALUES (?, ?, ?, ?)',
    [item.titulo, item.imagen_url, item.destacada, item.orden]
  );
  // Responde con el id de la nueva imagen y sus datos
  res.status(201).json({ id: result.insertId, ...item });
}));

// Actualiza una imagen de la galería (requiere token y puede incluir una imagen)
app.put('/api/galeria/:id', verificarToken, upload.single('imagen'), asyncHandler(async (req, res) => {
  // Valida el id de la imagen de la URL
  const id = requireId(req.params.id);
  // Valida los datos de la imagen
  const item = validateGaleria(req.body);
  // Si se subió un archivo de imagen
  if (req.file) {
    // Guarda la URL del archivo subido
    item.imagen_url = `/uploads/${req.file.filename}`;
  }
  // Actualiza la imagen en la base de datos
  const [result] = await db.execute<ResultSetHeader>(
    'UPDATE galeria SET titulo = ?, imagen_url = ?, destacada = ?, orden = ? WHERE id = ?',
    [item.titulo, item.imagen_url, item.destacada, item.orden, id]
  );
  // Lanza un error 404 si la imagen no existe
  await requireAffected(result, 'Imagen de galería');
  // Responde con la imagen actualizada
  res.json({ id, ...item });
}));

// Elimina una imagen de la galería por su id (requiere token)
app.delete('/api/galeria/:id', verificarToken, asyncHandler(async (req, res) => {
  // Valida el id de la imagen de la URL
  const id = requireId(req.params.id);
  // Elimina la imagen de la base de datos
  const [result] = await db.execute<ResultSetHeader>('DELETE FROM galeria WHERE id = ?', [id]);
  // Lanza un error 404 si la imagen no existe
  await requireAffected(result, 'Imagen de galería');
  // Responde sin contenido (eliminado con éxito)
  res.status(204).send();
}));

// Manejador para rutas no encontradas: responde con error 404
app.use((_req, _res, next) => next(createHttpError(404, 'Ruta no encontrada.')));

// Manejador global de errores: responde con el código y mensaje adecuados
app.use((error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  // Usa el estado del error o 500 por defecto
  const status = error.status ?? 500;
  // Registra en consola los errores internos (código 500 o superior)
  if (status >= 500) console.error(error);
  // Responde con el error sin revelar detalles internos
  res.status(status).json({ error: status >= 500 ? 'Ocurrió un error interno.' : error.message });
});

// Función de arranque del servidor: verifica la base de datos y comienza a escuchar
async function start(): Promise<void> {
  // Obtiene una conexión del pool para comprobar que la base de datos responde
  const connection = await db.getConnection();
  // Libera la conexión tras comprobar que funciona
  connection.release();

  // Pone el servidor a escuchar en el puerto configurado
  app.listen(config.port, () => {
    // Muestra la URL donde está corriendo el servidor
    console.log(`Servidor Backend corriendo en http://localhost:${config.port}`);
  });
}

// Arranca el servidor y registra el error si no puede conectarse a la base de datos
void start().catch((error: unknown) => {
  // Muestra el error de conexión en consola
  console.error('No se pudo conectar a la base de datos:', error);
  // Marca la salida del proceso con código de error
  process.exitCode = 1;
});
