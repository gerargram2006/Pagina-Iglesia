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
import PageHeader from '../components/PageHeader';
import ContactSection from '../components/ContactSection';

export default function Contacto() {
    return (
        <>
            <PageHeader
                title="Contacto"
                subtitle="Estamos para servirte, escríbenos"
            />

            <main>
                <ContactSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
