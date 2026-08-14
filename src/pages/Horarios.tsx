// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa la sección de horarios de reuniones para mostrarla en la página
import ScheduleSection from '../components/ScheduleSection';

// Define y exporta el componente de la página de horarios
export default function Horarios() {
    // Retorna el JSX de la página de horarios
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Horarios" subtitle="Conoce nuestros horarios de reunión" />
            // Contenido principal de la página
            <main>
                // Renderiza la sección de horarios sin título, subtítulo ni ID propios
                <ScheduleSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
