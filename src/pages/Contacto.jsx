/**
 * Página Contacto - Datos de contacto y formulario.
 *
 * Ruta: /contacto
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Contacto"
 *   2. <ContactSection> → Info de contacto + formulario
 *      (title/subtitle null para no duplicar el encabezado)
 *
 * Se reutiliza ContactSection con props nulas para mostrar solo el contenido
 * sin títulos repetidos.
 */
// Importa el componente de encabezado de página con fondo oscuro
import PageHeader from '../components/PageHeader';
// Importa la sección reutilizable que muestra datos de contacto y formulario
import ContactSection from '../components/ContactSection';

// Define y exporta el componente funcional Contacto para la ruta /contacto
export default function Contacto() {
    // Retorna el JSX que renderiza la página completa de Contacto
    return (
        // Fragmento React para envolver los elementos sin nodo extra en el DOM
        <>
            {/* Encabezado de página con título y subtítulo de contacto */}
            <PageHeader
                // Título que se muestra en el encabezado oscuro
                title="Contacto"
                // Subtítulo descriptivo debajo del título
                subtitle="Estamos para servirte, escríbenos"
            />

            {/* Sección principal con información de contacto y formulario */}
            <main>
                {/* Sección de Contact con title/subtitle null para evitar duplicar el PageHeader */}
                <ContactSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
