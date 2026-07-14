/**
 * Componente GallerySection - Galería de fotos de la iglesia.
 *
 * Muestra un grid estilo bento con 6 espacios para imágenes de la iglesia.
 * Los placeholders tienen un diseño estilizado con instrucciones para
 * que el usuario reemplace con fotos reales.
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 */
export default function GallerySection({ title = "Nuestra Comunidad", subtitle = "Momentos que reflejan el amor de Dios en nuestra iglesia", id = "galeria" }) {
    const galleryItems = [
        { label: "Alabanza y Adoración", hint: "Foto de worship", span: "gallery-item-wide" },
        { label: "Estudio Bíblico", hint: "Foto de estudio bíblico", span: "" },
        { label: "Grupos de Jóvenes", hint: "Foto de jóvenes", span: "" },
        { label: "Comunión", hint: "Foto de comunión", span: "" },
        { label: "Servicio Comunitario", hint: "Foto de servicio", span: "" },
        { label: "Eventos Especiales", hint: "Foto de eventos", span: "gallery-item-wide" },
    ];

    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="gallery-grid">
                    {galleryItems.map((item, index) => (
                        <div
                            key={index}
                            className={`gallery-item ${item.span}`}
                            data-animate="scale-in"
                        >
                            {/* Placeholder - reemplazar con <img src="tu-foto.jpg" alt={item.label} /> */}
                            <div className="gallery-placeholder">
                                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                                </svg>
                                <span className="gallery-placeholder-text">{item.hint}</span>
                            </div>
                            <div className="gallery-overlay">
                                <span className="gallery-label">{item.label}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
