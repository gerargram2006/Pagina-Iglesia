import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="footer">
            {/* Contenedor central con ancho máximo y márgenes horizontales */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Cuadrícula que distribuye el contenido en columnas */}
                <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Primera columna: información de la iglesia */}
                    <div>
                        {/* Contenedor de la marca de la iglesia */}
                        <div className="footer-brand">
                            {/* Logotipo de la iglesia */}
                            <img src="/img/logo-oficial.png" alt="Asamblea de Dios" className="navbar-logo mb-4" />
                            {/* Descripción breve de la iglesia */}
                            <p>Asamblea de Dios — Una iglesia con propósito y visión.</p>
                            {/* Cita bíblica de la iglesia */}
                            <blockquote className="footer-verse">
                                {/* Texto de la cita bíblica */}
                                <p>"Porque donde están dos o tres congregados en mi nombre, allí estoy yo en medio de ellos."</p>
                                {/* Referencia de la cita bíblica */}
                                <cite>— Mateo 18:20</cite>
                            </blockquote>
                        </div>
                    </div>

                    {/* Segunda columna: enlaces rápidos */}
                    <div>
                        {/* Contenedor de los enlaces del pie de página */}
                        <div className="footer-links">
                            {/* Título de la sección de enlaces */}
                            <h4>Enlaces</h4>
                            {/* Lista de enlaces a las páginas del sitio */}
                            <ul>
                                {/* Enlace a la página de inicio */}
                                <li><Link to="/">Inicio</Link></li>
                                {/* Enlace a la página de horarios */}
                                <li><Link to="/horarios">Horarios</Link></li>
                                {/* Enlace a la página de Quiénes Somos */}
                                <li><Link to="/quienes-somos">Quiénes Somos</Link></li>
                                {/* Enlace a la página de pastores */}
                                <li><Link to="/pastores">Pastores</Link></li>
                                {/* Enlace a la página de eventos */}
                                <li><Link to="/eventos">Eventos</Link></li>
                                {/* Enlace a la página de anexos y recursos */}
                                <li><Link to="/anexos">Anexos y Recursos</Link></li>
                                {/* Enlace a la página de contacto */}
                                <li><Link to="/contacto">Contacto</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Tercera columna: redes sociales y horario */}
                    <div>
                        {/* Contenedor de redes sociales */}
                        <div className="footer-social">
                            {/* Título de la sección de redes sociales */}
                            <h4>Síguenos</h4>
                            {/* Contenedor de los iconos de redes sociales */}
                            <div className="social-icons">
                                {/* Enlace externo a la página de Facebook */}
                                <a href="https://www.facebook.com/profile.php?id=100076728549417" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                                {/* Enlace externo a la cuenta de Instagram */}
                                <a href="https://www.instagram.com/asambleaarequipadedios_16/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                                {/* Enlace externo a la cuenta de TikTok */}
                                <a href="https://www.tiktok.com/@asamblea_de_dios16?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok"><i className="bi bi-tiktok"></i></a>
                            </div>
                            {/* Contenedor del horario principal */}
                            <div className="footer-schedule">
                                {/* Título de la sección de horario */}
                                <h4>Horario Principal</h4>
                                {/* Horario de los servicios dominicales con icono de reloj */}
                                <p><i className="bi bi-clock" aria-hidden="true"></i> Domingos 10:00 AM</p>
                                {/* Dirección de la iglesia con icono de ubicación */}
                                <p><i className="bi bi-geo-alt" aria-hidden="true"></i> Comandante Canga N° 416, Mariano Melgar 04006</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Barra inferior con los derechos de autor */}
                <div className="footer-bottom">
                    {/* Texto de copyright con el año actual */}
                    <p>&copy; {new Date().getFullYear()} Asamblea de Dios — Arequipa. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
