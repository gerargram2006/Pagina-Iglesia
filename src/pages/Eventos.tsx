// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa la sección que lista los eventos de la iglesia
import EventsSection from '../components/EventsSection';

// Define y exporta el componente de la página de eventos
export default function Eventos() {
    // Retorna el JSX de la página de eventos
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Eventos" subtitle="Mantente informado de nuestras actividades" />
            // Contenido principal de la página
            <main>
                // Renderiza la sección de eventos sin título, subtítulo ni ID propios
                <EventsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
