import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { api, type ApiSlide } from '../api';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const HeroSlider: React.FC = () => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);
    const [slides, setSlides] = useState<ApiSlide[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const data = await api.slides.getAll();
                // Solo mostrar slides activos
                const apiSlides = (Array.isArray(data) ? data : []).filter((s) => s.activo === 1);
                
                const heroSlide: ApiSlide = {
                    id: -1,
                    titulo: '',
                    subtitulo: null,
                    imagen_url: '/img/hero-inicio.webp',
                    btn_principal: null,
                    btn_secundario: null,
                    orden: 0,
                    activo: 1
                };

                setSlides([heroSlide, ...apiSlides]);
            } catch {
                // Si falla la API, mostrar al menos el slide principal
                setSlides([{
                    id: -1,
                    titulo: '',
                    subtitulo: null,
                    imagen_url: '/img/hero-inicio.webp',
                    btn_principal: null,
                    btn_secundario: null,
                    orden: 0,
                    activo: 1
                }]);
            } finally {
                setLoading(false);
            }
        };
        fetchSlides();
    }, []);

    if (loading) {
        return (
            <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
                <i className="bi bi-arrow-repeat spin text-white text-4xl"></i>
            </div>
        );
    }

    if (slides.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full h-screen">

            {/* SWIPER SLIDER */}
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
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={slides.length > 1}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {/* Imagen de Fondo */}
                        <img
                            src={slide.imagen_url}
                            alt={slide.titulo || 'Hero'}
                            className={`absolute inset-0 w-full h-full object-cover ${slide.id === -1 ? 'object-center' : 'object-center'}`}
                        />

                        {/* Slide principal (hero-inicio.webp) - solo imagen sin overlay */}
                        {slide.id === -1 && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        )}

                        {/* Slides de la API - con gradiente y contenido */}
                        {slide.id !== -1 && (
                            <>
                                {/* Capa de Gradiente */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20"></div>

                                {/* Contenedor del Contenido */}
                                <div className="absolute bottom-0 w-full px-6 pb-24 sm:px-16 sm:pb-32 flex flex-col sm:flex-row justify-between items-end gap-8 z-10">
                                    
                                    <div className="text-white max-w-3xl">
                                        {slide.titulo && (
                                            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-5 leading-tight whitespace-pre-line drop-shadow-lg">
                                                {slide.titulo}
                                            </h1>
                                        )}
                                        {slide.subtitulo && (
                                            <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
                                                {slide.subtitulo}
                                            </p>
                                        )}
                                    </div>

                                    {(slide.btn_principal || slide.btn_secundario) && (
                                        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                                            {slide.btn_principal && (
                                                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                                    {slide.btn_principal}
                                                </button>
                                            )}
                                            {slide.btn_secundario && (
                                                <button className="px-8 py-4 bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                                    {slide.btn_secundario}
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </SwiperSlide>
                ))}

                {/* FLECHAS PERSONALIZADAS */}
                <div
                    ref={prevRef}
                    className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                <div
                    ref={nextRef}
                    className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </Swiper>
        </div>
    );
};

export default HeroSlider;
