# Iglesia Asamblea de Dios - Website

<div align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql&logoColor=white)
![License](https://img.shields.io/badge/License-Institutional-green?style=flat-square)

**Institutional website for Iglesia Asamblea de Dios**

A full-featured platform with an admin panel, event management,
pastoral team section, and JWT authentication system.

</div>

---

[English](README.md) | [Español](README.es.md) | [Português](README.pt.md)

---

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

- **Modern Frontend**: React 19 + Vite 8 with JSX and Fast Refresh
- **Solid Backend**: Node.js + Express 5 with JWT authentication
- **Database**: MySQL 8.0 running in Docker
- **Premium Design**: Glassmorphism, scroll animations, and fully responsive
- **Full CRUD**: Manage events, pastors, and messages from the admin panel

---

## Features

### Public Pages

| Page | Route | Description |
|------|-------|-------------|
| **Home** | `/` | Interactive hero with background image (hero-inicio.webp), floating shapes, scroll animations, and single-column layout |
| **Schedule** | `/horarios` | Dynamic cards with icons for Sunday, Wednesday, and Saturday services |
| **About Us** | `/quienes-somos` | 2-column layout with image, history, values, and metrics |
| **Gallery** | `/quienes-somos` | Bento grid with 6 photo slots for the congregation |
| **Pastors** | `/pastores` | Pastoral team profiles with real photos and decorative rings |
| **Events** | `/eventos` | Chronological list of upcoming events with thumbnails |
| **Anexos** | `/anexos` | Church branches/sedes with pastor, address, schedule and contact info |
| **CTA** | `/` (section) | Full-screen motivational banner with decorative particles |
| **Contact** | `/contacto` | Contact form and congregation details |

### Admin Panel

| Feature | Description |
|---------|-------------|
| **Secure Login** | Email/password form with visibility toggle, "Remember email", and JWT protection |
| **Premium Dashboard** | Interactive banner, dynamic greeting, real-time clock, and glassmorphism cards |
| **Statistics** | Dynamic metrics from the DB: total members, events, and messages |
| **Event Manager** | Full CRUD: table listing, create/edit modal, and deletion |
| **Pastoral Team** | Full CRUD: manage leaders (names, roles, bios, and photos) |
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
| [Vite](https://vite.dev/) | ^8.1.1 | Dev server and bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | SPA routing |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | CSS framework (grid, utilities) |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Bootstrap components for React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Icon library |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Ultra-fast linter |

### Backend

| Technology | Version | Description |
|------------|---------|-------------|
| [Node.js](https://nodejs.org/) | >= 18 | JavaScript runtime |
| [Express](https://expressjs.com/) | ^5.2.1 | Web framework for Node.js |
| [MySQL2](https://github.com/sidorares/node-mysql2) | ^3.22.6 | MySQL driver |
| [bcrypt](https://www.npmjs.com/package/bcrypt) | ^6.0.0 | Secure password hashing |
| [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) | ^9.0.3 | JWT generation and verification |
| [cors](https://www.npmjs.com/package/cors) | ^2.8.6 | Cross-Origin Resource Sharing |
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
│  React 19 + React Router 7 + Bootstrap 5       │
│  Port: 5173                                     │
│                                                 │
│  ┌───────────┐  ┌───────────┐  ┌─────────────┐ │
│  │   Pages    │  │Components │  │   Context   │ │
│  │ Home       │  │ NavBar    │  │ AuthContext  │ │
│  │ Login      │  │ Footer    │  │  (user,     │ │
│  │ Admin      │  │ Layout    │  │   token,    │ │
│  │ Schedule   │  │ PageHeader│  │   login,    │ │
│  │ Events...  │  │ 11 total  │  │   logout)   │ │
│  └───────────┘  └───────────┘  └─────────────┘ │
│                      │                          │
│              Vite Proxy (/api)                  │
└──────────────────────┼──────────────────────────┘
                       │
┌──────────────────────┼──────────────────────────┐
│               BACKEND (Express)                 │
│  Node.js + Express 5                            │
│  Port: 3000                                     │
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
│  Docker Container - Port 3306                   │
│  Database: iglesia_db                           │
│                                                 │
│  ┌──────────┐ ┌────────┐ ┌──────────┐          │
│  │ usuarios │ │eventos │ │ pastores │          │
│  ├──────────┤ ├────────┤ ├──────────┤          │
│  │ eventos  │ │horarios│ │ mensajes │          │
│  └──────────┘ └────────┘ └──────────┘          │
└─────────────────────────────────────────────────┘
```

---

## Project Structure

```
Pagina-Iglesia/
├── public/                    # Static files served by Vite
│   ├── img/                   # Public images (logo, etc.)
│   ├── js/                    # Static scripts (legacy)
│   └── icons.svg              # SVG icons
├── src/                       # React frontend source code
│   ├── api/                   # Centralized HTTP client
│   │   └── index.js           # fetchAPI function with auto JWT injection
│   ├── assets/                # Bundler-imported resources
│   │   └── hero.png
│   ├── components/            # 11 reusable components
│   │   ├── Layout.jsx         # Main layout with Outlet and Footer
│   │   ├── NavBar.jsx         # Responsive navbar with Glassmorphism
│   │   ├── Footer.jsx         # Footer with links, verse, and social media
│   │   ├── PageHeader.jsx     # Internal page header
│   │   ├── ScheduleSection.jsx# Worship schedule cards with icons
│   │   ├── AboutSection.jsx   # About section (2 columns + metrics)
│   │   ├── GallerySection.jsx # Photo gallery (6-slot Bento grid)
│   │   ├── PastorsSection.jsx # Pastor/leader cards (real photos)
│   │   ├── EventsSection.jsx  # Upcoming events list (with thumbnails)
│   │   ├── CTASection.jsx     # Call-to-action section with particles
│   │   └── ContactSection.jsx # Contact info + form
│   ├── context/
│   │   └── AuthContext.jsx    # Auth provider (login/logout/JWT)
│   ├── hooks/
│   │   └── useScrollAnimations.js # Scroll animation hook (IntersectionObserver)
│   ├── pages/                 # Application pages and routes
│   │   ├── admin/             # CRUD admin components
│   │   │   ├── AdminEventos.jsx
│   │   │   ├── AdminPastores.jsx
│   │   │   └── AdminMensajes.jsx
│   │   ├── Home.jsx           # Home page (hero + sections)
│   │   ├── Horarios.jsx       # Schedule page
│   │   ├── QuienesSomos.jsx   # About page
│   │   ├── Pastores.jsx       # Pastors page
│   │   ├── Eventos.jsx        # Events page
│   │   ├── Anexos.jsx         # Anexos/sedes page with branch info
│   │   ├── Contacto.jsx       # Contact page
│   │   ├── Login.jsx          # Login form
│   │   └── Admin.jsx          # Protected admin panel
│   ├── styles/
│   │   └── styles.css         # Global styles (~2540 lines)
│   ├── App.jsx                # Route definitions (Router + Auth)
│   └── main.jsx               # App entry point
├── backend/                   # Express server source code
│   ├── server.js              # Express server with API endpoints
│   ├── generarClave.js        # Utility to generate bcrypt hashes
│   ├── reseteo.js             # Utility to reset admin password
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   └── package.json           # Backend dependencies
├── index.html                 # Entry HTML for Vite
├── vite.config.js             # Vite configuration (API proxy, React plugin)
├── docker-compose.yml         # MySQL Docker configuration
├── init.sql                   # Database schema + seed data
├── .env                       # Environment variables (DO NOT commit)
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
# Edit .env with your MySQL credentials and JWT_SECRET

# 5. Start MySQL in Docker
docker-compose up -d

# 6. Initialize the database
mysql -u root -p < init.sql

# 7. Start the backend (Terminal 1)
cd backend && npm start

# 8. Start the frontend (Terminal 2)
npm run dev
```

### Open in Browser

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:3000](http://localhost:3000)

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
| `npm start` | Start Express server on port 3000 |
| `node generarClave.js` | Generate a bcrypt hash for a password |
| `node reseteo.js` | Reset admin password to '123456' |

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
10. Admin.jsx renders the control panel
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
http://localhost:3000
```

### Endpoints

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

**Request body:**

```json
{
  "titulo": "Youth Retreat",
  "descripcion": "A weekend of fellowship and spiritual growth",
  "fecha": "2026-08-15 09:00:00",
  "lugar": "Retreat Center",
  "imagen_url": "https://..."
}
```

---

#### `PUT /api/eventos/:id` (Protected)

Updates an existing event. Requires a valid JWT token.

---

#### `DELETE /api/eventos/:id` (Protected)

Deletes an event. Requires a valid JWT token.

---

#### `GET /api/pastores`

Returns all pastors and leaders of the church.

---

#### `POST /api/pastores` (Protected)

Creates a new pastor/leader record. Requires a valid JWT token.

---

#### `PUT /api/pastores/:id` (Protected)

Updates an existing pastor record. Requires a valid JWT token.

---

#### `DELETE /api/pastores/:id` (Protected)

Deletes a pastor record. Requires a valid JWT token.

---

#### `GET /api/mensajes` (Protected)

Returns all messages from the contact form (ordered by date descending). Requires a valid JWT token.

---

#### `DELETE /api/mensajes/:id` (Protected)

Deletes a message. Requires a valid JWT token.

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

Located at `src/hooks/useScrollAnimations.js`. It handles:

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

### Vite (`vite.config.js`)

- **Plugin**: `@vitejs/plugin-react` for JSX and Fast Refresh
- **Proxy**: `/api` → `http://localhost:3000` (redirects requests to the backend)

### Docker Compose (`docker-compose.yml`)

- **Service**: MySQL 8.0
- **Port**: 3307 (mapped to container's 3306)
- **Database**: `iglesia_db` (auto-created with `init.sql`)
- **Persistent Volume**: Data survives container restarts

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
- Check that `.env` variables are correct
- Confirm the MySQL container is on port 3307: `docker logs mysql-proyecto-iglesia`
- If the container didn't start, check logs: `docker-compose logs db`

### Frontend shows CORS errors

- Verify the Vite proxy is configured in `vite.config.js`
- Ensure the backend is running on port 3000

### Styles not applying correctly

- Run `npm run lint` to check for syntax errors
- Verify `styles.css` is imported in `main.jsx`

### Authentication fails

- Check that `JWT_SECRET` is defined in `.env`
- Ensure the password hash is correctly generated with `node generarClave.js`
- If you forgot the password, run `node reseteo.js` to reset it to '123456'
- Check backend logs for detailed errors

### Docker won't start MySQL

- Verify Docker Desktop is running
- If port 3307 is occupied, change the mapping in `docker-compose.yml`
- For a clean restart: `docker-compose down -v && docker-compose up -d`

---

## Roadmap

### Implemented

- [x] Public pages (Home, Schedule, About Us, Pastors, Events, Anexos, Contact)
- [x] Admin panel with JWT authentication and route protection
- [x] Dynamic dashboard with real statistics and premium design (Glassmorphism)
- [x] Full CRUD for events from the admin panel
- [x] Full CRUD for pastors and leaders from the admin panel
- [x] Inbox message manager
- [x] Login with password toggle, remember email, and validation
- [x] Scroll animations with IntersectionObserver
- [x] Responsive design with 3 breakpoints
- [x] Smart navbar and dynamic footer
- [x] Docker Compose for quick MySQL deployment
- [x] Detailed comments throughout the project

### Upcoming

- [ ] Schedule management from the admin panel
- [ ] Image upload to CDN or local storage for events/pastors
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

**Disconnected with love** — Iglesia Asamblea de Dios

</div>
