// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa la sección de información sobre la iglesia para mostrarla en la página
import AboutSection from '../components/AboutSection';

// Define y exporta el componente de la página "Quiénes Somos"
export default function QuienesSomos() {
    // Retorna el JSX de la página "Quiénes Somos"
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Quiénes Somos" subtitle="Conoce nuestra historia y misión" />
            // Contenido principal de la página
            <main>
                // Renderiza la sección de información sin título, subtítulo ni ID propios
                <AboutSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
