import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Imagen de Fondo (Reemplazable por tu propia imagen después) */}
            <img
                src="/img/galeria-congregacion.webp"
                alt="Congregación de la iglesia"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Capa de Gradiente (El truco de magia para oscurecer abajo) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            {/* Contenedor del Contenido */}
            <div className="absolute bottom-0 w-full px-6 pb-16 sm:px-16 sm:pb-24 flex flex-col sm:flex-row justify-between items-end gap-8">

                {/* Textos (Alineados a la izquierda en PC) */}
                <div className="text-white max-w-2xl">
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
                        Bienvenido a <br /> Asamblea de Dios
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 font-medium">
                        Descubre el propósito que Dios tiene para tu vida.
                        Un lugar para crecer, servir y amar en comunidad.
                    </p>
                </div>

                {/* Botones (Alineados a la derecha en PC, apilados en celulares) */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                    <button className="px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 w-full sm:w-auto">
                        Conéctate
                    </button>
                    <button className="px-8 py-3.5 bg-black/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/40 transition-all duration-300 w-full sm:w-auto">
                        Saber más
                    </button>
                </div>

            </div>
        </section>
    );
};

export default Hero;