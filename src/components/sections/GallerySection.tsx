import { useState, useEffect } from 'react';
import { api, type ApiGaleria } from '../../api';

interface GallerySectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

export default function GallerySection({ title = "Nuestra Comunidad", subtitle = "Momentos que reflejan el amor de Dios en nuestra iglesia", id = "galeria" }: GallerySectionProps) {
    const [galleryItems, setGalleryItems] = useState<ApiGaleria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const data = await api.galeria.getAll();
                setGalleryItems(Array.isArray(data) ? data : []);
            } catch {
                setError('No se pudieron cargar las fotos.');
            } finally {
                setLoading(false);
            }
        };
        fetchGallery();
    }, []);

    return (
        <section id={id} className="section">
            {/* Contenedor central con ancho mÃ¡ximo y mÃ¡rgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el tÃ­tulo solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtÃ­tulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen las fotos */}
                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando galerÃ­a" */}
                        <p>Cargando galerÃ­a...</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si ocurriÃ³ uno */}
                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de advertencia */}
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        {/* Muestra el mensaje de error */}
                        <p>{error}</p>
                    </div>
                )}

                {/* Muestra un aviso si no hay fotos publicadas */}
                {!loading && !error && galleryItems.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de cÃ¡mara */}
                        <i className="bi bi-camera text-2xl block mb-3"></i>
                        {/* Texto indicando que la galerÃ­a se publicarÃ¡ prÃ³ximamente */}
                        <p>La galerÃ­a serÃ¡ publicada prÃ³ximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrÃ­cula de fotos solo si hay datos disponibles */}
                {!loading && !error && galleryItems.length > 0 && (
                    <div className="gallery-grid">
                        {/* Recorre la lista de fotos para generar cada elemento de la galerÃ­a */}
                        {galleryItems.map((item) => (
                            <div key={item.id} className={`gallery-item ${item.destacada ? 'gallery-item-wide' : ''}`} data-animate="scale-in">
                                {/* Imagen de la galerÃ­a con carga diferida */}
                                <img src={item.imagen_url} alt={item.titulo} className="gallery-img" loading="lazy" />
                                {/* Capa superpuesta que aparece al pasar el cursor */}
                                <div className="gallery-overlay">
                                    {/* Contenido del superpuesto con el Ã­cono y la etiqueta */}
                                    <div className="gallery-overlay-content">
                                        {/* Ãcono de zoom para ampliar la foto */}
                                        <i className="bi bi-zoom-in gallery-zoom-icon" aria-hidden="true"></i>
                                        {/* Etiqueta con el tÃ­tulo de la foto */}
                                        <span className="gallery-label">{item.titulo}</span>
                                    </div>
                                </div>
                                {/* Barra inferior con la etiqueta de la foto */}
                                <div className="gallery-label-bar">
                                    {/* Muestra el tÃ­tulo de la foto */}
                                    <span>{item.titulo}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
