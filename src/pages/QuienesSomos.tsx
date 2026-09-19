// QuienesSomos.tsx: Página con la historia y misión de la iglesia.
import PageHeader from '../components/layout/PageHeader';
import AboutSection from '../components/sections/AboutSection';

export default function QuienesSomos() {
    return (
        <>
            <PageHeader title="Quiénes Somos" subtitle="Conoce nuestra historia y misión" />
            <main>
                <AboutSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
