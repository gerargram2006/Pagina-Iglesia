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
export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) {
    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="row g-4 justify-content-center">
                    {/* Pastor Principal */}
                    <div className="col-12 col-sm-6 col-lg-5">
                        <div className="pastor-card" data-animate="fade-in-up">
                            <div className="pastor-img pastor-placeholder">
                                <span><i className="bi bi-book-half" style={{color: 'var(--white)'}} aria-hidden="true"></i></span>
                            </div>
                            <h3>Pastor Juan Pérez</h3>
                            <p className="pastor-role">Pastor Principal</p>
                            <p className="pastor-desc">Más de 20 años dedicados al ministerio pastoral y la enseñanza bíblica.</p>
                        </div>
                    </div>
                    {/* Pastora de Jóvenes */}
                    <div className="col-12 col-sm-6 col-lg-5">
                        <div className="pastor-card" data-animate="fade-in-up">
                            <div className="pastor-img pastor-placeholder">
                                <span><i className="bi bi-person-heart" style={{color: 'var(--white)'}} aria-hidden="true"></i></span>
                            </div>
                            <h3>Pastora María García</h3>
                            <p className="pastor-role">Pastora de Jóvenes</p>
                            <p className="pastor-desc">Liderando y guiando a la nueva generación en su caminar con Cristo.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
