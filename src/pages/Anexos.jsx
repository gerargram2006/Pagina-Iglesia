// Importa el componente PageHeader para el encabezado de la página
import PageHeader from '../components/PageHeader';

/**
 * Anexos - Página de Sedes y Recursos
 * Muestra:
 * 1. Sedes/Anexos de la iglesia (información de cada ubicación)
 * 2. Recursos descargables (PDFs de estudio)
 */
export default function Anexos() {
    // Array de sedes de la iglesia (datos de prueba - conectar a backend después)
    const sedes = [
        {
            id: 1,
            nombre: "Sede Principal (Central)",    // Nombre de la sede
            pastor: "Pastor Ruideto Costa",         // Pastor encargado
            direccion: "Av. Principal 123, Distrito Central", // Dirección física
            horario: "Domingos 9:00 AM y 6:00 PM", // Horarios de culto
            contacto: "+51 987 654 321",           // Número de teléfono
            mapaUrl: "#",                          // URL de Google Maps (pendiente)
            isPrimary: true,                       // Marca si es la sede principal
        },
        {
            id: 2,
            nombre: "Anexo Norte",
            pastor: "Pastor Carlos Mendoza",
            direccion: "Calle Las Rosas 456, Cono Norte",
            horario: "Domingos 10:30 AM",
            contacto: "+51 987 654 322",
            mapaUrl: "#",
            isPrimary: false,
        },
        {
            id: 3,
            nombre: "Anexo Sur",
            pastor: "Pastor Luis Ramírez",
            direccion: "Av. El Sol 789, Cono Sur",
            horario: "Domingos 4:00 PM",
            contacto: "+51 987 654 323",
            mapaUrl: "#",
            isPrimary: false,
        },
    ];

    // Array de recursos descargables (datos de prueba)
    const recursos = [
        {
            id: 1,
            titulo: "Plan de Lectura Anual",      // Nombre del recurso
            descripcion: "Guía en PDF para leer la Biblia en un año.", // Descripción
            tipo: "PDF",                           // Tipo de archivo
            icono: "bi-file-earmark-pdf",          // Icono de Bootstrap Icons
        },
        {
            id: 2,
            titulo: "Lecciones para Células",
            descripcion: "Material de estudio para los grupos en casa del mes.",
            tipo: "PDF",
            icono: "bi-book",
        },
    ];

    return (
        <>
            {/* Encabezado de la página con título y subtítulo */}
            <PageHeader title="Nuestros Anexos y Recursos" subtitle="Encuentra una iglesia cerca de ti y accede a material útil" />
            <main>
                {/* SECCIÓN 1: Sedes/Anexos de la iglesia */}
                <section className="section">
                    <div className="container">
                        {/* Título de la sección con animación */}
                        <h2 className="section-title" data-animate="fade-in-down">Conoce Nuestras Sedes</h2>
                        <p className="section-subtitle" data-animate="fade-in-up">
                            Encuentra una iglesia cerca de tu casa y únete a nuestra familia.
                        </p>

                        {/* Grid de tarjetas de sedes (3 columnas en desktop, 1 en móvil) */}
                        <div className="row g-4">
                            {/* Recorre el array de sedes y crea una tarjeta por cada una */}
                            {sedes.map((sede) => (
                                <div className="col-12 col-md-4" key={sede.id}>
                                    {/* Tarjeta del anexo: clase primaria si es la sede principal */}
                                    <div className={`anexo-card ${sede.isPrimary ? 'anexo-card--primary' : ''}`} data-animate="fade-in-up">
                                        {/* Badge "Sede Principal" solo se muestra si isPrimary es true */}
                                        {sede.isPrimary && (
                                            <span className="anexo-badge">
                                                <i className="bi bi-star-fill" aria-hidden="true"></i> Sede Principal
                                            </span>
                                        )}
                                        {/* Icono de casa */}
                                        <div className="anexo-card-icon">
                                            <i className="bi bi-house-door-fill" aria-hidden="true"></i>
                                        </div>
                                        {/* Nombre de la sede */}
                                        <h3 className="anexo-card-title">{sede.nombre}</h3>
                                        {/* Detalles de la sede: pastor, dirección, horario, contacto */}
                                        <div className="anexo-card-details">
                                            <div className="anexo-detail">
                                                <i className="bi bi-person-fill" aria-hidden="true"></i>
                                                <span>{sede.pastor}</span>
                                            </div>
                                            <div className="anexo-detail">
                                                <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                                                <span>{sede.direccion}</span>
                                            </div>
                                            <div className="anexo-detail">
                                                <i className="bi bi-clock-fill" aria-hidden="true"></i>
                                                <span>{sede.horario}</span>
                                            </div>
                                            <div className="anexo-detail">
                                                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                                                <span>{sede.contacto}</span>
                                            </div>
                                        </div>
                                        {/* Botón para ver la ubicación en Google Maps */}
                                        <a href={sede.mapaUrl} className="anexo-map-btn">
                                            <i className="bi bi-map" aria-hidden="true"></i> Ver en el Mapa
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SECCIÓN 2: Recursos descargables */}
                <section className="section section-alt">
                    <div className="container">
                        <h2 className="section-title" data-animate="fade-in-down">Recursos Descargables</h2>
                        <p className="section-subtitle" data-animate="fade-in-up">
                            Material de estudio y guías para tu crecimiento espiritual.
                        </p>
                        {/* Grid de tarjetas de recursos (2 columnas en desktop) */}
                        <div className="row g-4 justify-content-center">
                            {recursos.map((recurso) => (
                                <div className="col-12 col-md-5" key={recurso.id}>
                                    <div className="recurso-card" data-animate="scale-in">
                                        {/* Icono del recurso (PDF, libro, etc.) */}
                                        <div className="recurso-icon">
                                            <i className={`bi ${recurso.icono}`} aria-hidden="true"></i>
                                        </div>
                                        <h3 className="recurso-title">{recurso.titulo}</h3>
                                        <p className="recurso-desc">{recurso.descripcion}</p>
                                        {/* Botón de descarga */}
                                        <button className="btn btn-primary recurso-btn">
                                            <i className="bi bi-download" aria-hidden="true"></i> Descargar {recurso.tipo}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
