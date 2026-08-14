// Importa los hooks useState y useEffect de React
import { useState, useEffect } from 'react';
// Importa la API y el tipo ApiEvento para obtener los eventos
import { api, type ApiEvento } from '../api';

// Lista de nombres abreviados de los meses en español
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Define la estructura de un evento ya procesado para mostrar en la sección
interface ParsedEvent {
    // Identificador único del evento
    id: number;
    // Día del evento con dos dígitos
    day: string;
    // Mes abreviado del evento
    month: string;
    // Nombre o título del evento
    name: string;
    // Descripción del evento
    description: string;
    // Lugar donde se realiza el evento
    lugar: string;
    // URL de la imagen del evento
    imageSrc: string;
}

// Función que transforma un evento de la API al formato interno de la interfaz
function parseEvento(evt: ApiEvento): ParsedEvent {
    // Convierte la fecha del evento en un objeto Date
    const date = new Date(evt.fecha);
    // Devuelve el evento con los campos ya procesados
    return {
        // Conserva el id original del evento
        id: evt.id,
        // Extrae el día y lo rellena con ceros a la izquierda
        day: String(date.getDate()).padStart(2, '0'),
        // Obtiene el nombre abreviado del mes
        month: MONTHS_ES[date.getMonth()]!,
        // Conserva el título del evento
        name: evt.titulo,
        // Usa la descripción o una cadena vacía si no existe
        description: evt.descripcion || '',
        // Usa el lugar o una cadena vacía si no existe
        lugar: evt.lugar || '',
        // Usa la imagen o una cadena vacía si no existe
        imageSrc: evt.imagen_url || '',
    };
}

// Define las propiedades que acepta el componente EventsSection
interface EventsSectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define el componente EventsSection con valores por defecto para sus propiedades
export default function EventsSection({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }: EventsSectionProps) {
    // Estado que guarda la lista de eventos procesados
    const [events, setEvents] = useState<ParsedEvent[]>([]);
    // Estado que indica si los eventos se están cargando
    const [loading, setLoading] = useState(true);
    // Estado que guarda el mensaje de error si ocurre uno
    const [error, setError] = useState('');

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona que obtiene los eventos desde la API
        const fetchEvents = async () => {
            try {
                // Obtiene todos los eventos desde la API
                const data = await api.eventos.getAll();
                // Transforma cada evento al formato interno de la interfaz
                const parsed = (Array.isArray(data) ? data : []).map(parseEvento);
                // Guarda los eventos procesados en el estado
                setEvents(parsed);
            } catch {
                // Guarda un mensaje de error si la petición falla
                setError('No se pudieron cargar los eventos.');
            } finally {
                // Desactiva el estado de carga en cualquier caso
                setLoading(false);
            }
        };
        // Llama a la función que obtiene los eventos
        fetchEvents();
    }, []);

    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de eventos con su identificador y estilos
        <section id={id} className="section section-alt">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen los eventos */}
                {loading && (
                    // Contenedor centrado con el mensaje de carga
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando eventos" */}
                        <p>Cargando eventos...</p>
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

                {/* Muestra un aviso si no hay eventos programados */}
                {!loading && !error && events.length === 0 && (
                    // Contenedor centrado con el aviso
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de calendario vacío */}
                        <i className="bi bi-calendar-x text-2xl block mb-3"></i>
                        {/* Texto indicando que no hay eventos */}
                        <p>No hay eventos programados por el momento.</p>
                    </div>
                )}

                {/* Muestra la lista de eventos solo si hay eventos disponibles */}
                {!loading && !error && events.length > 0 && (
                    // Contenedor con la lista de eventos
                    <div className="events-list">
                        {/* Recorre la lista de eventos para generar cada tarjeta */}
                        {events.map((event) => (
                            // Tarjeta del evento con animación de entrada
                            <div key={event.id} className="event-item" data-animate="fade-in-left">
                                {/* Contenedor de la miniatura del evento */}
                                <div className="event-thumb">
                                    {/* Muestra la imagen si el evento tiene una */}
                                    {event.imageSrc ? (
                                        // Inserta la imagen del evento
                                        <img src={event.imageSrc} alt={event.name} />
                                    ) : (
                                        // Muestra un marcador de posición si no hay imagen
                                        <div className="event-thumb-placeholder">
                                            {/* Ícono SVG de calendario como marcador de posición */}
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                {/* Dibuja la parte superior del ícono del calendario */}
                                                <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                {/* Dibuja el cuerpo del ícono del calendario */}
                                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                {/* Contenedor con la fecha del evento */}
                                <div className="event-date">
                                    {/* Muestra el día del evento */}
                                    <span className="event-day">{event.day}</span>
                                    {/* Muestra el mes abreviado */}
                                    <span className="event-month">{event.month}</span>
                                </div>
                                {/* Contenedor con la información del evento */}
                                <div className="event-info">
                                    {/* Muestra la insignia del lugar solo si existe */}
                                    {event.lugar && <span className="event-badge badge-prayer">{event.lugar}</span>}
                                    {/* Título del evento */}
                                    <h3>{event.name}</h3>
                                    {/* Muestra la descripción solo si existe */}
                                    {event.description && <p>{event.description}</p>}
                                    {/* Enlace para obtener más información del evento */}
                                    <a href="#contacto" className="event-link">
                                        Más información <i className="bi bi-arrow-right" aria-hidden="true"></i>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
