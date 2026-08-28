import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { api, type ApiSlide } from '../api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

/* Extensiones de video soportadas por navegadores modernos */
const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.mov', '.ogg'];

function isVideoUrl(url: string): boolean {
    const lower = url.toLowerCase();
    return VIDEO_EXTENSIONS.some(ext => lower.endsWith(ext));
}

/* Slide local de video que siempre se muestra primero (no viene de la API) */
const LOCAL_VIDEO_SLIDE = {
    id: -1,
    titulo: '14 EBO - Escuela Bíblica',
    subtitulo: 'Revive los mejores momentos de nuestra congregación en Puerto Maldonado',
    imagen_url: '/vid/Video de 14 ebo en puerto maldonado.mp4',
    btn_principal: '',
    btn_secundario: '',
    orden: 0,
    activo: 1,
};

const HeroSlider = () => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [slides, setSlides] = useState<ApiSlide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await api.slides.getAll();
                const activeSlides = (Array.isArray(data) ? data : []).filter(s => s.activo === 1);
                // Poner el video local al inicio + los slides de la API
                setSlides([LOCAL_VIDEO_SLIDE as ApiSlide, ...activeSlides]);
            } catch {
                // Si falla la API, mostrar al menos el video local
                setSlides([LOCAL_VIDEO_SLIDE as ApiSlide]);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    if (loading) {
        return (
            <div className="w-full h-[60vh] md:h-screen flex items-center justify-center bg-[#1a2518]">
                <i className="bi bi-arrow-repeat spin text-white text-4xl"></i>
            </div>
        );
    }

    if (slides.length === 0) return null;

    return (
        <div className="relative w-full h-[60vh] md:h-screen">
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                pagination={{
                    clickable: true,
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-white',
                }}
                autoplay={{ delay: 7000, disableOnInteraction: false }}
                loop={slides.length > 1}
                className="w-full h-full"
            >
                {slides.map((slide) => {
                    const isVideo = isVideoUrl(slide.imagen_url);

                    return (
                        <SwiperSlide key={slide.id} className="relative w-full h-full">

                            {/* ── FONDO: VIDEO O IMAGEN ── */}
                            {isVideo ? (
                                <video
                                    src={slide.imagen_url}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover"
                                    style={{ objectPosition: 'center 30%' }}
                                />
                            ) : (
                                <img
                                    src={slide.imagen_url}
                                    alt={slide.titulo}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            )}

                            {/* ── OVERLAY DEGRADADO ── */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20"></div>

                            {/* ── CONTENIDO ── */}
                            <div className="absolute bottom-0 w-full px-6 pb-20 sm:px-16 sm:pb-28 flex flex-col sm:flex-row justify-between items-end gap-8 z-10">

                                <div className="text-white max-w-3xl">
                                    <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4 leading-[1.1] whitespace-pre-line drop-shadow-lg font-playfair">
                                        {slide.titulo}
                                    </h1>
                                    {slide.subtitulo && (
                                        <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md font-inter">
                                            {slide.subtitulo}
                                        </p>
                                    )}
                                </div>

                                {(slide.btn_principal || slide.btn_secundario) && (
                                    <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-3">
                                        {slide.btn_principal && (
                                            <button className="px-7 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto shadow-xl text-sm tracking-wide">
                                                {slide.btn_principal}
                                            </button>
                                        )}
                                        {slide.btn_secundario && (
                                            <button className="px-7 py-3.5 bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/50 hover:-translate-y-0.5 transition-all duration-300 w-full sm:w-auto shadow-xl text-sm tracking-wide">
                                                {slide.btn_secundario}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    );
                })}

                {/* ── FLECHAS PERSONALIZADAS ── */}
                <div
                    ref={prevRef}
                    className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/50 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div
                    ref={nextRef}
                    className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/50 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </Swiper>
        </div>
    );
};

export default HeroSlider;