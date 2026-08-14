// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa la sección de presentación de pastores para mostrarla en la página
import PastorsSection from '../components/PastorsSection';

// Define y exporta el componente de la página de pastores
export default function Pastores() {
    // Retorna el JSX de la página de pastores
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Nuestros Pastores" subtitle="Conoce a nuestros líderes espirituales" />
            // Contenido principal de la página
            <main>
                // Renderiza la sección de pastores sin título, subtítulo ni ID propios
                <PastorsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
