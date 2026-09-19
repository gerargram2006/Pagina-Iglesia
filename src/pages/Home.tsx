// Home.tsx: Página principal que une todas las secciones del sitio.
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
            {/* Renderiza la barra de navegación */}
            <NavBar />
            {/* Renderiza el carrusel de imágenes de la portada */}
            <HeroSlider />

            {/* Etiqueta semántica de contenido principal */}
            <main>
                {/* Muestra la sección de horarios de reuniones */}
                <ScheduleSection />
                {/* Muestra la sección de información sobre la iglesia */}
                <AboutSection />
                {/* Muestra la galería de fotos de la comunidad */}
                <GallerySection />
                {/* Muestra la sección de presentación de pastores */}
                <PastorsSection />
                {/* Muestra el carrusel de eventos destacados */}
                <EventosSlider />
                {/* Muestra la sección de llamado a la acción */}
                <CTASection />
                {/* Muestra la sección de contacto */}
                <ContactSection />
            </main>
        </div>
    );
}
