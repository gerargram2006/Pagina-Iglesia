export default function EventsSection({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }) {
    const events = [
        { day: "15", month: "Jul", name: "Campaña de Oración", description: "Un tiempo especial de oración y ayuno por las necesidades de nuestra comunidad.", badge: "Oración", badgeColor: "badge-prayer", hasImage: false, imageSrc: "/img/eventos/campana-oracion.jpg" },
        { day: "22", month: "Jul", name: "Conferencia Familiar", description: "Una conferencia dedicada a fortalecer los lazos familiares según la palabra de Dios.", badge: "Conferencia", badgeColor: "badge-conference", hasImage: false, imageSrc: "/img/eventos/conferencia-familiar.jpg" },
        { day: "05", month: "Ago", name: "Bautismo Masivo", description: "Celebración de bautismo para todos los nuevos creyentes de nuestra iglesia.", badge: "Celebración", badgeColor: "badge-celebration", hasImage: false, imageSrc: "/img/eventos/bautismo.jpg" },
    ];

    return (
        <section id={id} className="section section-alt">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="events-list">
                    {events.map((event, index) => (
                        <div key={index} className="event-item" data-animate="fade-in-left">
                            <div className="event-thumb">
                                {event.hasImage ? (
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
                                <span className={`event-badge ${event.badgeColor}`}>{event.badge}</span>
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <a href="#contacto" className="event-link">
                                    Más información <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
