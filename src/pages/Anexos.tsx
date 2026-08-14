// Importa los hooks de React para manejar estado y efectos secundarios
import { useEffect, useState } from 'react';
// Importa el encabezado de página reutilizable
import PageHeader from '../components/PageHeader';
// Importa el cliente de API y el tipo de dato ApiRecurso para los recursos descargables
import { api, type ApiRecurso } from '../api';

// Define la interfaz que describe la estructura de una sede o anexo de la iglesia
interface Sede {
    // Identificador único de la sede
    id: number;
    // Nombre o título de la sede
    nombre: string;
    // Pastor encargado de la sede
    pastor: string;
    // Dirección física de la sede
    direccion: string;
    // Horario de reuniones de la sede
    horario: string;
    // Teléfono o medio de contacto de la sede
    contacto: string;
    // URL del mapa para ubicar la sede
    mapaUrl: string;
    // Indica si la sede es la principal (true) o un anexo (false)
    isPrimary: boolean;
}

// Lista estática de sedes y anexos de la iglesia
const sedes: Sede[] = [
    // Define la sede principal
    {
        // Identificador de la sede principal
        id: 1,
        // Nombre de la sede principal
        nombre: "Sede Principal (Central)",
        // Pastor de la sede principal
        pastor: "Pastor Ruideto Costa",
        // Dirección de la sede principal
        direccion: "Comandante Canga N° 416, Mariano Melgar 04006",
        // Horario de reuniones de la sede principal
        horario: "Domingos 9:00 AM y 6:00 PM",
        // Teléfono de contacto de la sede principal
        contacto: "+51 987 654 321",
        // URL del mapa de la sede (marcador de posición por ahora)
        mapaUrl: "#",
        // Marca esta sede como la principal
        isPrimary: true,
    },
    // Define el anexo Norte
    {
        // Identificador del anexo Norte
        id: 2,
        // Nombre del anexo Norte
        nombre: "Anexo Norte",
        // Pastor del anexo Norte
        pastor: "Pastor Carlos Mendoza",
        // Dirección del anexo Norte
        direccion: "Calle Las Rosas 456, Cono Norte",
        // Horario de reuniones del anexo Norte
        horario: "Domingos 10:30 AM",
        // Teléfono de contacto del anexo Norte
        contacto: "+51 987 654 322",
        // URL del mapa del anexo (marcador de posición por ahora)
        mapaUrl: "#",
        // Marca que esta sede no es la principal
        isPrimary: false,
    },
    // Define el anexo Sur
    {
        // Identificador del anexo Sur
        id: 3,
        // Nombre del anexo Sur
        nombre: "Anexo Sur",
        // Pastor del anexo Sur
        pastor: "Pastor Luis Ramírez",
        // Dirección del anexo Sur
        direccion: "Av. El Sol 789, Cono Sur",
        // Horario de reuniones del anexo Sur
        horario: "Domingos 4:00 PM",
        // Teléfono de contacto del anexo Sur
        contacto: "+51 987 654 323",
        // URL del mapa del anexo (marcador de posición por ahora)
        mapaUrl: "#",
        // Marca que esta sede no es la principal
        isPrimary: false,
    },
];

