// Importa los componentes de secciones que conforman la página de inicio
import NavBar from '../components/NavBar';          // Barra de navegación
import ScheduleSection from '../components/ScheduleSection'; // Sección de horarios
import AboutSection from '../components/AboutSection';     // Sección "Quiénes Somos"
import GallerySection from '../components/GallerySection'; // Sección de galería
import PastorsSection from '../components/PastorsSection'; // Sección de pastores
import EventsSection from '../components/EventsSection';   // Sección de eventos
import CTASection from '../components/CTASection';         // Sección llamada a la acción
import ContactSection from '../components/ContactSection'; // Sección de contacto

/**
 * Home - Página de inicio del sitio
 * Estructura:
 * 1. Hero (header) con imagen de fondo,NavBar, título, subtítulo y botones
 * 2. Secciones de contenido: Horarios, Quiénes Somos, Galería, Pastores,
 *    Eventos, CTA y Contacto
 */
export default function Home() {
    return (
        <>
            {/* HERO: Sección principal con imagen de fondo hero-inicio.webp */}
            <header className="hero">
                {/* Formas decorativas flotantes (círculos con gradientes) - solo decorativas */}
                <div className="hero-floating-shapes" aria-hidden="true">
                    <span className="hero-shape hero-shape-1"></span>
                    <span className="hero-shape hero-shape-2"></span>
                    <span className="hero-shape hero-shape-3"></span>
                    <span className="hero-shape hero-shape-4"></span>
                </div>

                {/* NavBar se superpone al hero (posición absoluta) */}
                <NavBar />

                {/* Contenido principal del hero: título, descripción y botones */}
                <section id="inicio" className="hero-content">
                    <div className="container">
                        {/* Badge decorativo con texto */}
                        <span className="hero-badge">✦ Una comunidad de fe ✦</span>
                        {/* Título principal con saludo */}
                        <h1>Bienvenidos a la Iglesia<br/>Asamblea de Dios</h1>
                        {/* Descripción breve de la iglesia */}
                        <p>Una comunidad de fe, esperanza y servicio dedicada a llevar el mensaje de Dios a cada corazón.</p>
                        {/* Botones de acción: ver horarios y contactar */}
                        <div className="hero-buttons">
                            <a href="#horarios" className="btn btn-primary">Nuestros Horarios</a>
                            <a href="#contacto" className="btn btn-secondary">Contáctanos</a>
                        </div>
                    </div>
                </section>

                {/* Indicador de scroll (ícono de mouse animado) */}
                <div className="hero-scroll-indicator" aria-hidden="true">
                    <span className="hero-scroll-mouse">
                        <span className="hero-scroll-dot"></span>
                    </span>
                </div>
            </header>

            {/* CONTENIDO PRINCIPAL: Todas las secciones de la página */}
            <main>
                <ScheduleSection />    {/* Horarios de culto (Domingo, Miércoles, Sábado) */}
                <AboutSection />       {/* Quiénes Somos (historia, misión, valores) */}
                <GallerySection />     {/* Galería de fotos (Bento grid) */}
                <PastorsSection />     {/* Equipo pastoral (fotos y biografías) */}
                <EventsSection />      {/* Próximos eventos */}
                <CTASection />         {/* Llamado a la acción motivacional */}
                <ContactSection />     {/* Formulario de contacto */}
            </main>
        </>
    );
}
