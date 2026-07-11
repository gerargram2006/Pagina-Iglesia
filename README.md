# Iglesia Asamblea de Dios - Sitio Web

Sitio web institucional de la Iglesia Asamblea de Dios, desarrollado con React y Vite. Ofrece información sobre horarios de culto, eventos, pastores, quiénes somos y datos de contacto.

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Rutas](#rutas)
- [Animaciones](#animaciones)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Configuración del proyecto](#configuración-del-proyecto)

## Características

- **Inicio**: Página principal con hero a pantalla completa y secciones destacadas.
- **Horarios**: Información sobre los horarios de culto y servicios.
- **Quiénes Somos**: Descripción de la historia, misión y valores de la iglesia.
- **Pastores**: Perfiles del equipo pastoral con imágenes placeholder.
- **Eventos**: Lista cronológica de próximos eventos y actividades.
- **Contacto**: Formulario de contacto y datos de la congregación.
- **Diseño responsive**: Compatible con dispositivos móviles, tablets y escritorio.
- **Navegación SPA**: Enrutamiento fluido sin recargas de página con React Router.
- **Animaciones de scroll**: Elementos animados al hacer scroll con IntersectionObserver.
- **Footer persistente**: Pie de página visible en todas las rutas.

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
│   │   ├── Layout.jsx        # Layout principal con Outlet y Footer
│   │   ├── NavBar.jsx        # Barra de navegación responsiva
│   │   ├── Footer.jsx        # Pie de página con enlaces y redes sociales
│   │   ├── PageHeader.jsx    # Encabezado de páginas internas
│   │   ├── ScheduleSection.jsx  # Tarjetas de horarios de culto
│   │   ├── AboutSection.jsx     # Sección "Quiénes Somos" con valores
│   │   ├── PastorsSection.jsx   # Tarjetas de pastores/líderes
│   │   ├── EventsSection.jsx    # Lista de próximos eventos
│   │   └── ContactSection.jsx   # Info de contacto + formulario
│   ├── pages/            # Páginas/rutas de la aplicación
│   │   ├── Home.jsx           # Página principal (hero + secciones)
│   │   ├── Horarios.jsx       # Página de horarios
│   │   ├── QuienesSomos.jsx   # Página "Quiénes Somos"
│   │   ├── Pastores.jsx       # Página de pastores
│   │   ├── Eventos.jsx        # Página de eventos
│   │   └── Contacto.jsx       # Página de contacto
│   ├── hooks/
│   │   └── useScrollAnimations.js  # Hook de animaciones scroll
│   ├── styles/
│   │   └── styles.css         # Estilos globales del proyecto
│   ├── App.jsx           # Definición de rutas
│   └── main.jsx          # Punto de entrada de la app
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

## Animaciones

El proyecto usa un sistema de animaciones de scroll basado en `IntersectionObserver`:

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

### Paleta de colores

El proyecto usa una paleta de colores personalizada definida en CSS custom properties:

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
