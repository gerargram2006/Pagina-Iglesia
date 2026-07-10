# Iglesia Asamblea de Dios — Sitio Web

Sitio web institucional de la Iglesia **Asamblea de Dios**. Plataforma informativa disenada para conectar a la comunidad con las actividades, horarios de culto, eventos y ensenanzas de la iglesia. Incluye animaciones por scroll, navbar con efecto glassmorphism, formulario con feedback visual, optimizacion SEO y iconografia con Bootstrap Icons.

## Estructura del proyecto

```
├── README.md
└── src/
    ├── img/
    │   └── LogoAD.PNG              # Logotipo principal de la iglesia
    ├── js/
    │   └── animations.js           # Animaciones e interactividad (IntersectionObserver)
    ├── styles/
    │   └── styles.css              # Estilos globales + animaciones CSS
    ├── index.html                  # Pagina principal (hero, resumen de todo)
    ├── horarios.html               # Horarios de culto detallados
    ├── quienes-somos.html          # Historia, mision y valores
    ├── pastores.html               # Liderazgo pastoral
    ├── eventos.html                # Proximos eventos
    └── contacto.html               # Info de contacto + formulario
```

## Paginas

| Pagina | Archivo | Descripcion |
|--------|---------|-------------|
| Inicio | `index.html` | Hero a pantalla completa con resumen de horarios, quienes somos, pastores, eventos y contacto |
| Horarios de Culto | `horarios.html` | Tarjetas con los dias y horarios de las reuniones semanales |
| Quienes Somos | `quienes-somos.html` | Texto institucional + tarjetas de valores (Fe, Amor, Servicio) |
| Nuestros Pastores | `pastores.html` | Presentacion del liderazgo pastoral |
| Proximos Eventos | `eventos.html` | Lista de proximas actividades con fecha destacada |
| Contacto | `contacto.html` | Datos de contacto + formulario de envio de mensajes |

## Caracteristicas

