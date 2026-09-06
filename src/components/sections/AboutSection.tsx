interface AboutSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

export default function AboutSection({ title = "QuiÃ©nes Somos", subtitle = "Conoce nuestra historia y misiÃ³n", id = "quienes-somos" }: AboutSectionProps) {
    return (
        <section id={id} className="section section-alt">
            {/* Contenedor central con ancho mÃ¡ximo y mÃ¡rgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el tÃ­tulo solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtÃ­tulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                {/* Contenedor principal del contenido de la secciÃ³n */}
                <div className="about-content">
                    {/* CuadrÃ­cula con el texto y la imagen de la iglesia */}
                    <div className="about-grid">
                        {/* Bloque de texto descriptivo con animaciÃ³n de entrada */}
                        <div className="about-text" data-animate="fade-in-left">
                            {/* PÃ¡rrafo con la descripciÃ³n de la iglesia */}
                            <p>Somos una iglesia comprometida con la enseÃ±anza bÃ­blica, la oraciÃ³n y el servicio a la comunidad. Desde nuestra fundaciÃ³n, hemos trabajado para ser un faro de luz y esperanza en nuestra ciudad.</p>
                            {/* PÃ¡rrafo con las creencias y la misiÃ³n de la iglesia */}
                            <p>Creemos en el amor de Dios, en la salvaciÃ³n por medio de Jesucristo y en el poder del EspÃ­ritu Santo para transformar vidas. Nuestra misiÃ³n es predicar el evangelio, discipular creyentes y servir a nuestra comunidad con amor y dedicaciÃ³n.</p>
                            {/* Contenedor de las estadÃ­sticas de la iglesia */}
                            <div className="about-stats">
                                {/* Primera estadÃ­stica de aÃ±os de servicio */}
                                <div className="about-stat">
                                    {/* NÃºmero de aÃ±os de servicio */}
                                    <span className="about-stat-number">25+</span>
                                    {/* Etiqueta de la estadÃ­stica */}
                                    <span className="about-stat-label">AÃ±os de servicio</span>
                                </div>
                                {/* Segunda estadÃ­stica de miembros */}
                                <div className="about-stat">
                                    {/* NÃºmero de miembros */}
                                    <span className="about-stat-number">500+</span>
                                    {/* Etiqueta de la estadÃ­stica */}
                                    <span className="about-stat-label">Miembros</span>
                                </div>
                                {/* Tercera estadÃ­stica de ministerios */}
                                <div className="about-stat">
                                    {/* NÃºmero de ministerios */}
                                    <span className="about-stat-number">10+</span>
                                    {/* Etiqueta de la estadÃ­stica */}
                                    <span className="about-stat-label">Ministerios</span>
                                </div>
                            </div>
                        </div>
                        {/* Contenedor de la imagen de la iglesia con animaciÃ³n de entrada */}
                        <div className="about-image-wrapper" data-animate="fade-in-right">
                            {/* Imagen de la congregaciÃ³n con carga diferida */}
                            <img src="/img/galeria-congregacion.webp" alt="Nuestra iglesia" className="about-image" loading="lazy" />
                            {/* DecoraciÃ³n ornamental de la imagen */}
                            <div className="about-image-decoration" aria-hidden="true"></div>
                        </div>
                    </div>
                    {/* Contenedor de los valores de la iglesia */}
                    <div className="about-values">
                        {/* CuadrÃ­cula responsiva de tres columnas para los valores */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Contenedor del primer valor (Fe) */}
                            <div>
                                {/* Tarjeta del valor con animaciÃ³n de escala */}
                                <div className="value-item delay-1" data-animate="scale-in">
                                    {/* Icono del valor de la fe */}
                                    <span className="value-icon"><i className="bi bi-book-fill" aria-hidden="true"></i></span>
                                    {/* TÃ­tulo del valor */}
                                    <h3>Fe</h3>
                                    {/* DescripciÃ³n del valor */}
                                    <p>Creemos en Dios Padre, Hijo y EspÃ­ritu Santo</p>
                                </div>
                            </div>
                            {/* Contenedor del segundo valor (Amor) */}
                            <div>
                                {/* Tarjeta del valor con animaciÃ³n de escala */}
                                <div className="value-item delay-2" data-animate="scale-in">
                                    {/* Icono del valor del amor */}
                                    <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span>
                                    {/* TÃ­tulo del valor */}
                                    <h3>Amor</h3>
                                    {/* DescripciÃ³n del valor */}
                                    <p>Amamos a Dios y al prÃ³jimo como a nosotros mismos</p>
                                </div>
                            </div>
                            {/* Contenedor del tercer valor (Servicio) */}
                            <div>
                                {/* Tarjeta del valor con animaciÃ³n de escala */}
                                <div className="value-item delay-3" data-animate="scale-in">
                                    {/* Icono del valor del servicio */}
                                    <span className="value-icon"><i className="bi bi-people-fill" aria-hidden="true"></i></span>
                                    {/* TÃ­tulo del valor */}
                                    <h3>Servicio</h3>
                                    {/* DescripciÃ³n del valor */}
                                    <p>Servimos a nuestra comunidad con humildad</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
