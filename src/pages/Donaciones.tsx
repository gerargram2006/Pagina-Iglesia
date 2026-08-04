import PageHeader from "../components/PageHeader";

export default function Donaciones() {
    return (
        <>
            <PageHeader title="Donaciones" subtitle="Ayudanos a mejorar vidas de muchas personas en Arequipa en situación de calle" />
            <main>
                <section className="section">
                    <div className="container">
                        <div className="donation-intro" data-animate="fade-in-up">
                            <p className="donation-intro-text">
                                ¡Tu generosidad transforma vidas! Con tu aporte económico, estamos transformando vidas de muchas personas en Arequipa en situación de calle.
                            </p>
                        </div>

                        <div className="yape-section" data-animate="scale-in">
                            <div className="yape-card">
                                <div className="yape-icon">
                                    <i className="bi bi-qr-code"></i>
                                </div>
                                <h3 className="yape-title">Dona con Yape</h3>
                                <p className="yape-description">Escanea el código QR y realiza tu donación</p>
                                <div className="yape-qr">
                                    <img src="/img/yape-qr.png" alt="Código QR de Yape" />
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
