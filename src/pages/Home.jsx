/**
 * Página Home - Página principal de la iglesia.
 *
 * Es la primera página que ven los usuarios al acceder al sitio.
 * Combina el NavBar con un hero a pantalla completa y todas las
 * secciones principales de la iglesia en una sola página.
 *
 * Estructura:
 *   1. <header class="hero"> → Sección hero a pantalla completa
 *      - <NavBar /> → Barra de navegación sobre el fondo oscuro
 *      - Contenido del hero: título, subtítulo y botones de acción
 *   2. <main> → Secciones de contenido
 *      - ScheduleSection  → Horarios de culto
 *      - AboutSection     → Quiénes Somos
 *      - PastorsSection   → Pastores
 *      - EventsSection    → Próximos eventos
 *      - ContactSection   → Formulario de contacto
 *
 * Nota: Cada sección tiene un id que permite enlaces internos
 *       desde el hero (ej: #horarios, #contacto).
 */
import NavBar from '../components/NavBar';
import ScheduleSection from '../components/ScheduleSection';
import AboutSection from '../components/AboutSection';
import PastorsSection from '../components/PastorsSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
    return (
        <>
            {/* Hero a pantalla completa con navegación */}
            <header className="hero">
                <NavBar />
                <section id="inicio" className="hero-content">
                    <div className="container">
                        <h1>Bienvenidos a la Iglesia<br/>Asamblea de Dios</h1>
                        <p>Una comunidad de fe, esperanza y servicio dedicada a llevar el mensaje de Dios a cada corazón.</p>
                        <div className="hero-buttons">
                            <a href="#horarios" className="btn btn-primary">Nuestros Horarios</a>
                            <a href="#contacto" className="btn btn-secondary">Contáctanos</a>
                        </div>
                    </div>
                </section>
            </header>

            {/* Secciones de contenido */}
            <main>
                <ScheduleSection />
                <AboutSection />
                <PastorsSection />
                <EventsSection />
                <ContactSection />
            </main>
        </>
    );
}
