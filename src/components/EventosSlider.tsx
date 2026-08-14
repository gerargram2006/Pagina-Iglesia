// Importa los hooks useState, useEffect y useRef de React
import { useState, useEffect, useRef } from 'react';
// Importa el carrusel Swiper y sus slides
import { Swiper, SwiperSlide } from 'swiper/react';
// Importa los módulos de autoplay, paginación y navegación de Swiper
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Importa la API y el tipo ApiEvento para obtener los eventos
import { api, type ApiEvento } from '../api';

// Importa los estilos base de Swiper
import 'swiper/css';
// Importa los estilos de paginación de Swiper
import 'swiper/css/pagination';
// Importa los estilos de navegación de Swiper
import 'swiper/css/navigation';

// Lista de nombres abreviados de los meses en español
const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

// Define la estructura de un evento ya procesado para mostrar en el slider
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

// Define las propiedades que acepta el componente EventosSlider
interface EventosSliderProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define el componente EventosSlider con valores por defecto para sus propiedades
export default function EventosSlider({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }: EventosSliderProps) {
    // Estado que guarda la lista de eventos procesados
    const [events, setEvents] = useState<ParsedEvent[]>([]);
    // Estado que indica si los eventos se están cargando
    const [loading, setLoading] = useState(true);
    // Estado que guarda el mensaje de error si ocurre uno
    const [error, setError] = useState('');
    // Referencia para el botón de retroceder del carrusel
    const prevRef = useRef<HTMLButtonElement>(null);
    // Referencia para el botón de avanzar del carrusel
    const nextRef = useRef<HTMLButtonElement>(null);

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

                {/* Muestra el carrusel solo si hay eventos disponibles */}
                {!loading && !error && events.length > 0 && (
                    // Contenedor relativo para el carrusel y sus flechas
                    <div className="relative">
                        {/* Configura el carrusel Swiper con sus módulos y opciones */}
                        <Swiper
                            // Habilita los módulos de autoplay, paginación y navegación
                            modules={[Autoplay, Pagination, Navigation]}
                            // Define la separación entre diapositivas
                            spaceBetween={24}
                            // Muestra una diapositiva por vista
                            slidesPerView={1}
                            // Configura los puntos de paginación clicables
                            pagination={{ clickable: true }}
                            // Configura las flechas de navegación personalizadas
                            navigation={{
                                // Referencia al botón anterior
                                prevEl: prevRef.current,
                                // Referencia al botón siguiente
                                nextEl: nextRef.current,
                            }}
                            // Muestra el cursor de mano al pasar sobre el carrusel
                            grabCursor={true}
                            // Configura el autoplay con 5 segundos de retardo
                            autoplay={{
                                // Retardo entre diapositivas
                                delay: 5000,
                                // Continúa el autoplay aunque el usuario interactúe
                                disableOnInteraction: false,
                                // Pausa el autoplay cuando el cursor está encima
                                pauseOnMouseEnter: true,
                            }}
                            // Habilita el bucle solo si hay tres o más eventos
                            loop={events.length >= 3}
                            // Velocidad de transición en milisegundos
                            speed={600}
                            // Define cuántos slides mostrar según el ancho de pantalla
                            breakpoints={{
                                // En pantallas de 640px o más muestra dos slides
                                640: { slidesPerView: 2 },
                                // En pantallas de 1024px o más muestra tres slides
                                1024: { slidesPerView: 3 },
                            }}
                            // Agrega espacio inferior para los puntos de paginación
                            className="!pb-14"
                            // Se ejecuta antes de inicializar Swiper para asignar las flechas
                            onBeforeInit={(swiper) => {
                                // Verifica que la navegación esté configurada como objeto
                                if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                                    // Asigna la referencia del botón anterior a Swiper
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    // Asigna la referencia del botón siguiente a Swiper
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }}
                        >
                            {/* Recorre la lista de eventos para generar cada diapositiva */}
                            {events.map((event) => (
                                // Crea un slide de Swiper identificado por el id
                                <SwiperSlide key={event.id}>
                                    {/* Tarjeta del evento con estilos y efectos al pasar el cursor */}
                                    <div className="group bg-white rounded-tw-lg overflow-hidden shadow-tw-sm hover:shadow-tw-lg transition-all duration-350 ease-spring h-full flex flex-col border border-neutral-200/60 will-change-transform">
                                        {/* Contenedor de la imagen con proporción fija */}
                                        <div className="relative overflow-hidden aspect-[4/3]">
                                            {/* Muestra la imagen si el evento tiene una */}
                                            {event.imageSrc ? (
                                                // Inserta la imagen del evento con zoom al pasar el cursor
                                                <img
                                                    // URL de la imagen del evento
                                                    src={event.imageSrc}
                                                    // Texto alternativo con el nombre del evento
                                                    alt={event.name}
                                                    // Aplica zoom y leve rotación al pasar el cursor
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:-rotate-1"
                                                />
                                            ) : (
                                                // Muestra un marcador de posición si no hay imagen
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-600 text-white/40">
                                                    {/* Ícono SVG de calendario como marcador de posición */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        {/* Dibuja la parte superior del ícono del calendario */}
                                                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                        {/* Dibuja el cuerpo del ícono del calendario */}
                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                                    </svg>
                                                </div>
                                            )}
                                            {/* Aplica un degradado oscuro en la parte inferior al pasar el cursor */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            {/* Insignia con el día y mes del evento */}
                                            <div className="absolute top-4 left-4 flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-tw-sm px-3.5 py-2.5 shadow-tw-sm">
                                                {/* Muestra el día del evento en grande */}
                                                <span className="block text-[1.6rem] font-bold font-playfair leading-none text-[#606C59]">
                                                    {event.day}
                                                </span>
                                                {/* Muestra el mes abreviado debajo del día */}
                                                <span className="block text-[0.7rem] uppercase font-semibold mt-0.5 tracking-widest text-gold-600">
                                                    {event.month}
                                                </span>
                                            </div>
                                            {/* Botón flotante con puntos suspensivos que aparece al pasar el cursor */}
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {/* Ícono SVG de puntos suspensivos */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="text-[#606C59]" aria-hidden="true">
                                                    {/* Dibuja los tres puntos del ícono */}
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        {/* Contenido de la tarjeta con la información del evento */}
                                        <div className="p-5 flex flex-col gap-2 flex-1">
                                            {/* Muestra el lugar solo si existe */}
                                            {event.lugar && (
                                                // Etiqueta con el lugar del evento
                                                <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-wide uppercase text-gold-600">
                                                    {/* Ícono SVG de ubicación */}
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        {/* Dibuja el pin de ubicación */}
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                    </svg>
                                                    {/* Texto con el nombre del lugar */}
                                                    {event.lugar}
                                                </span>
                                            )}
                                            {/* Título del evento */}
                                            <h3 className="font-playfair text-[1.15rem] font-bold text-[#606C59] leading-tight group-hover:text-primary-600 transition-colors duration-300">
                                                {event.name}
                                            </h3>
                                            {/* Muestra la descripción solo si existe */}
                                            {event.description && (
                                                // Descripción del evento limitada a dos líneas
                                                <p className="text-text-light text-[0.88rem] leading-relaxed line-clamp-2 flex-1">
                                                    {event.description}
                                                </p>
                                            )}
                                            {/* Enlace para obtener más información del evento */}
                                            <a
                                                // Apunta al ancla de contacto de la página
                                                href="#contacto"
                                                // Estiliza el enlace con una flecha animada
                                                className="inline-flex items-center gap-1.5 mt-auto pt-3 text-[0.85rem] font-semibold text-gold-600 hover:text-gold-500 transition-colors duration-300 no-underline group/link"
                                            >
                                                Más información
                                                {/* Ícono SVG de flecha hacia la derecha */}
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">
                                                    {/* Dibuja la flecha que se desplaza al pasar el cursor */}
                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Flecha personalizada para retroceder al evento anterior */}
                        <button
                            // Asigna la referencia para el control anterior
                            ref={prevRef}
                            // Posiciona y estiliza la flecha anterior en el lado izquierdo
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-tw-sm hover:shadow-tw hover:bg-white transition-all duration-300 flex items-center justify-center text-[#606C59] hover:text-gold-600 -ml-1 hidden sm:flex"
                            // Texto de accesibilidad para el botón anterior
                            aria-label="Anterior"
                        >
                            {/* Ícono SVG de la flecha hacia la izquierda */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                {/* Dibuja la trayectoria de la flecha izquierda */}
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </button>
                        {/* Flecha personalizada para avanzar al siguiente evento */}
                        <button
                            // Asigna la referencia para el control siguiente
                            ref={nextRef}
                            // Posiciona y estiliza la flecha siguiente en el lado derecho
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-tw-sm hover:shadow-tw hover:bg-white transition-all duration-300 flex items-center justify-center text-[#606C59] hover:text-gold-600 -mr-1 hidden sm:flex"
                            // Texto de accesibilidad para el botón siguiente
                            aria-label="Siguiente"
                        >
                            {/* Ícono SVG de la flecha hacia la derecha */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                {/* Dibuja la trayectoria de la flecha derecha */}
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
