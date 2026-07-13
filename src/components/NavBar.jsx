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
import { Link, useLocation } from 'react-router-dom'; // Importa Link para navegación SPA y useLocation para leer la ruta actual
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación para saber si hay sesión activa

export default function NavBar() { // Exporta el componente NavBar como exportación por defecto
    const location = useLocation(); // Obtiene el objeto de ubicación actual de React Router
    const path = location.pathname; // Extrae solo la cadena de la ruta (ej: "/horarios")
    const { user } = useAuth(); // Extrae el objeto user del contexto de autenticación (null si no hay sesión)

    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="logo-img" />
                    <span className="logo-text">Asamblea de Dios</span>
                </Link>
                {/* Botón hamburguesa de Bootstrap para pantallas pequeñas */}
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
                <div className="collapse navbar-collapse" id="navbarNav"> {/* Contenedor colapsable que contiene los enlaces del menú */}
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
                            {/* Enlace condicional: redirige a /admin si hay sesión, o /login si no */}
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
} // Fin del componente NavBar
