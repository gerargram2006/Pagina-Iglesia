// Importa el hook useState de React
import { useState } from 'react';
// Importa la API y el tipo MensajeInput para enviar los mensajes
import { api, type MensajeInput } from '../api';

// Define las propiedades que acepta el componente ContactSection
interface ContactSectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define la estructura del estado de retroalimentación del formulario
interface FeedbackState {
    // Indica si se muestra el mensaje de retroalimentación
    show: boolean;
    // Indica si el mensaje es de error
    error: boolean;
    // Texto del mensaje de retroalimentación
    text: string;
}

// Define el componente ContactSection con valores por defecto para sus propiedades
export default function ContactSection({ title = "Contacto", subtitle = "Estamos para servirte, escríbenos", id = "contacto" }: ContactSectionProps) {
    // Estado que guarda los datos ingresados en el formulario
    const [formData, setFormData] = useState<MensajeInput>({ nombre: '', email: '', asunto: '', mensaje: '' });
    // Estado que indica si el mensaje se está enviando
    const [sending, setSending] = useState(false);
    // Estado que guarda la retroalimentación del envío del formulario
    const [feedback, setFeedback] = useState<FeedbackState>({ show: false, error: false, text: '' });

    // Función que actualiza el formulario cuando el usuario escribe en un campo
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // Actualiza el campo modificado conservando el resto de los datos
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Función asíncrona que procesa el envío del formulario
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Evita que la página se recargue al enviar el formulario
        e.preventDefault();
        // Activa el estado de envío
        setSending(true);
        // Limpia la retroalimentación anterior
        setFeedback({ show: false, error: false, text: '' });

        try {
            // Envía el mensaje a la API
            await api.mensajes.create(formData);
            // Muestra un mensaje de éxito al usuario
            setFeedback({ show: true, error: false, text: '¡Mensaje enviado correctamente! Gracias por escribirnos.' });
            // Limpia los campos del formulario tras el envío
            setFormData({ nombre: '', email: '', asunto: '', mensaje: '' });
        } catch {
            // Muestra un mensaje de error si el envío falla
            setFeedback({ show: true, error: true, text: 'Error al enviar el mensaje. Inténtalo de nuevo.' });
        } finally {
            // Desactiva el estado de envío
            setSending(false);
            // Oculta la retroalimentación después de 5 segundos
            setTimeout(() => setFeedback(f => ({ ...f, show: false })), 5000);
        }
    };

    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de contacto con su identificador y estilos
        <section id={id} className="section">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Contenedor que divide la sección en dos columnas responsivas */}
                <div className="contact-wrapper grid grid-cols-1 md:grid-cols-12 gap-5">

                    {/* Columna izquierda con la información de contacto */}
                    <div className="md:col-span-5">
                        {/* Contenedor de los datos de contacto */}
                        <div className="contact-info">
                            {/* Primer elemento con la dirección de la iglesia */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ícono de ubicación */}
                                <span className="contact-icon"><i className="bi bi-geo-alt-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* Título del elemento */}
                                    <h4>Dirección</h4>
                                    {/* Dirección completa de la iglesia */}
                                    <p>Comandante Canga N° 416, Mariano Melgar 04006, Arequipa</p>
                                </div>
                            </div>
                            {/* Segundo elemento con el horario principal */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ícono de reloj */}
                                <span className="contact-icon"><i className="bi bi-clock-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* Título del elemento */}
                                    <h4>Horario Principal</h4>
                                    {/* Horario de los cultos dominicales */}
                                    <p>Domingos 10:00 AM</p>
                                </div>
                            </div>
                            {/* Tercer elemento con el correo de contacto */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ícono de sobre */}
                                <span className="contact-icon"><i className="bi bi-envelope-fill" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* Título del elemento */}
                                    <h4>Email</h4>
                                    {/* Correo electrónico de contacto */}
                                    <p>contacto@asambleadedios.com</p>
                                </div>
                            </div>
                            {/* Cuarto elemento con las redes sociales */}
                            <div className="contact-item" data-animate="fade-in-left">
                                {/* Ícono de Facebook */}
                                <span className="contact-icon"><i className="bi bi-facebook" aria-hidden="true"></i></span>
                                {/* Texto del elemento de contacto */}
                                <div>
                                    {/* Título del elemento */}
                                    <h4>Redes Sociales</h4>
                                    {/* Contenedor del enlace a redes sociales */}
                                    <p>
                                        {/* Enlace al perfil de Facebook de la iglesia */}
                                        <a href="https://www.facebook.com/profile.php?id=100076728549417" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-gold-500 transition-colors">
                                            Síguenos en Facebook
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Columna derecha con el formulario de contacto */}
                    <div className="md:col-span-7">
                        {/* Formulario de contacto que se envía con la función handleSubmit */}
                        <form className="contact-form" data-animate="fade-in-right" onSubmit={handleSubmit}>
                            {/* Campo del nombre del usuario */}
                            <div className="contact-field-wrapper">
                                {/* Ícono de persona */}
                                <i className="bi bi-person"></i>
                                {/* Entrada de texto para el nombre */}
                                <input type="text" name="nombre" placeholder="Tu Nombre" aria-label="Tu nombre" required value={formData.nombre} onChange={handleChange} />
                            </div>
                            {/* Campo del correo del usuario */}
                            <div className="contact-field-wrapper">
                                {/* Ícono de sobre */}
                                <i className="bi bi-envelope"></i>
                                {/* Entrada de texto para el email */}
                                <input type="email" name="email" placeholder="Tu Email" aria-label="Tu email" required value={formData.email} onChange={handleChange} />
                            </div>
                            {/* Campo del asunto del mensaje */}
                            <div className="contact-field-wrapper">
                                {/* Ícono de burbuja de conversación */}
                                <i className="bi bi-chat-text"></i>
                                {/* Entrada de texto para el asunto */}
                                <input type="text" name="asunto" placeholder="Asunto" aria-label="Asunto" value={formData.asunto} onChange={handleChange} />
                            </div>
                            {/* Campo del mensaje del usuario */}
                            <div className="contact-field-wrapper contact-field-textarea">
                                {/* Ícono de lápiz */}
                                <i className="bi bi-pencil-square"></i>
                                {/* Área de texto para el mensaje */}
                                <textarea name="mensaje" placeholder="Tu Mensaje" rows={5} aria-label="Tu mensaje" required value={formData.mensaje} onChange={handleChange}></textarea>
                            </div>

                            {/* Botón para enviar el mensaje, deshabilitado mientras se envía */}
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {/* Muestra un indicador mientras se está enviando */}
                                {sending ? (
                                    // Indicador de carga con el texto "Enviando"
                                    <><span className="login-spinner"></span> Enviando...</>
                                ) : (
                                    // Ícono y texto para enviar el mensaje
                                    <><i className="bi bi-send"></i> Enviar Mensaje</>
                                )}
                            </button>

                            {/* Muestra la retroalimentación si está activa */}
                            {feedback.show && (
                                // Contenedor con el mensaje de éxito o error
                                <div className={`form-feedback show ${feedback.error ? 'form-feedback--error' : ''}`}>
                                    {/* Párrafo con el mensaje de retroalimentación */}
                                    <p>
                                        {/* Ícono según el tipo de mensaje */}
                                        <i className={`bi ${feedback.error ? 'bi-exclamation-circle' : 'bi-check-circle'}`}></i>
                                        {/* Texto de la retroalimentación */}
                                        {feedback.text}
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>

                {/* Google Maps embebido */}
                {/* Contenedor del mapa de Google con la ubicación de la iglesia */}
                <div className="contact-map" data-animate="fade-in-up">
                    {/* Inserta el mapa de Google embebido con la ubicación */}
                    <iframe
                        // URL del mapa de Google con la ubicación de la iglesia
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.5!2d-71.52!3d-16.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTbCsDI0JzAwLjAiUyA3McKwMzEnMTIuMCJX!5e0!3m2!1ses!2spe!4v1234567890"
                        // Permite la pantalla completa del mapa
                        allowFullScreen
                        // Carga el mapa de forma diferida
                        loading="lazy"
                        // Política de referencia al navegar desde el mapa
                        referrerPolicy="no-referrer-when-downgrade"
                        // Título descriptivo del mapa para accesibilidad
                        title="Ubicación de la Iglesia Asamblea de Dios en Arequipa"
                    ></iframe>
                    {/* Etiqueta con la dirección de la iglesia sobre el mapa */}
                    <div className="contact-map-label">
                        {/* Ícono de ubicación */}
                        <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                        {/* Dirección de la iglesia */}
                        <span>Comandante Canga N° 416, Mariano Melgar 04006 — Arequipa, Perú</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
