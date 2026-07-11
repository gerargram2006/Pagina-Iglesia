/**
 * Componente EventsSection - Sección de próximos eventos.
 *
 * Muestra una lista cronológica de eventos próximos de la iglesia.
 * Se usa en Home (sección) y en /eventos (página completa).
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 *
 * Cada evento incluye:
 *   - Fecha destacada (día + mes) con fondo degradado verde.
 *   - Nombre del evento.
 *   - Descripción breve de la actividad.
 *
 * Los eventos usan data-animate="fade-in-left" para animarse
 * desde la izquierda al hacer scroll.
 *
 * Nota: Los datos son estáticos. Para una app en producción,
 *       se recomienda obtener los eventos de una API o base de datos.
 */
export default function EventsSection({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }) {
    return (
        <section id={id} className="section section-alt">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="events-list">
                    {/* Evento 1: Campaña de Oración */}
                    <div className="event-item" data-animate="fade-in-left">
                        <div className="event-date">
                            <span className="event-day">15</span>
                            <span className="event-month">Jul</span>
                        </div>
                        <div className="event-info">
                            <h3>Campaña de Oración</h3>
                            <p>Un tiempo especial de oración y ayuno por las necesidades de nuestra comunidad.</p>
                        </div>
                    </div>
                    {/* Evento 2: Conferencia Familiar */}
                    <div className="event-item" data-animate="fade-in-left">
                        <div className="event-date">
                            <span className="event-day">22</span>
                            <span className="event-month">Jul</span>
                        </div>
                        <div className="event-info">
                            <h3>Conferencia Familiar</h3>
                            <p>Una conferencia dedicada a fortalecer los lazos familiares según la palabra de Dios.</p>
                        </div>
                    </div>
                    {/* Evento 3: Bautismo Masivo */}
                    <div className="event-item" data-animate="fade-in-left">
                        <div className="event-date">
                            <span className="event-day">05</span>
                            <span className="event-month">Ago</span>
                        </div>
                        <div className="event-info">
                            <h3>Bautismo Masivo</h3>
                            <p>Celebración de bautismo para todos los nuevos creyentes de nuestra iglesia.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
