/**
 * Página QuienesSomos - Historia y misión de la iglesia.
 *
 * Ruta: /quienes-somos
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Quiénes Somos"
 *   2. <AboutSection> → Texto descriptivo + tarjetas de valores
 *      (title/subtitle null para no duplicar el encabezado)
 *
 * Se reutiliza AboutSection con props nulas para mostrar solo el contenido
 * sin títulos repetidos.
 */
// Importa el componente de encabezado de página con fondo oscuro
import PageHeader from '../components/PageHeader';
// Importa la sección reutilizable de historia y misión de la iglesia
import AboutSection from '../components/AboutSection';

// Define y exporta el componente funcional QuienesSomos para la ruta /quienes-somos
export default function QuienesSomos() {
    // Retorna el JSX que renderiza la página completa de Quiénes Somos
    return (
        // Fragmento React para envolver los elementos sin nodo extra en el DOM
        <>
            {/* Encabezado de página con título y subtítulo sobre la iglesia */}
            <PageHeader
                // Título que se muestra en el encabezado oscuro
                title="Quiénes Somos"
                // Subtítulo descriptivo debajo del título
                subtitle="Conoce nuestra historia y misión"
            />

            {/* Sección principal con la información descriptiva de la iglesia */}
            <main>
                {/* Sección de About con title/subtitle null para evitar duplicar el PageHeader */}
                <AboutSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
