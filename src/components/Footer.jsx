import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row g-4 footer-content">
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-brand">
                            <img src="/img/logo-oficial.png" alt="Asamblea de Dios" className="footer-logo" />
                            <p>Asamblea de Dios — Una iglesia con propósito y visión.</p>
                            <blockquote className="footer-verse">
                                <p>"Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."</p>
                                <cite>— Mateo 18:20</cite>
                            </blockquote>
                        </div>
                    </div>
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
                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="footer-social">
                            <h4>Síguenos</h4>
                            <div className="social-icons">
                                <a href="#" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="social-icon" aria-label="YouTube"><i className="bi bi-youtube"></i></a>
                                <a href="#" className="social-icon" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                            </div>
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
