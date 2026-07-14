/**
 * Componente PastorsSection - Sección de pastores/líderes con fotos.
 *
 * Muestra tarjetas con la información de los pastores de la iglesia.
 * Se usa en Home (sección) y en /pastores (página completa).
 * Ahora con espacios para fotos reales y diseño mejorado.
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 *
 * Cada tarjeta de pastor incluye:
 *   - Espacio para foto real (placeholder con iniciales si no hay foto).
 *   - Nombre del pastor.
 *   - Rol/cargo.
 *   - Breve descripción de su ministerio.
 *   - Redes sociales placeholder.
 *
 * Para agregar fotos reales:
 *   1. Coloca las fotos en /public/img/pastores/
 *   2. Cambia hasPhoto a true y photoSrc a la ruta correcta
 */
export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) {
    const pastors = [
        {
            name: "Pastor Juan Pérez",
            role: "Pastor Principal",
            description: "Más de 20 años dedicados al ministerio pastoral y la enseñanza bíblica.",
            initials: "JP",
            hasPhoto: false,
            photoSrc: "/img/pastores/pastor-principal.jpg",
        },
        {
            name: "Pastora María García",
            role: "Pastora de Jóvenes",
            description: "Liderando y guiando a la nueva generación en su caminar con Cristo.",
            initials: "MG",
            hasPhoto: false,
            photoSrc: "/img/pastores/pastora-jovenes.jpg",
        },
    ];

    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="row g-4 justify-content-center">
                    {pastors.map((pastor, index) => (
                        <div key={index} className="col-12 col-sm-6 col-lg-5">
                            <div className="pastor-card" data-animate="fade-in-up">
                                <div className="pastor-img-wrapper">
                                    {pastor.hasPhoto ? (
                                        <img
                                            src={pastor.photoSrc}
                                            alt={pastor.name}
                                            className="pastor-img pastor-photo"
                                        />
                                    ) : (
                                        <div className="pastor-img pastor-placeholder">
                                            <span className="pastor-initials">{pastor.initials}</span>
                                        </div>
                                    )}
                                    {/* Decoración alrededor de la imagen */}
                                    <div className="pastor-img-ring" aria-hidden="true"></div>
                                </div>
                                <h3>{pastor.name}</h3>
                                <p className="pastor-role">{pastor.role}</p>
                                <p className="pastor-desc">{pastor.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
