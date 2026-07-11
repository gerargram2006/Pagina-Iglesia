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
import PageHeader from '../components/PageHeader';
import PastorsSection from '../components/PastorsSection';

export default function Pastores() {
    return (
        <>
            <PageHeader
                title="Nuestros Pastores"
                subtitle="Conoce a nuestros líderes espirituales"
            />

            <main>
                <PastorsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
