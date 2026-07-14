/**
 * Página Home - Página principal de la iglesia.
 *
 * Es la primera página que ven los usuarios al acceder al sitio.
 * Combina el NavBar con un hero a pantalla completa y todas las
 * secciones principales de la iglesia en una sola página.
 *
 * Estructura:
 *   1. <header class="hero"> → Sección hero a pantalla completa con imagen de fondo
 *      - <NavBar /> → Barra de navegación sobre el fondo oscuro
 *      - Contenido del hero: título, subtítulo y botones de acción
 *   2. <main> → Secciones de contenido
 *      - ScheduleSection  → Horarios de culto
 *      - AboutSection     → Quiénes Somos (con imagen)
 *      - GallerySection   → Galería de fotos
 *      - PastorsSection   → Pastores (con fotos)
 *      - EventsSection    → Próximos eventos (con thumbnails)
 *      - CTASection       → Llamado a la acción visual
 *      - ContactSection   → Formulario de contacto
 *
 * Nota: Cada sección tiene un id que permite enlaces internos
 *       desde el hero (ej: #horarios, #contacto).
 */
// Importa el componente de barra de navegación
import NavBar from '../components/NavBar';
// Importa la sección de horarios de culto
import ScheduleSection from '../components/ScheduleSection';
// Importa la sección "Quiénes Somos" de la iglesia
import AboutSection from '../components/AboutSection';
// Importa la sección de galería de fotos
import GallerySection from '../components/GallerySection';
// Importa la sección que muestra a los pastores
import PastorsSection from '../components/PastorsSection';
// Importa la sección de eventos próximos
import EventsSection from '../components/EventsSection';
// Importa la sección de llamado a la acción
import CTASection from '../components/CTASection';
// Importa la sección de contacto con formulario
import ContactSection from '../components/ContactSection';

// Define y exporta el componente funcional Home como componente principal del sitio
export default function Home() {
    // Retorna el JSX que renderiza toda la página
    return (
        // Fragmento React para envolver múltiples elementos sin nodos extra en el DOM
        <>
            {/* Hero a pantalla completa con navegación e imagen de fondo */}
            <header className="hero">
                {/* Partículas flotantes decorativas (CSS puro) */}
                <div className="hero-floating-shapes" aria-hidden="true">
                    <span className="hero-shape hero-shape-1"></span>
                    <span className="hero-shape hero-shape-2"></span>
                    <span className="hero-shape hero-shape-3"></span>
                    <span className="hero-shape hero-shape-4"></span>
                </div>
                {/* Renderiza la barra de navegación sobre el hero */}
                <NavBar />
                {/* Sección de contenido del hero con id para enlace interno desde navbar */}
                <section id="inicio" className="hero-content">
                    {/* Contenedor centrado que limita el ancho del contenido del hero */}
                    <div className="container">
                        {/* Badge decorativo arriba del título */}
                        <span className="hero-badge">✦ Una comunidad de fe ✦</span>
                        {/* Título principal de bienvenida con salto de línea para mobile */}
                        <h1>Bienvenidos a la Iglesia<br/>Asamblea de Dios</h1>
                        {/* Párrafo descriptivo con el lema de la comunidad */}
                        <p>Una comunidad de fe, esperanza y servicio dedicada a llevar el mensaje de Dios a cada corazón.</p>
                        {/* Contenedor de los botones de acción del hero */}
                        <div className="hero-buttons">
                            {/* Botón primario que enlaza a la sección de horarios */}
                            <a href="#horarios" className="btn btn-primary">Nuestros Horarios</a>
                            {/* Botón secundario que enlaza a la sección de contacto */}
                            <a href="#contacto" className="btn btn-secondary">Contáctanos</a>
                        </div>
                    </div>
                </section>
                {/* Indicador de scroll */}
                <div className="hero-scroll-indicator" aria-hidden="true">
                    <span className="hero-scroll-mouse">
                        <span className="hero-scroll-dot"></span>
                    </span>
                </div>
            </header>

            {/* Secciones de contenido */}
            <main>
                {/* Sección de horarios de culto */}
                <ScheduleSection />
                {/* Sección de historia y misión de la iglesia (con imagen) */}
                <AboutSection />
                {/* Galería de fotos de la comunidad */}
                <GallerySection />
                {/* Sección del equipo pastoral (con fotos) */}
                <PastorsSection />
                {/* Sección de eventos próximos (con thumbnails) */}
                <EventsSection />
                {/* Llamado a la acción visual */}
                <CTASection />
                {/* Sección de contacto y formulario */}
                <ContactSection />
            </main>
        </>
    );
}
