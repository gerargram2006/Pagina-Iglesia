import NavBar from '../components/layout/NavBar';
import ScheduleSection from '../components/sections/ScheduleSection';
import AboutSection from '../components/sections/AboutSection';
import GallerySection from '../components/sections/GallerySection';
import PastorsSection from '../components/sections/PastorsSection';
import EventosSlider from '../components/ui/EventosSlider';
import CTASection from '../components/sections/CTASection';
import ContactSection from '../components/sections/ContactSection';
import HeroSlider from '../components/ui/HeroSlider';


export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Renderiza la barra de navegaciÃ³n */}
            <NavBar />
            {/* Renderiza el carrusel de imÃ¡genes de la portada */}
            <HeroSlider />

            {/* Etiqueta semÃ¡ntica de contenido principal */}
            <main>
                {/* Muestra la secciÃ³n de horarios de reuniones */}
                <ScheduleSection />
                {/* Muestra la secciÃ³n de informaciÃ³n sobre la iglesia */}
                <AboutSection />
                {/* Muestra la galerÃ­a de fotos de la comunidad */}
                <GallerySection />
                {/* Muestra la secciÃ³n de presentaciÃ³n de pastores */}
                <PastorsSection />
                {/* Muestra el carrusel de eventos destacados */}
                <EventosSlider />
                {/* Muestra la secciÃ³n de llamado a la acciÃ³n */}
                <CTASection />
                {/* Muestra la secciÃ³n de contacto */}
                <ContactSection />
            </main>
        </div>
    );
}
