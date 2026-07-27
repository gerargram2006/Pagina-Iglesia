import { useState, useEffect } from 'react';
import { api, ApiEvento } from '../api';

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface ParsedEvent {
    id: number;
    day: string;
    month: string;
    name: string;
    description: string;
    lugar: string;
    imageSrc: string;
}

function parseEvento(evt: ApiEvento): ParsedEvent {
    const date = new Date(evt.fecha);
    return {
        id: evt.id,
        day: String(date.getDate()).padStart(2, '0'),
        month: MONTHS_ES[date.getMonth()]!,
        name: evt.titulo,
        description: evt.descripcion || '',
        lugar: evt.lugar || '',
        imageSrc: evt.imagen_url || '',
    };
}

interface EventsSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

export default function EventsSection({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }: EventsSectionProps) {
    const [events, setEvents] = useState<ParsedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.eventos.getAll();
                const parsed = (Array.isArray(data) ? data : []).map(parseEvento);
                setEvents(parsed);
            } catch {
                setError('No se pudieron cargar los eventos.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <section id={id} className="section section-alt">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        <p>Cargando eventos...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-calendar-x text-2xl block mb-3"></i>
                        <p>No hay eventos programados por el momento.</p>
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="events-list">
                        {events.map((event) => (
                            <div key={event.id} className="event-item" data-animate="fade-in-left">
                                <div className="event-thumb">
                                    {event.imageSrc ? (
                                        <img src={event.imageSrc} alt={event.name} />
                                    ) : (
                                        <div className="event-thumb-placeholder">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="event-date">
                                    <span className="event-day">{event.day}</span>
                                    <span className="event-month">{event.month}</span>
                                </div>
                                <div className="event-info">
                                    {event.lugar && <span className="event-badge badge-prayer">{event.lugar}</span>}
                                    <h3>{event.name}</h3>
                                    {event.description && <p>{event.description}</p>}
                                    <a href="#contacto" className="event-link">
                                        Más información <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
