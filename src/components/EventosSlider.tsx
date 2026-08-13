import { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { api, type ApiEvento } from '../api';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MONTHS_ES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

interface ParsedEvent {
    id: number;
    day: string;
    month: string;
    name: string;
    description: string;
    lugar: string;
    imageSrc: string;
}

function parseEvento(evt: ApiEvento): ParsedEvent {
    const date = new Date(evt.fecha);
    return {
        id: evt.id,
        day: String(date.getDate()).padStart(2, '0'),
        month: MONTHS_ES[date.getMonth()]!,
        name: evt.titulo,
        description: evt.descripcion || '',
        lugar: evt.lugar || '',
        imageSrc: evt.imagen_url || '',
    };
}

interface EventosSliderProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

export default function EventosSlider({ title = "Próximos Eventos", subtitle = "No te pierdas nuestras actividades especiales", id = "eventos" }: EventosSliderProps) {
    const [events, setEvents] = useState<ParsedEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await api.eventos.getAll();
                const parsed = (Array.isArray(data) ? data : []).map(parseEvento);
                setEvents(parsed);
            } catch {
                setError('No se pudieron cargar los eventos.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <section id={id} className="section section-alt">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        <p>Cargando eventos...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && events.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-calendar-x text-2xl block mb-3"></i>
                        <p>No hay eventos programados por el momento.</p>
                    </div>
                )}

                {!loading && !error && events.length > 0 && (
                    <div className="relative">
                        <Swiper
                            modules={[Autoplay, Pagination, Navigation]}
                            spaceBetween={24}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            navigation={{
                                prevEl: prevRef.current,
                                nextEl: nextRef.current,
                            }}
                            grabCursor={true}
                            autoplay={{
                                delay: 5000,
                                disableOnInteraction: false,
                                pauseOnMouseEnter: true,
                            }}
                            loop={events.length >= 3}
                            speed={600}
                            breakpoints={{
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="!pb-14"
                            onBeforeInit={(swiper) => {
                                if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                                    swiper.params.navigation.prevEl = prevRef.current;
                                    swiper.params.navigation.nextEl = nextRef.current;
                                }
                            }}
                        >
                            {events.map((event) => (
                                <SwiperSlide key={event.id}>
                                    <div className="group bg-white rounded-tw-lg overflow-hidden shadow-tw-sm hover:shadow-tw-lg transition-all duration-350 ease-spring h-full flex flex-col border border-neutral-200/60 will-change-transform">
                                        <div className="relative overflow-hidden aspect-[4/3]">
                                            {event.imageSrc ? (
                                                <img
                                                    src={event.imageSrc}
                                                    alt={event.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-110 group-hover:-rotate-1"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-800 to-primary-600 text-white/40">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
                                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                                    </svg>
                                                </div>
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="absolute top-4 left-4 flex flex-col items-center bg-white/95 backdrop-blur-sm rounded-tw-sm px-3.5 py-2.5 shadow-tw-sm">
                                                <span className="block text-[1.6rem] font-bold font-playfair leading-none text-[#606C59]">
                                                    {event.day}
                                                </span>
                                                <span className="block text-[0.7rem] uppercase font-semibold mt-0.5 tracking-widest text-gold-600">
                                                    {event.month}
                                                </span>
                                            </div>
                                            <div className="absolute top-4 right-4 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="text-[#606C59]" aria-hidden="true">
                                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="p-5 flex flex-col gap-2 flex-1">
                                            {event.lugar && (
                                                <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-semibold tracking-wide uppercase text-gold-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                                    </svg>
                                                    {event.lugar}
                                                </span>
                                            )}
                                            <h3 className="font-playfair text-[1.15rem] font-bold text-[#606C59] leading-tight group-hover:text-primary-600 transition-colors duration-300">
                                                {event.name}
                                            </h3>
                                            {event.description && (
                                                <p className="text-text-light text-[0.88rem] leading-relaxed line-clamp-2 flex-1">
                                                    {event.description}
                                                </p>
                                            )}
                                            <a
                                                href="#contacto"
                                                className="inline-flex items-center gap-1.5 mt-auto pt-3 text-[0.85rem] font-semibold text-gold-600 hover:text-gold-500 transition-colors duration-300 no-underline group/link"
                                            >
                                                Más información
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" className="transition-transform duration-300 group-hover/link:translate-x-1">
                                                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <button
                            ref={prevRef}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-tw-sm hover:shadow-tw hover:bg-white transition-all duration-300 flex items-center justify-center text-[#606C59] hover:text-gold-600 -ml-1 hidden sm:flex"
                            aria-label="Anterior"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                            </svg>
                        </button>
                        <button
                            ref={nextRef}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full shadow-tw-sm hover:shadow-tw hover:bg-white transition-all duration-300 flex items-center justify-center text-[#606C59] hover:text-gold-600 -mr-1 hidden sm:flex"
                            aria-label="Siguiente"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
