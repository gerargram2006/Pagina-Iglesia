# Iglesia Asamblea de Dios - Sitio Web

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institucional-green?style=flat-square)

**Sitio web institucional de la Iglesia Asamblea de Dios**

Una plataforma completa con panel de administración, gestión de eventos,
equipo pastoral y sistema de autenticación JWT.

</div>

---

[English](README.md) | [Español](README.es.md) | [Português](README.pt.md)

---

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

- **Frontend Moderno**: React 19 + Vite 8 con JSX y Fast Refresh
- **Backend Robusto**: Node.js + Express 5 con autenticación JWT
- **Base de Datos**: MySQL 8.0 ejecutándose en Docker
- **Diseño Premium**: Glassmorphism, animaciones de scroll y completamente responsivo
- **CRUD Completo**: Gestión de eventos, pastores y mensajes desde el panel admin

---

## Características

### Páginas Públicas

| Página | Ruta | Descripción |
|--------|------|-------------|
| **Inicio** | `/` | Hero interactivo con imagen de fondo (hero-inicio.webp), formas flotantes, animaciones de scroll y layout de una columna |
| **Horarios** | `/horarios` | Tarjetas dinámicas con iconos para domingos, miércoles y sábados |
| **Quiénes Somos** | `/quienes-somos` | Layout de 2 columnas con imagen, historia, valores y métricas |
| **Galería** | `/quienes-somos` | Bento grid con 6 espacios para fotos de la congregación |
| **Pastores** | `/pastores` | Perfiles del equipo pastoral con fotos reales y anillos decorativos |
| **Eventos** | `/eventos` | Lista cronológica de próximos eventos con thumbnails |
| **Anexos** | `/anexos` | Sedes de la iglesia con info del pastor, dirección, horario y contacto |
| **CTA** | `/` (sección) | Banner motivacional a pantalla completa con partículas decorativas |
| **Contacto** | `/contacto` | Formulario de contacto y datos de la congregación |

### Panel de Administración

