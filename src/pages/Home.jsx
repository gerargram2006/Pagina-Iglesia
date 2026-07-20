import NavBar from '../components/NavBar';
import ScheduleSection from '../components/ScheduleSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import PastorsSection from '../components/PastorsSection';
import EventsSection from '../components/EventsSection';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';

export default function Home() {
    return (
        <>
            <header className="hero">
                <div className="hero-floating-shapes" aria-hidden="true">
                    <span className="hero-shape hero-shape-1"></span>
                    <span className="hero-shape hero-shape-2"></span>
                    <span className="hero-shape hero-shape-3"></span>
                    <span className="hero-shape hero-shape-4"></span>
                </div>
                <NavBar />
                <section id="inicio" className="hero-content">
                    <div className="container">
                        <span className="hero-badge">✦ Una comunidad de fe ✦</span>
                        <h1>Bienvenidos a la Iglesia<br/>Asamblea de Dios</h1>
                        <p>Una comunidad de fe, esperanza y servicio dedicada a llevar el mensaje de Dios a cada corazón.</p>
                        <div className="hero-buttons">
                            <a href="#horarios" className="btn btn-primary">Nuestros Horarios</a>
                            <a href="#contacto" className="btn btn-secondary">Contáctanos</a>
                        </div>
                    </div>
                </section>
                <div className="hero-scroll-indicator" aria-hidden="true">
                    <span className="hero-scroll-mouse">
                        <span className="hero-scroll-dot"></span>
                    </span>
                </div>
            </header>

            <main>
                <ScheduleSection />
                <AboutSection />
                <GallerySection />
                <PastorsSection />
                <EventsSection />
                <CTASection />
                <ContactSection />
            </main>
        </>
    );
}
