import { useState, useEffect } from 'react';
import { api, type ApiHorario } from '../api';

interface ScheduleSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

const DAY_ICONS: Record<string, string> = {
    'Domingo': '⛪',
    'Lunes': '📖',
    'Martes': '🙏',
    'Miércoles': '📖',
    'Jueves': '✝️',
    'Viernes': '✝️',
    'Sábado': '⭐',
};

function formatHora(hora: string): string {
    const [h, m] = hora.split(':');
    const hour = Number(h);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${display}:${m?.padStart(2, '0') ?? '00'} ${suffix}`;
}

export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }: ScheduleSectionProps) {
    const [schedules, setSchedules] = useState<ApiHorario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const data = await api.horarios.getAll();
                setSchedules(Array.isArray(data) ? data : []);
            } catch {
                setError('No se pudieron cargar los horarios.');
            } finally {
                setLoading(false);
            }
        };
        fetchSchedules();
    }, []);

    return (
        <section id={id} className="section">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen los horarios */}
                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando horarios" */}
                        <p>Cargando horarios...</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si ocurrió uno */}
                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de advertencia */}
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        {/* Muestra el mensaje de error */}
                        <p>{error}</p>
                    </div>
                )}

                {/* Muestra un aviso si no hay horarios publicados */}
                {!loading && !error && schedules.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de reloj */}
                        <i className="bi bi-clock text-2xl block mb-3"></i>
                        {/* Texto indicando que los horarios se publicarán próximamente */}
                        <p>Los horarios serán publicados próximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrícula de horarios solo si hay datos disponibles */}
                {!loading && !error && schedules.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Recorre la lista de horarios para generar cada tarjeta */}
                        {schedules.map((schedule, index) => (
                            <div key={schedule.id}>
                                {/* Tarjeta del horario con retraso de animación según su posición */}
                                <div className={`schedule-card delay-${index + 1}`} data-animate="fade-in-up">
                                    {/* Número de paso del horario oculto para lectores de pantalla */}
                                    <span className="schedule-step-number" aria-hidden="true">
                                        {/* Muestra el índice del horario con dos dígitos */}
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {/* Muestra el ícono del día o uno por defecto */}
                                    <span className="schedule-icon">{DAY_ICONS[schedule.dia] || '📖'}</span>
                                    {/* Divisor decorativo de la tarjeta */}
                                    <div className="schedule-divider" aria-hidden="true"></div>
                                    {/* Muestra el día del horario */}
                                    <div className="schedule-day">{schedule.dia}</div>
                                    {/* Muestra la hora formateada */}
                                    <div className="schedule-time">{formatHora(schedule.hora)}</div>
                                    {/* Muestra el nombre de la actividad */}
                                    <div className="schedule-name">{schedule.actividad}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
