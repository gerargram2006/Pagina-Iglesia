/**
 * Componente PastorsSection - Sección de pastores/líderes.
 *
 * Muestra tarjetas con la información de los pastores de la iglesia.
 * Se usa en Home (sección) y en /pastores (página completa).
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 *
 * Cada tarjeta de pastor incluye:
 *   - Imagen placeholder (icono de Bootstrap Icons sobre fondo degradado).
 *   - Nombre del pastor.
 *   - Rol/cargo ( Pastor Principal, Pastora de Jóvenes).
 *   - Breve descripción de su ministerio.
 *
 * Nota: Las imágenes placeholder se pueden reemplazar con fotos reales
 *       cambiando el contenido de .pastor-img por un tag <img>.
 */
export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) { // Exporta PastorsSection con valores por defecto para cada prop
    return ( // Retorna el JSX de la sección de pastores
        <section id={id} className="section"> {/* Sección semántica con ID dinámico y clase de estilo estándar */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>} {/* Título condicional con animación fade-in-down */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>} {/* Subtítulo condicional con animación fade-in-up */}
                <div className="row g-4 justify-content-center"> {/* Fila de Bootstrap centrada con gutter de 4 unidades */}
                    {/* Pastor Principal */}
                    <div className="col-12 col-sm-6 col-lg-5"> {/* Columna para el pastor principal: completa en móvil, mitad en sm, 5/12 en lg */}
                        <div className="pastor-card" data-animate="fade-in-up"> {/* Tarjeta del pastor con animación fade-in-up */}
                            <div className="pastor-img pastor-placeholder"> {/* Contenedor de imagen con clase placeholder (fondo degradado) */}
                                <span><i className="bi bi-book-half" style={{color: 'var(--white)'}} aria-hidden="true"></i></span> {/* Icono de libro abierto en color blanco */}
                            </div> {/* Cierra el contenedor de imagen */}
                            <h3>Pastor Juan Pérez</h3> {/* Nombre del pastor principal */}
                            <p className="pastor-role">Pastor Principal</p> {/* Rol/cargo del pastor */}
                            <p className="pastor-desc">Más de 20 años dedicados al ministerio pastoral y la enseñanza bíblica.</p> {/* Breve descripción del ministerio */}
                        </div> {/* Cierra la tarjeta del pastor principal */}
                    </div> {/* Cierra la columna del pastor principal */}
                    {/* Pastora de Jóvenes */}
                    <div className="col-12 col-sm-6 col-lg-5"> {/* Columna para la pastora de jóvenes: misma distribución responsive */}
                        <div className="pastor-card" data-animate="fade-in-up"> {/* Tarjeta de la pastora con animación fade-in-up */}
                            <div className="pastor-img pastor-placeholder"> {/* Contenedor de imagen con clase placeholder */}
                                <span><i className="bi bi-person-heart" style={{color: 'var(--white)'}} aria-hidden="true"></i></span> {/* Icono de persona con corazón en color blanco */}
                            </div> {/* Cierra el contenedor de imagen */}
                            <h3>Pastora María García</h3> {/* Nombre de la pastora de jóvenes */}
                            <p className="pastor-role">Pastora de Jóvenes</p> {/* Rol/cargo de la pastora */}
                            <p className="pastor-desc">Liderando y guiando a la nueva generación en su caminar con Cristo.</p> {/* Breve descripción del ministerio */}
                        </div> {/* Cierra la tarjeta de la pastora */}
                    </div> {/* Cierra la columna de la pastora */}
                </div> {/* Cierra la fila de pastores */}
            </div> {/* Cierra el contenedor principal */}
        </section> // Fin del elemento section
    ); // Fin del return
} // Fin del componente PastorsSection
