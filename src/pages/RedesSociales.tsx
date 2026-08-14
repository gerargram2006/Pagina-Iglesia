// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';

// Define y exporta el componente de la página de redes sociales
export default function RedesSociales() {
    // Declara una lista con los datos de las redes sociales de la iglesia
    const redes = [
        // Define la red social Facebook
        {
            // Identificador único de la red social
            id: 1,
            // Nombre de la red social
            nombre: "Facebook",
            // URL del perfil de la iglesia en Facebook
            url: "https://www.facebook.com/profile.php?id=100076728549417",
            // Clase de Bootstrap Icons para el ícono de Facebook
            icono: "bi-facebook",
            // Descripción del tipo de contenido compartido
            descripcion: "Noticias, fotos y transmisiones en vivo",
            // Colores del gradiente del fondo del ícono
            gradiente: "from-[#1877F2] to-[#0d65d9]",
        },
        // Define la red social Instagram
        {
            // Identificador único de la red social
            id: 2,
            // Nombre de la red social
            nombre: "Instagram",
            // URL del perfil de la iglesia en Instagram
            url: "https://www.instagram.com/asambleaarequipadedios_16/",
            // Clase de Bootstrap Icons para el ícono de Instagram
            icono: "bi-instagram",
            // Descripción del tipo de contenido compartido
            descripcion: "Momentos especiales de nuestra comunidad",
            // Colores del gradiente del fondo del ícono
            gradiente: "from-[#E4405F] to-[#C13584]",
        },
        // Define la red social TikTok
        {
            // Identificador único de la red social
            id: 3,
            // Nombre de la red social
            nombre: "TikTok",
            // URL del perfil de la iglesia en TikTok
            url: "https://www.tiktok.com/@asamblea_de_dios16?is_from_webapp=1&sender_device=pc",
            // Clase de Bootstrap Icons para el ícono de TikTok
            icono: "bi-tiktok",
            // Descripción del tipo de contenido compartido
            descripcion: "Videos cortos de alabanza y testimonios",
            // Colores del gradiente del fondo del ícono
            gradiente: "from-[#010101] to-[#333333]",
        }
    ];

    // Retorna el JSX de la página de redes sociales
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Conéctate con Nosotros" subtitle="Síguenos en nuestras redes sociales para estar al tanto de todo" />
            // Contenido principal de la página
            <main>
                // Sección que contiene el contenido de redes sociales
                <section className="section">
                    // Contenedor central con ancho máximo de 4xl y márgenes responsivos
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        // Párrafo introductorio con animación de entrada
                        <p className="section-subtitle" data-animate="fade-in-up">
                            // Mensaje que invita a mantenerse conectado con la iglesia
                            Mantente conectado durante toda la semana. Compartimos mensajes, transmisiones en vivo, anuncios y momentos especiales de nuestra comunidad.
                        </p>

                        // Contenedor en cuadrícula de tres columnas para las tarjetas de redes
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            // Recorre la lista de redes sociales y genera una tarjeta por cada una
                            {redes.map((red, i) => (
                                // Enlace que abre la red social en una nueva pestaña
                                <a
                                    // Clave única de React para cada elemento de la lista
                                    key={red.id}
                                    // URL de destino del enlace
                                    href={red.url}
                                    // Abre el enlace en una pestaña nueva
                                    target="_blank"
                                    // Medida de seguridad que evita compartir contexto con la página destino
                                    rel="noopener noreferrer"
                                    // Clase de Tailwind para agrupar estilos al pasar el cursor
                                    className="group"
                                    // Animación de entrada al hacer scroll
                                    data-animate="fade-in-up"
                                >
                                    // Tarjeta con estilos de hover, sombra y transición
                                    <div className={`flex flex-col items-center text-center p-8 rounded-tw-lg bg-white shadow-tw-sm border border-gray-200 hover:shadow-tw-lg hover:-translate-y-2 transition-all duration-350 ease-spring delay-${i + 1}`}>
                                        // Círculo con el gradiente de color y el ícono de la red social
                                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${red.gradiente} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-350 ease-spring shadow-lg`}>
                                            // Ícono de la red social en color blanco
                                            <i className={`bi ${red.icono} text-white text-3xl`}></i>
                                        </div>
                                        // Nombre de la red social
                                        <h3 className="font-playfair text-lg font-bold text-[#606C59] mb-2">{red.nombre}</h3>
                                        // Descripción de la red social
                                        <p className="text-sm text-text-light leading-relaxed mb-4">{red.descripcion}</p>
                                        // Texto "Síguenos" con ícono de flecha que se mueve al pasar el cursor
                                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-500 transition-colors">
                                            // Etiqueta que invita a seguir la red social
                                            Síguenos
                                            // Ícono de flecha hacia la derecha
                                            <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
