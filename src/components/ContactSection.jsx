export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.querySelector('.form-feedback');
    if (feedback) {
      feedback.hidden = false;
      setTimeout(() => {
        feedback.hidden = true;
      }, 3000);
    }
  };

  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
        {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
        <div className="row g-5 contact-wrapper">
          <div className="col-12 col-md-5">
            <div className="contact-info">
              <div className="contact-item" data-animate="fade-in-left">
                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                <div>
                  <h4>Dirección</h4>
                  <p>Calle Principal #123, Ciudad</p>
                </div>
              </div>
              <div className="contact-item" data-animate="fade-in-left">
                <span className="contact-icon"><i className="bi bi-telephone-fill" aria-hidden="true"></i></span>
                <div>
                  <h4>Teléfono</h4>
                  <p>(+1) 555-1234</p>
                </div>
              </div>
              <div className="contact-item" data-animate="fade-in-left">
                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                <div>
                  <h4>Email</h4>
                  <p>contacto@asambleadedios.com</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-12 col-md-7">
            <form className="contact-form" data-animate="fade-in-right" id="contactForm" onSubmit={handleSubmit}>
              <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required />
              <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required />
              <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" />
              <textarea name="mensaje" placeholder="Tu Mensaje" rows="5" aria-label="Tu mensaje" required></textarea>
              <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
              <div className="form-feedback" hidden>
                <p>Mensaje enviado correctamente. ¡Gracias!</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
