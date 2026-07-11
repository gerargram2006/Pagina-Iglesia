export default function AboutSection({ title = "Quiénes Somos", subtitle = "Conoce nuestra historia y misión", id = "quienes-somos" }) {
  return (
    <section id={id} className="section section-alt">
      <div className="container">
        {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
        {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
        <div className="about-content">
          <div className="about-text">
            <p data-animate="fade-in-up">Somos una iglesia comprometida con la enseñanza bíblica, la oración y el servicio a la comunidad. Desde nuestra fundación, hemos trabajado para ser un faro de luz y esperanza en nuestra ciudad.</p>
            <p data-animate="fade-in-up">Creemos en el amor de Dios, en la salvación por medio de Jesucristo y en el poder del Espíritu Santo para transformar vidas. Nuestra misión es predicar el evangelio, discipular creyentes y servir a nuestra comunidad con amor y dedicación.</p>
            <div className="about-values">
              <div className="row g-4">
                <div className="col-12 col-md-4">
                  <div className="value-item" data-animate="scale-in">
                    <span className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cross" viewBox="0 0 16 16" aria-hidden="true" style={{verticalAlign: 'middle'}}><path d="M7 2h2v3h3v2H9v7H7V7H4V5h3V2z"/></svg></span>
                    <h3>Fe</h3>
                    <p>Creemos en Dios Padre, Hijo y Espíritu Santo</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="value-item" data-animate="scale-in">
                    <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span>
                    <h3>Amor</h3>
                    <p>Amamos a Dios y al prójimo como a nosotros mismos</p>
                  </div>
                </div>
                <div className="col-12 col-md-4">
                  <div className="value-item" data-animate="scale-in">
                    <span className="value-icon"><i className="bi bi-handshake-fill" aria-hidden="true"></i></span>
                    <h3>Servicio</h3>
                    <p>Servimos a nuestra comunidad con humildad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
