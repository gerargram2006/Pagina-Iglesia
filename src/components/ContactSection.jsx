import { useState } from 'react';
import { api } from '../api';

export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }) {
    const [formData, setFormData] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
    const [sending, setSending] = useState(false);
    const [feedback, setFeedback] = useState({ show: false, error: false, text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setFeedback({ show: false, error: false, text: '' });

        try {
            await api.mensajes.create(formData);
            setFeedback({ show: true, error: false, text: '¡Mensaje enviado correctamente! Gracias por escribirnos.' });
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } catch {
            setFeedback({ show: true, error: true, text: 'Error al enviar el mensaje. Inténtalo de nuevo.' });
        } finally {
            setSending(false);
            setTimeout(() => setFeedback(f => ({ ...f, show: false })), 5000);
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
                        <form className="contact-form" data-animate="fade-in-right" onSubmit={handleSubmit}>
                            <div className="contact-field-wrapper">
                                <i className="bi bi-person"></i>
                                <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required value={formData.nombre} onChange={handleChange} />
                            </div>
                            <div className="contact-field-wrapper">
                                <i className="bi bi-envelope"></i>
                                <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="contact-field-wrapper">
                                <i className="bi bi-chat-text"></i>
                                <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" value={formData.asunto} onChange={handleChange} />
                            </div>
                            <div className="contact-field-wrapper contact-field-textarea">
                                <i className="bi bi-pencil-square"></i>
                                <textarea name="mensaje" placeholder="Tu Mensaje" rows="5" aria-label="Tu mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {sending ? (
                                    <><span className="login-spinner"></span> Enviando...</>
                                ) : (
                                    <><i className="bi bi-send"></i> Enviar Mensaje</>
                                )}
                            </button>
                            {feedback.show && (
                                <div className={`form-feedback show ${feedback.error ? 'form-feedback--error' : ''}`}>
                                    <p>
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
