import NavBar from '../components/NavBar';
import ScheduleSection from '../components/ScheduleSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import PastorsSection from '../components/PastorsSection';
import EventosSlider from '../components/EventosSlider';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';
import HeroSlider from '../components/HeroSlider';


export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />
            <HeroSlider />

            <main>
                <ScheduleSection />
                <AboutSection />
                <GallerySection />
                <PastorsSection />
                <EventosSlider />
                <CTASection />
                <ContactSection />
            </main>
        </div>
    );
}
