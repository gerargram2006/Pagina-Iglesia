import PageHeader from "../components/PageHeader";

export default function Donaciones() {
    return (
        <>
            <PageHeader title="Donaciones" subtitle="Ayúdanos a transformar vidas en Arequipa" />
            <main>
                <section className="section">
                    <div className="container">
                        <div className="donation-intro" data-animate="fade-in-up">
                            <p className="donation-intro-text">
                                ¡Tu generosidad transforma vidas! Con tu aporte económico, estamos llevando esperanza
                                y ayuda a personas en situación de calle en Arequipa. Cada donación marca una diferencia real.
                            </p>
                        </div>

                        {/* Impacto cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[800px] mx-auto mb-12">
                            <div data-animate="scale-in" className="delay-1">
                                <div className="value-item">
                                    <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span>
                                    <h3>Alimentación</h3>
                                    <p>Proporcionamos alimentos a familias necesitadas</p>
                                </div>
                            </div>
                            <div data-animate="scale-in" className="delay-2">
                                <div className="value-item">
                                    <span className="value-icon"><i className="bi bi-book-fill" aria-hidden="true"></i></span>
                                    <h3>Educación</h3>
                                    <p>Apoyamos la educación de niños y jóvenes</p>
                                </div>
                            </div>
                            <div data-animate="scale-in" className="delay-3">
                                <div className="value-item">
                                    <span className="value-icon"><i className="bi bi-house-heart-fill" aria-hidden="true"></i></span>
                                    <h3>Refugio</h3>
                                    <p>Brindamos apoyo a personas en situación de calle</p>
                                </div>
                            </div>
                        </div>

                        <div className="yape-section" data-animate="scale-in">
                            <div className="yape-card">
                                <div className="yape-icon">
                                    <i className="bi bi-qr-code"></i>
                                </div>
                                <h3 className="yape-title">Dona con Yape</h3>
                                <p className="yape-description">Escanea el código QR y realiza tu donación</p>
                                <div className="yape-qr">
                                    <img src="/img/yape-qr.png" alt="Código QR de Yape para donaciones" />
                                </div>
                                <p className="yape-name">Asamblea de Dios</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
