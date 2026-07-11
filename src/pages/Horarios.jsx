/**
 * Página Horarios - Muestra los horarios de culto de la iglesia.
 *
 * Ruta: /horarios
 *
 * Estructura:
 *   1. <PageHeader> → Encabezado con fondo oscuro y título "Horarios"
 *   2. <ScheduleSection> → Tarjetas con los horarios (title/subtitle null
 *      para no duplicar el encabezado que ya está en PageHeader)
 *
 * Se reutiliza el componente ScheduleSection pasándole props nulas
 * para evitar mostrar títulos redundantes.
 */
import PageHeader from '../components/PageHeader';
import ScheduleSection from '../components/ScheduleSection';

export default function Horarios() {
    return (
        <>
            <PageHeader
                title="Horarios"
                subtitle="Conoce nuestros horarios de reunión"
            />

            <main>
                <ScheduleSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
