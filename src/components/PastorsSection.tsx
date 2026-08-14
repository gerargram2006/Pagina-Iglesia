// Importa los hooks useEffect y useState de React
import { useEffect, useState } from 'react';
// Importa la API y el tipo ApiPastor para obtener los pastores
import { api, type ApiPastor } from '../api';

// Función que obtiene las iniciales del nombre de un pastor
function initials(name: string): string {
    // Procesa el nombre paso a paso para obtener sus iniciales
    return name
        // Convierte el nombre en un arreglo de palabras
        .split(/\s+/)
        // Elimina los elementos vacíos del arreglo
        .filter(Boolean)
        // Se queda solo con las dos primeras palabras
        .slice(0, 2)
        // Toma la primera letra de cada palabra
        .map((part) => part[0]!)
        // Une las iniciales en una sola cadena
        .join('')
        // Convierte las iniciales a mayúsculas
        .toUpperCase();
}

// Define las propiedades que acepta el componente PastorsSection
interface PastorsSectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define el componente PastorsSection con valores por defecto para sus propiedades
export default function PastorsSection({ title = 'Nuestros Pastores', subtitle = 'Liderazgo espiritual al servicio de Dios', id = 'pastores' }: PastorsSectionProps) {
    // Estado que guarda la lista de pastores obtenidos de la API
    const [pastors, setPastors] = useState<ApiPastor[]>([]);
    // Estado que indica si los pastores se están cargando
    const [loading, setLoading] = useState(true);
    // Estado que guarda el mensaje de error si ocurre uno
    const [error, setError] = useState('');

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Bandera para evitar actualizar el estado si el componente se desmonta
        let active = true;

        // Función asíncrona que obtiene los pastores desde la API
        const loadPastors = async () => {
            try {
                // Obtiene todos los pastores desde la API
                const data = await api.pastores.getAll();
                // Guarda los pastores solo si el componente sigue montado
                if (active) setPastors(data);
            } catch {
                // Guarda un mensaje de error solo si el componente sigue montado
                if (active) setError('No se pudo cargar el equipo pastoral.');
            } finally {
                // Desactiva el estado de carga solo si el componente sigue montado
                if (active) setLoading(false);
            }
        };

        // Llama a la función que obtiene los pastores
        loadPastors();
        // Devuelve una función de limpieza que marca al componente como desmontado
        return () => { active = false; };
    }, []);

    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de pastores con su identificador y estilos
        <section id={id} className="section section-alt">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen los pastores */}
                {loading && (
                    // Contenedor centrado con el mensaje de carga
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando equipo pastoral" */}
                        <p>Cargando equipo pastoral...</p>
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

                {/* Muestra un aviso si no hay pastores publicados */}
                {!loading && !error && pastors.length === 0 && (
                    // Contenedor centrado con el aviso
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de personas */}
                        <i className="bi bi-people text-2xl block mb-3"></i>
                        {/* Texto indicando que el equipo pastoral se publicará próximamente */}
                        <p>El equipo pastoral será publicado próximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrícula de pastores solo si hay datos disponibles */}
                {!loading && !error && pastors.length > 0 && (
                    // Cuadrícula de tarjetas de pastores
                    <div className="pastors-grid">
                        {/* Recorre la lista de pastores para generar cada tarjeta */}
                        {pastors.map((pastor) => (
                            // Tarjeta del pastor con animación de entrada
                            <article key={pastor.id} className="pastor-card" data-animate="fade-in-up">
                                {/* Efecto decorativo de brillo en la tarjeta */}
                                <div className="pastor-card-glow" aria-hidden="true"></div>
                                {/* Contenedor interior de la tarjeta */}
                                <div className="pastor-card-inner">
                                    {/* Contenedor de la foto del pastor */}
                                    <div className="pastor-img-wrapper">
                                        {/* Muestra la foto si el pastor tiene una */}
                                        {pastor.foto_url ? (
                                            // Imagen de la foto del pastor con carga diferida
                                            <img src={pastor.foto_url} alt={pastor.nombre} className="pastor-img pastor-photo" loading="lazy" />
                                        ) : (
                                            // Muestra un marcador con las iniciales si no hay foto
                                            <div className="pastor-img pastor-placeholder" aria-hidden="true">
                                                {/* Muestra las iniciales del nombre del pastor */}
                                                <span className="pastor-initials">{initials(pastor.nombre)}</span>
                                            </div>
                                        )}
                                        {/* Anillo decorativo alrededor de la foto */}
                                        <div className="pastor-img-ring" aria-hidden="true"></div>
                                        {/* Segundo anillo decorativo alrededor de la foto */}
                                        <div className="pastor-img-ring pastor-img-ring-2" aria-hidden="true"></div>
                                    </div>
                                    {/* Contenedor con la información del pastor */}
                                    <div className="pastor-info">
                                        {/* Insignia con el cargo del pastor */}
                                        <span className="pastor-role-badge">
                                            {/* Ícono de estrella junto al cargo */}
                                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                                            {/* Texto con el cargo del pastor */}
                                            {pastor.cargo}
                                        </span>
                                        {/* Nombre del pastor */}
                                        <h3 className="pastor-name">{pastor.nombre}</h3>
                                        {/* Muestra la biografía solo si existe */}
                                        {pastor.biografia && <p className="pastor-desc">{pastor.biografia}</p>}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
