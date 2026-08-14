// Importa el encabezado de página reutilizable
import PageHeader from "../components/PageHeader";

// Define y exporta el componente de la página de donaciones
export default function Donaciones() {
    // Retorna el JSX de la página de donaciones
    return (
        // Fragmento de React que agrupa elementos sin añadir nodos extra al DOM
        <>
            // Muestra el encabezado de la página con su título y subtítulo
            <PageHeader title="Donaciones" subtitle="Ayúdanos a transformar vidas en Arequipa" />
            // Contenido principal de la página
            <main>
                // Sección que contiene el contenido de donaciones
                <section className="section">
                    // Contenedor central que limita el ancho del contenido
                    <div className="container">
                        // Bloque introductorio con animación de entrada
                        <div className="donation-intro" data-animate="fade-in-up">
                            // Párrafo de introducción que invita a donar
                            <p className="donation-intro-text">
                                // Mensaje de agradecimiento y llamado a la generosidad
                                ¡Tu generosidad transforma vidas! Con tu aporte económico, estamos llevando esperanza
                                // Explica el destino de las donaciones: personas en situación de calle
                                y ayuda a personas en situación de calle en Arequipa. Cada donación marca una diferencia real.
                            </p>
                        </div>

                        {/* Impacto cards */}
                        // Contenedor en cuadrícula de tres columnas para las tarjetas de impacto
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto mb-12">
                            // Tarjeta de impacto con animación y retraso de entrada
                            <div data-animate="scale-in" className="delay-1">
                                // Elemento de valor con estilo específico
                                <div className="value-item">
                                    // Ícono de corazón para el valor de alimentación
                                    <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span>
                                    // Título de la tarjeta de alimentación
                                    <h3>Alimentación</h3>
                                    // Descripción del apoyo en alimentación
                                    <p>Proporcionamos alimentos a familias necesitadas</p>
                                </div>
                            </div>
                            // Tarjeta de impacto con animación y retraso de entrada
                            <div data-animate="scale-in" className="delay-2">
                                // Elemento de valor con estilo específico
                                <div className="value-item">
                                    // Ícono de libro para el valor de educación
                                    <span className="value-icon"><i className="bi bi-book-fill" aria-hidden="true"></i></span>
                                    // Título de la tarjeta de educación
                                    <h3>Educación</h3>
                                    // Descripción del apoyo en educación
                                    <p>Apoyamos la educación de niños y jóvenes</p>
                                </div>
                            </div>
                            // Tarjeta de impacto con animación y retraso de entrada
                            <div data-animate="scale-in" className="delay-3">
                                // Elemento de valor con estilo específico
                                <div className="value-item">
                                    // Ícono de casa con corazón para el valor de refugio
                                    <span className="value-icon"><i className="bi bi-house-heart-fill" aria-hidden="true"></i></span>
                                    // Título de la tarjeta de refugio
                                    <h3>Refugio</h3>
                                    // Descripción del apoyo a personas en situación de calle
                                    <p>Brindamos apoyo a personas en situación de calle</p>
                                </div>
                            </div>
                        </div>

                        // Sección de donación mediante Yape con animación de entrada
                        <div className="yape-section" data-animate="scale-in">
                            // Tarjeta que muestra los datos de donación por Yape
                            <div className="yape-card">
                                // Contenedor del ícono de código QR
                                <div className="yape-icon">
                                    // Ícono de código QR de Bootstrap Icons
                                    <i className="bi bi-qr-code"></i>
                                </div>
                                // Título que invita a donar con Yape
                                <h3 className="yape-title">Dona con Yape</h3>
                                // Instrucción para escanear el código QR
                                <p className="yape-description">Escanea el código QR y realiza tu donación</p>
                                // Contenedor de la imagen del código QR
                                <div className="yape-qr">
                                    // Imagen del código QR de Yape para donaciones
                                    <img src="/img/yape-qr.png" alt="Código QR de Yape para donaciones" />
                                </div>
                                // Nombre de la cuenta beneficiaria de la donación
                                <p className="yape-name">Asamblea de Dios</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
