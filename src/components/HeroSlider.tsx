import React from 'react';
import { Link } from 'react-router-dom';
// Importamos Swiper y sus estilos
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Definimos la estructura de cada "Diapositiva"
interface SlideData {
    id: number;
    imagen: string;
    titulo: string;
    subtitulo: string;
    btnPrincipal: string;
    urlPrincipal: string;
    btnSecundario: string;
    urlSecundario: string;
}

// Estos son los datos falsos por ahora (luego vendrán de tu Base de Datos)
const slides: SlideData[] = [
    {
        id: 1,
        imagen: "https://images.unsplash.com/photo-1544427920-c49ccf08c146?q=80&w=2000&auto=format&fit=crop",
        titulo: "Bienvenido a\nAsamblea de Dios",
        subtitulo: "Descubre el propósito que Dios tiene para tu vida. Un lugar para crecer, servir y amar en comunidad.",
        btnPrincipal: "Conéctate",
        urlPrincipal: "/redes",
        btnSecundario: "Saber más",
        urlSecundario: "/quienes-somos"
    },
    {
        id: 2,
        imagen: "/img/galeria-jovenes.webp", // Usando tu imagen local
        titulo: "Noche de\nJóvenes",
        subtitulo: "Únete a nosotros este sábado para un tiempo de adoración, juegos y palabra diseñada para ti.",
        btnPrincipal: "Ver Horarios",
        urlPrincipal: "/horarios",
        btnSecundario: "Ver Galería",
        urlSecundario: "/"
    },
    {
        id: 3,
        imagen: "/img/galeria-bautizos.webp", // Usando tu imagen local
        titulo: "Siguiente Paso:\nBautizos",
        subtitulo: "Inscríbete para nuestra próxima ceremonia de bautizos en agua y declara tu fe públicamente.",
        btnPrincipal: "Inscribirme",
        urlPrincipal: "/contacto",
        btnSecundario: "¿Qué es el bautizo?",
        urlSecundario: "/quienes-somos"
    }
];

const HeroSlider: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-black">
            <style>{`
                .mySwiper .swiper-button-next,
                .mySwiper .swiper-button-prev {
                    color: white;
                    background-color: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(8px);
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                }
                .mySwiper .swiper-button-next:hover,
                .mySwiper .swiper-button-prev:hover {
                    background-color: rgba(255, 255, 255, 0.3);
                }
                .mySwiper .swiper-button-next::after,
                .mySwiper .swiper-button-prev::after {
                    font-size: 16px;
                    font-weight: 800;
                }
                .mySwiper .swiper-pagination-bullet {
                    background-color: white;
                    opacity: 0.4;
                    width: 6px;
                    height: 6px;
                    transition: all 0.3s ease;
                }
                .mySwiper .swiper-pagination-bullet-active {
                    opacity: 1;
                    width: 16px;
                    border-radius: 4px;
                }
                .mySwiper .swiper-pagination {
                    bottom: 24px !important;
                }
            `}</style>
            
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-full mySwiper"
            >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id} className="relative w-full h-full">
                        {/* Imagen de Fondo */}
                        <img
                            src={slide.imagen}
                            alt={slide.titulo}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Capa de Gradiente para oscurecer y mejorar legibilidad */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                        {/* Contenedor del Contenido */}
                        <div className="absolute bottom-0 w-full px-8 pb-20 md:px-20 md:pb-24 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 z-10">
                            
                            {/* Textos */}
                            <div className="text-white max-w-xl text-left">
                                {/* Usamos whitespace-pre-line para que respete los saltos de línea (\n) */}
                                <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight mb-2 leading-tight whitespace-pre-line">
                                    {slide.titulo}
                                </h1>
                                <p className="text-base md:text-lg text-gray-200 font-medium">
                                    {slide.subtitulo}
                                </p>
                            </div>

                            {/* Botones */}
                            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 mt-4 md:mt-0 shrink-0">
                                <Link to={slide.urlPrincipal} className="px-6 py-2.5 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors text-sm md:text-base w-full sm:w-auto text-center block">
                                    {slide.btnPrincipal}
                                </Link>
                                <Link to={slide.urlSecundario} className="px-6 py-2.5 bg-white/20 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/30 transition-colors text-sm md:text-base w-full sm:w-auto text-center block">
                                    {slide.btnSecundario}
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HeroSlider;