import React, { useRef } from 'react';
// Importamos Swiper y sus estilos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade'; // Efecto de transición suave

// Interfaz TypeScript
interface SlideData {
    id: number;
    imagen: string;
    titulo: string;
    subtitulo: string;
    btnPrincipal: string;
    btnSecundario: string;
}

// Datos de los slides (Usando tus imágenes locales)
const slides: SlideData[] = [
    {
        id: 1,
        imagen: "/img/galeria-congregacion.webp",
        titulo: "Bienvenido a \nAsamblea de Dios",
        subtitulo: "Descubre el propósito que Dios tiene para tu vida. Un lugar para crecer, servir y amar en comunidad.",
        btnPrincipal: "Conéctate",
        btnSecundario: "Saber más"
    },
    {
        id: 2,
        imagen: "/img/galeria-jovenes.webp",
        titulo: "Noche de \nJóvenes",
        subtitulo: "Únete a nosotros este sábado para un tiempo de adoración, juegos y palabra diseñada para ti.",
        btnPrincipal: "Ver Horarios",
        btnSecundario: "Ver Galería"
    },
    {
        id: 3,
        imagen: "/img/galeria-bautizos.webp",
        titulo: "Siguiente Paso: \nBautizos",
        subtitulo: "Inscríbete para nuestra próxima ceremonia de bautizos en agua y declara tu fe públicamente.",
        btnPrincipal: "Inscribirme",
        btnSecundario: "¿Qué es el bautizo?"
    },
    {
        id: 4,
        imagen: "/img/galeria-infantil.webp", // Agregada la imagen de niños
        titulo: "Ministerio \nInfantil",
        subtitulo: "Un espacio seguro y divertido donde tus hijos aprenderán sobre el amor de Jesús.",
        btnPrincipal: "Conocer más",
        btnSecundario: "Horarios"
    }
];

const HeroSlider: React.FC = () => {
    const prevRef = useRef<HTMLDivElement>(null);
    const nextRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative w-full h-screen">

            {/* SWIPER SLIDER */}
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade" // Efecto de desvanecimiento premium
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
                    bulletActiveClass: 'swiper-pagination-bullet-active bg-white' // Personaliza los puntos
                }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {/* Imagen de Fondo (Ahora usando las locales) */}
                        <img
                            src={slide.imagen}
                            alt={slide.titulo}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Capa de Gradiente (El Truco) */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-black/40 to-black/20"></div>

                        {/* Contenedor del Contenido (Alineado Abajo) */}
                        <div className="absolute bottom-0 w-full px-6 pb-24 sm:px-16 sm:pb-32 flex flex-col sm:flex-row justify-between items-end gap-8 z-10">

                            <div className="text-white max-w-3xl">
                                <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-5 leading-tight whitespace-pre-line drop-shadow-lg">
                                    {slide.titulo}
                                </h1>
                                <p className="text-lg sm:text-xl text-gray-200 font-medium max-w-2xl drop-shadow-md">
                                    {slide.subtitulo}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                                <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                    {slide.btnPrincipal}
                                </button>
                                <button className="px-8 py-4 bg-black/30 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto shadow-xl">
                                    {slide.btnSecundario}
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* FLECHAS PERSONALIZADAS TIPO ELEVATION CHURCH */}
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
