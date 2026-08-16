import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { api, type ApiRecurso } from '../api';

interface Sede {
    id: number;
    nombre: string;
    pastor: string;
    direccion: string;
    horario: string;
    contacto: string;
    mapaUrl: string;
    isPrimary: boolean;
}

const sedes: Sede[] = [
    {
        id: 1,
        nombre: "Sede Principal (Central)",
        pastor: "Pastor Ruideto Costa",
        direccion: "Comandante Canga N° 416, Mariano Melgar 04006",
        horario: "Domingos 9:00 AM y 6:00 PM",
        contacto: "+51 987 654 321",
        mapaUrl: "#",
        isPrimary: true,
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

export default function Anexos() {
    const [recursos, setRecursos] = useState<ApiRecurso[]>([]);
    const [loadingRecursos, setLoadingRecursos] = useState(true);

    useEffect(() => {
        const fetchRecursos = async () => {
            try {
                const data = await api.recursos.getAll();
                setRecursos(data);
            } catch (error) {
                console.error("Error fetching recursos:", error);
            } finally {
                setLoadingRecursos(false);
            }
        };
        fetchRecursos();
    }, []);

    return (
        <>
            <PageHeader title="Nuestros Anexos y Recursos" subtitle="Encuentra una iglesia cerca de ti y accede a material útil" />
            <main>
                <section className="section">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="section-title" data-animate="fade-in-down">Conoce Nuestras Sedes</h2>
                        <p className="section-subtitle" data-animate="fade-in-up">
                            Encuentra una iglesia cerca de tu casa y únete a nuestra familia.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {sedes.map((sede) => (
                                <div className="" key={sede.id}>
                                    <div className={`anexo-card ${sede.isPrimary ? 'anexo-card--primary' : ''}`} data-animate="fade-in-up">
                                        {sede.isPrimary && (
                                            <span className="anexo-badge">
                                                <i className="bi bi-star-fill" aria-hidden="true"></i> Sede Principal
                                            </span>
                                        )}
                                        <div className="anexo-card-icon">
                                            <i className="bi bi-house-door-fill" aria-hidden="true"></i>
                                        </div>
                                        <h3 className="anexo-card-title">{sede.nombre}</h3>
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
                                        <a href={sede.mapaUrl} className="anexo-map-btn">
                                            <i className="bi bi-map" aria-hidden="true"></i> Ver en el Mapa
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="section section-alt">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="section-title" data-animate="fade-in-down">Recursos Descargables</h2>
                        <p className="section-subtitle" data-animate="fade-in-up">
                            Material de estudio y guías para tu crecimiento espiritual.
                        </p>
                        {loadingRecursos ? (
                            <div className="text-center w-full py-8 text-muted">
                                <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2rem' }}></i>
                                <p className="mt-2">Cargando recursos...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
                                {recursos.map((recurso) => (
                                    <div className="" key={recurso.id}>
                                        <div className="recurso-card" data-animate="scale-in">
                                            <div className="recurso-icon">
                                                <i className={`bi bi-file-earmark-${recurso.tipo.toLowerCase()}`} aria-hidden="true"></i>
                                            </div>
                                            <h3 className="recurso-title">{recurso.titulo}</h3>
                                            <p className="recurso-desc">{recurso.descripcion}</p>
                                            <a href={recurso.archivo_url} target="_blank" rel="noreferrer" className="btn btn-primary recurso-btn" style={{ display: 'inline-block', textAlign: 'center' }}>
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
