```text
 █████╗ ███████╗ █████╗ ███╗   ███╗██████╗ ██╗     ███████╗ █████╗ 
██╔══██╗██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██╔════╝██╔══██╗
███████║███████╗███████║██╔████╔██║██████╔╝██║     █████╗  ███████║
██╔══██║╚════██║██╔══██║██║╚██╔╝██║██╔══██╗██║     ██╔══╝  ██╔══██║
██║  ██║███████║██║  ██║██║ ╚═╝ ██║██████╔╝███████╗███████╗██║  ██║
╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝
                                                                   
██████╗ ███████╗    ██████╗ ██╗ ██████╗ ███████╗                   
██╔══██╗██╔════╝    ██╔══██╗██║██╔═══██╗██╔════╝                   
██║  ██║█████╗      ██║  ██║██║██║   ██║███████╗                   
██║  ██║██╔══╝      ██║  ██║██║██║   ██║╚════██║                   
██████╔╝███████╗    ██████╔╝██║╚██████╔╝███████║                   
╚═════╝ ╚══════╝    ╚═════╝ ╚═╝ ╚═════╝ ╚══════╝                   
```

# Iglesia Asamblea de Dios - Sitio Web

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institucional-green?style=flat-square)

**Sitio web institucional de la Iglesia Asamblea de Dios**

Una plataforma completa con panel de administración, gestión de eventos y anuncios,
equipo pastoral, recursos descargables y sistema de autenticación JWT.

</div>

---

[English](README.md) | [Español](README.es.md) | [Português](README.pt.md)

---
## 🎨 Prototipo de Diseño

El diseño visual, la estructura y la experiencia de usuario (UX/UI) fueron planificados y aprobados utilizando un prototipo inicial.

<div align="center">
  <img src="docs/PrototipoAD.png" alt="Prototipo del Website" width="800" />
</div>

## Tabla de Contenidos

