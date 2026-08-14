// Importa multer para manejar la subida de archivos
import multer from 'multer';
// Importa el módulo path para construir rutas de archivos
import path from 'path';
// Importa el módulo fs para comprobar y crear directorios
import fs from 'fs';

// Asegurarnos de que el directorio uploads exista
// Define la ruta de la carpeta de subidas
const uploadDir = path.join(__dirname, '..', 'uploads');
// Si la carpeta de subidas no existe
if (!fs.existsSync(uploadDir)) {
  // Crea la carpeta de subidas (junto con las carpetas necesarias)
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configura el almacenamiento de los archivos subidos en el disco
const storage = multer.diskStorage({
  // Define la carpeta de destino para los archivos subidos
  destination: (_req, _file, cb) => {
    // Indica a multer que guarde el archivo en la carpeta de subidas
    cb(null, uploadDir);
  },
  // Define el nombre que tendrá el archivo guardado
  filename: (_req, file, cb) => {
    // Crea un sufijo único con la fecha y un número aleatorio para evitar colisiones
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // Genera el nombre final con el campo del archivo, el sufijo y la extensión original
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Configura y exporta el middleware de subida de multer
export const upload = multer({
  // Usa el almacenamiento configurado en el disco
  storage: storage,
  // Define los límites de la subida
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  // Filtro para aceptar solo ciertos tipos de archivos
  fileFilter: (_req, file, cb) => {
    // Si el archivo es una imagen o un PDF
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      // Acepta el archivo
      cb(null, true);
    } else {
      // Rechaza el archivo con un error
      cb(new Error('Solo se permiten imágenes o archivos PDF.'));
    }
  }
});
