/**
 * Página Eventos - Calendario de eventos de la iglesia.
 *
 * Ruta: /eventos
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Eventos"
 *   2. <EventsSection> → Lista cronológica de próximos eventos
 *      (title/subtitle null para no duplicar el encabezado)
 *
 * Se reutiliza EventsSection con props nulas para mostrar solo el contenido
 * sin títulos repetidos.
 */
// Importa el componente de encabezado de página con fondo oscuro
import PageHeader from '../components/PageHeader';
// Importa la sección reutilizable que muestra la lista de eventos
import EventsSection from '../components/EventsSection';

// Define y exporta el componente funcional Eventos para la ruta /eventos
export default function Eventos() {
    // Retorna el JSX que renderiza la página completa de Eventos
    return (
        // Fragmento React para envolver los elementos sin nodo extra en el DOM
        <>
            {/* Encabezado de página con título y subtítulo de eventos */}
            <PageHeader
                // Título que se muestra en el encabezado oscuro
                title="Eventos"
                // Subtítulo descriptivo debajo del título
                subtitle="Mantente informado de nuestras actividades"
            />

            {/* Sección principal con la lista cronológica de eventos */}
            <main>
                {/* Sección de Events con title/subtitle null para evitar duplicar el PageHeader */}
                <EventsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
