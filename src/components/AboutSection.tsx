// Define las propiedades que acepta el componente AboutSection
interface AboutSectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Define el componente AboutSection con valores por defecto para sus propiedades
export default function AboutSection({ title = "Quiénes Somos", subtitle = "Conoce nuestra historia y misión", id = "quienes-somos" }: AboutSectionProps) {
    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de información con su identificador y estilos
        <section id={id} className="section section-alt">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                {/* Contenedor principal del contenido de la sección */}
                <div className="about-content">
                    {/* Cuadrícula con el texto y la imagen de la iglesia */}
                    <div className="about-grid">
                        {/* Bloque de texto descriptivo con animación de entrada */}
                        <div className="about-text" data-animate="fade-in-left">
                            {/* Párrafo con la descripción de la iglesia */}
                            <p>Somos una iglesia comprometida con la enseñanza bíblica, la oración y el servicio a la comunidad. Desde nuestra fundación, hemos trabajado para ser un faro de luz y esperanza en nuestra ciudad.</p>
                            {/* Párrafo con las creencias y la misión de la iglesia */}
                            <p>Creemos en el amor de Dios, en la salvación por medio de Jesucristo y en el poder del Espíritu Santo para transformar vidas. Nuestra misión es predicar el evangelio, discipular creyentes y servir a nuestra comunidad con amor y dedicación.</p>
                            {/* Contenedor de las estadísticas de la iglesia */}
                            <div className="about-stats">
                                {/* Primera estadística de años de servicio */}
                                <div className="about-stat">
                                    {/* Número de años de servicio */}
                                    <span className="about-stat-number">25+</span>
                                    {/* Etiqueta de la estadística */}
                                    <span className="about-stat-label">Años de servicio</span>
                                </div>
                                {/* Segunda estadística de miembros */}
                                <div className="about-stat">
                                    {/* Número de miembros */}
                                    <span className="about-stat-number">500+</span>
                                    {/* Etiqueta de la estadística */}
                                    <span className="about-stat-label">Miembros</span>
                                </div>
                                {/* Tercera estadística de ministerios */}
                                <div className="about-stat">
                                    {/* Número de ministerios */}
                                    <span className="about-stat-number">10+</span>
                                    {/* Etiqueta de la estadística */}
                                    <span className="about-stat-label">Ministerios</span>
                                </div>
                            </div>
                        </div>
                        {/* Contenedor de la imagen de la iglesia con animación de entrada */}
                        <div className="about-image-wrapper" data-animate="fade-in-right">
                            {/* Imagen de la congregación con carga diferida */}
                            <img src="/img/galeria-congregacion.webp" alt="Nuestra iglesia" className="about-image" loading="lazy" />
                            {/* Decoración ornamental de la imagen */}
                            <div className="about-image-decoration" aria-hidden="true"></div>
                        </div>
                    </div>
                    {/* Contenedor de los valores de la iglesia */}
                    <div className="about-values">
                        {/* Cuadrícula responsiva de tres columnas para los valores */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Contenedor del primer valor (Fe) */}
                            <div>
                                {/* Tarjeta del valor con animación de escala */}
                                <div className="value-item delay-1" data-animate="scale-in">
                                    {/* Icono del valor de la fe */}
                                    <span className="value-icon"><i className="bi bi-book-fill" aria-hidden="true"></i></span>
                                    {/* Título del valor */}
                                    <h3>Fe</h3>
                                    {/* Descripción del valor */}
                                    <p>Creemos en Dios Padre, Hijo y Espíritu Santo</p>
                                </div>
                            </div>
                            {/* Contenedor del segundo valor (Amor) */}
                            <div>
                                {/* Tarjeta del valor con animación de escala */}
                                <div className="value-item delay-2" data-animate="scale-in">
                                    {/* Icono del valor del amor */}
                                    <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span>
                                    {/* Título del valor */}
                                    <h3>Amor</h3>
                                    {/* Descripción del valor */}
                                    <p>Amamos a Dios y al prójimo como a nosotros mismos</p>
                                </div>
                            </div>
                            {/* Contenedor del tercer valor (Servicio) */}
                            <div>
                                {/* Tarjeta del valor con animación de escala */}
                                <div className="value-item delay-3" data-animate="scale-in">
                                    {/* Icono del valor del servicio */}
                                    <span className="value-icon"><i className="bi bi-people-fill" aria-hidden="true"></i></span>
                                    {/* Título del valor */}
                                    <h3>Servicio</h3>
                                    {/* Descripción del valor */}
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
