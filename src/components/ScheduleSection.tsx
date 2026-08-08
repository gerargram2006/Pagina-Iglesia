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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        <p>Cargando horarios...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && schedules.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-clock text-2xl block mb-3"></i>
                        <p>Los horarios serán publicados próximamente.</p>
                    </div>
                )}

                {!loading && !error && schedules.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {schedules.map((schedule, index) => (
                            <div key={schedule.id}>
                                <div className={`schedule-card delay-${index + 1}`} data-animate="fade-in-up">
                                    <span className="schedule-step-number" aria-hidden="true">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <span className="schedule-icon">{DAY_ICONS[schedule.dia] || '📖'}</span>
                                    <div className="schedule-divider" aria-hidden="true"></div>
                                    <div className="schedule-day">{schedule.dia}</div>
                                    <div className="schedule-time">{formatHora(schedule.hora)}</div>
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
