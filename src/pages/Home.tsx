// Importa la barra de navegación para mostrarla en la parte superior de la página
import NavBar from '../components/NavBar';
// Importa la sección de horarios de reuniones
import ScheduleSection from '../components/ScheduleSection';
// Importa la sección "Quiénes Somos" con información de la iglesia
import AboutSection from '../components/AboutSection';
// Importa la sección de galería de fotos de la comunidad
import GallerySection from '../components/GallerySection';
// Importa la sección que presenta a los pastores
import PastorsSection from '../components/PastorsSection';
// Importa el carrusel de eventos destacados
import EventosSlider from '../components/EventosSlider';
// Importa la sección de llamado a la acción (CTA)
import CTASection from '../components/CTASection';
// Importa la sección de contacto
import ContactSection from '../components/ContactSection';
// Importa el carrusel de imágenes del Hero (portada principal)
import HeroSlider from '../components/HeroSlider';


// Define y exporta el componente de la página de inicio
export default function Home() {
    // Retorna el JSX que renderiza la página de inicio
    return (
        // Contenedor principal con fondo gris claro y altura mínima de pantalla completa
        <div className="bg-gray-50 min-h-screen">
            // Renderiza la barra de navegación
            <NavBar />
            // Renderiza el carrusel de imágenes de la portada
            <HeroSlider />

            // Etiqueta semántica de contenido principal
            <main>
                // Muestra la sección de horarios de reuniones
                <ScheduleSection />
                // Muestra la sección de información sobre la iglesia
                <AboutSection />
                // Muestra la galería de fotos de la comunidad
                <GallerySection />
                // Muestra la sección de presentación de pastores
                <PastorsSection />
                // Muestra el carrusel de eventos destacados
                <EventosSlider />
                // Muestra la sección de llamado a la acción
                <CTASection />
                // Muestra la sección de contacto
                <ContactSection />
            </main>
        </div>
    );
}
