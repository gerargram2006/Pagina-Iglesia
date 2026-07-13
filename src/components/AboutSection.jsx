/**
 * Componente AboutSection - Sección "Quiénes Somos".
 *
 * Describe la historia, misión y valores de la iglesia.
 * Se usa tanto en Home (sección) como en /quienes-somos (página completa).
 *
 * Props:
 *   @param {string} title    - Título de la sección (null para ocultar)
 *   @param {string} subtitle - Subtítulo descriptivo (null para ocultar)
 *   @param {string} id       - ID HTML para enlaces internos
 *
 * Estructura:
 *   - Dos párrafos descriptivos sobre la iglesia.
 *   - Tres tarjetas de valores con iconos: Fe, Amor, Servicio.
 *   - Cada valor usa data-animate="scale-in" con efecto de escala.
 */
export default function AboutSection({ title = "Quiénes Somos", subtitle = "Conoce nuestra historia y misión", id = "quienes-somos" }) { // Exporta AboutSection con valores por defecto para cada prop
    return ( // Retorna el JSX de la sección
        <section id={id} className="section section-alt"> {/* Sección semántica con ID dinámico y clases de estilo alternado */}
            <div className="container"> {/* Contenedor Bootstrap para limitar el ancho y centrar */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>} {/* Título condicional con animación de entrada hacia abajo */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>} {/* Subtítulo condicional con animación de entrada hacia arriba */}
                <div className="about-content"> {/* Contenedor principal del contenido de la sección */}
                    <div className="about-text"> {/* Contenedor del texto descriptivo */}
                        <p data-animate="fade-in-up">Somos una iglesia comprometida con la enseñanza bíblica, la oración y el servicio a la comunidad. Desde nuestra fundación, hemos trabajado para ser un faro de luz y esperanza en nuestra ciudad.</p> {/* Primer párrafo: descripción general */}
                        <p data-animate="fade-in-up">Creemos en el amor de Dios, en la salvación por medio de Jesucristo y en el poder del Espíritu Santo para transformar vidas. Nuestra misión es predicar el evangelio, discipular creyentes y servir a nuestra comunidad con amor y dedicación.</p> {/* Segundo párrafo: misión y valores */}
                        {/* Valores de la iglesia */}
                        <div className="about-values"> {/* Contenedor para las tarjetas de valores */}
                            <div className="row g-4"> {/* Fila de Bootstrap con gutter de 4 unidades */}
                                {/* Valor: Fe */}
                                <div className="col-12 col-md-4"> {/* Columna: ancho completo en móvil, tercera parte en md */}
                                    <div className="value-item" data-animate="scale-in"> {/* Tarjeta de valor con animación de escala */}
                                        <span className="value-icon"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-cross" viewBox="0 0 16 16" aria-hidden="true" style={{verticalAlign: 'middle'}}><path d="M7 2h2v3h3v2H9v7H7V7H4V5h3V2z"/></svg></span> {/* Icono SVG de cruz */}
                                        <h3>Fe</h3> {/* Título del valor: Fe */}
                                        <p>Creemos en Dios Padre, Hijo y Espíritu Santo</p> {/* Descripción del valor de Fe */}
                                    </div> {/* Cierra la tarjeta de Fe */}
                                </div> {/* Cierra la columna de Fe */}
                                {/* Valor: Amor */}
                                <div className="col-12 col-md-4"> {/* Columna para el valor Amor */}
                                    <div className="value-item" data-animate="scale-in"> {/* Tarjeta de valor con animación de escala */}
                                        <span className="value-icon"><i className="bi bi-heart-fill" aria-hidden="true"></i></span> {/* Icono de corazón de Bootstrap Icons */}
                                        <h3>Amor</h3> {/* Título del valor: Amor */}
                                        <p>Amamos a Dios y al prójimo como a nosotros mismos</p> {/* Descripción del valor de Amor */}
                                    </div> {/* Cierra la tarjeta de Amor */}
                                </div> {/* Cierra la columna de Amor */}
                                {/* Valor: Servicio */}
                                <div className="col-12 col-md-4"> {/* Columna para el valor Servicio */}
                                    <div className="value-item" data-animate="scale-in"> {/* Tarjeta de valor con animación de escala */}
                                        <span className="value-icon"><i className="bi bi-handshake-fill" aria-hidden="true"></i></span> {/* Icono de apretón de manos de Bootstrap Icons */}
                                        <h3>Servicio</h3> {/* Título del valor: Servicio */}
                                        <p>Servimos a nuestra comunidad con humildad</p> {/* Descripción del valor de Servicio */}
                                    </div> {/* Cierra la tarjeta de Servicio */}
                                </div> {/* Cierra la columna de Servicio */}
                            </div> {/* Cierra la fila de valores */}
                        </div> {/* Cierra el contenedor de valores */}
                    </div> {/* Cierra el contenedor de texto */}
                </div> {/* Cierra el contenedor de contenido */}
            </div> {/* Cierra el contenedor principal */}
        </section> // Fin del elemento section
    ); // Fin del return
} // Fin del componente AboutSection
