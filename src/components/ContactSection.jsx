/**
 * Componente ContactSection - Sección de contacto.
 *
 * Muestra información de contacto de la iglesia y un formulario para
 * enviar mensajes. Se usa en Home (sección) y en /contacto (página completa).
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 *
 * Estructura (2 columnas en desktop):
 *   - Izquierda: Datos de contacto (dirección, teléfono, email) con iconos.
 *   - Derecha: Formulario con campos nombre, email, asunto y mensaje.
 *
 * El formulario muestra un mensaje de confirmación temporal (3 segundos)
 * al enviar, usando la clase CSS ".show" para la animación de entrada/salida.
 *
 * Nota: El formulario actualmente solo muestra feedback visual.
 *       Para un sitio en producción, conectar con un servicio de email
 *       (EmailJS, Formspree, backend propio, etc.).
 */
export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }) {
    /**
     * Maneja el envío del formulario de contacto.
     * Previene el comportamiento por defecto del navegador y muestra
     * un mensaje de confirmación temporal con animación CSS.
     *
     * @param {Event} e - Evento de envío del formulario
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const feedback = e.target.querySelector('.form-feedback');
        if (feedback) {
            feedback.classList.add('show');
            setTimeout(() => {
                feedback.classList.remove('show');
            }, 3000);
        }
    };

    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="row g-5 contact-wrapper">
                    {/* Columna izquierda: Datos de contacto */}
                    <div className="col-12 col-md-5">
                        <div className="contact-info">
                            {/* Dirección */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Dirección</h4>
                                    <p>Calle Principal #123, Ciudad</p>
                                </div>
                            </div>
                            {/* Teléfono */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-telephone-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Teléfono</h4>
                                    <p>(+1) 555-1234</p>
                                </div>
                            </div>
                            {/* Email */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Email</h4>
                                    <p>contacto@asambleadedios.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha: Formulario */}
                    <div className="col-12 col-md-7">
                        <form className="contact-form" data-animate="fade-in-right" id="contactForm" onSubmit={handleSubmit}>
                            <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required />
                            <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required />
                            <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" />
                            <textarea name="mensaje" placeholder="Tu Mensaje" rows="5" aria-label="Tu mensaje" required></textarea>
                            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
                            {/* Mensaje de confirmación (oculto por defecto, se muestra con clase .show) */}
                            <div className="form-feedback">
                                <p>Mensaje enviado correctamente. ¡Gracias!</p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
