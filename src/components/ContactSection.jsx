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
export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }) { // Exporta ContactSection con valores por defecto para cada prop
    /**
     * Maneja el envío del formulario de contacto.
     * Previene el comportamiento por defecto del navegador y muestra
     * un mensaje de confirmación temporal con animación CSS.
     *
     * @param {Event} e - Evento de envío del formulario
     */
    const handleSubmit = (e) => { // Define la función que maneja el evento de envío del formulario
        e.preventDefault(); // Previene que el navegador recargue la página al enviar el formulario
        const feedback = e.target.querySelector('.form-feedback'); // Busca el elemento de feedback dentro del formulario enviado
        if (feedback) { // Verifica que el elemento de feedback exista
            feedback.classList.add('show'); // Añade la clase CSS "show" para mostrar el mensaje de confirmación con animación
            setTimeout(() => { // Programa un temporizador para ocultar el mensaje después de un tiempo
                feedback.classList.remove('show'); // Remueve la clase "show" para ocultar el mensaje con animación de salida
            }, 3000); // Espera 3000 milisegundos (3 segundos) antes de ocultar
        } // Fin del if
    }; // Fin de handleSubmit

    return ( // Retorna el JSX de la sección de contacto
        <section id={id} className="section"> {/* Sección semántica con ID dinámico y clase de estilo estándar */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>} {/* Título condicional con animación fade-in-down */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>} {/* Subtítulo condicional con animación fade-in-up */}
                <div className="row g-5 contact-wrapper"> {/* Fila de Bootstrap con gutter grande para separar columnas */}
                    {/* Columna izquierda: Datos de contacto */}
                    <div className="col-12 col-md-5"> {/* Columna de datos de contacto: completa en móvil, 5/12 en md */}
                        <div className="contact-info"> {/* Contenedor para los ítems de información de contacto */}
                            {/* Dirección */}
                            <div className="contact-item" data-animate="fade-in-left"> {/* Ítem de contacto con animación de entrada desde la izquierda */}
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span> {/* Icono de ubicación de Bootstrap Icons */}
                                <div> {/* Contenedor del texto del ítem */}
                                    <h4>Dirección</h4> {/* Título del dato: Dirección */}
                                    <p>Calle Principal #123, Ciudad</p> {/* Texto con la dirección de la iglesia */}
                                </div> {/* Cierra el contenedor del texto */}
                            </div> {/* Cierra el ítem de dirección */}
                            {/* Teléfono */}
                            <div className="contact-item" data-animate="fade-in-left"> {/* Ítem de contacto con animación fade-in-left */}
                                <span className="contact-icon"><i className="bi bi-telephone-fill" aria-hidden="true"></i></span> {/* Icono de teléfono de Bootstrap Icons */}
                                <div> {/* Contenedor del texto del ítem */}
                                    <h4>Teléfono</h4> {/* Título del dato: Teléfono */}
                                    <p>(+1) 555-1234</p> {/* Texto con el número de teléfono */}
                                </div> {/* Cierra el contenedor del texto */}
                            </div> {/* Cierra el ítem de teléfono */}
                            {/* Email */}
                            <div className="contact-item" data-animate="fade-in-left"> {/* Ítem de contacto con animación fade-in-left */}
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span> {/* Icono de correo de Bootstrap Icons */}
                                <div> {/* Contenedor del texto del ítem */}
                                    <h4>Email</h4> {/* Título del dato: Email */}
                                    <p>contacto@asambleadedios.com</p> {/* Texto con la dirección de correo */}
                                </div> {/* Cierra el contenedor del texto */}
                            </div> {/* Cierra el ítem de email */}
                        </div> {/* Cierra el contenedor de información de contacto */}
                    </div> {/* Cierra la columna izquierda */}

                    {/* Columna derecha: Formulario */}
                    <div className="col-12 col-md-7"> {/* Columna del formulario: completa en móvil, 7/12 en md */}
                        <form className="contact-form" data-animate="fade-in-right" id="contactForm" onSubmit={handleSubmit}> {/* Formulario con animación fade-in-right y handler de envío */}
                            <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required /> {/* Campo de texto para el nombre, obligatorio */}
                            <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required /> {/* Campo de email con validación nativa, obligatorio */}
                            <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" /> {/* Campo de texto para el asunto, opcional */}
                            <textarea name="mensaje" placeholder="Tu Mensaje" rows="5" aria-label="Tu mensaje" required></textarea> {/* Área de texto para el mensaje, 5 filas, obligatoria */}
                            <button type="submit" className="btn btn-primary">Enviar Mensaje</button> {/* Botón de envío del formulario con estilo primario */}
                            {/* Mensaje de confirmación (oculto por defecto, se muestra con clase .show) */}
                            <div className="form-feedback"> {/* Contenedor del mensaje de feedback, oculto por defecto */}
                                <p>Mensaje enviado correctamente. ¡Gracias!</p> {/* Texto de confirmación exitosa */}
                            </div> {/* Cierra el contenedor de feedback */}
                        </form> {/* Cierra el elemento form */}
                    </div> {/* Cierra la columna del formulario */}
                </div> {/* Cierra la fila de dos columnas */}
            </div> {/* Cierra el contenedor principal */}
        </section> // Fin del elemento section
    ); // Fin del return
} // Fin del componente ContactSection
