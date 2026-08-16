import NavBar from './NavBar';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    imagen?: string;
}

export default function PageHeader({ title, subtitle, imagen = "/img/galeria-congregacion.webp" }: PageHeaderProps) {
    return (
        <header className="relative w-full h-[60vh] overflow-hidden bg-black">
            {/* Imagen de Fondo */}
            {/* Imagen de fondo del encabezado */}
            <img
                src={imagen}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-80"
            />

            {/* Capa de Gradiente */}
            {/* Gradiente oscuro que mejora la legibilidad del texto */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
            
            {/* NavBar sobre la imagen */}
            {/* Contenedor que posiciona la barra de navegación sobre la imagen */}
            <div className="absolute top-0 left-0 w-full z-20">
                {/* Renderiza la barra de navegación */}
                <NavBar />
            </div>

            {/* Contenedor del Contenido */}
            {/* Contenedor que posiciona el título y subtítulo en la parte inferior */}
            <div className="absolute bottom-0 w-full px-6 pb-16 sm:px-16 sm:pb-20 flex flex-col justify-end z-10">
                {/* Nombre de la iglesia en la parte superior del contenido */}
                <span className="text-primary-400 font-bold tracking-wider uppercase text-sm mb-3">✦ Asamblea de Dios ✦</span>
                {/* Bloque con el título y subtítulo de la página */}
                <div className="text-white max-w-3xl">
                    {/* Título principal de la página */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
                        {/* Muestra el título recibido como prop */}
                        {title}
                    </h1>
                    {/* Muestra el subtítulo solo si fue proporcionado */}
                    {subtitle && (
                        <p className="text-lg sm:text-xl text-gray-300 font-medium">
                            {/* Muestra el subtítulo recibido como prop */}
                            {subtitle}
                        </p>
                    )}
                </div>
            </div>
        </header>
    );
}