| Funcionalidad | Descripción |
|---------------|-------------|
| **Login Seguro** | Formulario con email/contraseña, toggle de visibilidad, "Recordar correo" y protección JWT |
| **Dashboard Premium** | Banner interactivo, saludo dinámico, reloj en tiempo real y tarjetas glassmorphism |
| **Estadísticas** | Métricas dinámicas conectadas a la BD: total de miembros, eventos y mensajes |
| **Gestor de Eventos** | CRUD completo: listado en tabla, modal de creación/edición y eliminación |
| **Equipo Pastoral** | CRUD completo: gestión de líderes (nombres, cargos, biografías y fotos) |
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
| [Vite](https://vite.dev/) | ^8.1.1 | Servidor de desarrollo y bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Enrutamiento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS (grid, utilidades) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Librería de iconos |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrápido |

### Backend

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | >= 18 | Runtime de JavaScript |
| [Express](https://expressjs.com/) | ^5.2.1 | Framework web para Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | Driver de MySQL |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Hashing seguro de contraseñas |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | Generación y verificación de JWT |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
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
│  Contenedor Docker - Puerto 3306                │
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

## Estructura del Proyecto

```
Pagina-Iglesia/
├── public/                    # Archivos estáticos servidos por Vite
│   ├── img/                   # Imágenes públicas (logo, etc.)
│   ├── js/                    # Scripts estáticos (legado)
│   └── icons.svg              # Iconos SVG
├── src/                       # Código fuente del frontend React
│   ├── api/                   # Cliente HTTP centralizado
│   │   └── index.js           # Función fetchAPI con inyección automática de JWT
│   ├── assets/                # Recursos importados por el bundler
│   │   └── hero.png
│   ├── components/            # 11 componentes reutilizables
│   │   ├── Layout.jsx         # Layout principal con Outlet y Footer
│   │   ├── NavBar.jsx         # Barra de navegación responsiva con Glassmorphism
│   │   ├── Footer.jsx         # Pie de página con enlaces, versículo y redes sociales
│   │   ├── PageHeader.jsx     # Encabezado de páginas internas
│   │   ├── ScheduleSection.jsx# Tarjetas de horarios de culto con iconos
│   │   ├── AboutSection.jsx   # Sección "Quiénes Somos" (2 columnas + métricas)
│   │   ├── GallerySection.jsx # Galería de fotos (Bento grid de 6 espacios)
│   │   ├── PastorsSection.jsx # Tarjetas de pastores/líderes (foto real)
│   │   ├── EventsSection.jsx  # Lista de próximos eventos (con thumbnails)
│   │   ├── CTASection.jsx     # Sección "Llamado a la acción" con partículas
│   │   └── ContactSection.jsx # Info de contacto + formulario
│   ├── context/
│   │   └── AuthContext.jsx    # Proveedor de autenticación (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.js # Hook de animaciones scroll (IntersectionObserver)
│   ├── pages/                 # Páginas y rutas de la aplicación
│   │   ├── admin/             # Componentes de gestión CRUD (Panel Admin)
│   │   │   ├── AdminEventos.jsx
│   │   │   ├── AdminPastores.jsx
│   │   │   └── AdminMensajes.jsx
│   │   ├── Home.jsx           # Página principal (hero + secciones)
│   │   ├── Horarios.jsx       # Página de horarios
│   │   ├── QuienesSomos.jsx   # Página "Quiénes Somos"
│   │   ├── Pastores.jsx       # Página de pastores
│   │   ├── Eventos.jsx        # Página de eventos
│   │   ├── Anexos.jsx         # Página de anexos/sedes con info de cada iglesia
│   │   ├── Contacto.jsx       # Página de contacto
│   │   ├── Login.jsx          # Formulario de inicio de sesión
│   │   └── Admin.jsx          # Panel de administración protegido
│   ├── styles/
│   │   └── styles.css         # Estilos globales (~2540 líneas)
│   ├── App.jsx                # Definición de rutas (Router + Auth)
│   └── main.jsx               # Punto de entrada de la app
├── backend/                   # Código fuente del servidor Express
│   ├── server.js              # Servidor Express con endpoints API
│   ├── generarClave.js        # Utilidad para generar hashes bcrypt
│   ├── reseteo.js             # Utilidad para resetear contraseña del admin
│   ├── middleware/
│   │   └── auth.js            # Middleware de verificación JWT
│   └── package.json           # Dependencias del backend
├── index.html                 # HTML de entrada para Vite
├── vite.config.js             # Configuración de Vite (proxy API, plugin React)
├── docker-compose.yml         # Configuración de MySQL en Docker
├── init.sql                   # Schema de la base de datos + datos de ejemplo
├── .env                       # Variables de entorno (NO versionar)
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
# Edita .env con tus credenciales de MySQL y JWT_SECRET

# 5. Levantar MySQL en Docker
docker-compose up -d

# 6. Inicializar la base de datos
mysql -u root -p < init.sql

# 7. Iniciar el backend (Terminal 1)
cd backend && npm start

# 8. Iniciar el frontend (Terminal 2)
npm run dev
```

### Abrir en el Navegador

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

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
| `npm start` | Inicia el servidor Express en puerto 3000 |
| `node generarClave.js` | Genera un hash bcrypt para una contraseña |
| `node reseteo.js` | Resetea la contraseña del admin a '123456' |

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

**Cuerpo de la petición:**

```json
{
  "titulo": "Retiro de Jóvenes",
  "descripcion": "Un fin de semana de fellowship y crecimiento espiritual",
  "fecha": "2026-08-15 09:00:00",
  "lugar": "Centro de Retiros",
  "imagen_url": "https://..."
}
```

---

#### `PUT /api/eventos/:id` (Protegido)

Actualiza un evento existente. Requiere token JWT válido.

---

#### `DELETE /api/eventos/:id` (Protegido)

Elimina un evento. Requiere token JWT válido.

---

#### `GET /api/pastores`

Retorna todos los pastores y líderes de la iglesia.

---

#### `POST /api/pastores` (Protegido)

Crea un nuevo registro de pastor/líder. Requiere token JWT válido.

---

#### `PUT /api/pastores/:id` (Protegido)

Actualiza un registro de pastor existente. Requiere token JWT válido.

---

#### `DELETE /api/pastores/:id` (Protegido)

Elimina un registro de pastor. Requiere token JWT válido.

---

#### `GET /api/mensajes` (Protegido)

Retorna todos los mensajes del formulario de contacto (ordenados por fecha descendente). Requiere token JWT válido.

---

#### `DELETE /api/mensajes/:id` (Protegido)

Elimina un mensaje. Requiere token JWT válido.

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

Ubicado en `src/hooks/useScrollAnimations.js`. Se encarga de:

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

### Vite (`vite.config.js`)

- **Plugin**: `@vitejs/plugin-react` para JSX y Fast Refresh
- **Proxy**: `/api` → `http://localhost:3000` (redirige peticiones al backend)

### Docker Compose (`docker-compose.yml`)

- **Servicio**: MySQL 8.0
- **Puerto**: 3307 (mapeado al 3306 del contenedor)
- **Base de datos**: `iglesia_db` (creada automáticamente con `init.sql`)
- **Volumen persistente**: Los datos sobreviven al reiniciar el contenedor

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
- Asegúrate de que las variables de entorno en `.env` sean correctas
- Verifica que el contenedor MySQL esté en el puerto 3307: `docker logs mysql-proyecto-iglesia`
- Si el contenedor no inició, revisa los logs: `docker-compose logs db`

### El frontend muestra errores de CORS

- Verifica que el proxy de Vite esté configurado en `vite.config.js`
- Asegúrate de que el backend esté corriendo en el puerto 3000

### Los estilos no se aplican correctamente

- Ejecuta `npm run lint` para verificar errores de sintaxis
- Verifica que `styles.css` esté importado en `main.jsx`

### La autenticación falla

- Verifica que `JWT_SECRET` en `.env` esté definido
- Asegúrate de que el hash de la contraseña esté correctamente generado con `node generarClave.js`
- Si olvidaste la contraseña, ejecuta `node reseteo.js` para resetearla a '123456'
- Revisa los logs del backend para ver errores detallados

### Docker no inicia MySQL

- Verifica que Docker Desktop esté corriendo
- Si el puerto 3307 está ocupado, cambia el mapeo en `docker-compose.yml`
- Para reiniciar limpio: `docker-compose down -v && docker-compose up -d`

---

## Roadmap

### Implementado

- [x] Páginas públicas (Inicio, Horarios, Quiénes Somos, Pastores, Eventos, Anexos, Contacto)
- [x] Panel de administración con autenticación JWT y protección de rutas
- [x] Dashboard dinámico con estadísticas reales y diseño premium (Glassmorphism)
- [x] CRUD completo para eventos desde el panel admin
- [x] CRUD de pastores y líderes desde el panel admin
- [x] Gestor de bandeja de entrada de mensajes
- [x] Login con toggle de contraseña, recordar correo y validación
- [x] Animaciones de scroll con IntersectionObserver
- [x] Diseño responsivo con 3 breakpoints
- [x] Navbar inteligente y Footer dinámico
- [x] Docker Compose para despliegue rápido de MySQL
- [x] Comentarios detallados en todos los archivos del proyecto

### Próximo

- [ ] Gestión de horarios desde el panel admin
- [ ] Subida de imágenes a un CDN o almacenamiento local para eventos/pastores
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