/**
 * Componente Footer - Pie de página mejorado.
 *
 * Se muestra en TODAS las páginas (incluido en Layout.jsx).
 *
 * Estructura (3 columnas en desktop, apiladas en móvil):
 *   - Columna 1: Logo + descripción + versículo bíblico.
 *   - Columna 2: Enlaces de navegación rápida.
 *   - Columna 3: Iconos de redes sociales.
 *
 * El año del copyright se genera dinámicamente con new Date().getFullYear().
 *
 * Nota: Los href="#" de las redes sociales son placeholders.
 *       Deben reemplazarse con las URLs reales de la iglesia.
 */
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row g-4 footer-content">
                    {/* Columna 1: Marca + versículo */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-brand">
                            <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="footer-logo" />
                            <p>Asamblea de Dios — Una iglesia con propósito y visión.</p>
                            {/* Versículo destacado */}
                            <blockquote className="footer-verse">
                                <p>"Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."</p>
                                <cite>— Mateo 18:20</cite>
                            </blockquote>
                        </div>
                    </div>
                    {/* Columna 2: Enlaces */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-links">
                            <h4>Enlaces</h4>
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
                    {/* Columna 3: Redes sociales */}
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-social">
                            <h4>Síguenos</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
                                <a href="#" className="social-icon" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                            </div>
                            {/* Horario rápido */}
                            <div className="footer-schedule">
                                <h4>Horario Principal</h4>
                                <p><i className="bi bi-clock" aria-hidden="true"></i> Domingos 10:00 AM</p>
                                <p><i className="bi bi-geo-alt" aria-hidden="true"></i> Calle Principal #123</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Asamblea de Dios. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
