import { useState, useEffect } from 'react';
import { api, type ApiGaleria } from '../api';

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
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        <p>Cargando galería...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && galleryItems.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-camera text-2xl block mb-3"></i>
                        <p>La galería será publicada próximamente.</p>
                    </div>
                )}

                {!loading && !error && galleryItems.length > 0 && (
                    <div className="gallery-grid">
                        {galleryItems.map((item) => (
                            <div key={item.id} className={`gallery-item ${item.destacada ? 'gallery-item-wide' : ''}`} data-animate="scale-in">
                                <img src={item.imagen_url} alt={item.titulo} className="gallery-img" loading="lazy" />
                                <div className="gallery-overlay">
                                    <div className="gallery-overlay-content">
                                        <i className="bi bi-zoom-in gallery-zoom-icon" aria-hidden="true"></i>
                                        <span className="gallery-label">{item.titulo}</span>
                                    </div>
                                </div>
                                <div className="gallery-label-bar">
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
