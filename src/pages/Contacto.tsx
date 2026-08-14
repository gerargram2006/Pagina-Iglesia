// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa la sección de contacto para mostrarla en la página
import ContactSection from '../components/ContactSection';

// Define y exporta el componente de la página de contacto
export default function Contacto() {
    // Retorna el JSX de la página de contacto
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Contacto" subtitle="Estamos para servirte, escríbenos" />
            // Contenido principal de la página
            <main>
                // Renderiza la sección de contacto sin título, subtítulo ni ID propios
                <ContactSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