- [Acerca de](#acerca-de)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Inicio Rápido](#inicio-rápido)
- [Scripts Disponibles](#scripts-disponibles)
- [Rutas](#rutas)
- [Autenticación](#autenticación)
- [Referencia de la API](#referencia-de-la-api)
- [Base de Datos](#base-de-datos)
- [Animaciones de Scroll](#animaciones-de-scroll)
- [Configuración](#configuración)
- [Solución de Problemas](#solución-de-problemas)
- [Roadmap](#roadmap)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Acerca de

Este es el sitio web oficial de la **Iglesia Asamblea de Dios**, diseñado para
compartir información sobre horarios de culto, eventos, pastores, historia de la
iglesia y datos de contacto. Incluye un panel de administración completo con
autenticación segura JWT.

### ¿Por qué este proyecto?

- **Frontend Moderno**: React 19 + Vite 8 + TypeScript con JSX y Fast Refresh
- **Backend Robusto**: Node.js + Express 5 + TypeScript con autenticación JWT
- **Base de Datos**: MySQL 8.0 ejecutándose en Docker
- **Diseño Premium**: Glassmorphism, animaciones de scroll y completamente responsivo
- **CRUD Completo**: Gestión de eventos, anuncios, pastores, recursos y mensajes desde el panel admin

---

## Características

### Páginas Públicas

| Página | Ruta | Descripción |
|--------|------|-------------|
| **Inicio** | `/` | Hero carrusel a pantalla completa (Swiper con 3 diapositivas: bienvenida, noche de jóvenes, bautizos) con botones CTA, animaciones de scroll y layout de una columna |
| **Horarios** | `/horarios` | Tarjetas dinámicas con iconos para domingos, miércoles y sábados |
| **Quiénes Somos** | `/quienes-somos` | Layout de 2 columnas con imagen, historia, valores y métricas |
| **Galería** | `/quienes-somos` | Bento grid con 6 espacios para fotos de la congregación |
| **Pastores** | `/pastores` | Perfiles del equipo pastoral con fotos reales y anillos decorativos |
| **Eventos** | `/eventos` | Carrusel interactivo de eventos con tarjetas (Swiper), más lista cronológica en `/eventos` |
| **Anexos** | `/anexos` | Sedes de la iglesia con info del pastor, dirección, horario y contacto |
| **Redes Sociales** | `/redes` | Tarjetas con enlaces a los perfiles sociales oficiales (Facebook, Instagram, YouTube, TikTok) |
| **CTA** | `/` (sección) | Banner motivacional a pantalla completa con partículas decorativas |
| **Contacto** | `/contacto` | Formulario de contacto y datos de la congregación |

### Panel de Administración

| Funcionalidad | Descripción |
|---------------|-------------|
| **Login Seguro** | Formulario con email/contraseña, toggle de visibilidad, "Recordar correo" y protección JWT |
| **Dashboard Premium** | Banner interactivo, saludo dinámico, reloj en tiempo real y tarjetas glassmorphism |
| **Estadísticas** | Métricas dinámicas conectadas a la BD: total de miembros, eventos y mensajes |
| **Gestor de Eventos** | CRUD completo: listado en tabla, modal de creación/edición, eliminación y subida de imagen |
| **Gestor de Anuncios** | CRUD completo: publicar anuncios para la congregación con subida de imagen |
| **Equipo Pastoral** | CRUD completo: gestión de líderes (nombres, cargos, biografías) con subida de foto |
| **Gestor de Recursos** | CRUD completo: materiales descargables (PDFs) con subida de archivo |
| **Bandeja de Mensajes** | Lectura y eliminación de mensajes recibidos desde el formulario público |
| **Logout** | Cierre de sesión con limpieza completa de token JWT |

### Generales

- **Diseño Responsivo**: Compatible con móviles, tablets y escritorio (3 breakpoints: 991px, 767px, 575px)
- **SPA Fluida**: Enrutamiento sin recargas de página con React Router
- **UI Premium**: Glassmorphism en NavBar, hamburger custom y efectos hover/shimmer
- **Animaciones de Scroll**: Elementos en cascada al hacer scroll con IntersectionObserver
- **Footer Persistente**: Versículo destacado, redes sociales y horarios en rutas públicas
- **Paleta de Colores**: Verde bosque + dorado eclesiástico con CSS custom properties
- **Accesibilidad**: aria-labels, focus-visible, HTML semántico, contraste WCAG

---

## Tecnologías

### Frontend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [React](https://react.dev/) | ^19.2.7 | Biblioteca para interfaces de usuario |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Verificación estática de tipos |
| [Vite](https://vite.dev/) | ^8.1.1 | Servidor de desarrollo y bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Enrutamiento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS (grid, utilidades) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Librería de iconos |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.19 | Framework CSS utilitario (paleta personalizada) |
| [Swiper](https://swiperjs.com/) | ^14.0.6 | Librería de sliders/carruseles táctiles |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrápido |

### Backend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime de JavaScript |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Verificación estática de tipos |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | Driver de MySQL |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Hashing seguro de contraseñas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | Generación y verificación de JWT |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
| [multer](https://www.npmjs.com/package/multer) | ^2.2.0 | Manejo de subida de archivos (imágenes + PDFs) |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Variables de entorno desde .env |

### Base de Datos

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [MySQL](https://www.mysql.com/) | 8.0 | Base de datos relacional (vía Docker) |
| [Docker Compose](https://docs.docker.com/compose/) | - | Orquestación de contenedores |

---

## Arquitectura

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (Vite)                │
│  React 19 + TypeScript + React Router 7         │
│  + Bootstrap 5 + Tailwind · Puerto: 5173        │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐ │
│  │   Pages    │  │Components │  │   Context   │ │
│  │ Home       │  │ NavBar    │  │ AuthContext  │ │
│  │ Login      │  │ Footer    │  │  (user,     │ │
│  │ Admin      │  │ Layout    │  │   token,    │ │
│  │ Horarios   │  │ PageHeader│  │   login,    │ │
│  │ Eventos... │  │ 14 total  │  │   logout)   │ │
│  └───────────┘  └───────────┘  └─────────────┘ │
│                      │                          │
│              Vite Proxy (/api → 3307)           │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               BACKEND (Express)                 │
│  Node.js + Express 5                            │
│  Puerto: 3307                                   │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  POST /api/auth/login                    │   │
│  │  CRUD /api/eventos  (subida de imagen)   │   │
│  │  CRUD /api/pastores  (subida de foto)    │   │
│  │  CRUD /api/anuncios  (subida de imagen)  │   │
│  │  CRUD /api/recursos  (subida de PDF)     │   │
│  │  GET,DELETE /api/mensajes                │   │
│  │  GET /api/health · /uploads (estático)   │   │
│  └──────────────────────────────────────────┘   │
│                      │                          │
│              MySQL2 Driver                      │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               DATABASE (MySQL 8.0)              │
│  Contenedor Docker - Puerto Host 33007 → 3306   │
│  Base de datos: iglesia_db                      │
│                                                 │
│  ┌──────────┐ ┌────────┐ ┌──────────┐          │
│  │ usuarios │ │eventos │ │ pastores │          │
│  ├──────────┤ ├────────┤ ├──────────┤          │
│  │ anuncios │ │recursos│ │ mensajes │          │
│  │ horarios │ └────────┘ └──────────┘          │
│  └──────────┘                                  │
└─────────────────────────────────────────────────┘
```

---

## Estructura del Proyecto

```
Pagina-Iglesia/
├── public/                    # Archivos estáticos servidos por Vite
│   └── img/                   # Imágenes públicas (logo, galería, pastores, hero)
├── src/                       # Código fuente del frontend React
│   ├── api/                   # Cliente HTTP centralizado
│   │   └── index.ts           # Función fetchAPI con inyección automática de JWT + soporte FormData
│   ├── components/            # 14 componentes reutilizables
│   │   ├── Layout.tsx         # Layout principal con Outlet y Footer
│   │   ├── NavBar.tsx         # Barra de navegación responsiva con Glassmorphism
│   │   ├── Footer.tsx         # Pie de página con enlaces, versículo y redes sociales
│   │   ├── PageHeader.tsx     # Encabezado de páginas internas (estilo hero)
│   │   ├── HeroSlider.tsx     # Hero carrusel a pantalla completa (Swiper, 3 diapositivas)
│   │   ├── Hero.tsx           # Hero de una sola diapositiva (respaldo)
│   │   ├── ScheduleSection.tsx# Tarjetas de horarios de culto con iconos
│   │   ├── AboutSection.tsx   # Sección "Quiénes Somos" (2 columnas + métricas)
│   │   ├── GallerySection.tsx # Galería de fotos (Bento grid de 6 espacios)
│   │   ├── PastorsSection.tsx # Tarjetas de pastores/líderes (foto real)
│   │   ├── EventsSection.tsx  # Lista de próximos eventos (con thumbnails)
│   │   ├── EventosSlider.tsx  # Carrusel interactivo de eventos (Swiper, responsive, autoplay)
│   │   ├── CTASection.tsx     # Sección "Llamado a la acción" con partículas
│   │   └── ContactSection.tsx # Info de contacto + formulario
│   ├── context/
│   │   └── AuthContext.tsx    # Proveedor de autenticación (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.ts # Hook de animaciones scroll (IntersectionObserver)
│   ├── pages/                 # Páginas y rutas de la aplicación
│   │   ├── admin/             # Componentes de gestión CRUD (Panel Admin)
│   │   │   ├── AdminEventos.tsx
│   │   │   ├── AdminPastores.tsx
│   │   │   ├── AdminMensajes.tsx
│   │   │   ├── AdminAnuncios.tsx
│   │   │   └── AdminRecursos.tsx
│   │   ├── Home.tsx           # Página principal (hero slider + secciones)
│   │   ├── Horarios.tsx       # Página de horarios
│   │   ├── QuienesSomos.tsx   # Página "Quiénes Somos"
│   │   ├── Pastores.tsx       # Página de pastores
│   │   ├── Eventos.tsx        # Página de eventos
│   │   ├── Anexos.tsx         # Página de anexos/sedes con info de cada iglesia
│   │   ├── RedesSociales.tsx  # Página de enlaces a redes sociales
│   │   ├── Contacto.tsx       # Página de contacto
│   │   ├── Login.tsx          # Formulario de inicio de sesión
│   │   └── Admin.tsx          # Panel de administración protegido (sidebar + 5 módulos)
│   ├── styles/
│   │   └── styles.css         # Estilos globales (directivas Bootstrap + Tailwind, ~4600 líneas)
│   ├── App.tsx                # Definición de rutas (Router + Auth + ProtectedRoute)
│   └── main.tsx               # Punto de entrada de la app
├── backend/                   # Código fuente del servidor Express
│   ├── server.ts              # Servidor Express con todos los endpoints API
│   ├── config.ts              # Configuración basada en env (puerto, JWT, BD, CORS)
│   ├── generarClave.ts        # Utilidad para generar hashes bcrypt
│   ├── reseteo.ts             # Utilidad para resetear contraseña del admin
│   ├── middleware/
│   │   ├── auth.ts            # Middleware de verificación JWT
│   │   └── upload.ts          # Configuración de Multer (imágenes + PDFs, límite 5MB)
│   ├── uploads/               # Archivos subidos servidos en /uploads (gitignored)
│   └── package.json           # Dependencias del backend
├── index.html                 # HTML de entrada para Vite
├── vite.config.ts             # Configuración de Vite (proxy API → 3307, plugin React)
├── tsconfig.json              # Configuración de TypeScript (frontend)
├── postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── tailwind.config.js         # Tema personalizado de Tailwind (paleta, fuentes, sombras)
├── docker-compose.yml         # Configuración de MySQL en Docker (puerto 33007)
├── init.sql                   # Schema de la base de datos + datos de ejemplo (se ejecuta automáticamente)
├── .env                       # Variables de entorno (NO versionar)
├── example.env                # Plantilla con placeholders + CORS_ORIGIN
├── .gitignore                 # Archivos ignorados por Git
├── .oxlintrc.json             # Configuración de OxLint
├── .prettierrc                # Configuración de Prettier
├── .editorconfig              # Configuración del editor
└── README.md                  # Archivo de documentación principal
```

---

## Inicio Rápido

### Requisitos Previos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Docker](https://www.docker.com/) (para MySQL)

### Instalación

```bash
# 1. Clonar el repositorio
git clone <url-del-repositorio>
cd Pagina-Iglesia

# 2. Instalar dependencias del frontend
npm install

# 3. Instalar dependencias del backend
cd backend && npm install && cd ..

# 4. Configurar variables de entorno
cp example.env .env
# Edita .env con tus credenciales de MySQL y un JWT_SECRET seguro

# 5. Levantar MySQL en Docker (init.sql se ejecuta automáticamente la primera vez)
docker-compose up -d

# 6. Iniciar el backend (Terminal 1)
cd backend && npm start

# 7. Iniciar el frontend (Terminal 2)
npm run dev
```

> **Nota:** `init.sql` se monta en el directorio `/docker-entrypoint-initdb.d/` del contenedor, por lo que se ejecuta automáticamente la primera vez que se crea el contenedor. Para una importación manual posterior, usa `mysql -h 127.0.0.1 -P 33007 -u root -p < init.sql`.

### Abrir en el Navegador

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3307](http://localhost:3307)
- **Panel Admin**: [http://localhost:5173/admin](http://localhost:5173/admin)

### Credenciales de Prueba

| Campo | Valor |
|-------|-------|
| Email | `admin@iglesia.com` |
| Contraseña | `123456` |
| Rol | `admin` |

---

## Scripts Disponibles

### Frontend (`package.json` raíz)

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR (puerto 5173) |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta el linter (OxLint) |

### Backend (`backend/package.json`)

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor Express en puerto 3307 |
| `npm run dev` | Inicia el servidor Express con hot-reload (tsx watch) |
| `npx tsx generarClave.ts` | Genera un hash bcrypt para una contraseña |
| `npx tsx reseteo.ts` | Resetea la contraseña del admin a '123456' |

---

## Rutas

### Rutas Públicas

| Ruta | Página | Descripción |
|------|--------|-------------|
| `/` | Inicio | Página principal con hero y secciones |
| `/horarios` | Horarios | Horarios de culto (domingo, miércoles, sábado) |
| `/quienes-somos` | Quiénes Somos | Historia, misión y valores de la iglesia |
| `/pastores` | Pastores | Equipo pastoral con perfiles |
| `/eventos` | Eventos | Próximos eventos y actividades |
| `/anexos` | Anexos | Sedes de la iglesia con información y recursos |
| `/redes` | Redes Sociales | Enlaces a los perfiles sociales oficiales |
| `/contacto` | Contacto | Formulario de contacto y datos |

### Rutas Protegidas

| Ruta | Página | Requisito |
|------|--------|-----------|
| `/admin` | Panel Admin | Sesión activa (JWT válido) |
| `/login` | Login | Sin sesión activa |

### Comportamiento de Rutas Protegidas

```
Usuario no autenticado → /admin  → Redirige a /login
Usuario autenticado    → /login  → Redirige a /admin
```

---

## Autenticación

### Flujo

```
1. El usuario ingresa email + contraseña en /login
           ↓
2. Frontend envía POST /api/auth/login con credenciales
           ↓
3. Backend busca usuario por email en MySQL
           ↓
4. Backend compara contraseña con bcrypt.compare()
           ↓
5. Si es válida: genera JWT (expira en 2 horas)
           ↓
6. Backend retorna { token, user: { id, name, email, rol } }
           ↓
7. Frontend guarda token + user en localStorage
           ↓
8. Frontend redirige a /admin
           ↓
9. ProtectedRoute verifica user en AuthContext
           ↓
10. ProtectedRoute renderiza el panel de control (Admin.tsx)
```

### Token JWT

| Propiedad | Valor |
|-----------|-------|
| Algoritmo | HMAC-SHA256 |
| Caducidad | 2 horas |
| Payload | `{ id, rol }` |
| Almacenamiento | localStorage del navegador |

### Funcionalidades del Login

| Función | Descripción |
|---------|-------------|
| Mostrar/Ocultar contraseña | Botón de ojo con icono dinámico y animación de escala |
| Recordar correo | Checkbox que guarda el email en localStorage |
| Validación HTML5 | Campos requeridos, email válido, mínimo 6 caracteres |
| Error shake | Animación de sacudida al fallar el login |
| Spinner | Indicador de carga circular durante el envío |
| Redirección automática | Si ya hay sesión activa, redirige a /admin |

### Seguridad

| Medida | Implementación |
|--------|----------------|
| Hash de contraseñas | bcrypt con salt rounds |
| Tokens JWT | Caducidad de 2 horas, payload mínimo |
| SQL Injection | Consultas parametrizadas (`?`) en todas las consultas |
| Frontend | Contraseña nunca se almacena en texto plano |
| Persistencia | localStorage (aceptable para apps internas) |

---

## Referencia de la API

### URL Base

```
http://localhost:3307
```

> **Tip:** En desarrollo el frontend usa un proxy de `/api/*` hacia esta dirección, así que rutas relativas como `/api/eventos` funcionan desde el navegador.

### Resumen de Endpoints

| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| `GET` | `/api/health` | No | Health check (verifica conectividad con la BD) |
| `POST` | `/api/auth/login` | No | Autentica y retorna un JWT |
| `GET` | `/api/eventos` | No | Lista todos los eventos |
| `POST` | `/api/eventos` | JWT | Crea un evento (subida de imagen opcional) |
| `PUT` | `/api/eventos/:id` | JWT | Actualiza un evento (subida de imagen opcional) |
| `DELETE` | `/api/eventos/:id` | JWT | Elimina un evento |
| `GET` | `/api/pastores` | No | Lista todos los pastores |
| `POST` | `/api/pastores` | JWT | Crea un pastor (subida de foto opcional) |
| `PUT` | `/api/pastores/:id` | JWT | Actualiza un pastor (subida de foto opcional) |
| `DELETE` | `/api/pastores/:id` | JWT | Elimina un pastor |
| `POST` | `/api/mensajes` | No | Envía un mensaje de contacto |
| `GET` | `/api/mensajes` | JWT | Lista mensajes de contacto (más recientes primero) |
| `DELETE` | `/api/mensajes/:id` | JWT | Elimina un mensaje |
| `GET` | `/api/anuncios` | No | Lista todos los anuncios |
| `POST` | `/api/anuncios` | JWT | Crea un anuncio (subida de imagen opcional) |
| `PUT` | `/api/anuncios/:id` | JWT | Actualiza un anuncio (subida de imagen opcional) |
| `DELETE` | `/api/anuncios/:id` | JWT | Elimina un anuncio |
| `GET` | `/api/recursos` | No | Lista los recursos descargables |
| `POST` | `/api/recursos` | JWT | Crea un recurso (subida de archivo obligatoria) |
| `PUT` | `/api/recursos/:id` | JWT | Actualiza un recurso (subida de archivo opcional) |
| `DELETE` | `/api/recursos/:id` | JWT | Elimina un recurso |
| `GET` | `/uploads/*` | No | Sirve archivos subidos (imágenes/PDFs) |

#### `GET /api/health`

**Respuesta exitosa (200):**

```json
{ "status": "ok" }
```

---

#### `GET /api/eventos`

Retorna todos los eventos de la iglesia.

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "titulo": "Conferencia de Jóvenes",
    "descripcion": "Evento especial para jóvenes de la iglesia",
    "fecha": "2026-07-20T10:00:00.000Z",
    "lugar": "Auditorio Principal",
    "imagen_url": "https://..."
  }
]
```

---

#### `POST /api/auth/login`

Autentica un usuario con email y contraseña.

**Cuerpo de la petición:**

```json
{
  "email": "admin@iglesia.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**

```json
{
  "message": "Bienvenido",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Gerar Admin",
    "email": "admin@iglesia.com",
    "rol": "admin"
  }
}
```

**Respuestas de error:**

| Código | Causa |
|--------|-------|
| `400` | Faltan campos email o password |
| `401` | Usuario no encontrado o contraseña incorrecta |
| `500` | Error interno del servidor |

---

#### `POST /api/eventos` (Protegido)

Crea un nuevo evento. Requiere token JWT válido.

**Cuerpo de la petición (JSON):**

```json
{
  "titulo": "Retiro de Jóvenes",
  "descripcion": "Un fin de semana de fellowship y crecimiento espiritual",
  "fecha": "2026-08-15 09:00:00",
  "lugar": "Centro de Retiros",
  "imagen_url": "https://..."
}
```

**Alternativa multipart:** envía los mismos campos como `multipart/form-data` e incluye un archivo `imagen` (máx 5 MB, solo imágenes) en lugar de `imagen_url`. El archivo se guarda en `backend/uploads/` y se sirve en `/uploads/<nombre>`.

---

#### `PUT /api/eventos/:id` (Protegido)

Actualiza un evento existente. Requiere token JWT válido.

---

#### `DELETE /api/eventos/:id` (Protegido)

Elimina un evento. Requiere token JWT válido.

---

#### `GET /api/pastores`

Retorna todos los pastores y líderes de la iglesia.

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "nombre": "Pastor Ruideto Costa",
    "cargo": "Pastor Principal",
    "biografia": "Con más de 10 años de ministerio...",
    "foto_url": "/img/pastor-principal.webp"
  }
]
```

---

#### `POST /api/pastores` (Protegido)

Crea un nuevo registro de pastor/líder. Requiere token JWT válido. Acepta JSON (`nombre`, `cargo`, `biografia`, `foto_url`) o `multipart/form-data` con un archivo `foto`.

---

#### `PUT /api/pastores/:id` (Protegido)

Actualiza un registro de pastor existente. Requiere token JWT válido.

---

#### `DELETE /api/pastores/:id` (Protegido)

Elimina un registro de pastor. Requiere token JWT válido.

---

#### `POST /api/mensajes`

Envía un mensaje desde el formulario público de contacto. No requiere autenticación.

**Cuerpo de la petición:**

```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "asunto": "Petición de oración",
  "mensaje": "Oren por mi familia, por favor."
}
```

**Respuesta exitosa (201):**

```json
{
  "id": 3,
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "asunto": "Petición de oración",
  "mensaje": "Oren por mi familia, por favor."
}
```

---

#### `GET /api/mensajes` (Protegido)

Retorna todos los mensajes del formulario de contacto (ordenados por fecha descendente). Requiere token JWT válido.

---

#### `DELETE /api/mensajes/:id` (Protegido)

Elimina un mensaje. Requiere token JWT válido.

---

#### `GET /api/anuncios`

Retorna todos los anuncios (ordenados por fecha de creación descendente).

---

#### `POST /api/anuncios` (Protegido)

Crea un anuncio. Requiere token JWT válido. Acepta JSON (`titulo`, `descripcion`, `imagen_url`) o `multipart/form-data` con un archivo `imagen`.

---

#### `PUT /api/anuncios/:id` (Protegido)

Actualiza un anuncio. Requiere token JWT válido.

---

#### `DELETE /api/anuncios/:id` (Protegido)

Elimina un anuncio. Requiere token JWT válido.

---

#### `GET /api/recursos`

Retorna todos los recursos descargables (ordenados por fecha de creación descendente).

---

#### `POST /api/recursos` (Protegido)

Crea un recurso. Requiere token JWT válido. Debe enviarse como `multipart/form-data` con los campos `titulo`, `tipo` y un archivo `archivo` (imagen o PDF, máx 5 MB).

---

#### `PUT /api/recursos/:id` (Protegido)

Actualiza un recurso. Requiere token JWT válido.

---

#### `DELETE /api/recursos/:id` (Protegido)

Elimina un recurso. Requiere token JWT válido.

---

## Base de Datos

### Tablas

| Tabla | Descripción | Columnas Principales |
|-------|-------------|----------------------|
| `usuarios` | Usuarios administradores | id, email, password (hash bcrypt), nombre, rol |
| `eventos` | Eventos de la iglesia | id, titulo, descripcion, fecha, lugar, imagen_url |
| `pastores` | Pastores y líderes | id, nombre, cargo, biografia, foto_url |
| `horarios` | Horarios de culto | id, dia, hora, actividad |
| `mensajes_contacto` | Mensajes del formulario | id, nombre, email, mensaje, fecha_envio |
| `anuncios` | Anuncios | id, titulo, descripcion, imagen_url, fecha_creacion |
| `recursos` | Recursos descargables | id, titulo, descripcion, tipo, archivo_url, fecha_creacion |

> **Nota:** `init.sql` actualmente crea las primeras cinco tablas. Las tablas `anuncios` y `recursos` (usadas por los módulos de anuncios y recursos) deben agregarse a `init.sql` para que se creen automáticamente con Docker.

### Usuario de Prueba

| Campo | Valor |
|-------|-------|
| Email | `admin@iglesia.com` |
| Contraseña | `123456` |
| Rol | `admin` |

---

## Animaciones de Scroll

El proyecto usa un sistema de animaciones basado en `IntersectionObserver`:

### Tipos de Animación Disponibles

| Atributo `data-animate` | Efecto |
|--------------------------|--------|
| `fade-in-up` | Elemento aparece desde abajo |
| `fade-in-down` | Elemento aparece desde arriba |
| `fade-in-left` | Elemento aparece desde la izquierda |
| `fade-in-right` | Elemento aparece desde la derecha |
| `scale-in` | Elemento aparece con efecto de escala |

### Clases de Delay

Se pueden combinar con clases `delay-1`, `delay-2`, `delay-3`, `delay-4` para crear efectos escalonados:

```html
<div data-animate="fade-in-up" className="delay-1">...</div>
```

### Custom Hook: `useScrollAnimations`

Ubicado en `src/hooks/useScrollAnimations.ts`. Se encarga de:

- Observar todos los elementos con `data-animate` en el DOM
- Agregar la clase `animated` cuando entran en el viewport
- Limpiar el observer al desmontar o cambiar de ruta

---

## Configuración

### OxLint (`.oxlintrc.json`)

Linter configurado con plugins de React y reglas de Oxc:

- `react/rules-of-hooks`: Error — garantiza el uso correcto de hooks
- `react/only-export-components`: Warning — limita exports a componentes

### Prettier (`.prettierrc`)

| Opción | Valor |
|--------|-------|
| Comillas simples | No |
| Indentación | 4 espacios |
| Comas trailing | Estilo ES5 |
| Ancho de línea | 120 caracteres |
| Salto de línea | LF |

### EditorConfig (`.editorconfig`)

Configuración unificada para editores: indentación por espacios, charset UTF-8 y limpieza de espacios en blanco.

### Vite (`vite.config.ts`)

- **Plugin**: `@vitejs/plugin-react` para JSX y Fast Refresh
- **Proxy**: `/api` → `http://localhost:3307` (redirige peticiones al backend)

### Docker Compose (`docker-compose.yml`)

- **Servicio**: MySQL 8.0
- **Puerto**: 33007 (host) mapeado al 3306 (contenedor)
- **Base de datos**: `iglesia_db` (creada automáticamente con `init.sql` en el primer arranque)
- **Volumen persistente**: Los datos sobreviven al reiniciar el contenedor
- **Nombre del contenedor**: `mysql-proyecto-iglesia`

### Paleta de Colores

| Grupo | Colores | Uso |
|-------|---------|-----|
| Verde bosque | `#0a1f12` → `#52b788` | Fondo del hero, navbar, footer, secciones principales |
| Dorado | `#b8942e` → `#e8cf7a` | Botones primarios, acentos, bordes decorativos |
| Neutros | `#f8faf7` → `#2d2d2d` | Texto, fondos, bordes, sombras |

### Tipografía

| Fuente | Uso |
|--------|-----|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Títulos y encabezados (serif elegante) |
| [Inter](https://fonts.google.com/specimen/Inter) | Texto del cuerpo (sans-serif legible) |

---

## Solución de Problemas

### El backend no conecta a MySQL

- Verifica que Docker esté corriendo: `docker ps`
- Asegúrate de que las variables de entorno en `.env` sean correctas (`DB_HOST`, `DB_PORT=33007`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Verifica que el contenedor MySQL esté corriendo: `docker logs mysql-proyecto-iglesia`
- Si el contenedor no inició, revisa los logs: `docker-compose logs db`

### El frontend muestra errores de CORS

- Verifica que el proxy de Vite esté configurado en `vite.config.ts` (puerto objetivo 3307)
- Asegúrate de que el backend esté corriendo en el puerto 3307
- Revisa `CORS_ORIGIN` en `.env` e incluye tu origen de frontend (`http://localhost:5173`)

### Los estilos no se aplican correctamente

- Ejecuta `npm run lint` para verificar errores de sintaxis
- Verifica que `styles.css` esté importado en `main.tsx`
- Reinicia el servidor de desarrollo después de cambiar `tailwind.config.js`

### La autenticación falla

- Verifica que `JWT_SECRET` en `.env` esté definido
- Asegúrate de que el hash de la contraseña esté correctamente generado con `npx tsx generarClave.ts` (desde la carpeta `backend/`)
- Si olvidaste la contraseña, ejecuta `npx tsx reseteo.ts` para resetearla a '123456' (desde la carpeta `backend/`)
- Revisa los logs del backend para ver errores detallados

### La subida de archivos falla o retorna errores

- Solo se permiten imágenes y PDFs (máximo 5 MB por archivo)
- Verifica que el directorio `backend/uploads/` exista y tenga permisos de escritura
- Ajusta el límite en `files.size` si necesitas archivos más grandes

### Docker no inicia MySQL

- Verifica que Docker Desktop esté corriendo
- Si el puerto 33007 está ocupado, cambia el mapeo en `docker-compose.yml`
- Para reiniciar limpio (también re-ejecuta `init.sql`): `docker-compose down -v && docker-compose up -d`

---

## Roadmap

### Implementado

- [x] Páginas públicas (Inicio, Horarios, Quiénes Somos, Pastores, Eventos, Anexos, Redes Sociales, Contacto)
- [x] Panel de administración con autenticación JWT y protección de rutas
- [x] Dashboard dinámico con estadísticas reales y diseño premium (Glassmorphism)
- [x] CRUD completo para eventos desde el panel admin (con subida de imagen)
- [x] CRUD de pastores y líderes desde el panel admin (con subida de foto)
- [x] CRUD completo de anuncios desde el panel admin (con subida de imagen)
- [x] CRUD completo de recursos (PDFs) desde el panel admin (con subida de archivo)
- [x] Gestor de bandeja de entrada de mensajes
- [x] Subida de archivos con Multer (imágenes para eventos/pastores/anuncios, PDFs para recursos)
- [x] Hero carrusel a pantalla completa (Swiper) con CTAs que enlazan a páginas internas
- [x] Login con toggle de contraseña, recordar correo y validación
- [x] Animaciones de scroll con IntersectionObserver
- [x] Diseño responsivo con 3 breakpoints
- [x] Navbar inteligente y Footer dinámico
- [x] Carrusel interactivo de eventos con Swiper (breakpoints responsivos, autoplay, paginación, flechas de navegación)
- [x] Docker Compose para despliegue rápido de MySQL
- [x] Comentarios detallados en todos los archivos del proyecto
- [x] Migración completa a TypeScript: los 25 archivos del frontend (componentes, páginas, contexto, entry points) convertidos de `.jsx` a `.tsx` con interfaces, props tipadas y estado tipado
- [x] Corrección de sintaxis JSX: comentarios movidos dentro del elemento raíz para evitar errores de parseo en Login, Footer, ContactSection y AuthContext
- [x] Rediseño de la cabecera del sidebar admin: logo responsivo (max-width 130px) y subtítulo estilizado con texto uppercase y letter-spacing

### Próximo

- [ ] Agregar las tablas `anuncios` y `recursos` a `init.sql` para que se creen automáticamente con Docker
- [ ] Gestión de horarios desde el panel admin
- [ ] Subida de imágenes a un CDN
- [ ] Paginación y buscador dinámico en listas de eventos del panel
- [ ] Sección de galería con lightbox público
- [ ] Optimización de imágenes, formatos WebP y lazy loading
- [ ] PWA (Progressive Web App) para instalación en móviles
- [ ] Tests unitarios y de integración (Jest + Testing Library)

---

## Contribuir

1. Crea un branch para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m "Agregar nueva funcionalidad"`
3. Push al branch: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

### Convenciones de Código

- Usar **OxLint** para linting: `npm run lint`
- Formatear con **Prettier** antes de commitear
- Seguir la estructura de carpetas existente: `components/`, `pages/`, `hooks/`, `context/`
- Usar CSS custom properties (variables) en lugar de valores hardcodeados
- Comentar solo lo necesario — preferir código autoexplicativo

---

## Licencia

Este proyecto es para uso institucional de la Iglesia Asamblea de Dios.

---

<div align="center">
  
  **Desarrollado con amor** — Iglesia Asamblea de Dios
  <br><br>

  <img src="public/img/logo-oficial.png" alt="Logo Asamblea de Dios" width="250" />

</div>