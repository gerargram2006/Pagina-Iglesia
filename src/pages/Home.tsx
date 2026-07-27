import NavBar from '../components/NavBar';
import ScheduleSection from '../components/ScheduleSection';
import AboutSection from '../components/AboutSection';
import GallerySection from '../components/GallerySection';
import PastorsSection from '../components/PastorsSection';
import EventsSection from '../components/EventsSection';
import CTASection from '../components/CTASection';
import ContactSection from '../components/ContactSection';
import Hero from '../components/Hero';

export default function Home() {
    return (
        <div className="bg-gray-50 min-h-screen">
            <NavBar />
            <Hero />

            <main>
                <ScheduleSection />
                <AboutSection />
                <GallerySection />
                <PastorsSection />
                <EventsSection />
                <CTASection />
                <ContactSection />
            </main>
        </div>
    );
}
