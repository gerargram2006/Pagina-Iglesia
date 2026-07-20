export default function CTASection({ id = "unete" }) {
    return (
        <section id={id} className="cta-section">
            <div className="cta-particles" aria-hidden="true">
                <span className="cta-particle cta-particle-1"></span>
                <span className="cta-particle cta-particle-2"></span>
                <span className="cta-particle cta-particle-3"></span>
            </div>
            <div className="container cta-content">
                <span className="cta-badge" data-animate="fade-in-down">✦ Te esperamos ✦</span>
                <h2 data-animate="fade-in-up">Ven y sé parte de<br/>nuestra familia</h2>
                <p data-animate="fade-in-up">No importa quién seas o de dónde vengas, aquí hay un lugar para ti. Experimenta el amor de Dios en una comunidad que te recibe con los brazos abiertos.</p>
                <div className="cta-buttons" data-animate="fade-in-up">
                    <a href="#contacto" className="btn btn-primary btn-lg">Visítanos este Domingo</a>
                    <a href="#horarios" className="btn btn-cta-secondary">Ver Horarios</a>
                </div>
            </div>
        </section>
    );
}
