export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) {
    const pastors = [
        { name: "Pastor Juan Pérez", role: "Pastor Principal", description: "Más de 20 años dedicados al ministerio pastoral y la enseñanza bíblica.", initials: "JP", hasPhoto: true, photoSrc: "/img/pastor-principal.png" },
        { name: "Pastora María García", role: "Pastora de Jóvenes", description: "Liderando y guiando a la nueva generación en su caminar con Cristo.", initials: "MG", hasPhoto: false, photoSrc: "" },
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
                                        <img src={pastor.photoSrc} alt={pastor.name} className="pastor-img pastor-photo" />
                                    ) : (
                                        <div className="pastor-img pastor-placeholder">
                                            <span className="pastor-initials">{pastor.initials}</span>
                                        </div>
                                    )}
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