// Define y exporta el componente de la página de anexos y recursos
export default function Anexos() {
    // Estado que almacena la lista de recursos descargables obtenidos de la API
    const [recursos, setRecursos] = useState<ApiRecurso[]>([]);
    // Estado que indica si los recursos aún se están cargando
    const [loadingRecursos, setLoadingRecursos] = useState(true);

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona que obtiene los recursos desde la API
        const fetchRecursos = async () => {
            // Intenta realizar la petición a la API
            try {
                // Llama al endpoint que devuelve todos los recursos
                const data = await api.recursos.getAll();
                // Guarda los recursos obtenidos en el estado
                setRecursos(data);
            } catch (error) {
                // Muestra el error en consola si la petición falla
                console.error("Error fetching recursos:", error);
            } finally {
                // Indica que la carga terminó, haya o no errores
                setLoadingRecursos(false);
            }
        };
        // Ejecuta la función de carga de recursos
        fetchRecursos();
        // Arreglo de dependencias vacío para que el efecto se ejecute solo al montar
    }, []);

    // Retorna el JSX de la página de anexos
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Nuestros Anexos y Recursos" subtitle="Encuentra una iglesia cerca de ti y accede a material útil" />
            // Contenido principal de la página
            <main>
                // Sección que muestra las sedes de la iglesia
                <section className="section">
                    // Contenedor central con ancho máximo y márgenes responsivos
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        // Título de la sección de sedes con animación de entrada
                        <h2 className="section-title" data-animate="fade-in-down">Conoce Nuestras Sedes</h2>
                        // Subtítulo que invita a encontrar una iglesia cercana
                        <p className="section-subtitle" data-animate="fade-in-up">
                            // Mensaje que anima a unirse a la comunidad
                            Encuentra una iglesia cerca de tu casa y únete a nuestra familia.
                        </p>

                        // Contenedor en cuadrícula de tres columnas para las tarjetas de sedes
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            // Recorre la lista de sedes y genera una tarjeta por cada una
                            {sedes.map((sede) => (
                                // Contenedor de cada tarjeta con clave única
                                <div className="" key={sede.id}>
                                    // Tarjeta de sede con estilo especial si es la principal
                                    <div className={`anexo-card ${sede.isPrimary ? 'anexo-card--primary' : ''}`} data-animate="fade-in-up">
                                        // Si la sede es la principal, muestra la insignia correspondiente
                                        {sede.isPrimary && (
                                            // Insignia que identifica la sede principal
                                            <span className="anexo-badge">
                                                // Ícono de estrella que acompaña a la insignia
                                                <i className="bi bi-star-fill" aria-hidden="true"></i> Sede Principal
                                            </span>
                                        )}
                                        // Contenedor del ícono de la tarjeta
                                        <div className="anexo-card-icon">
                                            // Ícono de casa de Bootstrap Icons
                                            <i className="bi bi-house-door-fill" aria-hidden="true"></i>
                                        </div>
                                        // Título de la tarjeta con el nombre de la sede
                                        <h3 className="anexo-card-title">{sede.nombre}</h3>
                                        // Contenedor de los detalles de la sede
                                        <div className="anexo-card-details">
                                            // Fila que muestra el pastor de la sede
                                            <div className="anexo-detail">
                                                // Ícono de persona
                                                <i className="bi bi-person-fill" aria-hidden="true"></i>
                                                // Nombre del pastor de la sede
                                                <span>{sede.pastor}</span>
                                            </div>
                                            // Fila que muestra la dirección de la sede
                                            <div className="anexo-detail">
                                                // Ícono de ubicación geográfica
                                                <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                                // Dirección de la sede
                                                <span>{sede.direccion}</span>
                                            </div>
                                            // Fila que muestra el horario de la sede
                                            <div className="anexo-detail">
                                                // Ícono de reloj
                                                <i className="bi bi-clock-fill" aria-hidden="true"></i>
                                                // Horario de reuniones de la sede
                                                <span>{sede.horario}</span>
                                            </div>
                                            // Fila que muestra el contacto de la sede
                                            <div className="anexo-detail">
                                                // Ícono de teléfono
                                                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                                // Número de contacto de la sede
                                                <span>{sede.contacto}</span>
                                            </div>
                                        </div>
                                        // Enlace que abre el mapa de la sede
                                        <a href={sede.mapaUrl} className="anexo-map-btn">
                                            // Ícono de mapa que acompaña al enlace
                                            <i className="bi bi-map" aria-hidden="true"></i> Ver en el Mapa
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                // Sección con fondo alternativo que muestra los recursos descargables
                <section className="section section-alt">
                    // Contenedor central con ancho máximo y márgenes responsivos
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        // Título de la sección de recursos con animación de entrada
                        <h2 className="section-title" data-animate="fade-in-down">Recursos Descargables</h2>
                        // Subtítulo que describe el material de estudio disponible
                        <p className="section-subtitle" data-animate="fade-in-up">
                            // Mensaje sobre el material de estudio y guías espirituales
                            Material de estudio y guías para tu crecimiento espiritual.
                        </p>
                        // Si los recursos aún se cargan, muestra un indicador de carga
                        {loadingRecursos ? (
                            // Contenedor centrado con el mensaje de carga
                            <div className="text-center w-full py-8 text-muted">
                                // Ícono giratorio que indica que se está cargando
                                <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2rem' }}></i>
                                // Texto que informa que los recursos se están cargando
                                <p className="mt-2">Cargando recursos...</p>
                            </div>
                        ) : (
                            // Contenedor en cuadrícula de dos columnas para las tarjetas de recursos
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                                // Recorre la lista de recursos y genera una tarjeta por cada uno
                                {recursos.map((recurso) => (
                                    // Contenedor de cada tarjeta con clave única
                                    <div className="" key={recurso.id}>
                                        // Tarjeta de recurso con animación de entrada
                                        <div className="recurso-card" data-animate="scale-in">
                                            // Contenedor del ícono del recurso
                                            <div className="recurso-icon">
                                                // Ícono de archivo según el tipo de recurso (pdf, doc, etc.)
                                                <i className={`bi bi-file-earmark-${recurso.tipo.toLowerCase()}`} aria-hidden="true"></i>
                                            </div>
                                            // Título del recurso
                                            <h3 className="recurso-title">{recurso.titulo}</h3>
                                            // Descripción del recurso
                                            <p className="recurso-desc">{recurso.descripcion}</p>
                                            // Enlace para descargar el archivo en una pestaña nueva
                                            <a href={recurso.archivo_url} target="_blank" rel="noreferrer" className="btn btn-primary recurso-btn" style={{ display: 'inline-block', textAlign: 'center' }}>
                                                // Ícono de descarga que acompaña al botón
                                                <i className="bi bi-download" aria-hidden="true"></i> Descargar {recurso.tipo}
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
}
