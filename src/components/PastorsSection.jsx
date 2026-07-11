export default function PastorsSection({ title = "Nuestros Pastores", subtitle = "Liderazgo espiritual al servicio de Dios", id = "pastores" }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
        {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-sm-6 col-lg-5">
            <div className="pastor-card" data-animate="fade-in-up">
              <div className="pastor-img pastor-placeholder">
                <span><i className="bi bi-book-half" style={{color: 'var(--white)'}} aria-hidden="true"></i></span>
              </div>
              <h3>Pastor Juan Pérez</h3>
              <p className="pastor-role">Pastor Principal</p>
              <p className="pastor-desc">Más de 20 años dedicado al ministerio pastoral y la enseñanza bíblica.</p>
            </div>
          </div>
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
