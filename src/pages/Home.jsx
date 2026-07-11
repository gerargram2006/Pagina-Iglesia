import NavBar from '../components/NavBar';
import ScheduleSection from '../components/ScheduleSection';
import AboutSection from '../components/AboutSection';
import PastorsSection from '../components/PastorsSection';
import EventsSection from '../components/EventsSection';
import ContactSection from '../components/ContactSection';

export default function Home() {
  return (
    <>
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
