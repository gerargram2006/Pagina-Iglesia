export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) {
    const pastors = [
        {
            name: "Pastor Ruideto Costa",
            role: "Pastor Principal",
            description: "Más de 10 años dedicados al ministerio pastoral y la enseñanza bíblica.",
            initials: "RC",
            hasPhoto: true,
            photoSrc: "/img/pastor-principal.webp",
            verse: "\"Apacentad la grey de Dios que está entre vosotros\" — 1 Pedro 5:2",
        },
    ];

    return (
        <section id={id} className="section section-alt">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="pastors-grid">
                    {pastors.map((pastor, index) => (
                        <div key={index} className="pastor-card" data-animate="fade-in-up">
                            {/* Decorative elements */}
                            <div className="pastor-card-glow" aria-hidden="true"></div>
                            <div className="pastor-card-inner">
                                <div className="pastor-img-wrapper">
                                    {pastor.hasPhoto ? (
                                        <img src={pastor.photoSrc} alt={pastor.name} className="pastor-img pastor-photo" loading="lazy" />
                                    ) : (
                                        <div className="pastor-img pastor-placeholder">
                                            <span className="pastor-initials">{pastor.initials}</span>
                                        </div>
                                    )}
                                    <div className="pastor-img-ring" aria-hidden="true"></div>
                                    <div className="pastor-img-ring pastor-img-ring-2" aria-hidden="true"></div>
                                </div>
                                <div className="pastor-info">
                                    <span className="pastor-role-badge">
                                        <i className="bi bi-star-fill" aria-hidden="true"></i>
                                        {pastor.role}
                                    </span>
                                    <h3 className="pastor-name">{pastor.name}</h3>
                                    <p className="pastor-desc">{pastor.description}</p>
                                    {pastor.verse && (
                                        <blockquote className="pastor-verse">
                                            <i className="bi bi-quote" aria-hidden="true"></i>
                                            {pastor.verse}
                                        </blockquote>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
