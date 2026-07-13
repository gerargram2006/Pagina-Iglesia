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
export default function EventsSection({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }) { // Exporta EventsSection con valores por defecto para cada prop
    return ( // Retorna el JSX de la sección de eventos
        <section id={id} className="section section-alt"> {/* Sección semántica con ID dinámico y estilo alternado */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>} {/* Título condicional con animación fade-in-down */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>} {/* Subtítulo condicional con animación fade-in-up */}
                <div className="events-list"> {/* Contenedor para la lista de eventos */}
                    {/* Evento 1: Campaña de Oración */}
                    <div className="event-item" data-animate="fade-in-left"> {/* Tarjeta del evento 1 con animación desde la izquierda */}
                        <div className="event-date"> {/* Bloque de fecha con fondo degradado verde */}
                            <span className="event-day">15</span> {/* Día del evento: 15 */}
                            <span className="event-month">Jul</span> {/* Mes del evento: Julio (abbreviado) */}
                        </div> {/* Cierra el bloque de fecha */}
                        <div className="event-info"> {/* Bloque de información del evento */}
                            <h3>Campaña de Oración</h3> {/* Nombre del evento 1 */}
                            <p>Un tiempo especial de oración y ayuno por las necesidades de nuestra comunidad.</p> {/* Descripción del evento 1 */}
                        </div> {/* Cierra el bloque de información */}
                    </div> {/* Cierra la tarjeta del evento 1 */}
                    {/* Evento 2: Conferencia Familiar */}
                    <div className="event-item" data-animate="fade-in-left"> {/* Tarjeta del evento 2 con animación desde la izquierda */}
                        <div className="event-date"> {/* Bloque de fecha del evento 2 */}
                            <span className="event-day">22</span> {/* Día del evento: 22 */}
                            <span className="event-month">Jul</span> {/* Mes del evento: Julio */}
                        </div> {/* Cierra el bloque de fecha */}
                        <div className="event-info"> {/* Bloque de información del evento 2 */}
                            <h3>Conferencia Familiar</h3> {/* Nombre del evento 2 */}
                            <p>Una conferencia dedicada a fortalecer los lazos familiares según la palabra de Dios.</p> {/* Descripción del evento 2 */}
                        </div> {/* Cierra el bloque de información */}
                    </div> {/* Cierra la tarjeta del evento 2 */}
                    {/* Evento 3: Bautismo Masivo */}
                    <div className="event-item" data-animate="fade-in-left"> {/* Tarjeta del evento 3 con animación desde la izquierda */}
                        <div className="event-date"> {/* Bloque de fecha del evento 3 */}
                            <span className="event-day">05</span> {/* Día del evento: 05 */}
                            <span className="event-month">Ago</span> {/* Mes del evento: Agosto (abbreviado) */}
                        </div> {/* Cierra el bloque de fecha */}
                        <div className="event-info"> {/* Bloque de información del evento 3 */}
                            <h3>Bautismo Masivo</h3> {/* Nombre del evento 3 */}
                            <p>Celebración de bautismo para todos los nuevos creyentes de nuestra iglesia.</p> {/* Descripción del evento 3 */}
                        </div> {/* Cierra el bloque de información */}
                    </div> {/* Cierra la tarjeta del evento 3 */}
                </div> {/* Cierra el contenedor de la lista de eventos */}
            </div> {/* Cierra el contenedor principal */}
        </section> // Fin del elemento section
    ); // Fin del return
} // Fin del componente EventsSection
