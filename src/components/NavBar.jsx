/**
 * Componente NavBar - Barra de navegación principal.
 *
 * Muestra el logo de la iglesia y los enlaces de navegación a todas las páginas.
 * En pantallas pequeñas (< 992px) se colapsa en un menú hamburguesa (Bootstrap).
 *
 * Funciones:
 *   - Detecta la ruta actual con useLocation() para resaltar el enlace activo.
 *   - El enlace activo recibe la clase CSS "active" que muestra un indicador dorado.
 *   - El logo enlaza al inicio (/).
 *
 * Nota: En Home, el NavBar se renderiza DENTRO del hero (fondo oscuro).
 *       En las demás páginas, se renderiza DENTRO de PageHeader.
 */
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
    const location = useLocation();
    const path = location.pathname;
    const { user } = useAuth();

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="logo-img" />
                    <span className="logo-text">Asamblea de Dios</span>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Menú"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto nav-links">
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/' ? 'active' : ''}`} to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/horarios' ? 'active' : ''}`} to="/horarios">Horarios</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/quienes-somos' ? 'active' : ''}`} to="/quienes-somos">Quiénes Somos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/pastores' ? 'active' : ''}`} to="/pastores">Pastores</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/eventos' ? 'active' : ''}`} to="/eventos">Eventos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/contacto' ? 'active' : ''}`} to="/contacto">Contacto</Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link nav-admin-link ${path === '/admin' || path === '/login' ? 'active' : ''}`}
                                to={user ? '/admin' : '/login'}
                            >
                                <i className="bi bi-person-circle"></i>
                                {user ? 'Admin' : 'Iniciar Sesion'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
