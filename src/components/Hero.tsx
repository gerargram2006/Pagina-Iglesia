// Importa React para poder usar JSX y el tipo React.FC
import React from 'react';

// Define el componente Hero como un componente funcional de React
const Hero: React.FC = () => {
    // Devuelve el contenido JSX que se va a renderizar
    return (
        // Crea una sección de pantalla completa con la imagen de fondo
        <section className="relative w-full h-screen overflow-hidden">
            {/* Imagen de Fondo (Reemplazable por tu propia imagen después) */}
            {/* Inserta la imagen de fondo que cubre toda la sección */}
            <img
                // Indica la ruta de la imagen de la congregación
                src="/img/galeria-congregacion.webp"
                // Texto alternativo para accesibilidad cuando la imagen no carga
                alt="Congregación de la iglesia"
                // Posiciona la imagen de forma absoluta cubriendo toda la sección
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Capa de Gradiente (El truco de magia para oscurecer abajo) */}
            {/* Aplica un degradado oscuro para mejorar la legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

            {/* Contenedor del Contenido */}
            {/* Contenedor con el texto y los botones anclado a la parte inferior */}
            <div className="absolute bottom-0 w-full px-6 pb-16 sm:px-16 sm:pb-24 flex flex-col sm:flex-row justify-between items-end gap-8">

                {/* Textos (Alineados a la izquierda en PC) */}
                {/* Bloque de textos en color blanco */}
                <div className="text-white max-w-2xl">
                    {/* Título principal de bienvenida de la iglesia */}
                    <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight mb-4 leading-tight">
                        Bienvenido a <br /> Asamblea de Dios
                    </h1>
                    {/* Párrafo de bienvenida con el propósito de la iglesia */}
                    <p className="text-lg sm:text-xl text-gray-300 font-medium">
                        Descubre el propósito que Dios tiene para tu vida.
                        Un lugar para crecer, servir y amar en comunidad.
                    </p>
                </div>

                {/* Botones (Alineados a la derecha en PC, apilados en celulares) */}
                {/* Contenedor flexible para los dos botones de acción */}
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-4">
                    {/* Botón principal que dirige al usuario a conectarse */}
                    <button className="px-8 py-3.5 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 w-full sm:w-auto">
                        Conéctate
                    </button>
                    {/* Botón secundario con fondo translúcido para obtener más información */}
                    <button className="px-8 py-3.5 bg-black/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-black/40 transition-all duration-300 w-full sm:w-auto">
                        Saber más
                    </button>
                </div>

            </div>
        </section>
    );
};

// Exporta el componente Hero como exportación por defecto
export default Hero;
