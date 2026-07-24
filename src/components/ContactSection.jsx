// Importa useState de React para manejar el estado del formulario
import { useState } from 'react';
// Importa la función api para enviar mensajes al backend
import { api } from '../api';

/**
 * ContactSection - Sección de contacto con formulario
 * Se usa tanto en Home.jsx (sección) como en Contacto.jsx (página completa)
 * Envía mensajes al backend y muestra feedback al usuario
 * @param {string} title - Título de la sección (default: "Contacto")
 * @param {string} subtitle - Subtítulo descriptivo
 * @param {string} id - ID del elemento HTML (para enlaces internos como #contacto)
 */
export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }) {
    // Estado del formulario: campos nombre, email, asunto y mensaje
    const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
    // Estado de envío: true mientras se envía el mensaje (deshabilita el botón)
    const [sending, setSending] = useState(false);
    // Estado de feedback: muestra mensaje de éxito o error al usuario
    const [feedback, setFeedback] = useState({ show: false, error: false, text: '' });

    // Actualiza el estado del formulario cuando el usuario escribe en cualquier campo
    // [e.target.name] = el nombre del campo (nombre, email, asunto, mensaje)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * handleSubmit - Envía el formulario al backend
     * Previene el refresh de la página, envía los datos, y muestra feedback
     */
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene que el formulario recargue la página
        setSending(true);   // Marca que está enviando (deshabilita botón)
        setFeedback({ show: false, error: false, text: '' }); // Limpia feedback anterior

        try {
            // Envía los datos del formulario al backend (POST /api/mensajes)
            await api.mensajes.create(formData);
            // Si todo sale bien, muestra mensaje de éxito
            setFeedback({ show: true, error: false, text: '¡Mensaje enviado correctamente! Gracias por escribirnos.' });
            // Limpia todos los campos del formulario
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } catch {
            // Si hay error, muestra mensaje de error
            setFeedback({ show: true, error: true, text: 'Error al enviar el mensaje. Inténtalo de nuevo.' });
        } finally {
            setSending(false); // Siempre desactiva el estado de envío
            // Oculta el feedback automáticamente después de 5 segundos
            setTimeout(() => setFeedback(f => ({ ...f, show: false })), 5000);
        }
    };

    return (
        {/* Sección con ID para enlaces internos (#contacto) */}
        <section id={id} className="section">
            <div className="container">
                {/* Título y subtítulo con animaciones de scroll */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Fila con 2 columnas: info de contacto (izq) + formulario (der) */}
                <div className="row g-5 contact-wrapper">

                    {/* COLUMNA IZQUIERDA: Información de contacto */}
                    <div className="col-12 col-md-5">
                        <div className="contact-info">
                            {/* Item: Dirección */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Dirección</h4>
                                    <p>Calle Principal #123, Ciudad</p>
                                </div>
                            </div>
                            {/* Item: Teléfono */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-telephone-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Teléfono</h4>
                                    <p>(+1) 555-1234</p>
                                </div>
                            </div>
                            {/* Item: Email */}
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Email</h4>
                                    <p>contacto@asambleadedios.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Formulario de contacto */}
                    <div className="col-12 col-md-7">
                        <form className="contact-form" data-animate="fade-in-right" onSubmit={handleSubmit}>
                            {/* Campo: Nombre */}
                            <div className="contact-field-wrapper">
                                <i className="bi bi-person"></i>
                                <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required value={formData.nombre} onChange={handleChange} />
                            </div>
                            {/* Campo: Email */}
                            <div className="contact-field-wrapper">
                                <i className="bi bi-envelope"></i>
                                <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required value={formData.email} onChange={handleChange} />
                            </div>
                            {/* Campo: Asunto (opcional) */}
                            <div className="contact-field-wrapper">
                                <i className="bi bi-chat-text"></i>
                                <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" value={formData.asunto} onChange={handleChange} />
                            </div>
                            {/* Campo: Mensaje (textarea) */}
                            <div className="contact-field-wrapper contact-field-textarea">
                                <i className="bi bi-pencil-square"></i>
                                <textarea name="mensaje" placeholder="Tu Mensaje" rows="5" aria-label="Tu mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
                            </div>

                            {/* Botón de envío: muestra spinner mientras envía */}
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {sending ? (
                                    // Estado de carga: muestra spinner + texto "Enviando..."
                                    <><span className="login-spinner"></span> Enviando...</>
                                ) : (
                                    // Estado normal: muestra icono + texto "Enviar Mensaje"
                                    <><i className="bi bi-send"></i> Enviar Mensaje</>
                                )}
                            </button>

                            {/* Feedback al usuario: éxito o error (se oculta después de 5s) */}
                            {feedback.show && (
                                <div className={`form-feedback show ${feedback.error ? 'form-feedback--error' : ''}`}>
                                    <p>
                                        {/* Icono dinámico: check-circle (éxito) o exclamation-circle (error) */}
                                        <i className={`bi ${feedback.error ? 'bi-exclamation-circle' : 'bi-check-circle'}`}></i>
                                        {feedback.text}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
