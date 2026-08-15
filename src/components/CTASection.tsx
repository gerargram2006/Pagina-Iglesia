interface CTASectionProps {
    id?: string;
}

export default function CTASection({ id = "unete" }: CTASectionProps) {
    return (
        <section id={id} className="cta-section">
            {/* Contenedor de las partículas decorativas de fondo */}
            <div className="cta-particles" aria-hidden="true">
                {/* Primera partícula decorativa */}
                <span className="cta-particle cta-particle-1"></span>
                {/* Segunda partícula decorativa */}
                <span className="cta-particle cta-particle-2"></span>
                {/* Tercera partícula decorativa */}
                <span className="cta-particle cta-particle-3"></span>
            </div>
            {/* Contenedor con el contenido de la llamada a la acción */}
            <div className="container cta-content">
                {/* Insignia con el mensaje de bienvenida */}
                <span className="cta-badge" data-animate="fade-in-down">✦ Te esperamos ✦</span>
                {/* Título principal que invita a unirse a la iglesia */}
                <h2 data-animate="fade-in-up">Ven y sé parte de<br/>nuestra familia</h2>
                {/* Párrafo de bienvenida para los visitantes */}
                <p data-animate="fade-in-up">No importa quién seas o de dónde vengas, aquí hay un lugar para ti. Experimenta el amor de Dios en una comunidad que te recibe con los brazos abiertos.</p>
                {/* Contenedor con los botones de acción */}
                <div className="cta-buttons" data-animate="fade-in-up">
                    {/* Enlace para visitar la iglesia el domingo */}
                    <a href="#contacto" className="btn btn-primary btn-lg">Visítanos este Domingo</a>
                    {/* Enlace para ver los horarios de culto */}
                    <a href="#horarios" className="btn btn-cta-secondary">Ver Horarios</a>
                </div>
            </div>
        </section>
    );
}
