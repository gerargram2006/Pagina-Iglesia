/**
 * Componente ScheduleSection - Sección de horarios de culto.
 *
 * Muestra las tarjetas con los horarios de las reuniones semanales de la iglesia.
 * Se usa tanto en la página Home (sección) como en la página /horarios (página completa).
 *
 * Props:
 *   @param {string} title    - Título de la sección (se oculta si es null)
 *   @param {string} subtitle - Subtítulo de la sección (se oculta si es null)
 *   @param {string} id       - ID HTML para enlaces internos (ej: "#horarios")
 *
 * Horarios mostrados:
 *   - Domingo 10:00 AM → Culto de Alabanza y Adoración
 *   - Miércoles 7:00 PM → Estudio Bíblico y Oración
 *   - Sábado 6:00 PM → Grupos de Jóvenes
 *
 * Cada tarjeta usa data-animate="fade-in-up" con delays escalonados
 * para crear un efecto cascada al hacer scroll.
 */
export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }) {
    const schedules = [
        { day: "Domingo", time: "10:00 AM - 12:00 PM", name: "Culto de Alabanza y Adoración", icon: "🙏" },
        { day: "Miércoles", time: "7:00 PM - 8:30 PM", name: "Estudio Bíblico y Oración", icon: "📖" },
        { day: "Sábado", time: "6:00 PM - 8:00 PM", name: "Grupos de Jóvenes", icon: "⭐" },
    ];

    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="row g-4">
                    {schedules.map((schedule, index) => (
                        <div key={index} className="col-12 col-md-4">
                            <div className={`schedule-card delay-${index + 1}`} data-animate="fade-in-up">
                                <span className="schedule-icon">{schedule.icon}</span>
                                <div className="schedule-day">{schedule.day}</div>
                                <div className="schedule-time">{schedule.time}</div>
                                <div className="schedule-name">{schedule.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
