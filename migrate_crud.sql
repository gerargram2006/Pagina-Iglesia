-- =============================================================================
-- Migración: Tablas para CRUD autoeficiente
-- Ejecutar manualmente: mysql -u root -p iglesia_db < migrate_crud.sql
-- =============================================================================

USE iglesia_db;

-- Tabla slides: Contenido del Hero Slider principal
CREATE TABLE IF NOT EXISTS slides (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    subtitulo TEXT,
    imagen_url VARCHAR(255) NOT NULL,
    btn_principal VARCHAR(100) DEFAULT '',
    btn_secundario VARCHAR(100) DEFAULT '',
    orden INT DEFAULT 0,
    activo TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla galeria: Fotos de la galería de la comunidad
CREATE TABLE IF NOT EXISTS galeria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    destacada TINYINT(1) DEFAULT 0,
    orden INT DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =============================================================================
-- Datos iniciales (equivalentes al contenido actual hardcodeado)
-- =============================================================================

-- Slides del Hero (migrados desde HeroSlider.tsx)
INSERT INTO slides (titulo, subtitulo, imagen_url, btn_principal, btn_secundario, orden, activo) VALUES
('Bienvenido a \nAsamblea de Dios', 'Descubre el propósito que Dios tiene para tu vida. Un lugar para crecer, servir y amar en comunidad.', '/img/galeria-congregacion.webp', 'Conéctate', 'Saber más', 1, 1),
('Noche de \nJóvenes', 'Únete a nosotros este sábado para un tiempo de adoración, juegos y palabra diseñada para ti.', '/img/galeria-jovenes.webp', 'Ver Horarios', 'Ver Galería', 2, 1),
('Siguiente Paso: \nBautizos', 'Inscríbete para nuestra próxima ceremonia de bautizos en agua y declara tu fe públicamente.', '/img/galeria-bautizos.webp', 'Inscribirme', '¿Qué es el bautizo?', 3, 1),
('Ministerio \nInfantil', 'Un espacio seguro y divertido donde tus hijos aprenderán sobre el amor de Jesús.', '/img/galeria-infantil.webp', 'Conocer más', 'Horarios', 4, 1);

-- Galería (migrada desde GallerySection.tsx)
INSERT INTO galeria (titulo, imagen_url, destacada, orden) VALUES
('Alabanza y Adoración', '/img/galeria-congregacion.webp', 1, 1),
('Grupos de Jóvenes', '/img/galeria-jovenes.webp', 0, 2),
('Ministerio Infantil', '/img/galeria-infantil.webp', 0, 3),
('Ministerio de Mujeres', '/img/galeria-mujeres.webp', 0, 4),
('Bautizos', '/img/galeria-bautizos.webp', 0, 5),
('Eventos Especiales', '/img/galeria-congregacion.webp', 1, 6);
