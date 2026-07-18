-- 1. Crear y usar la base de datos
CREATE DATABASE IF NOT EXISTS iglesia_db;
USE iglesia_db;

-- 2. Tablas
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol VARCHAR(50) DEFAULT 'admin'
);

CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT,
    fecha DATETIME NOT NULL,
    lugar VARCHAR(150) DEFAULT 'Auditorio Principal',
    imagen_url VARCHAR(255)
);

CREATE TABLE pastores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    biografia TEXT,
    foto_url VARCHAR(255)
);

CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia VARCHAR(20) NOT NULL,
    hora TIME NOT NULL,
    actividad VARCHAR(100) NOT NULL
);

CREATE TABLE mensajes_contacto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    mensaje TEXT NOT NULL,
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Los "Intos" (Datos de prueba)
INSERT INTO usuarios (email, password, nombre, rol) 
VALUES ('admin@iglesia.com', '$2b$10$3qESVBrZtLVwFzDQHEcBxOsoO5KNSOH/jPxJHxWIJncPp28Ns5rpS', 'Gerar Admin', 'admin');

INSERT INTO eventos (titulo, descripcion, fecha, lugar, imagen_url) 
VALUES 
('Servicio Dominical', 'Acompáñanos a nuestro tiempo de alabanza y palabra.', '2026-07-19 10:00:00', 'Auditorio Principal', 'https://via.placeholder.com/800x450'),
('Noche de Jóvenes', 'Un espacio diseñado para la juventud.', '2026-07-25 19:30:00', 'Salón Múltiple', 'https://via.placeholder.com/800x450');

INSERT INTO pastores (nombre, cargo, biografia, foto_url)
VALUES 
('Pastor Juan Pérez', 'Pastor Principal', 'Con más de 20 años de ministerio sirviendo a la comunidad.', 'https://via.placeholder.com/800x800'),
('Líder María Gómez', 'Directora de Alabanza', 'Apasionada por llevar a la iglesia a la adoración.', 'https://via.placeholder.com/800x800');

INSERT INTO horarios (dia, hora, actividad)
VALUES 
('Domingo', '10:00:00', 'Culto General'),
('Miércoles', '19:00:00', 'Estudio Bíblico'),
('Sábado', '18:00:00', 'Reunión de Jóvenes');