/**
 * Página Horarios - Muestra los horarios de culto de la iglesia.
 *
 * Ruta: /horarios
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Horarios"
 *   2. <ScheduleSection> → Tarjetas con los horarios (title/subtitle null
 *      para no duplicar el encabezado que ya está en PageHeader)
 *
 * Se reutiliza el componente ScheduleSection pasándole props nulas
 * para evitar mostrar títulos redundantes.
 */
// Importa el componente de encabezado de página con fondo oscuro
import PageHeader from '../components/PageHeader';
// Importa la sección reutilizable que muestra los horarios de culto
import ScheduleSection from '../components/ScheduleSection';

// Define y exporta el componente funcional Horarios para la ruta /horarios
export default function Horarios() {
    // Retorna el JSX que renderiza la página de horarios completa
    return (
        // Fragmento React para envolver header y main sin nodo extra en el DOM
        <>
            {/* Encabezado de página con título y subtítulo de horarios */}
            <PageHeader
                // Título que se muestra en el encabezado oscuro
                title="Horarios"
                // Subtítulo descriptivo debajo del título
                subtitle="Conoce nuestros horarios de reunión"
            />

            {/* Sección principal que contiene las tarjetas de horarios */}
            <main>
                {/* Sección de horarios con title/subtitle null para evitar duplicar el PageHeader */}
                <ScheduleSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
