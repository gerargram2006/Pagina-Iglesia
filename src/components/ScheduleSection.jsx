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
export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }) { // Exporta ScheduleSection con valores por defecto para cada prop
    return ( // Retorna el JSX de la sección de horarios
        <section id={id} className="section"> {/* Sección semántica con ID dinámico y clase de estilo estándar */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>} {/* Título condicional con animación fade-in-down */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>} {/* Subtítulo condicional con animación fade-in-up */}
                <div className="row g-4"> {/* Fila de Bootstrap con gutter de 4 unidades entre tarjetas */}
                    {/* Tarjeta: Domingo */}
                    <div className="col-12 col-md-4"> {/* Columna para el domingo: completa en móvil, tercera parte en md */}
                        <div className="schedule-card delay-1" data-animate="fade-in-up"> {/* Tarjeta de horario con delay escalonado 1 y animación fade-in-up */}
                            <div className="schedule-day">Domingo</div> {/* Día de la reunión: Domingo */}
                            <div className="schedule-time">10:00 AM - 12:00 PM</div> {/* Horario de la reunión */}
                            <div className="schedule-name">Culto de Alabanza y Adoración</div> {/* Nombre de la reunión */}
                        </div> {/* Cierra la tarjeta de domingo */}
                    </div> {/* Cierra la columna de domingo */}
                    {/* Tarjeta: Miércoles */}
                    <div className="col-12 col-md-4"> {/* Columna para el miércoles: misma distribución responsive */}
                        <div className="schedule-card delay-2" data-animate="fade-in-up"> {/* Tarjeta de horario con delay escalonado 2 y animación fade-in-up */}
                            <div className="schedule-day">Miércoles</div> {/* Día de la reunión: Miércoles */}
                            <div className="schedule-time">7:00 PM - 8:30 PM</div> {/* Horario de la reunión */}
                            <div className="schedule-name">Estudio Bíblico y Oración</div> {/* Nombre de la reunión */}
                        </div> {/* Cierra la tarjeta de miércoles */}
                    </div> {/* Cierra la columna de miércoles */}
                    {/* Tarjeta: Sábado */}
                    <div className="col-12 col-md-4"> {/* Columna para el sábado: misma distribución responsive */}
                        <div className="schedule-card delay-3" data-animate="fade-in-up"> {/* Tarjeta de horario con delay escalonado 3 y animación fade-in-up */}
                            <div className="schedule-day">Sábado</div> {/* Día de la reunión: Sábado */}
                            <div className="schedule-time">6:00 PM - 8:00 PM</div> {/* Horario de la reunión */}
                            <div className="schedule-name">Grupos de Jóvenes</div> {/* Nombre de la reunión */}
                        </div> {/* Cierra la tarjeta de sábado */}
                    </div> {/* Cierra la columna de sábado */}
                </div> {/* Cierra la fila de tarjetas de horarios */}
            </div> {/* Cierra el contenedor principal */}
        </section> // Fin del elemento section
    ); // Fin del return
} // Fin del componente ScheduleSection
