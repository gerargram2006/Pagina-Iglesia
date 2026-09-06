import PageHeader from '../components/layout/PageHeader';
import EventsSection from '../components/sections/EventsSection';

export default function Eventos() {
    return (
        <>
            <PageHeader title="Eventos" subtitle="Mantente informado de nuestras actividades" />
            <main>
                <EventsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
