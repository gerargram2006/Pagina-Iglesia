/**
 * Página Pastores - Equipo pastoral de la iglesia.
 *
 * Ruta: /pastores
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Nuestros Pastores"
 *   2. <PastorsSection> → Tarjetas con info de cada pastor
 *      (title/subtitle null para no duplicar el encabezado)
 *
 * Se reutiliza PastorsSection con props nulas para mostrar solo el contenido
 * sin títulos repetidos.
 */
// Importa el componente de encabezado de página con fondo oscuro
import PageHeader from '../components/PageHeader';
// Importa la sección reutilizable que muestra las tarjetas de los pastores
import PastorsSection from '../components/PastorsSection';

// Define y exporta el componente funcional Pastores para la ruta /pastores
export default function Pastores() {
    // Retorna el JSX que renderiza la página completa de Pastores
    return (
        // Fragmento React para envolver los elementos sin nodo extra en el DOM
        <>
            {/* Encabezado de página con título y subtítulo sobre los pastores */}
            <PageHeader
                // Título que se muestra en el encabezado oscuro
                title="Nuestros Pastores"
                // Subtítulo descriptivo debajo del título
                subtitle="Conoce a nuestros líderes espirituales"
            />

            {/* Sección principal con las tarjetas de información de cada pastor */}
            <main>
                {/* Sección de Pastors con title/subtitle null para evitar duplicar el PageHeader */}
                <PastorsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
