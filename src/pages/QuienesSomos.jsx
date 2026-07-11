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
import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';

export default function QuienesSomos() {
    return (
        <>
            <PageHeader
                title="Quiénes Somos"
                subtitle="Conoce nuestra historia y misión"
            />

            <main>
                <AboutSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
