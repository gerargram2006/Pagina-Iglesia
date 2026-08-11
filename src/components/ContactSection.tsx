import { useState } from 'react';
import { api, MensajeInput } from '../api';

interface ContactSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

interface FeedbackState {
    show: boolean;
    error: boolean;
    text: string;
}

export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }: ContactSectionProps) {
    const [formData, setFormData] = useState<MensajeInput>({ nombre: '', email: '', asunto: '', mensaje: '' });
    const [sending, setSending] = useState(false);
    const [feedback, setFeedback] = useState<FeedbackState>({ show: false, error: false, text: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                <div className="contact-wrapper grid grid-cols-1 md:grid-cols-12 gap-5">

                    <div className="md:col-span-5">
                        <div className="contact-info">
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Dirección</h4>
                                    <p>Comandante Canga N° 416, Mariano Melgar 04006, Arequipa</p>
                                </div>
                            </div>
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-clock-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Horario Principal</h4>
                                    <p>Domingos 10:00 AM</p>
                                </div>
                            </div>
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Email</h4>
                                    <p>contacto@asambleadedios.com</p>
                                </div>
                            </div>
                            <div className="contact-item" data-animate="fade-in-left">
                                <span className="contact-icon"><i className="bi bi-facebook" aria-hidden="true"></i></span>
                                <div>
                                    <h4>Redes Sociales</h4>
                                    <p>
                                        <a href="https://www.facebook.com/profile.php?id=100076728549417" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-gold-500 transition-colors">
                                            Síguenos en Facebook
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-7">
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
                                <textarea name="mensaje" placeholder="Tu Mensaje" rows={5} aria-label="Tu mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
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

                {/* Google Maps embebido */}
                <div className="contact-map" data-animate="fade-in-up">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.5!2d-71.52!3d-16.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI0JzAwLjAiUyA3McKwMzEnMTIuMCJX!5e0!3m2!1ses!2spe!4v1234567890"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de la Iglesia Asamblea de Dios en Arequipa"
                    ></iframe>
                    <div className="contact-map-label">
                        <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                        <span>Comandante Canga N° 416, Mariano Melgar 04006 — Arequipa, Perú</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
