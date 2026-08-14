// Importa los hooks useState y useEffect de React
import { useState, useEffect } from 'react';
// Importa la API y el tipo ApiGaleria para obtener las fotos de la galería
import { api, type ApiGaleria } from '../api';

// Define las propiedades que acepta el componente GallerySection
interface GallerySectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define el componente GallerySection con valores por defecto para sus propiedades
export default function GallerySection({ title = "Nuestra Comunidad", subtitle = "Momentos que reflejan el amor de Dios en nuestra iglesia", id = "galeria" }: GallerySectionProps) {
    // Estado que guarda la lista de fotos obtenidas de la API
    const [galleryItems, setGalleryItems] = useState<ApiGaleria[]>([]);
    // Estado que indica si las fotos se están cargando
    const [loading, setLoading] = useState(true);
    // Estado que guarda el mensaje de error si ocurre uno
    const [error, setError] = useState('');

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona que obtiene las fotos desde la API
        const fetchGallery = async () => {
            try {
                // Obtiene todas las fotos desde la API
                const data = await api.galeria.getAll();
                // Guarda las fotos en el estado, validando que sea un arreglo
                setGalleryItems(Array.isArray(data) ? data : []);
            } catch {
                // Guarda un mensaje de error si la petición falla
                setError('No se pudieron cargar las fotos.');
            } finally {
                // Desactiva el estado de carga en cualquier caso
                setLoading(false);
            }
        };
        // Llama a la función que obtiene las fotos
        fetchGallery();
    }, []);

    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de la galería con su identificador y estilos
        <section id={id} className="section">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen las fotos */}
                {loading && (
                    // Contenedor centrado con el mensaje de carga
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando galería" */}
                        <p>Cargando galería...</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si ocurrió uno */}
                {error && !loading && (
                    // Contenedor centrado con el error
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de advertencia */}
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        {/* Muestra el mensaje de error */}
                        <p>{error}</p>
                    </div>
                )}

                {/* Muestra un aviso si no hay fotos publicadas */}
                {!loading && !error && galleryItems.length === 0 && (
                    // Contenedor centrado con el aviso
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de cámara */}
                        <i className="bi bi-camera text-2xl block mb-3"></i>
                        {/* Texto indicando que la galería se publicará próximamente */}
                        <p>La galería será publicada próximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrícula de fotos solo si hay datos disponibles */}
                {!loading && !error && galleryItems.length > 0 && (
                    // Cuadrícula de la galería de fotos
                    <div className="gallery-grid">
                        {/* Recorre la lista de fotos para generar cada elemento de la galería */}
                        {galleryItems.map((item) => (
                            // Elemento de la galería, más ancho si está destacado
                            <div key={item.id} className={`gallery-item ${item.destacada ? 'gallery-item-wide' : ''}`} data-animate="scale-in">
                                {/* Imagen de la galería con carga diferida */}
                                <img src={item.imagen_url} alt={item.titulo} className="gallery-img" loading="lazy" />
                                {/* Capa superpuesta que aparece al pasar el cursor */}
                                <div className="gallery-overlay">
                                    {/* Contenido del superpuesto con el ícono y la etiqueta */}
                                    <div className="gallery-overlay-content">
                                        {/* Ícono de zoom para ampliar la foto */}
                                        <i className="bi bi-zoom-in gallery-zoom-icon" aria-hidden="true"></i>
                                        {/* Etiqueta con el título de la foto */}
                                        <span className="gallery-label">{item.titulo}</span>
                                    </div>
                                </div>
                                {/* Barra inferior con la etiqueta de la foto */}
                                <div className="gallery-label-bar">
                                    {/* Muestra el título de la foto */}
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
