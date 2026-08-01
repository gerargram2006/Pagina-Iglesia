# Iglesia Asamblea de Dios - Website

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institutional-green?style=flat-square)

**Institutional website for Iglesia Asamblea de Dios**

A full-featured platform with an admin panel, event and announcement management,
pastoral team section, downloadable resources, and JWT authentication system.

</div>

---

[English](README.md) | [Español](README.es.md) | [Português](README.pt.md)

---
## 🎨 Design Prototype

The visual design, structure, and user experience (UX/UI) were planned and approved using an initial prototype.

<div align="center">
  <img src="docs/PrototipoAD.png" alt="Website Prototype" width="800" />
</div>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Routes](#routes)
- [Authentication](#authentication)
- [API Reference](#api-reference)
- [Database](#database)
- [Scroll Animations](#scroll-animations)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## About

This is the official website for **Iglesia Asamblea de Dios**, designed to share
information about worship schedules, events, pastors, church history, and contact
details. It includes a complete admin panel with secure JWT authentication.

### Why this project?

- **Modern Frontend**: React 19 + Vite 8 + TypeScript with JSX and Fast Refresh
- **Solid Backend**: Node.js + Express 5 + TypeScript with JWT authentication
- **Database**: MySQL 8.0 running in Docker
- **Premium Design**: Glassmorphism, scroll animations, and fully responsive
- **Full CRUD**: Manage events, announcements, pastors, resources, and messages from the admin panel

---

## Features

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Full-screen hero carousel (Swiper with 3 slides: welcome, youth night, baptisms) with CTA buttons, scroll animations, and single-column layout |
| **Schedule** | `/horarios` | Dynamic cards with icons for Sunday, Wednesday, and Saturday services |
| **About Us** | `/quienes-somos` | 2-column layout with image, history, values, and metrics |
| **Gallery** | `/quienes-somos` | Bento grid with 6 photo slots for the congregation |
| **Pastors** | `/pastores` | Pastoral team profiles with real photos and decorative rings |
| **Events** | `/eventos` | Interactive carousel with upcoming events cards (Swiper), plus chronological list on `/eventos` page |
| **Anexos** | `/anexos` | Church branches/sedes with pastor, address, schedule and contact info |
| **Social Media** | `/redes` | Cards linking to official social profiles (Facebook, Instagram, YouTube, TikTok) |
| **CTA** | `/` (section) | Full-screen motivational banner with decorative particles |
| **Contact** | `/contacto` | Contact form and congregation details |

### Admin Panel

| Feature | Description |
|---------|-------------|
| **Secure Login** | Email/password form with visibility toggle, "Remember email", and JWT protection |
| **Premium Dashboard** | Interactive banner, dynamic greeting, real-time clock, and glassmorphism cards |
| **Statistics** | Dynamic metrics from the DB: total members, events, and messages |
| **Event Manager** | Full CRUD: table listing, create/edit modal, deletion, and image upload |
| **Announcements Manager** | Full CRUD: publish announcements for the congregation with image upload |
| **Pastoral Team** | Full CRUD: manage leaders (names, roles, bios) with photo upload |
| **Resources Manager** | Full CRUD: downloadable materials (PDFs) with file upload |
| **Inbox** | Read and delete messages received from the public form |
| **Logout** | Session cleanup with complete JWT token removal |

### General

- **Responsive Design**: Compatible with mobile, tablet, and desktop (3 breakpoints: 991px, 767px, 575px)
- **Smooth SPA**: Page navigation without reloads using React Router
- **Premium UI**: Glassmorphism navbar, custom hamburger menu, and hover/shimmer effects
- **Scroll Animations**: Cascading elements on scroll with IntersectionObserver
- **Persistent Footer**: Featured verse, social media links, and schedule on public routes
- **Color Palette**: Forest green + ecclesiastical gold with CSS custom properties
- **Accessibility**: aria-labels, focus-visible, semantic HTML, WCAG contrast

---

## Tech Stack

### Frontend

| Technology | Version | Description |
|------------|---------|-------------|
| [React](https://react.dev/) | ^19.2.7 | UI component library |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Static type checking |
| [Vite](https://vite.dev/) | ^8.1.1 | Dev server and bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | SPA routing |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | CSS framework (grid, utilities) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Bootstrap components for React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Icon library |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4.19 | Utility-first CSS framework (custom palette) |
| [Swiper](https://swiperjs.com/) | ^14.0.6 | Touch slider/carousel library |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Ultra-fast linter |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | >= 18 | JavaScript runtime |
| [TypeScript](https://www.typescriptlang.org/) | ^7.0.2 | Static type checking |
| [Express](https://expressjs.com/) | ^5.2.1 | Web framework for Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | MySQL driver |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Secure password hashing |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | JWT generation and verification |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
| [multer](https://www.npmjs.com/package/multer) | ^2.2.0 | File upload handling (images + PDFs) |
| [dotenv](https://www.npmjs.com/package/dotenv) | ^17.4.2 | Environment variables from .env |

### Database

| Technology | Version | Description |
|------------|---------|-------------|
| [MySQL](https://www.mysql.com/) | 8.0 | Relational database (via Docker) |
| [Docker Compose](https://docs.docker.com/compose/) | - | Container orchestration |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                  FRONTEND (Vite)                │
│  React 19 + TypeScript + React Router 7         │
│  + Bootstrap 5 + Tailwind · Port: 5173          │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐ │
│  │   Pages    │  │Components │  │   Context   │ │
│  │ Home       │  │ NavBar    │  │ AuthContext  │ │
│  │ Login      │  │ Footer    │  │  (user,     │ │
│  │ Admin      │  │ Layout    │  │   token,    │ │
│  │ Schedule   │  │ PageHeader│  │   login,    │ │
│  │ Events...  │  │ 14 total  │  │   logout)   │ │
│  └───────────┘  └───────────┘  └─────────────┘ │
│                      │                          │
│              Vite Proxy (/api → 3307)           │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               BACKEND (Express)                 │
│  Node.js + Express 5                            │
│  Port: 3307                                     │
│                                                 │
│  ┌──────────────────────────────────────────┐   │
│  │  POST /api/auth/login                    │   │
│  │  CRUD /api/eventos  (image upload)       │   │
│  │  CRUD /api/pastores  (photo upload)      │   │
│  │  CRUD /api/anuncios  (image upload)      │   │
│  │  CRUD /api/recursos  (PDF upload)        │   │
│  │  GET,DELETE /api/mensajes                │   │
│  │  GET /api/health · /uploads (static)     │   │
│  └──────────────────────────────────────────┘   │
│                      │                          │
│              MySQL2 Driver                      │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               DATABASE (MySQL 8.0)              │
│  Docker Container - Host Port 33007 → 3306      │
│  Database: iglesia_db                           │
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

## Project Structure

```
Pagina-Iglesia/
├── public/                    # Static files served by Vite
│   └── img/                   # Public images (logo, gallery, pastors, hero)
├── src/                       # React frontend source code
│   ├── api/                   # Centralized HTTP client
│   │   └── index.ts           # fetchAPI function with auto JWT injection + FormData support
│   ├── components/            # 14 reusable components
│   │   ├── Layout.tsx         # Main layout with Outlet and Footer
│   │   ├── NavBar.tsx         # Responsive navbar with Glassmorphism
│   │   ├── Footer.tsx         # Footer with links, verse, and social media
│   │   ├── PageHeader.tsx     # Internal page header (hero style)
│   │   ├── HeroSlider.tsx     # Full-screen hero carousel (Swiper, 3 slides)
│   │   ├── Hero.tsx           # Single-slide hero (fallback)
│   │   ├── ScheduleSection.tsx# Worship schedule cards with icons
│   │   ├── AboutSection.tsx   # About section (2 columns + metrics)
│   │   ├── GallerySection.tsx # Photo gallery (6-slot Bento grid)
│   │   ├── PastorsSection.tsx # Pastor/leader cards (real photos)
│   │   ├── EventsSection.tsx  # Upcoming events list (with thumbnails)
│   │   ├── EventosSlider.tsx  # Events interactive carousel (Swiper, responsive, autoplay)
│   │   ├── CTASection.tsx     # Call-to-action section with particles
│   │   └── ContactSection.tsx # Contact info + form
│   ├── context/
│   │   └── AuthContext.tsx    # Auth provider (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.ts # Scroll animation hook (IntersectionObserver)
│   ├── pages/                 # Application pages and routes
│   │   ├── admin/             # CRUD admin components
│   │   │   ├── AdminEventos.tsx
│   │   │   ├── AdminPastores.tsx
│   │   │   ├── AdminMensajes.tsx
│   │   │   ├── AdminAnuncios.tsx
│   │   │   └── AdminRecursos.tsx
│   │   ├── Home.tsx           # Home page (hero slider + sections)
│   │   ├── Horarios.tsx       # Schedule page
│   │   ├── QuienesSomos.tsx   # About page
│   │   ├── Pastores.tsx       # Pastors page
│   │   ├── Eventos.tsx        # Events page
│   │   ├── Anexos.tsx         # Anexos/sedes page with branch info
│   │   ├── RedesSociales.tsx  # Social media links page
│   │   ├── Contacto.tsx       # Contact page
│   │   ├── Login.tsx          # Login form
│   │   └── Admin.tsx          # Protected admin panel (sidebar + 5 modules)
│   ├── styles/
│   │   └── styles.css         # Global styles (Bootstrap + Tailwind directives, ~4600 lines)
│   ├── App.tsx                # Route definitions (Router + Auth + ProtectedRoute)
│   └── main.tsx               # App entry point
├── backend/                   # Express server source code
│   ├── server.ts              # Express server with all API endpoints
│   ├── config.ts              # Env-based configuration (port, JWT, DB, CORS)
│   ├── generarClave.ts        # Utility to generate bcrypt hashes
│   ├── reseteo.ts             # Utility to reset admin password
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification middleware
│   │   └── upload.ts          # Multer config (images + PDFs, 5MB limit)
│   ├── uploads/               # Uploaded files served at /uploads (gitignored)
│   └── package.json           # Backend dependencies
├── index.html                 # Entry HTML for Vite
├── vite.config.ts             # Vite configuration (API proxy → 3307, React plugin)
├── tsconfig.json              # TypeScript configuration (frontend)
├── postcss.config.js          # PostCSS (Tailwind + Autoprefixer)
├── tailwind.config.js         # Tailwind custom theme (palette, fonts, shadows)
├── docker-compose.yml         # MySQL Docker configuration (port 33007)
├── init.sql                   # Database schema + seed data (auto-runs on first container start)
├── .env                       # Environment variables (DO NOT commit)
├── example.env                # Template with placeholders + CORS_ORIGIN
├── .gitignore                 # Git ignored files
├── .oxlintrc.json             # OxLint configuration
├── .prettierrc                # Prettier configuration
├── .editorconfig              # Editor configuration
└── README.md                  # This file
```

---

## Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9
- [Docker](https://www.docker.com/) (for MySQL)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd Pagina-Iglesia

# 2. Install frontend dependencies
npm install

# 3. Install backend dependencies
cd backend && npm install && cd ..

# 4. Configure environment variables
cp example.env .env
# Edit .env with your MySQL credentials and a strong JWT_SECRET

# 5. Start MySQL in Docker (init.sql runs automatically on first start)
docker-compose up -d

# 6. Start the backend (Terminal 1)
cd backend && npm start

# 7. Start the frontend (Terminal 2)
npm run dev
```

> **Note:** `init.sql` is mounted into the container's `/docker-entrypoint-initdb.d/` directory, so it runs automatically the first time the container is created. For a manual import later, use `mysql -h 127.0.0.1 -P 33007 -u root -p < init.sql`.

### Open in Browser

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3307](http://localhost:3307)
- **Admin Panel**: [http://localhost:5173/admin](http://localhost:5173/admin)

### Test Credentials

| Field | Value |
|-------|-------|
| Email | `admin@iglesia.com` |
| Password | `123456` |
| Role | `admin` |

---

## Available Scripts

### Frontend (root `package.json`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with HMR (port 5173) |
| `npm run build` | Generate production build in `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run the linter (OxLint) |

### Backend (`backend/package.json`)

| Command | Description |
|---------|-------------|
| `npm start` | Start Express server on port 3307 |
| `npm run dev` | Start Express server with hot-reload (tsx watch) |
| `npx tsx generarClave.ts` | Generate a bcrypt hash for a password |
| `npx tsx reseteo.ts` | Reset admin password to '123456' |

---

## Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Main page with hero and sections |
| `/horarios` | Schedule | Worship schedules (Sunday, Wednesday, Saturday) |
| `/quienes-somos` | About Us | Church history, mission, and values |
| `/pastores` | Pastors | Pastoral team with profiles |
| `/eventos` | Events | Upcoming events and activities |
| `/anexos` | Anexos | Church branches with info and resources |
| `/redes` | Social Media | Links to official social profiles |
| `/contacto` | Contact | Contact form and details |

### Protected Routes

| Route | Page | Requirement |
|-------|------|-------------|
| `/admin` | Admin Panel | Active session (valid JWT) |
| `/login` | Login | No active session |

### Route Protection Behavior

```
Unauthenticated user → /admin  → Redirects to /login
Authenticated user   → /login  → Redirects to /admin
```

---

## Authentication

### Flow

```
1. User enters email + password on /login
           ↓
2. Frontend sends POST /api/auth/login with credentials
           ↓
3. Backend looks up user by email in MySQL
           ↓
4. Backend compares password with bcrypt.compare()
           ↓
5. If valid: generates JWT (expires in 2 hours)
           ↓
6. Backend returns { token, user: { id, name, email, rol } }
           ↓
7. Frontend stores token + user in localStorage
           ↓
8. Frontend redirects to /admin
           ↓
9. ProtectedRoute verifies user in AuthContext
           ↓
10. ProtectedRoute renders the control panel (Admin.tsx)
```

### JWT Token

| Property | Value |
|----------|-------|
| Algorithm | HMAC-SHA256 |
| Expiry | 2 hours |
| Payload | `{ id, rol }` |
| Storage | Browser localStorage |

### Login Features

| Feature | Description |
|---------|-------------|
| Show/Hide password | Eye button with dynamic icon (bi-eye / bi-eye-slash) and scale animation |
| Remember email | Checkbox that saves the email in localStorage |
| HTML5 Validation | Required fields, valid email, min 6 characters |
| Error shake | Shake animation on failed login |
| Spinner | Circular loading indicator during submission |
| Auto redirect | Redirects to /admin if already authenticated |

### Security

| Measure | Implementation |
|---------|----------------|
| Password hashing | bcrypt with salt rounds |
| JWT tokens | 2-hour expiry, minimal payload |
| SQL Injection | Parameterized queries (`?`) in all queries |
| Frontend | Password never stored in plain text |
| Persistence | localStorage (acceptable for internal apps) |

---

## API Reference

### Base URL

```
http://localhost:3307
```

> **Tip:** In development the frontend proxies `/api/*` to this address, so relative paths like `/api/eventos` work from the browser.

### Endpoints Overview

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/health` | No | Health check (verifies DB connectivity) |
| `POST` | `/api/auth/login` | No | Authenticates and returns a JWT |
| `GET` | `/api/eventos` | No | Lists all events |
| `POST` | `/api/eventos` | JWT | Creates an event (optional image upload) |
| `PUT` | `/api/eventos/:id` | JWT | Updates an event (optional image upload) |
| `DELETE` | `/api/eventos/:id` | JWT | Deletes an event |
| `GET` | `/api/pastores` | No | Lists all pastors |
| `POST` | `/api/pastores` | JWT | Creates a pastor (optional photo upload) |
| `PUT` | `/api/pastores/:id` | JWT | Updates a pastor (optional photo upload) |
| `DELETE` | `/api/pastores/:id` | JWT | Deletes a pastor |
| `POST` | `/api/mensajes` | No | Sends a contact message |
| `GET` | `/api/mensajes` | JWT | Lists contact messages (newest first) |
| `DELETE` | `/api/mensajes/:id` | JWT | Deletes a message |
| `GET` | `/api/anuncios` | No | Lists all announcements |
| `POST` | `/api/anuncios` | JWT | Creates an announcement (optional image upload) |
| `PUT` | `/api/anuncios/:id` | JWT | Updates an announcement (optional image upload) |
| `DELETE` | `/api/anuncios/:id` | JWT | Deletes an announcement |
| `GET` | `/api/recursos` | No | Lists downloadable resources |
| `POST` | `/api/recursos` | JWT | Creates a resource (required file upload) |
| `PUT` | `/api/recursos/:id` | JWT | Updates a resource (optional file upload) |
| `DELETE` | `/api/recursos/:id` | JWT | Deletes a resource |
| `GET` | `/uploads/*` | No | Serves uploaded files (images/PDFs) |

#### `GET /api/health`

**Success Response (200):**

```json
{ "status": "ok" }
```

---

#### `GET /api/eventos`

Returns all church events.

**Success Response (200):**

```json
[
  {
    "id": 1,
    "titulo": "Youth Conference",
    "descripcion": "Special event for church youth",
    "fecha": "2026-07-20T10:00:00.000Z",
    "lugar": "Main Auditorium",
    "imagen_url": "https://..."
  }
]
```

---

#### `POST /api/auth/login`

Authenticates a user with email and password.

**Request body:**

```json
{
  "email": "admin@iglesia.com",
  "password": "123456"
}
```

**Success Response (200):**

```json
{
  "message": "Welcome",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Gerar Admin",
    "email": "admin@iglesia.com",
    "rol": "admin"
  }
}
```

**Error Responses:**

| Code | Cause |
|------|-------|
| `400` | Missing email or password fields |
| `401` | User not found or incorrect password |
| `500` | Internal server error |

---

#### `POST /api/eventos` (Protected)

Creates a new event. Requires a valid JWT token.

**JSON request body:**

```json
{
  "titulo": "Youth Retreat",
  "descripcion": "A weekend of fellowship and spiritual growth",
  "fecha": "2026-08-15 09:00:00",
  "lugar": "Retreat Center",
  "imagen_url": "https://..."
}
```

**Multipart alternative:** send the same fields as `multipart/form-data` and include an `imagen` file (max 5 MB, image only) instead of `imagen_url`. The file is stored under `backend/uploads/` and served at `/uploads/<filename>`.

---

#### `PUT /api/eventos/:id` (Protected)

Updates an existing event. Requires a valid JWT token.

---

#### `DELETE /api/eventos/:id` (Protected)

Deletes an event. Requires a valid JWT token.

---

#### `GET /api/pastores`

Returns all pastors and leaders of the church.

**Success Response (200):**

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

#### `POST /api/pastores` (Protected)

Creates a new pastor/leader record. Requires a valid JWT token. Accepts JSON (`nombre`, `cargo`, `biografia`, `foto_url`) or `multipart/form-data` with a `foto` file.

---

#### `PUT /api/pastores/:id` (Protected)

Updates an existing pastor record. Requires a valid JWT token.

---

#### `DELETE /api/pastores/:id` (Protected)

Deletes a pastor record. Requires a valid JWT token.

---

#### `POST /api/mensajes`

Sends a message from the public contact form. No authentication required.

**Request body:**

```json
{
  "nombre": "John Doe",
  "email": "john@example.com",
  "asunto": "Prayer request",
  "mensaje": "Please pray for my family."
}
```

**Success Response (201):**

```json
{
  "id": 3,
  "nombre": "John Doe",
  "email": "john@example.com",
  "asunto": "Prayer request",
  "mensaje": "Please pray for my family."
}
```

---

#### `GET /api/mensajes` (Protected)

Returns all messages from the contact form (ordered by date descending). Requires a valid JWT token.

---

#### `DELETE /api/mensajes/:id` (Protected)

Deletes a message. Requires a valid JWT token.

---

#### `GET /api/anuncios`

Returns all announcements (ordered by creation date descending).

---

#### `POST /api/anuncios` (Protected)

Creates an announcement. Requires a valid JWT token. Accepts JSON (`titulo`, `descripcion`, `imagen_url`) or `multipart/form-data` with an `imagen` file.

---

#### `PUT /api/anuncios/:id` (Protected)

Updates an announcement. Requires a valid JWT token.

---

#### `DELETE /api/anuncios/:id` (Protected)

Deletes an announcement. Requires a valid JWT token.

---

#### `GET /api/recursos`

Returns all downloadable resources (ordered by creation date descending).

---

#### `POST /api/recursos` (Protected)

Creates a resource. Requires a valid JWT token. Must be sent as `multipart/form-data` with the fields `titulo`, `tipo` and an `archivo` file (image or PDF, max 5 MB).

---

#### `PUT /api/recursos/:id` (Protected)

Updates a resource. Requires a valid JWT token.

---

#### `DELETE /api/recursos/:id` (Protected)

Deletes a resource. Requires a valid JWT token.

---

## Database

### Tables

| Table | Description | Key Columns |
|-------|-------------|-------------|
| `usuarios` | Admin users | id, email, password (bcrypt hash), nombre, rol |
| `eventos` | Church events | id, titulo, descripcion, fecha, lugar, imagen_url |
| `pastores` | Pastors and leaders | id, nombre, cargo, biografia, foto_url |
| `horarios` | Worship schedules | id, dia, hora, actividad |
| `mensajes_contacto` | Contact form messages | id, nombre, email, mensaje, fecha_envio |
| `anuncios` | Announcements | id, titulo, descripcion, imagen_url, fecha_creacion |
| `recursos` | Downloadable resources | id, titulo, descripcion, tipo, archivo_url, fecha_creacion |

> **Note:** `init.sql` currently seeds the first five tables. The `anuncios` and `recursos` tables (used by the announcements and resources modules) need to be added to `init.sql` so they are created automatically with Docker. See [Contributing](#contributing) if you'd like to help keep this in sync.

### Test User

| Field | Value |
|-------|-------|
| Email | `admin@iglesia.com` |
| Password | `123456` |
| Role | `admin` |

---

## Scroll Animations

The project uses an animation system based on `IntersectionObserver`:

### Available Animation Types

| `data-animate` Attribute | Effect |
|---------------------------|--------|
| `fade-in-up` | Element appears from below |
| `fade-in-down` | Element appears from above |
| `fade-in-left` | Element appears from the left |
| `fade-in-right` | Element appears from the right |
| `scale-in` | Element appears with scale effect |

### Delay Classes

Combine with `delay-1`, `delay-2`, `delay-3`, `delay-4` classes for staggered effects:

```html
<div data-animate="fade-in-up" className="delay-1">...</div>
```

### Custom Hook: `useScrollAnimations`

Located at `src/hooks/useScrollAnimations.ts`. It handles:

- Observing all elements with `data-animate` in the DOM
- Adding the `animated` class when they enter the viewport
- Cleaning up the observer on unmount or route change

---

## Configuration

### OxLint (`.oxlintrc.json`)

Linter configured with React plugins and Oxc rules:

- `react/rules-of-hooks`: Error — ensures correct hook usage
- `react/only-export-components`: Warning — limits exports to components

### Prettier (`.prettierrc`)

| Option | Value |
|--------|-------|
| Single quotes | No |
| Indentation | 4 spaces |
| Trailing commas | ES5 style |
| Line width | 120 characters |
| Line ending | LF |

### EditorConfig (`.editorconfig`)

Unified editor configuration: space indentation, UTF-8 charset, and whitespace trimming.

### Vite (`vite.config.ts`)

- **Plugin**: `@vitejs/plugin-react` for JSX and Fast Refresh
- **Proxy**: `/api` → `http://localhost:3307` (redirects requests to the backend)

### Docker Compose (`docker-compose.yml`)

- **Service**: MySQL 8.0
- **Port**: 33007 (host) mapped to 3306 (container)
- **Database**: `iglesia_db` (auto-created with `init.sql` on first start)
- **Persistent Volume**: Data survives container restarts
- **Container name**: `mysql-proyecto-iglesia`

### Color Palette

| Group | Colors | Usage |
|-------|--------|-------|
| Forest green | `#0a1f12` → `#52b788` | Hero background, navbar, footer, main sections |
| Gold | `#b8942e` → `#e8cf7a` | Primary buttons, accents, decorative borders |
| Neutrals | `#f8faf7` → `#2d2d2d` | Text, backgrounds, borders, shadows |

### Typography

| Font | Usage |
|------|-------|
| [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) | Titles and headings (elegant serif) |
| [Inter](https://fonts.google.com/specimen/Inter) | Body text (readable sans-serif) |

---

## Troubleshooting

### Backend won't connect to MySQL

- Verify Docker is running: `docker ps`
- Check that `.env` variables are correct (`DB_HOST`, `DB_PORT=33007`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)
- Confirm the MySQL container is running: `docker logs mysql-proyecto-iglesia`
- If the container didn't start, check logs: `docker-compose logs db`

### Frontend shows CORS errors

- Verify the Vite proxy is configured in `vite.config.ts` (target port 3307)
- Ensure the backend is running on port 3307
- Check `CORS_ORIGIN` in `.env` includes your frontend origin (`http://localhost:5173`)

### Styles not applying correctly

- Run `npm run lint` to check for syntax errors
- Verify `styles.css` is imported in `main.tsx`
- Make sure the dev server was restarted after changing `tailwind.config.js`

### Authentication fails

- Check that `JWT_SECRET` is defined in `.env`
- Ensure the password hash is correctly generated with `npx tsx generarClave.ts` (from the `backend/` directory)
- If you forgot the password, run `npx tsx reseteo.ts` to reset it to '123456' (from the `backend/` directory)
- Check backend logs for detailed errors

### File uploads fail or return errors

- Only images and PDFs are allowed (max 5 MB per file)
- Verify the `backend/uploads/` directory exists and is writable
- Check the `files.size` limit if you need larger files

### Docker won't start MySQL

- Verify Docker Desktop is running
- If port 33007 is occupied, change the mapping in `docker-compose.yml`
- For a clean restart (also re-runs `init.sql`): `docker-compose down -v && docker-compose up -d`

---

## Roadmap

### Implemented

- [x] Public pages (Home, Schedule, About Us, Pastors, Events, Anexos, Social Media, Contact)
- [x] Admin panel with JWT authentication and route protection
- [x] Dynamic dashboard with real statistics and premium design (Glassmorphism)
- [x] Full CRUD for events from the admin panel (with image upload)
- [x] Full CRUD for pastors and leaders from the admin panel (with photo upload)
- [x] Full CRUD for announcements from the admin panel (with image upload)
- [x] Full CRUD for resources (PDFs) from the admin panel (with file upload)
- [x] Inbox message manager
- [x] File uploads with Multer (images for events/pastors/announcements, PDFs for resources)
- [x] Full-screen hero carousel (Swiper) with CTAs linking to internal pages
- [x] Login with password toggle, remember email, and validation
- [x] Scroll animations with IntersectionObserver
- [x] Responsive design with 3 breakpoints
- [x] Smart navbar and dynamic footer
- [x] Interactive events carousel with Swiper (responsive breakpoints, autoplay, pagination, navigation arrows)
- [x] Docker Compose for quick MySQL deployment
- [x] Detailed comments throughout the project
- [x] Full TypeScript migration: all 25 frontend files (components, pages, context, entry points) converted from `.jsx` to `.tsx` with interfaces, typed props, and typed state
- [x] JSX syntax fixes: moved comments inside root elements to prevent parse errors in Login, Footer, ContactSection, and AuthContext
- [x] Admin sidebar header redesign: responsive logo (max-width 130px) and styled subtitle with uppercase text and letter-spacing

### Upcoming

- [ ] Add `anuncios` and `recursos` tables to `init.sql` so they are auto-created with Docker
- [ ] Schedule management from the admin panel
- [ ] Image upload to CDN
- [ ] Pagination and dynamic search in admin event lists
- [ ] Public gallery section with lightbox
- [ ] Image optimization, WebP formats, and lazy loading
- [ ] PWA (Progressive Web App) for mobile installation
- [ ] Unit and integration tests (Jest + Testing Library)

---

## Contributing

1. Create a branch for your feature: `git checkout -b feature/new-feature`
2. Commit your changes: `git commit -m "Add new feature"`
3. Push to the branch: `git push origin feature/new-feature`
4. Open a Pull Request

### Code Conventions

- Use **OxLint** for linting: `npm run lint`
- Format with **Prettier** before committing
- Follow the existing folder structure: `components/`, `pages/`, `hooks/`, `context/`
- Use CSS custom properties (variables) instead of hardcoded values
- Comment only what's necessary — prefer self-documenting code

---

## License

This project is for institutional use of Iglesia Asamblea de Dios.

---

<div align="center">
  
  **Developed with love** — Iglesia Asamblea de Dios
  <br><br>

  <img src="public/img/logo-oficial.png" alt="Logo Asamblea de Dios" width="250" />

</div>
