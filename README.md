# Iglesia Asamblea de Dios - Sitio Web

Sitio web institucional de la Iglesia Asamblea de Dios, desarrollado con **React 19 + Vite 8** en el frontend y **Node.js + Express 5** en el backend. Ofrece información sobre horarios de culto, eventos, pastores, quiénes somos, datos de contacto y un panel de administración protegido con autenticación JWT.

---

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y arranque](#instalación-y-arranque)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Sistema de autenticación](#sistema-de-autenticación)
- [API del backend](#api-del-backend)
- [Base de datos](#base-de-datos)
- [Animaciones de scroll](#animaciones-de-scroll)
- [Configuración del proyecto](#configuración-del-proyecto)

---

## Características

### Páginas públicas
- **Inicio**: Página principal con hero a pantalla completa y secciones destacadas.
- **Horarios**: Información sobre los horarios de culto (domingo, miércoles, sábado).
- **Quiénes Somos**: Descripción de la historia, misión y valores (Fe, Amor, Servicio).
- **Pastores**: Perfiles del equipo pastoral con imágenes placeholder.
- **Eventos**: Lista cronológica de próximos eventos y actividades.
- **Contacto**: Formulario de contacto y datos de la congregación.

### Panel de administración
- **Login seguro**: Formulario con email/contraseña, show/hide de contraseña, "Recordar correo".
- **Panel de control**: Saludo dinámico según hora, reloj en tiempo real, tarjetas de gestión.
- **Estadísticas**: Sección de métricas rápidas (miembros, eventos, mensajes).
- **Cierre de sesión**: Botón de logout con limpieza de token JWT.

### Generales
- **Diseño responsive**: Compatible con dispositivos móviles, tablets y escritorio.
- **Navegación SPA**: Enrutamiento fluido sin recargas de página con React Router.
- **Animaciones de scroll**: Elementos animados al hacer scroll con IntersectionObserver.
- **Footer persistente**: Pie de página visible en todas las rutas públicas.
- **Paleta de colores**: Verde bosque + dorado eclesiástico con variables CSS.

---

## Tecnologías

### Frontend

| Tecnología | Versión | Descripción |
|---|---|---|
| [React](https://react.dev/) | ^19.2.7 | Biblioteca para interfaces de usuario |
| [Vite](https://vite.dev/) | ^8.1.1 | Herramienta de desarrollo y bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Enrutamiento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS (grid, utilidades, componentes) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Librería de iconos |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrápido |

### Backend

| Tecnología | Versión | Descripción |
|---|---|---|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime de JavaScript |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | Driver de MySQL |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Hashing seguro de contraseñas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | Generación y verificación de JWT |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Habilitar Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Variables de entorno desde .env |

### Base de datos

| Tecnología | Versión | Descripción |
|---|---|---|
| [MySQL](https://www.mysql.com/) | 8.0 | Base de datos relacional (vía Docker) |
| [Docker Compose](https://docs.docker.com/compose/) | - | Orquestación de contenedores |

---

## Arquitectura del proyecto

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (Vite)                │
│  React 19 + React Router 7 + Bootstrap 5       │
│  Puerto: 5173                                   │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐ │
│  │   Pages    │  │Components │  │   Context   │ │
│  │ Home       │  │ NavBar    │  │ AuthContext  │ │
│  │ Login      │  │ Footer    │  │  (user,     │ │
│  │ Admin      │  │ Layout    │  │   token,    │ │
│  │ Horarios   │  │ PageHeader│  │   login,    │ │
│  │ Eventos... │  │           │  │   logout)   │ │
│  └───────────┘  └───────────┘  └─────────────┘ │
│                      │                          │
│              Vite Proxy (/api)                  │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               BACKEND (Express)                 │
│  Node.js + Express 5                            │
│  Puerto: 3000                                   │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  GET  /api/eventos                       │   │
│  │  POST /api/auth/login                    │   │
│  └──────────────────────────────────────────┘   │
│                      │                          │
│              MySQL2 Driver                      │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               DATABASE (MySQL 8.0)              │
│  Docker Container - Puerto 3306                 │
│  Base de datos: iglesia_db                      │
│                                                 │
│  ┌──────────┐ ┌────────┐ ┌──────────┐          │
│  │ usuarios │ │eventos │ │ pastores │          │
│  ├──────────┤ ├────────┤ ├──────────┤          │
│  │ eventos  │ │horarios│ │ mensajes │          │
│  └──────────┘ └────────┘ └──────────┘          │
└─────────────────────────────────────────────────┘
```

---

## Estructura del proyecto

```
Pagina-Iglesia/
├── public/
│   ├── img/                    # Imágenes públicas (logo, etc.)
│   ├── js/                     # Scripts estáticos (legado)
│   └── icons.svg               # Iconos SVG
├── src/
│   ├── assets/                 # Recursos importados por el bundler
│   │   └── hero.png
│   ├── components/             # Componentes reutilizables
│   │   ├── Layout.jsx          # Layout principal con Outlet y Footer
│   │   ├── NavBar.jsx          # Barra de navegación responsiva
│   │   ├── Footer.jsx          # Pie de página con enlaces y redes sociales
│   │   ├── PageHeader.jsx      # Encabezado de páginas internas
│   │   ├── ScheduleSection.jsx # Tarjetas de horarios de culto
│   │   ├── AboutSection.jsx    # Sección "Quiénes Somos" con valores
│   │   ├── PastorsSection.jsx  # Tarjetas de pastores/líderes
│   │   ├── EventsSection.jsx   # Lista de próximos eventos
│   │   └── ContactSection.jsx  # Info de contacto + formulario
│   ├── context/
│   │   └── AuthContext.jsx     # Proveedor de autenticación (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.js # Hook de animaciones scroll (IntersectionObserver)
│   ├── pages/                  # Páginas/rutas de la aplicación
│   │   ├── Home.jsx            # Página principal (hero + secciones)
│   │   ├── Horarios.jsx        # Página de horarios
│   │   ├── QuienesSomos.jsx    # Página "Quiénes Somos"
│   │   ├── Pastores.jsx        # Página de pastores
│   │   ├── Eventos.jsx         # Página de eventos
│   │   ├── Contacto.jsx        # Página de contacto
│   │   ├── Login.jsx           # Formulario de inicio de sesión
│   │   └── Admin.jsx           # Panel de administración protegido
│   ├── styles/
│   │   └── styles.css          # Estilos globales del proyecto (~1600 líneas)
│   ├── App.jsx                 # Definición de rutas (Router + Auth)
│   └── main.jsx                # Punto de entrada de la app
├── backend/
│   ├── server.js               # Servidor Express con endpoints API
│   ├── generarClave.js         # Utilidad para generar hashes bcrypt
│   ├── package.json            # Dependencias del backend
│   └── node_modules/
├── src_legacy/                 # Código legado (HTML/CSS/JS vanilla)
├── dist/                       # Build de producción (generado por vite build)
├── index.html                  # HTML de entrada para Vite
├── vite.config.js              # Configuración de Vite (proxy API, plugin React)
├── docker-compose.yml          # Configuración de MySQL en Docker
├── init.sql                    # Schema de la base de datos + datos de ejemplo
├── .env                        # Variables de entorno (NO versionar)
├── .gitignore
├── .oxlintrc.json              # Configuración de OxLint
├── .prettierrc                 # Configuración de Prettier
├── .editorconfig               # Configuración del editor
└── README.md                   # Este archivo
```

---

## Instalación y arranque

### Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Docker](https://www.docker.com/) (opcional, para MySQL)

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd Pagina-Iglesia
```

### 2. Configurar variables de entorno

Copia y edita el archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=iglesia_db

# JWT
JWT_SECRET=tu_secreto_seguro_aqui
```

### 3. Levantar la base de datos (Docker)

```bash
docker-compose up -d
```

### 4. Inicializar la base de datos

```bash
mysql -u root -p < init.sql
```

### 5. Instalar dependencias

```bash
# Frontend
npm install

# Backend
cd backend && npm install && cd ..
```

### 6. Generar hash de contraseña (opcional)

```bash
cd backend && node generarClave.js
```

Copia el hash generado y actualízalo en la tabla `usuarios` de la base de datos.

### 7. Iniciar servidores

```bash
# Terminal 1 - Backend (puerto 3000)
cd backend && npm start

# Terminal 2 - Frontend (puerto 5173)
npm run dev
```

### 8. Abrir en el navegador

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

---

## Scripts disponibles

### Frontend (`package.json` raíz)

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR (puerto 5173) |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta el linter (OxLint) |

### Backend (`backend/package.json`)

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor Express en puerto 3000 |
| `node generarClave.js` | Genera un hash bcrypt para una contraseña |

---

## Rutas de la aplicación

### Rutas públicas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Página principal con hero y secciones |
| `/horarios` | Horarios | Horarios de culto (domingo, miércoles, sábado) |
| `/quienes-somos` | Quiénes Somos | Historia, misión y valores de la iglesia |
| `/pastores` | Pastores | Equipo pastoral con perfiles |
| `/eventos` | Eventos | Eventos y actividades próximas |
| `/contacto` | Contacto | Formulario de contacto y datos |

### Rutas protegidas

| Ruta | Página | Requisito |
|---|---|---|
| `/admin` | Panel Admin | Sesión activa (JWT válido) |
| `/login` | Login | Sin sesión activa |

### Comportamiento de rutas protegidas

```
Usuario no autenticado → /admin  → Redirige a /login
Usuario autenticado    → /login  → Redirige a /admin
```

---

## Sistema de autenticación

### Flujo completo

```
1. Usuario ingresa email + contraseña en /login
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
10. Admin.jsx renderiza el panel de control
```

### Token JWT

- **Algoritmo**: HMAC-SHA256 (por defecto de jsonwebtoken)
- **Caducidad**: 2 horas
- **Payload**: `{ id, rol }`
- **Almacenamiento**: localStorage del navegador

### Funcionalidades del Login

| Función | Descripción |
|---|---|
| Show/Hide contraseña | Botón de ojo para alternar visibilidad |
| Recordar correo | Checkbox que guarda el email en localStorage |
| Validación HTML5 | Campos requeridos, email válido, min 6 caracteres |
| Error shake | Animación de sacudida al fallar el login |
| Spinner | Indicador de carga durante el envío |
| Redirección automática | Si ya hay sesión activa, redirige a /admin |

### Seguridad

- La contraseña **nunca** se almacena en el frontend
- Se usa `localStorage` para persistencia (aceptable para apps internas)
- Tokens JWT con caducidad de 2 horas
- El backend valida email + contraseña con bcrypt
- Se usa parameterized queries (`?`) para prevenir SQL injection

---

## API del backend

### Base URL

```
http://localhost:3000
```

### Endpoints

#### `GET /api/eventos`

Retorna todos los eventos de la iglesia.

**Respuesta exitosa (200):**

```json
[
  {
    "id": 1,
    "title": "Conferencia de Jóvenes",
    "description": "Evento especial para jóvenes de la iglesia",
    "date": "2026-07-20",
    "location": "Templo Principal",
    "image": "https://..."
  }
]
```

---

#### `POST /api/auth/login`

Autentica un usuario con email y contraseña.

**Request body:**

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
    "name": "Admin",
    "email": "admin@iglesia.com",
    "rol": "admin"
  }
}
```

**Respuestas de error:**

| Código | Causa |
|---|---|
| `400` | Faltan campos email o password |
| `401` | Usuario no encontrado o contraseña incorrecta |
| `500` | Error interno del servidor |

---

## Base de datos

### Tablas

| Tabla | Descripción | Columnas principales |
|---|---|---|
| `usuarios` | Usuarios administradores | id, email, password (bcrypt hash), name, rol |
| `eventos` | Eventos de la iglesia | id, title, description, date, location, image |
| `pastores` | Pastores y líderes | id, name, role, bio, photo |
| `horarios` | Horarios de culto | id, day, time, activity |
| `mensajes_contacto` | Mensajes del formulario | id, name, email, message, created_at |

### Usuario de prueba

| Campo | Valor |
|---|---|
| Email | `admin@iglesia.com` |
| Contraseña | `123456` |
| Rol | `admin` |

---

## Animaciones de scroll

El proyecto usa un sistema de animaciones basado en `IntersectionObserver`:

### Tipos de animación disponibles

| Atributo `data-animate` | Efecto |
|---|---|
| `fade-in-up` | Elemento aparece desde abajo |
| `fade-in-down` | Elemento aparece desde arriba |
| `fade-in-left` | Elemento aparece desde la izquierda |
| `fade-in-right` | Elemento aparece desde la derecha |
| `scale-in` | Elemento aparece con efecto de escala |

### Clases de delay

Se pueden combinar con clases `delay-1`, `delay-2`, `delay-3`, `delay-4` para crear efectos escalonados:

```html
<div data-animate="fade-in-up" className="delay-1">...</div>
```

### Custom hook: `useScrollAnimations`

Ubicado en `src/hooks/useScrollAnimations.js`. Se encarga de:
- Observar todos los elementos con `data-animate` en el DOM.
- Agregar la clase `animated` cuando entran en el viewport.
- Limpiar el observer al desmontar o cambiar de ruta.

---

## Configuración del proyecto

### OxLint (`.oxlintrc.json`)

Linter configurado con plugins de React y reglas de Oxc:

- `react/rules-of-hooks`: Error — garantiza el uso correcto de hooks.
- `react/only-export-components`: Warning — limita exports a componentes.

### Prettier (`.prettierrc`)

| Opción | Valor |
|---|---|
| Comas simples | No |
| Indentación | 4 espacios |
| Comas trailing | Estilo ES5 |
| Ancho de línea | 120 caracteres |
| Salto de línea | LF |

### EditorConfig (`.editorconfig`)

Configuración unificada para editores: indentación por espacios, charset UTF-8 y limpieza de espacios en blanco.

### Vite (`vite.config.js`)

- **Plugin**: `@vitejs/plugin-react` para JSX y Fast Refresh
- **Proxy**: `/api` → `http://localhost:3000` (redirige peticiones al backend)

### Docker Compose (`docker-compose.yml`)

- **Servicio**: MySQL 8.0
- **Puerto**: 3306
- **Base de datos**: `iglesia_db` (creada automáticamente con `init.sql`)

---

### Paleta de colores

| Grupo | Colores | Uso |
|---|---|---|
| Verde bosque | `#0a1f12` → `#52b788` | Fondo del hero, navbar, footer, secciones principales |
| Dorado | `#b8942e` → `#e8cf7a` | Botones primarios, acentos, bordes decorativos |
| Neutros | `#f8faf7` → `#2d2d2d` | Texto, fondos, bordes, sombras |

### Tipografía

| Fuente | Uso |
|---|---|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Títulos y encabezados (serif elegante) |
| [Inter](https://fonts.google.com/specimen/Inter) | Texto del cuerpo (sans-serif legible) |

---

## Licencia

Este proyecto es para uso institucional de la Iglesia Asamblea de Dios.
