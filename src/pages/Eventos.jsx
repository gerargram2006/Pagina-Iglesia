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
