import PageHeader from '../components/PageHeader';
import EventsSection from '../components/EventsSection';

export default function Eventos() {
  return (
    <>
      <PageHeader 
        title="Eventos" 
        subtitle="Mantente informado de nuestras actividades" 
      />

      <main>
        <EventsSection title={null} subtitle={null} id="" />
      </main>
    </>
  );
}