### Diseno
- **Responsivo** — Se adapta a escritorio, tablet y movil via Bootstrap 5 y media queries
- **Paleta institucional** — Verde bosque (#2d6a4f) con acentos dorados (#c9a84c)
- **Tipografia** — Playfair Display para titulos, Inter para cuerpo de texto
- **Bootstrap Icons** — Iconografia vectorial para valores, pastores, contacto y redes sociales

### SEO y Redes Sociales
- **Meta description** — Descripcion unica por pagina para motores de busqueda
- **Meta robots** — Indice y sigue en todas las paginas
- **Open Graph** — Tags `og:title`, `og:description`, `og:image`, `og:url` para compartir en Facebook, LinkedIn, WhatsApp
- **Twitter Cards** — Tags `twitter:card`, `twitter:title`, `twitter:description` para compartir en Twitter/X

### Accesibilidad
- **aria-label** — Iconos de redes sociales con descripcion para lectores de pantalla
- **alt text** — Descripcion en todas las imagenes del logo
- **estructura semantica** — Uso correcto de `header`, `main`, `section`, `footer`, `nav`

### Animaciones (IntersectionObserver)
- **Scroll animations** — Elementos aparecen con fade-in-up, fade-in-down, fade-in-left, fade-in-right o scale-in al entrar en viewport
- **Retrasos escalonados** — Clases `.delay-1` a `.delay-6` para animar elementos en secuencia
- **Hero entrance** — Entrada escalonada del hero: titulo, parrafo, botones
- **Page header entrance** — Titulo desliza desde arriba, subtitulo desde abajo en subpaginas

### Interactividad (JavaScript)
- **Navbar glassmorphism** — Al hacer scroll > 50px, la navbar obtiene fondo semi-transparente con blur y sombra
- **Menu mobile auto-close** — En mobile, al tocar un enlace del menu se cierra automaticamente
- **Nav link activo** — Resalta el enlace de la pagina actual con subrayado dorado
- **Formulario con feedback** — Al enviar muestra "Enviando...", luego resetea y muestra mensaje de exito por 4 segundos
- **Boton deshabilitado** — Estado visual con opacidad reducida y cursor not-allowed durante el envio

### Componentes UI
- **Cards** — Tarjetas de horarios, pastores, valores con hover y sombra
- **Event items** — Lista de eventos con bloque de fecha destacado
- **Contact info** — Datos de contacto con iconos Bootstrap Icons
- **Footer** — Marca, enlaces rapidos e iconos de redes sociales (Facebook, Instagram, YouTube)

## Tecnologias

| Tecnologia | Version | Uso |
|------------|---------|-----|
| HTML5 | - | Estructura semantica de las 6 paginas |
| CSS3 | - | Estilos con variables, Flexbox, Grid, animaciones keyframes, transiciones |
| Bootstrap | 5.3.3 | Grid responsive, collapse del navbar, utilidades |
| Bootstrap Icons | 1.11.3 | Iconografia vectorial (valores, pastores, contacto, redes) |
| JavaScript | ES6+ | IntersectionObserver, manejo de formularios, manipulacion del DOM |
| Google Fonts | - | Playfair Display (titulos) + Inter (cuerpo) |

## Iconografia (Bootstrap Icons)

Los emojis fueron reemplazados por iconos SVG de Bootstrap Icons para mejor consistencia visual:

| Seccion | Icono | Clase CSS |
|---------|-------|-----------|
| Fe | Cruz | `<svg>` personalizado (bi-cross) |
| Amor | Corazon | `bi-heart-fill` |
| Servicio | Handshake | `bi-handshake-fill` |
| Pastor | Biblia | `bi-book-half` |
| Pastora | Persona | `bi-person-heart` |
| Direccion | Ubicacion | `bi-geo-alt-fill` |
| Telefono | Telefono | `bi-telephone-fill` |
| Email | Sobre | `bi-envelope-fill` |
| Facebook | Facebook | `bi-facebook` |
| Instagram | Instagram | `bi-instagram` |
| YouTube | YouTube | `bi-youtube` |

## SEO — Metatags por Pagina

Cada pagina incluye metatags personalizados:

```html
<!-- SEO Basico -->
<meta name="description" content="Descripcion unica de la pagina...">
<meta name="robots" content="index, follow">

<!-- Open Graph (redes sociales) -->
<meta property="og:type" content="website">
<meta property="og:title" content="Titulo - Iglesia Asamblea de Dios">
<meta property="og:description" content="Descripcion para compartir...">
<meta property="og:image" content="img/LogoAD.PNG">
<meta property="og:url" content="pagina.html">
<meta property="og:site_name" content="Asamblea de Dios">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Titulo - Iglesia Asamblea de Dios">
<meta name="twitter:description" content="Descripcion para Twitter...">
<meta name="twitter:image" content="img/LogoAD.PNG">
```

## Sistema de animaciones

Los elementos se animan al hacer scroll usando el atributo `data-animate`:

```html
<!-- Fade desde la izquierda -->
<div data-animate="fade-in-left">...</div>

<!-- Escalado con retraso -->
<div data-animate="scale-in" class="delay-2">...</div>
```

### Tipos disponibles

| `data-animate` | Efecto |
|----------------|--------|
| `fade-in-up` | Desliza hacia arriba + fade (por defecto) |
| `fade-in-down` | Desliza hacia abajo + fade |
| `fade-in-left` | Desliza desde la izquierda + fade |
| `fade-in-right` | Desliza desde la derecha + fade |
| `scale-in` | Escala de 0.85 a 1 + fade |

### Clases de retraso

| Clase | Delay |
|-------|-------|
| `.delay-1` | 0.1s |
| `.delay-2` | 0.2s |
| `.delay-3` | 0.3s |
| `.delay-4` | 0.4s |
| `.delay-5` | 0.5s |
| `.delay-6` | 0.6s |

## Como usar

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   ```
2. Abre `src/index.html` en tu navegador.

No requiere servidor de desarrollo — funciona directamente en el navegador.

## Responsividad

| Dispositivo | Comportamiento |
|------------|----------------|
| Escritorio (>768px) | Layout completo en grid, navbar horizontal, 3 columnas |
| Tablet (768px-576px) | 2 columnas en cards, navbar horizontal |
| Movil (<576px) | Menu hamburguesa, columnas apiladas, tipografia escalada con `clamp()`, eventos apilados verticalmente |

## Colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `--primary` | `#2d6a4f` | Verde bosque — titulos, bordes, fondos |
| `--primary-light` | `#40916c` | Verde claro — gradientes |
| `--accent` | `#c9a84c` | Dorado — botones, links hover, acentos |
| `--accent-hover` | `#b8942e` | Dorado oscuro — hover de botones |
| `--bg-dark` | `#0a1f12` | Verde muy oscuro — hero, footer, navbar scrolled |
| `--bg-light` | `#f4f7f3` | Gris verdoso — secciones alternadas |
| `--text` | `#2d2d2d` | Texto principal |
| `--text-light` | `#6b7280` | Texto secundario |

## Licencia

Este proyecto es de uso libre para fines ministeriales y educativos.
