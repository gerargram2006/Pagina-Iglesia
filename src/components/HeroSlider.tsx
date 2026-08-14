// Importa React y los hooks useRef, useState y useEffect
import React, { useRef, useState, useEffect } from 'react';
// Importa el carrusel Swiper y sus slides
import { Swiper, SwiperSlide } from 'swiper/react';
// Importa los módulos de navegación, paginación, autoplay y efecto de fundido
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
// Importa la API y el tipo ApiSlide para obtener los slides del héroe
import { api, type ApiSlide } from '../api';
// Importa el componente Hero como respaldo por defecto
import Hero from './Hero';
// Importa los estilos base de Swiper
import 'swiper/css';
// Importa los estilos de navegación de Swiper
import 'swiper/css/navigation';
// Importa los estilos de paginación de Swiper
import 'swiper/css/pagination';
// Importa los estilos del efecto de fundido de Swiper
import 'swiper/css/effect-fade';

// Define el componente HeroSlider como un componente funcional de React
const HeroSlider: React.FC = () => {
    // Referencia para el botón de retroceder del carrusel
    const prevRef = useRef<HTMLDivElement>(null);
    // Referencia para el botón de avanzar del carrusel
    const nextRef = useRef<HTMLDivElement>(null);
    // Estado que guarda la lista de slides obtenidos de la API
    const [slides, setSlides] = useState<ApiSlide[]>([]);
    // Estado que indica si los slides se están cargando
    const [loading, setLoading] = useState(true);

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona que obtiene los slides desde la API
        const fetchSlides = async () => {
            try {
                // Obtiene todos los slides desde la API
                const data = await api.slides.getAll();
                // Solo mostrar slides activos
                // Filtra la respuesta para quedarse únicamente con los slides activos
                setSlides((Array.isArray(data) ? data : []).filter((s) => s.activo === 1));
            } catch {
                // Si falla la API, no mostrar nada
                // En caso de error se deja la lista de slides vacía
                setSlides([]);
            } finally {
                // Desactiva el estado de carga en cualquier caso
                setLoading(false);
            }
        };
        // Llama a la función que obtiene los slides
        fetchSlides();
    }, []);

    // Si está cargando se muestra un indicador de carga
    if (loading) {
        // Devuelve el indicador de carga en pantalla completa
        return (
            // Contenedor centrado con fondo oscuro
            <div className="relative w-full h-screen flex items-center justify-center bg-gray-900">
                {/* Icono animado de carga */}
                <i className="bi bi-arrow-repeat spin text-white text-4xl"></i>
            </div>
        );
    }

    // Si no hay slides se muestra el héroe estático por defecto
    if (slides.length === 0) {
        // Renderiza el componente Hero como respaldo
        return <Hero />;
    }

    // Devuelve el carrusel con los slides obtenidos
    return (
        // Contenedor principal de pantalla completa
        <div className="relative w-full h-screen">

            {/* SWIPER SLIDER */}
            {/* Configura el carrusel Swiper con sus módulos y opciones */}
            <Swiper
                // Habilita los módulos de navegación, paginación, autoplay y fundido
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                // Aplica un efecto de fundido entre slides
                effect="fade"
                // Configura las flechas personalizadas de navegación
                navigation={{
                    // Referencia al botón anterior
                    prevEl: prevRef.current,
                    // Referencia al botón siguiente
                    nextEl: nextRef.current,
                }}
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
                // Configura los puntos de paginación clicables
                pagination={{
                    // Permite hacer clic en los puntos de paginación
                    clickable: true,
                    // Personaliza la clase del punto activo
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-white'
                }}
                // Configura el autoplay con un retardo de 6 segundos
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                // Habilita el bucle solo si hay más de un slide
                loop={slides.length > 1}
                // Hace que el carrusel ocupe todo el alto de la pantalla
                className="w-full h-full"
            >
                {/* Recorre la lista de slides para generar cada diapositiva */}
                {slides.map((slide) => (
                    // Crea un slide de Swiper identificado por el id
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {/* Inserta la imagen de fondo del slide */}
                        <img
                            // URL de la imagen del slide
                            src={slide.imagen_url}
                            // Texto alternativo del slide
                            alt={slide.titulo || 'Hero'}
                            // Posiciona la imagen cubriendo toda el área del slide
                            className="absolute inset-0 w-full h-full object-cover object-center"
                        />

                        {/* Capa de Gradiente */}
                        {/* Aplica un degradado oscuro para mejorar la legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20"></div>

                        {/* Contenedor del Contenido */}
                        {/* Contenedor del texto y botones anclado a la parte inferior */}
                        <div className="absolute bottom-0 w-full px-6 pb-24 sm:px-16 sm:pb-32 flex flex-col sm:flex-row justify-between items-end gap-8 z-10">
                            
                            {/* Bloque de textos del slide */}
                            <div className="text-white max-w-3xl">
                                {/* Muestra el título solo si existe */}
                                {slide.titulo && (
                                    // Título principal del slide
                                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-5 leading-tight whitespace-pre-line drop-shadow-lg">
                                        {slide.titulo}
                                    </h1>
                                )}
                                {/* Muestra el subtítulo solo si existe */}
                                {slide.subtitulo && (
                                    // Subtítulo descriptivo del slide
                                    <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
                                        {slide.subtitulo}
                                    </p>
                                )}
                            </div>

                            {/* Muestra los botones solo si hay al menos uno configurado */}
                            {(slide.btn_principal || slide.btn_secundario) && (
                                // Contenedor flexible para los botones de acción
                                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                                    {/* Muestra el botón principal si está definido */}
                                    {slide.btn_principal && (
                                        // Botón principal de color blanco
                                        <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                            {slide.btn_principal}
                                        </button>
                                    )}
                                    {/* Muestra el botón secundario si está definido */}
                                    {slide.btn_secundario && (
                                        // Botón secundario con fondo translúcido
                                        <button className="px-8 py-4 bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                            {slide.btn_secundario}
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}

                {/* FLECHAS PERSONALIZADAS */}
                {/* Flecha personalizada para retroceder al slide anterior */}
                <div
                    // Asigna la referencia para el control anterior
                    ref={prevRef}
                    // Posiciona y estiliza la flecha anterior en el lado izquierdo
                    className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition"
                >
                    {/* Define el ícono SVG de la flecha hacia la izquierda */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        {/* Dibuja la trayectoria de la flecha hacia la izquierda */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </div>
                {/* Flecha personalizada para avanzar al siguiente slide */}
                <div
                    // Asigna la referencia para el control siguiente
                    ref={nextRef}
                    // Posiciona y estiliza la flecha siguiente en el lado derecho
                    className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-black/60 transition"
                >
                    {/* Define el ícono SVG de la flecha hacia la derecha */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                        {/* Dibuja la trayectoria de la flecha hacia la derecha */}
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </div>
            </Swiper>
        </div>
    );
};

// Exporta el componente HeroSlider como exportación por defecto
export default HeroSlider;
