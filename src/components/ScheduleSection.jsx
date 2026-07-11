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
    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="row g-4">
                    {/* Tarjeta: Domingo */}
                    <div className="col-12 col-md-4">
                        <div className="schedule-card delay-1" data-animate="fade-in-up">
                            <div className="schedule-day">Domingo</div>
                            <div className="schedule-time">10:00 AM - 12:00 PM</div>
                            <div className="schedule-name">Culto de Alabanza y Adoración</div>
                        </div>
                    </div>
                    {/* Tarjeta: Miércoles */}
                    <div className="col-12 col-md-4">
                        <div className="schedule-card delay-2" data-animate="fade-in-up">
                            <div className="schedule-day">Miércoles</div>
                            <div className="schedule-time">7:00 PM - 8:30 PM</div>
                            <div className="schedule-name">Estudio Bíblico y Oración</div>
                        </div>
                    </div>
                    {/* Tarjeta: Sábado */}
                    <div className="col-12 col-md-4">
                        <div className="schedule-card delay-3" data-animate="fade-in-up">
                            <div className="schedule-day">Sábado</div>
                            <div className="schedule-time">6:00 PM - 8:00 PM</div>
                            <div className="schedule-name">Grupos de Jóvenes</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
