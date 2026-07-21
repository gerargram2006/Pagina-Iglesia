export default function GallerySection({ title = "Nuestra Comunidad", subtitle = "Momentos que reflejan el amor de Dios en nuestra iglesia", id = "galeria" }) {
    const galleryItems = [
        { label: "Alabanza y Adoración", image: "/img/galeria-congregacion.png", span: "gallery-item-wide" },
        { label: "Grupos de Jóvenes", image: "/img/galeria-jovenes.png", span: "" },
        { label: "Ministerio Infantil", image: "/img/galeria-infantil.png", span: "" },
        { label: "Ministerio de Mujeres", image: "/img/galeria-mujeres.png", span: "" },
        { label: "Bautizos", image: "/img/galeria-bautizos.png", span: "" },
        { label: "Eventos Especiales", image: "/img/galeria-congregacion.png", span: "gallery-item-wide" },
    ];

    return (
        <section id={id} className="section">
            <div className="container">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="gallery-grid">
                    {galleryItems.map((item, index) => (
                        <div key={index} className={`gallery-item ${item.span}`} data-animate="scale-in">
                            <img src={item.image} alt={item.label} className="gallery-img" loading="lazy" />
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
