// Importa Link de React Router para navegación interna sin recarga de página
import { Link } from 'react-router-dom';

/**
 * Footer - Componente de pie de página
 * Se muestra en todas las rutas públicas (envuelto por Layout)
 * Contiene: branding, versículo bíblico, enlaces rápidos, redes sociales y horario
 */
export default function Footer() {
    return (
        {/* Elemento footer con la clase "footer" para estilos personalizados */}
        <footer className="footer">
            <div className="container">
                {/* Fila con 3 columnas en desktop, 2 en tablet, 1 en móvil */}
                <div className="row g-4 footer-content">

                    {/* COLUMNA 1: Branding de la iglesia */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-brand">
                            {/* Logo de la iglesia (reutiliza la clase del NavBar) */}
                            <img src="/img/logo-oficial.png" alt="Asamblea de Dios" className="navbar-logo mb-4" />
                            {/* Descripción corta de la iglesia */}
                            <p>Asamblea de Dios — Una iglesia con propósito y visión.</p>
                            {/* Versículo bíblico destacado */}
                            <blockquote className="footer-verse">
                                <p>"Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."</p>
                                <cite>— Mateo 18:20</cite>
                            </blockquote>
                        </div>
                    </div>

                    {/* COLUMNA 2: Enlaces rápidos de navegación */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-links">
                            <h4>Enlaces</h4>
                            {/* Lista de enlaces a las principales secciones */}
                            <ul>
                                <li><Link to="/">Inicio</Link></li>
                                <li><Link to="/horarios">Horarios</Link></li>
                                <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
                                <li><Link to="/pastores">Pastores</Link></li>
                                <li><Link to="/eventos">Eventos</Link></li>
                                <li><Link to="/contacto">Contacto</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* COLUMNA 3: Redes sociales y horario principal */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-social">
                            <h4>Síguenos</h4>
                            {/* Iconos de redes sociales (Facebook, Instagram, YouTube, TikTok) */}
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
                                <a href="#" className="social-icon" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                            </div>
                            {/* Información del horario y dirección principal */}
                            <div className="footer-schedule">
                                <h4>Horario Principal</h4>
                                <p><i className="bi bi-clock" aria-hidden="true"></i> Domingos 10:00 AM</p>
                                <p><i className="bi bi-geo-alt" aria-hidden="true"></i> Calle Principal #123</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra inferior con copyright dinámico (año actual) */}
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Asamblea de Dios. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
