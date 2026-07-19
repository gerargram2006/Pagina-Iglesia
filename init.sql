-- =============================================================================
-- Archivo init.sql - Inicialización de la base de datos iglesia_db
-- =============================================================================
-- Este archivo se ejecuta AUTOMÁTICAMENTE cuando se crea el contenedor Docker
-- de MySQL por primera vez (via docker-compose up -d).
--
-- Contenido:
--   1. Creación de la base de datos iglesia_db (si no existe)
--   2. Creación de 5 tablas: usuarios, eventos, pastores, horarios, mensajes_contacto
--   3. Inserción de datos de prueba para desarrollo
--
-- Uso manual (si Docker ya está corriendo):
--   mysql -u root -p < init.sql
--
-- NOTA: Este archivo solo se ejecuta la primera vez que se crea el contenedor.
--       Para re-ejecutarlo, eliminar el volumen mysql_data primero:
--         docker-compose down -v && docker-compose up -d
-- =============================================================================

-- 1. Crear y usar la base de datos
-- CREATE DATABASE IF NOT EXISTS evita errores si la BD ya existe
CREATE DATABASE IF NOT EXISTS iglesia_db;
-- Selecciona la base de datos para que las siguientes operaciones se ejecuten sobre ella
USE iglesia_db;

-- =============================================================================
-- 2. Definición de tablas
-- =============================================================================

-- Tabla usuarios: Almacena las cuentas de administración del panel
-- Cada usuario tiene email único, contraseña hasheada con bcrypt, nombre y rol
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único autoincremental (clave primaria)
    email VARCHAR(100) UNIQUE NOT NULL, -- Email único (no puede haber duplicados)
    password VARCHAR(255) NOT NULL,     -- Contraseña hasheada con bcrypt (máx 255 chars)
    nombre VARCHAR(100) NOT NULL,       -- Nombre completo del usuario
    rol VARCHAR(50) DEFAULT 'admin'     -- Rol del usuario (admin, superadmin, etc.)
);

-- Tabla eventos: Almacena los eventos y actividades de la iglesia
-- Los eventos se muestran en la página /eventos y en el panel admin
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único autoincremental
    titulo VARCHAR(150) NOT NULL,       -- Título del evento (máx 150 caracteres)
    descripcion TEXT,                   -- Descripción detallada (texto largo, sin límite)
    fecha DATETIME NOT NULL,            -- Fecha y hora del evento (ej: '2026-07-19 10:00:00')
    lugar VARCHAR(150) DEFAULT 'Auditorio Principal',  -- Ubicación del evento
    imagen_url VARCHAR(255)             -- URL de la imagen del evento (opcional)
);

-- Tabla pastores: Almacena la información del equipo pastoral
-- Los pastores se muestran en la página /pastores y en el panel admin
CREATE TABLE pastores (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único autoincremental
    nombre VARCHAR(100) NOT NULL,       -- Nombre completo del pastor/líder
    cargo VARCHAR(100) NOT NULL,        -- Cargo o rol ministerial (ej: "Pastor Principal")
    biografia TEXT,                     -- Biografía breve del pastor (texto largo)
    foto_url VARCHAR(255)               -- URL de la foto del pastor (opcional)
);

-- Tabla horarios: Almacena los horarios de las reuniones semanales
-- Los horarios se muestran en la página /horarios
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único autoincremental
    dia VARCHAR(20) NOT NULL,           -- Día de la semana (ej: "Domingo", "Miércoles")
    hora TIME NOT NULL,                 -- Hora de la reunión (ej: '10:00:00')
    actividad VARCHAR(100) NOT NULL     -- Nombre de la actividad (ej: "Culto General")
);

-- Tabla mensajes_contacto: Almacena los mensajes enviados desde el formulario público
-- Los mensajes se muestran en la bandeja de entrada del panel admin
CREATE TABLE mensajes_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,  -- ID único autoincremental
    nombre VARCHAR(100) NOT NULL,       -- Nombre del remitente
    email VARCHAR(100) NOT NULL,        -- Email del remitente
    mensaje TEXT NOT NULL,              -- Contenido del mensaje (texto largo)
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Fecha/hora automática del envío
);

-- =============================================================================
-- 3. Datos de prueba (INSERTs)
-- Estos datos se insertan solo la primera vez que se crea la BD
-- =============================================================================

-- Usuario administrador de prueba
-- La contraseña '123456' está hasheada con bcrypt (10 salt rounds)
-- Hash generado con: cd backend && node generarClave.js
INSERT INTO usuarios (email, password, nombre, rol) 
VALUES ('admin@iglesia.com', '$2b$10$3qESVBrZtLVwFzDQHEcBxOsoO5KNSOH/jPxJHxWIJncPp28Ns5rpS', 'Gerar Admin', 'admin');

-- Eventos de prueba (se muestran en /eventos y en el panel admin)
INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) 
VALUES 
('Servicio Dominical', 'Acompáñanos a nuestro tiempo de alabanza y palabra.', '2026-07-19 10:00:00', 'Auditorio Principal', 'https://via.placeholder.com/800x450'),
('Noche de Jóvenes', 'Un espacio diseñado para la juventud.', '2026-07-25 19:30:00', 'Salón Múltiple', 'https://via.placeholder.com/800x450');

-- Pastores de prueba (se muestran en /pastores y en el panel admin)
INSERT INTO pastores (nombre, cargo, biografia, foto_url)
VALUES 
('Pastor Juan Pérez', 'Pastor Principal', 'Con más de 20 años de ministerio sirviendo a la comunidad.', 'https://via.placeholder.com/800x800'),
('Líder María Gómez', 'Directora de Alabanza', 'Apasionada por llevar a la iglesia a la adoración.', 'https://via.placeholder.com/800x800');

-- Horarios de prueba (se muestran en /horarios)
INSERT INTO horarios (dia, hora, actividad)
VALUES 
('Domingo', '10:00:00', 'Culto General'),
('Miércoles', '19:00:00', 'Estudio Bíblico'),
('Sábado', '18:00:00', 'Reunión de Jóvenes');
