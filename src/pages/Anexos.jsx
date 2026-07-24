import React from 'react';
import PageHeader from '../components/PageHeader'; // Asumiendo que tienes este componente

const Anexos = () => {
    // Datos de prueba para tus Sedes/Anexos (Luego lo puedes conectar a tu backend)
    const sedes = [
        {
            id: 1,
            nombre: "Sede Principal (Central)",
            pastor: "Pastor Ruideto Costa",
            direccion: "Av. Principal 123, Distrito Central",
            horario: "Domingos 9:00 AM y 6:00 PM",
            contacto: "+51 987 654 321",
            mapaUrl: "#"
        },
        {
            id: 2,
            nombre: "Anexo Norte",
            pastor: "Pastor Carlos Mendoza",
            direccion: "Calle Las Rosas 456, Cono Norte",
            horario: "Domingos 10:30 AM",
            contacto: "+51 987 654 322",
            mapaUrl: "#"
        },
        {
            id: 3,
            nombre: "Anexo Sur",
            pastor: "Pastor Luis Ramírez",
            direccion: "Av. El Sol 789, Cono Sur",
            horario: "Domingos 4:00 PM",
            contacto: "+51 987 654 323",
            mapaUrl: "#"
        }
    ];

    // Datos de prueba para la sección de Recursos
    const recursos = [
        {
            id: 1,
            titulo: "Plan de Lectura Anual",
            descripcion: "Guía en PDF para leer la Biblia en un año.",
            tipo: "PDF",
            icono: "bi-file-earmark-pdf" // Usando Bootstrap Icons que tienes en tu proyecto
        },
        {
            id: 2,
            titulo: "Lecciones para Células",
            descripcion: "Material de estudio para los grupos en casa del mes.",
            tipo: "PDF",
            icono: "bi-book"
        }
    ];

    return (
        <div className="anexos-page">
            <PageHeader titulo="Nuestros Anexos y Recursos" />

            <div className="container py-5">

                {/* SECCIÓN DE ANEXOS (SEDES) */}
                <div className="mb-5">
                    <h2 className="text-center mb-4">Conoce Nuestras Sedes</h2>
                    <p className="text-center text-muted mb-5">
                        Encuentra una iglesia cerca de tu casa y únete a nuestra familia.
                    </p>

                    <div className="row g-4">
                        {sedes.map((sede) => (
                            <div className="col-md-4" key={sede.id}>
                                <div className="card h-100 shadow-sm border-0">
                                    <div className="card-body">
                                        <h4 className="card-title text-primary mb-3">
                                            <i className="bi bi-house-door-fill me-2"></i>
                                            {sede.nombre}
                                        </h4>
                                        <p className="card-text mb-2">
                                            <strong><i className="bi bi-person-fill me-2"></i>Pastor:</strong> {sede.pastor}
                                        </p>
                                        <p className="card-text mb-2">
                                            <strong><i className="bi bi-geo-alt-fill me-2"></i>Dirección:</strong> {sede.direccion}
                                        </p>
                                        <p className="card-text mb-2">
                                            <strong><i className="bi bi-clock-fill me-2"></i>Horarios:</strong> {sede.horario}
                                        </p>
                                        <p className="card-text mb-4">
                                            <strong><i className="bi bi-telephone-fill me-2"></i>Contacto:</strong> {sede.contacto}
                                        </p>
                                        <button className="btn btn-outline-primary w-100">
                                            Ver en el Mapa
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="my-5" />

                {/* SECCIÓN DE RECURSOS */}
                <div>
                    <h2 className="text-center mb-4">Recursos Descargables</h2>
                    <div className="row g-4 justify-content-center">
                        {recursos.map((recurso) => (
                            <div className="col-md-5" key={recurso.id}>
                                <div className="card border-0 bg-light p-3 text-center h-100">
                                    <div className="card-body">
                                        <i className={`bi ${recurso.icono} text-danger display-4 mb-3`}></i>
                                        <h5 className="card-title">{recurso.titulo}</h5>
                                        <p className="card-text text-muted">{recurso.descripcion}</p>
                                        <button className="btn btn-danger mt-2">
                                            <i className="bi bi-download me-2"></i> Descargar {recurso.tipo}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Anexos;