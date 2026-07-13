/**
 * Componente Footer - Pie de página.
 *
 * Se muestra en TODAS las páginas (incluido en Layout.jsx).
 *
 * Estructura (3 columnas en desktop, apiladas en móvil):
 *   - Columna 1: Logo + descripción breve de la iglesia.
 *   - Columna 2: Enlaces de navegación rápida (Inicio, Horarios, Quiénes Somos, Contacto).
 *   - Columna 3: Iconos de redes sociales (Facebook, Instagram, YouTube).
 *
 * El año del copyright se genera dinámicamente con new Date().getFullYear()
 * para que siempre esté actualizado.
 *
 * Nota: Los href="#" de las redes sociales son placeholders.
 *       Deben reemplazarse con las URLs reales de la iglesia.
 */
import { Link } from 'react-router-dom'; // Importa Link de React Router para navegación interna sin recargar la página

export default function Footer() { // Exporta el componente Footer como exportación por defecto
    return ( // Retorna el JSX del pie de página
        <footer className="footer"> {/* Elemento semántico footer con clase personalizada */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho */}
                <div className="row g-4 footer-content"> {/* Fila de Bootstrap con gutter de 4 unidades de espacio entre columnas */}
                    {/* Columna 1: Marca */}
                    <div className="col-12 col-md-6 col-lg-4"> {/* Columna: ancho completo en móvil, mitad en md, tercera parte en lg */}
                        <div className="footer-brand"> {/* Contenedor para el logo y texto de la marca */}
                            <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="footer-logo" /> {/* Imagen del logo del footer */}
                            <p>Asamblea de Dios — Una iglesia con propósito y visión.</p> {/* Descripción breve de la iglesia */}
                        </div> {/* Cierra el contenedor de marca */}
                    </div> {/* Cierra la columna 1 */}
                    {/* Columna 2: Enlaces */}
                    <div className="col-12 col-md-6 col-lg-4"> {/* Columna de enlaces rápidos */}
                        <div className="footer-links"> {/* Contenedor para los enlaces de navegación */}
                            <h4>Enlaces</h4> {/* Título de la columna de enlaces */}
                            <ul> {/* Lista desordenada de enlaces */}
                                <li><Link to="/">Inicio</Link></li> {/* Enlace al inicio */}
                                <li><Link to="/horarios">Horarios</Link></li> {/* Enlace a horarios */}
                                <li><Link to="/quienes-somos">Quiénes Somos</Link></li> {/* Enlace a quiénes somos */}
                                <li><Link to="/contacto">Contacto</Link></li> {/* Enlace a contacto */}
                            </ul> {/* Cierra la lista de enlaces */}
                        </div> {/* Cierra el contenedor de enlaces */}
                    </div> {/* Cierra la columna 2 */}
                    {/* Columna 3: Redes sociales */}
                    <div className="col-12 col-md-6 col-lg-4"> {/* Columna de redes sociales */}
                        <div className="footer-social"> {/* Contenedor para el título y los iconos sociales */}
                            <h4>Síguenos</h4> {/* Título que invita a seguir en redes */}
                            <div className="social-icons"> {/* Contenedor flex para los iconos de redes */}
                                <a href="#" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a> {/* Icono de Facebook (placeholder href) */}
                                <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a> {/* Icono de Instagram (placeholder href) */}
                                <a href="#" className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></a> {/* Icono de YouTube (placeholder href) */}
                            </div> {/* Cierra el contenedor de iconos sociales */}
                        </div> {/* Cierra el contenedor de redes sociales */}
                    </div> {/* Cierra la columna 3 */}
                </div> {/* Cierra la fila de columnas */}
                <div className="footer-bottom"> {/* Contenedor para la barra inferior del copyright */}
                    <p>&copy; {new Date().getFullYear()} Asamblea de Dios. Todos los derechos reservados.</p> {/* Texto de copyright con año dinámico */}
                </div> {/* Cierra la barra inferior */}
            </div> {/* Cierra el contenedor principal */}
        </footer> // Fin del elemento footer
    ); // Fin del return
} // Fin del componente Footer
