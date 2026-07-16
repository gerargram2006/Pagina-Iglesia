# Iglesia Asamblea de Dios - Sitio Web

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institucional-green?style=flat-square)

Sitio web institucional de la Iglesia Asamblea de Dios, desarrollado con **React 19 + Vite 8** en el frontend y **Node.js + Express 5** en el backend. Ofrece informacion sobre horarios de culto, eventos, pastores, quienes somos, datos de contacto y un panel de administracion protegido con autenticacion JWT.

---

## Tabla de contenidos

- [Caracteristicas](#caracteristicas)
- [Tecnologias](#tecnologias)
- [Arquitectura del proyecto](#arquitectura-del-proyecto)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalacion y arranque](#instalacion-y-arranque)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicacion](#rutas-de-la-aplicacion)
- [Sistema de autenticacion](#sistema-de-autenticacion)
- [API del backend](#api-del-backend)
- [Base de datos](#base-de-datos)
- [Animaciones de scroll](#animaciones-de-scroll)
- [Configuracion del proyecto](#configuracion-del-proyecto)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

---

## Caracteristicas

### Paginas publicas

| Pagina | Ruta | Descripcion |
|--------|------|-------------|
| **Inicio** | `/` | Hero interactivo con formas flotantes, scroll animado y layout de una columna |
| **Horarios** | `/horarios` | Tarjetas dinamicas con iconos para domingos, miercoles y sabados |
| **Quienes Somos** | `/quienes-somos` | Layout de 2 columnas con imagen, historia, valores y metricas |
| **Galeria** | `/quienes-somos` | Bento grid con 6 espacios para fotos de la congregacion |
| **Pastores** | `/pastores` | Perfiles del equipo pastoral con fotos reales y anillos decorativos |
| **Eventos** | `/eventos` | Lista cronologica de proximos eventos con thumbnails |
| **CTA** | `/` (seccion) | Banner motivacional a pantalla completa con particulas decorativas |
| **Contacto** | `/contacto` | Formulario de contacto y datos de la congregacion |

### Panel de administracion

| Funcionalidad | Descripcion |
|---------------|-------------|
| **Login seguro** | Formulario con email/contrasena, toggle de visibilidad (ojo), "Recordar correo" y proteccion JWT |
| **Dashboard Premium** | Banner interactivo, saludo dinamico, reloj en tiempo real y tarjetas glassmorphism |
| **Estadisticas** | Metricas dinamicas conectadas a la BD: total de miembros, eventos y mensajes |
| **Gestor de Eventos** | CRUD completo: Listado en tabla, modal de creacion/edicion y eliminacion |
| **Equipo Pastoral** | CRUD completo: Gestion de lideres (nombres, cargos, biografias y fotos) |
| **Bandeja Mensajes**| Lectura y eliminacion de mensajes recibidos desde el formulario publico |
| **Logout** | Cierre de sesion con limpieza completa de token JWT |

### Generales

- **Diseño responsive**: Compatiple con moviles, tablets y escritorio (3 breakpoints: 991px, 767px, 575px)
- **SPA fluida**: Enrutamiento sin recargas de pagina con React Router
- **Diseño premium**: Glassmorphism en NavBar, hamburger custom y efectos hover/shimmer
- **Animaciones de scroll**: Elementos en cascada al hacer scroll con IntersectionObserver
- **Footer persistente**: Versiculo destacado, redes sociales y horarios en rutas publicas
- **Paleta de colores**: Verde bosque + dorado eclesiastico con CSS custom properties
- **Accesibilidad**: aria-labels, focus-visible, semantic HTML, contraste WCAG

---

## Tecnologias

### Frontend

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| [React](https://react.dev/) | ^19.2.7 | Biblioteca para interfaces de usuario |
| [Vite](https://vite.dev/) | ^8.1.1 | Herramienta de desarrollo y bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Enrutamiento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS (grid, utilidades) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Libreria de iconos |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrapido |

### Backend

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime de JavaScript |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | Driver de MySQL |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Hashing seguro de contrasenas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | Generacion y verificacion de JWT |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Variables de entorno desde .env |

### Base de datos

| Tecnologia | Version | Descripcion |
|------------|---------|-------------|
| [MySQL](https://www.mysql.com/) | 8.0 | Base de datos relacional (via Docker) |
| [Docker Compose](https://docs.docker.com/compose/) | - | Orquestacion de contenedores |

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
│  │ Eventos... │  │ 11 total  │  │   logout)   │ │
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
│  │  POST /api/auth/login                    │   │
│  │  GET, POST, PUT, DELETE /api/eventos     │   │
│  │  GET, POST, PUT, DELETE /api/pastores    │   │
│  │  GET, DELETE /api/mensajes               │   │
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
│   ├── img/                    # Imagenes publicas (logo, etc.)
│   ├── js/                     # Scripts estaticos (legado)
│   └── icons.svg               # Iconos SVG
├── src/
│   ├── api/                    # Interfaz de conexion con el Backend
│   │   └── index.js            # Inyector automatico de tokens JWT para fetch
│   ├── assets/                 # Recursos importados por el bundler
│   │   └── hero.png
│   ├── components/             # 11 componentes reutilizables
│   │   ├── Layout.jsx          # Layout principal con Outlet y Footer
│   │   ├── NavBar.jsx          # Barra de navegacion responsiva con Glassmorphism
│   │   ├── Footer.jsx          # Pie de pagina con enlaces, versiculo y redes sociales
│   │   ├── PageHeader.jsx      # Encabezado de paginas internas
│   │   ├── ScheduleSection.jsx # Tarjetas de horarios de culto con iconos
│   │   ├── AboutSection.jsx    # Seccion "Quienes Somos" (2 columnas + metricas)
│   │   ├── GallerySection.jsx  # Galeria de fotos (Bento grid de 6 espacios)
│   │   ├── PastorsSection.jsx  # Tarjetas de pastores/lideres (foto real)
│   │   ├── EventsSection.jsx   # Lista de proximos eventos (con thumbnails)
│   │   ├── CTASection.jsx      # Seccion "Llamado a la accion" con particulas
│   │   └── ContactSection.jsx  # Info de contacto + formulario
│   ├── context/
│   │   └── AuthContext.jsx     # Proveedor de autenticacion (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.js # Hook de animaciones scroll (IntersectionObserver)
│   ├── pages/                  # Paginas y rutas de la aplicacion
│   │   ├── admin/              # Componentes de gestion CRUD (Panel Admin)
│   │   │   ├── AdminEventos.jsx
│   │   │   ├── AdminPastores.jsx
│   │   │   └── AdminMensajes.jsx
│   │   ├── Home.jsx            # Pagina principal (hero + secciones)
│   │   ├── Horarios.jsx        # Pagina de horarios
│   │   ├── QuienesSomos.jsx    # Pagina "Quienes Somos"
│   │   ├── Pastores.jsx        # Pagina de pastores
│   │   ├── Eventos.jsx         # Pagina de eventos
│   │   ├── Contacto.jsx        # Pagina de contacto
│   │   ├── Login.jsx           # Formulario de inicio de sesion
│   │   └── Admin.jsx           # Panel de administracion protegido
│   ├── styles/
│   │   └── styles.css          # Estilos globales (~2540 lineas)
│   ├── App.jsx                 # Definicion de rutas (Router + Auth)
│   └── main.jsx                # Punto de entrada de la app
├── backend/
│   ├── server.js               # Servidor Express con endpoints API
│   ├── generarClave.js         # Utilidad para generar hashes bcrypt
│   └── package.json            # Dependencias del backend
├── src_legacy/                 # Codigo legado (HTML/CSS/JS vanilla)
├── dist/                       # Build de produccion (vite build)
├── index.html                  # HTML de entrada para Vite
├── vite.config.js              # Configuracion de Vite (proxy API, plugin React)
├── docker-compose.yml          # Configuracion de MySQL en Docker
├── init.sql                    # Schema de la base de datos + datos de ejemplo
├── .env                        # Variables de entorno (NO versionar)
├── .gitignore
├── .oxlintrc.json              # Configuracion de OxLint
├── .prettierrc                 # Configuracion de Prettier
├── .editorconfig               # Configuracion del editor
└── README.md                   # Este archivo
```

---

## Instalacion y arranque

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

Copia y edita el archivo `.env` en la raiz del proyecto:

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

### 6. Generar hash de contrasena (opcional)

```bash
cd backend && node generarClave.js
```

Copia el hash generado y actualizalo en la tabla `usuarios` de la base de datos.

### 7. Iniciar servidores

Abre **tres terminales** en la raiz del proyecto:

```bash
# Terminal 1 — Base de datos (Docker)
docker-compose up -d

# Terminal 2 — Backend (puerto 3000)
cd backend && npm start

# Terminal 3 — Frontend (puerto 5173)
npm run dev
```

> Si Docker ya esta corriendo, solo necesitas las terminales del backend y del frontend.

### 8. Abrir en el navegador

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

---

## Scripts disponibles

### Frontend (`package.json` raiz)

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo con HMR (puerto 5173) |
| `npm run build` | Genera el build de produccion en `dist/` |
| `npm run preview` | Vista previa del build de produccion |
| `npm run lint` | Ejecuta el linter (OxLint) |

### Backend (`backend/package.json`)

| Comando | Descripcion |
|---------|-------------|
| `npm start` | Inicia el servidor Express en puerto 3000 |
| `node generarClave.js` | Genera un hash bcrypt para una contrasena |

---

## Rutas de la aplicacion

### Rutas publicas

| Ruta | Pagina | Descripcion |
|------|--------|-------------|
| `/` | Home | Pagina principal con hero y secciones |
| `/horarios` | Horarios | Horarios de culto (domingo, miercoles, sabado) |
| `/quienes-somos` | Quienes Somos | Historia, mision y valores de la iglesia |
| `/pastores` | Pastores | Equipo pastoral con perfiles |
| `/eventos` | Eventos | Eventos y actividades proximas |
| `/contacto` | Contacto | Formulario de contacto y datos |

### Rutas protegidas

| Ruta | Pagina | Requisito |
|------|--------|-----------|
| `/admin` | Panel Admin | Sesion activa (JWT valido) |
| `/login` | Login | Sin sesion activa |

### Comportamiento de rutas protegidas

```
Usuario no autenticado → /admin  → Redirige a /login
Usuario autenticado    → /login  → Redirige a /admin
```

---

## Sistema de autenticacion

### Flujo completo

```
1. Usuario ingresa email + contrasena en /login
           ↓
2. Frontend envia POST /api/auth/login con credenciales
           ↓
3. Backend busca usuario por email en MySQL
           ↓
4. Backend compara contrasena con bcrypt.compare()
           ↓
5. Si es valida: genera JWT (expira en 2 horas)
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

| Propiedad | Valor |
|-----------|-------|
| Algoritmo | HMAC-SHA256 |
| Caducidad | 2 horas |
| Payload | `{ id, rol }` |
| Almacenamiento | localStorage del navegador |

### Funcionalidades del Login

| Funcion | Descripcion |
|---------|-------------|
| Show/Hide contrasena | Boton de ojo con icono dinamico (bi-eye / bi-eye-slash) y animacion de escala al hacer click |
| Recordar correo | Checkbox que guarda el email en localStorage |
| Validacion HTML5 | Campos requeridos, email valido, min 6 caracteres |
| Error shake | Animacion de sacudida al fallar el login |
| Spinner | Indicador de carga circular durante el envio |
| Redireccion automatica | Si ya hay sesion activa, redirige a /admin |

### Seguridad

| Medida | Implementacion |
|--------|----------------|
| Hash de contrasenas | bcrypt con salt rounds |
| Tokens JWT | Caducidad de 2 horas, payload minimal |
| SQL Injection | Parameterized queries (`?`) en todas las consultas |
| Frontend | Contrasena nunca se almacena en texto plano |
| Persistencia | localStorage (aceptable para apps internas) |

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
    "title": "Conferencia de Jovenes",
    "description": "Evento especial para jovenes de la iglesia",
    "date": "2026-07-20",
    "location": "Templo Principal",
    "image": "https://..."
  }
]
```

---

#### `POST /api/auth/login`

Autentica un usuario con email y contrasena.

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

| Codigo | Causa |
|--------|-------|
| `400` | Faltan campos email o password |
| `401` | Usuario no encontrado o contrasena incorrecta |
| `500` | Error interno del servidor |

---

## Base de datos

### Tablas

| Tabla | Descripcion | Columnas principales |
|-------|-------------|---------------------|
| `usuarios` | Usuarios administradores | id, email, password (bcrypt hash), name, rol |
| `eventos` | Eventos de la iglesia | id, title, description, date, location, image |
| `pastores` | Pastores y lideres | id, name, role, bio, photo |
| `horarios` | Horarios de culto | id, day, time, activity |
| `mensajes_contacto` | Mensajes del formulario | id, name, email, message, created_at |

### Usuario de prueba

| Campo | Valor |
|-------|-------|
| Email | `admin@iglesia.com` |
| Contrasena | `123456` |
| Rol | `admin` |

---

## Animaciones de scroll

El proyecto usa un sistema de animaciones basado en `IntersectionObserver`:

### Tipos de animacion disponibles

| Atributo `data-animate` | Efecto |
|-------------------------|--------|
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

## Configuracion del proyecto

### OxLint (`.oxlintrc.json`)

Linter configurado con plugins de React y reglas de Oxc:

- `react/rules-of-hooks`: Error — garantiza el uso correcto de hooks.
- `react/only-export-components`: Warning — limita exports a componentes.

### Prettier (`.prettierrc`)

| Opcion | Valor |
|--------|-------|
| Comas simples | No |
| Indentacion | 4 espacios |
| Comas trailing | Estilo ES5 |
| Ancho de linea | 120 caracteres |
| Salto de linea | LF |

### EditorConfig (`.editorconfig`)

Configuracion unificada para editores: indentacion por espacios, charset UTF-8 y limpieza de espacios en blanco.

### Vite (`vite.config.js`)

- **Plugin**: `@vitejs/plugin-react` para JSX y Fast Refresh
- **Proxy**: `/api` → `http://localhost:3000` (redirige peticiones al backend)

### Docker Compose (`docker-compose.yml`)

- **Servicio**: MySQL 8.0
- **Puerto**: 3306
- **Base de datos**: `iglesia_db` (creada automaticamente con `init.sql`)

### Paleta de colores

| Grupo | Colores | Uso |
|-------|---------|-----|
| Verde bosque | `#0a1f12` → `#52b788` | Fondo del hero, navbar, footer, secciones principales |
| Dorado | `#b8942e` → `#e8cf7a` | Botones primarios, acentos, bordes decorativos |
| Neutros | `#f8faf7` → `#2d2d2d` | Texto, fondos, bordes, sombras |

### Tipografia

| Fuente | Uso |
|--------|-----|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Titulos y encabezados (serif elegante) |
| [Inter](https://fonts.google.com/specimen/Inter) | Texto del cuerpo (sans-serif legible) |

---

## Troubleshooting

### El backend no conecta a MySQL

- Verifica que Docker este corriendo: `docker ps`
- Asegurate de que las variables de entorno en `.env` sean correctas
- Verifica que el contenedor MySQL este en el puerto 3306: `docker logs iglesia-mysql`

### El frontend muestra errores de CORS

- Verifica que el proxy de Vite este configurado en `vite.config.js`
- Asegurate de que el backend este corriendo en el puerto 3000

### Los estilos no se aplican correctamente

- Ejecuta `npm run lint` para verificar errores de sintaxis
- Verifica que `styles.css` este importado en `main.jsx`

### La autenticacion falla

- Verifica que el JWT_SECRET en `.env` este definido
- Asegurate de que el hash de la contrasena este correctamente generado con `node generarClave.js`
- Revisa los logs del backend para ver errores detallados

---

## Roadmap

### Implementado

- [x] Paginas publicas (Inicio, Horarios, Quienes Somos, Pastores, Eventos, Contacto)
- [x] Panel de administracion con autenticacion JWT y proteccion de rutas
- [x] Dashboard dinamico con estadisticas reales y diseno premium (Glassmorphism)
- [x] CRUD completo para eventos desde el panel admin
- [x] CRUD de pastores y lideres desde el panel admin
- [x] Gestor de bandeja de entrada de mensajes
- [x] Login con toggle de contrasena, recordar correo y validacion
- [x] Animaciones de scroll con IntersectionObserver
- [x] Diseno responsive con 3 breakpoints
- [x] Navbar inteligente y Footer dinamico
- [x] Docker Compose para despliegue rapido de MySQL

### Proximo

- [ ] Gestion de horarios desde el panel admin
- [ ] Subida de imagenes a un CDN o almacenamiento local para eventos/pastores
- [ ] Paginacion y buscador dinamico en listas de eventos del panel
- [ ] Seccion de galeria con lightbox publico
- [ ] Optimizacion de imagenes, formatos WebP y lazy loading
- [ ] PWA (Progressive Web App) para instalacion en moviles
- [ ] Tests unitarios y de integracion (Jest + Testing Library)

---

## Contribuir

1. Crea un branch para tu feature: `git checkout -b feature/nueva-funcionalidad`
2. Haz commit de tus cambios: `git commit -m "Agregar nueva funcionalidad"`
3. Push al branch: `git push origin feature/nueva-funcionalidad`
4. Abre un Pull Request

### Convenciones de codigo

- Usar **OxLint** para linting: `npm run lint`
- Formatear con **Prettier** antes de commitear
- Seguir la estructura de carpetas existente: `components/`, `pages/`, `hooks/`, `context/`
- Usar CSS custom properties (variables) en lugar de valores hardcodeados
- Comentar solo lo necesario — preferir codigo autoexplicativo

---

## Licencia

Este proyecto es para uso institucional de la Iglesia Asamblea de Dios.
