# Iglesia Asamblea de Dios - Sitio Web

Sitio web institucional de la Iglesia Asamblea de Dios, desarrollado con React y Vite. Ofrece información sobre horarios de culto, eventos, pastores, quiénes somos y datos de contacto.

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Configuración del proyecto](#configuración-del-proyecto)

## Características

- **Inicio**: Página principal con presentación de la iglesia y secciones destacadas.
- **Horarios**: Información sobre los horarios de culto y servicios.
- **Quiénes Somos**: Descripción de la historia y misión de la iglesia.
- **Pastores**: Perfiles del equipo pastoral.
- **Eventos**: Calendario de eventos y actividades de la iglesia.
- **Contacto**: Formulario y datos de contacto de la congregación.
- **Diseño responsive**: Compatible con dispositivos móviles, tablets y escritorio.
- **Navegación SPA**: Enrutamiento fluido sin recargas de página con React Router.

## Tecnologías

| Tecnología | Versión | Descripción |
|---|---|---|
| [React](https://react.dev/) | ^19.2.7 | Biblioteca para interfaces de usuario |
| [Vite](https://vite.dev/) | ^8.1.1 | Herramienta de desarrollo y bundler |
| [React Router](https://reactrouter.com/) | ^7.18.1 | Enrutamiento SPA |
| [Bootstrap](https://getbootstrap.com/) | ^5.3.8 | Framework CSS |
| [React Bootstrap](https://react-bootstrap.github.io/) | ^2.10.10 | Componentes Bootstrap para React |
| [Bootstrap Icons](https://icons.getbootstrap.com/) | ^1.13.1 | Iconos |
| [OxLint](https://oxc.rs/) | ^1.71.0 | Linter ultrarrápido |

## Estructura del proyecto

```
Pagina-Iglesia/
├── public/
│   ├── img/              # Imágenes públicas (logo, etc.)
│   ├── js/               # Scripts estáticos
│   └── icons.svg         # Iconos SVG
├── src/
│   ├── assets/           # Recursos importados por el bundler
│   ├── components/       # Componentes reutilizables
│   │   ├── Layout.jsx        # Layout principal con Outlet
│   │   ├── NavBar.jsx        # Barra de navegación
│   │   ├── Footer.jsx        # Pie de página
│   │   ├── PageHeader.jsx    # Encabezado de páginas internas
│   │   ├── ScheduleSection.jsx
│   │   ├── AboutSection.jsx
│   │   ├── PastorsSection.jsx
│   │   ├── EventsSection.jsx
│   │   └── ContactSection.jsx
│   ├── pages/            # Páginas/rutas de la aplicación
│   │   ├── Home.jsx
│   │   ├── Horarios.jsx
│   │   ├── QuienesSomos.jsx
│   │   ├── Pastores.jsx
│   │   ├── Eventos.jsx
│   │   └── Contacto.jsx
│   ├── styles/           # Hojas de estilos
│   │   └── styles.css
│   ├── App.jsx           # Definición de rutas
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── src_legacy/           # Código legado (referencia)
├── index.html            # HTML de entrada
├── vite.config.js        # Configuración de Vite
├── .oxlintrc.json        # Configuración de OxLint
├── .prettierrc           # Configuración de Prettier
└── .editorconfig         # Configuración del editor
```

## Rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Página principal |
| `/horarios` | Horarios | Horarios de culto |
| `/quienes-somos` | Quiénes Somos | Historia y misión |
| `/pastores` | Pastores | Equipo pastoral |
| `/eventos` | Eventos | Eventos de la iglesia |
| `/contacto` | Contacto | Datos de contacto |

## Requisitos previos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd Pagina-Iglesia
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:

   ```bash
   npm run dev
   ```

4. Abrir en el navegador: [http://localhost:5173](http://localhost:5173)

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera el build de producción en `dist/` |
| `npm run preview` | Vista previa del build de producción |
| `npm run lint` | Ejecuta el linter (OxLint) |

## Configuración del proyecto

### OxLint (`.oxlintrc.json`)

Linter configurado con plugins de React y reglas de Oxc:

- `react/rules-of-hooks`: Error — garantiza el uso correcto de hooks.
- `react/only-export-components`: Warning — limita exports a componentes.

### Prettier (`.prettierrc`)

- Comas simples: no
- Indentación: 4 espacios
- Comas trailing: estilo ES5
- Ancho de línea: 120 caracteres
- Salto de línea: LF

### EditorConfig (`.editorconfig`)

Configuración unificada para editores: indentación por espacios, charset UTF-8 y limpieza de espacios en blanco.
