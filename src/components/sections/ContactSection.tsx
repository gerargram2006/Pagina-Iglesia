import { useState } from 'react';
import { api, type MensajeInput } from '../../api';

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

export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escrÃ­benos", id = "contacto" }: ContactSectionProps) {
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
            setFeedback({ show: true, error: false, text: 'Â¡Mensaje enviado correctamente! Gracias por escribirnos.' });
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } catch {
            setFeedback({ show: true, error: true, text: 'Error al enviar el mensaje. IntÃ©ntalo de nuevo.' });
        } finally {
            setSending(false);
            setTimeout(() => setFeedback(f => ({ ...f, show: false })), 5000);
        }
    };

    return (
        <section id={id} className="section">
            {/* Contenedor central con ancho mÃ¡ximo y mÃ¡rgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el tÃ­tulo solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtÃ­tulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Contenedor que divide la secciÃ³n en dos columnas responsivas */}
                <div className="contact-wrapper grid grid-cols-1 md:grid-cols-12 gap-5">

                    {/* Columna izquierda con la informaciÃ³n de contacto */}
                    <div className="md:col-span-5">
                        {/* Contenedor de los datos de contacto */}
                        <div className="contact-info">
                            {/* Primer elemento con la direcciÃ³n de la iglesia */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ãcono de ubicaciÃ³n */}
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* TÃ­tulo del elemento */}
                                    <h4>DirecciÃ³n</h4>
                                    {/* DirecciÃ³n completa de la iglesia */}
                                    <p>Comandante Canga NÂ° 416, Mariano Melgar 04006, Arequipa</p>
                                </div>
                            </div>
                            {/* Segundo elemento con el horario principal */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ãcono de reloj */}
                                <span className="contact-icon"><i className="bi bi-clock-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* TÃ­tulo del elemento */}
                                    <h4>Horario Principal</h4>
                                    {/* Horario de los cultos dominicales */}
                                    <p>Domingos 10:00 AM</p>
                                </div>
                            </div>
                            {/* Tercer elemento con el correo de contacto */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ãcono de sobre */}
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* TÃ­tulo del elemento */}
                                    <h4>Email</h4>
                                    {/* Correo electrÃ³nico de contacto */}
                                    <p>contacto@asambleadedios.com</p>
                                </div>
                            </div>
                            {/* Cuarto elemento con las redes sociales */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ãcono de Facebook */}
                                <span className="contact-icon"><i className="bi bi-facebook" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* TÃ­tulo del elemento */}
                                    <h4>Redes Sociales</h4>
                                    {/* Contenedor del enlace a redes sociales */}
                                    <p>
                                        {/* Enlace al perfil de Facebook de la iglesia */}
                                        <a href="https://www.facebook.com/profile.php?id=100076728549417" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-gold-500 transition-colors">
                                            SÃ­guenos en Facebook
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha con el formulario de contacto */}
                    <div className="md:col-span-7">
                        {/* Formulario de contacto que se envÃ­a con la funciÃ³n handleSubmit */}
                        <form className="contact-form" data-animate="fade-in-right" onSubmit={handleSubmit}>
                            {/* Campo del nombre del usuario */}
                            <div className="contact-field-wrapper">
                                {/* Ãcono de persona */}
                                <i className="bi bi-person"></i>
                                {/* Entrada de texto para el nombre */}
                                <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required value={formData.nombre} onChange={handleChange} />
                            </div>
                            {/* Campo del correo del usuario */}
                            <div className="contact-field-wrapper">
                                {/* Ãcono de sobre */}
                                <i className="bi bi-envelope"></i>
                                {/* Entrada de texto para el email */}
                                <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required value={formData.email} onChange={handleChange} />
                            </div>
                            {/* Campo del asunto del mensaje */}
                            <div className="contact-field-wrapper">
                                {/* Ãcono de burbuja de conversaciÃ³n */}
                                <i className="bi bi-chat-text"></i>
                                {/* Entrada de texto para el asunto */}
                                <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" value={formData.asunto} onChange={handleChange} />
                            </div>
                            {/* Campo del mensaje del usuario */}
                            <div className="contact-field-wrapper contact-field-textarea">
                                {/* Ãcono de lÃ¡piz */}
                                <i className="bi bi-pencil-square"></i>
                                {/* Ãrea de texto para el mensaje */}
                                <textarea name="mensaje" placeholder="Tu Mensaje" rows={5} aria-label="Tu mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
                            </div>

                            {/* BotÃ³n para enviar el mensaje, deshabilitado mientras se envÃ­a */}
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {/* Muestra un indicador mientras se estÃ¡ enviando */}
                                {sending ? (
                                    <><span className="login-spinner"></span> Enviando...</>
                                ) : (
                                    <><i className="bi bi-send"></i> Enviar Mensaje</>
                                )}
                            </button>

                            {/* Muestra la retroalimentaciÃ³n si estÃ¡ activa */}
                            {feedback.show && (
                                <div className={`form-feedback show ${feedback.error ? 'form-feedback--error' : ''}`}>
                                    {/* PÃ¡rrafo con el mensaje de retroalimentaciÃ³n */}
                                    <p>
                                        {/* Ãcono segÃºn el tipo de mensaje */}
                                        <i className={`bi ${feedback.error ? 'bi-exclamation-circle' : 'bi-check-circle'}`}></i>
                                        {/* Texto de la retroalimentaciÃ³n */}
                                        {feedback.text}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Google Maps embebido */}
                {/* Contenedor del mapa de Google con la ubicaciÃ³n de la iglesia */}
                <div className="contact-map" data-animate="fade-in-up">
                    {/* Inserta el mapa de Google embebido con la ubicaciÃ³n */}
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.5!2d-71.52!3d-16.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI0JzAwLjAiUyA3McKwMzEnMTIuMCJX!5e0!3m2!1ses!2spe!4v1234567890"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="UbicaciÃ³n de la Iglesia Asamblea de Dios en Arequipa"
                    ></iframe>
                    {/* Etiqueta con la direcciÃ³n de la iglesia sobre el mapa */}
                    <div className="contact-map-label">
                        {/* Ãcono de ubicaciÃ³n */}
                        <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                        {/* DirecciÃ³n de la iglesia */}
                        <span>Comandante Canga NÂ° 416, Mariano Melgar 04006 â€” Arequipa, PerÃº</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
