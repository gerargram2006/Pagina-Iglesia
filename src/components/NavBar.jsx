/**
 * Componente NavBar - Barra de navegación principal del sitio.
 *
 * Muestra el logo de la iglesia y los enlaces de navegación a todas las páginas.
 * En pantallas pequeñas (< 992px) se colapsa en un menú hamburguesa usando
 * las clases de Bootstrap navbar-collapse.
 *
 * Funcionalidades:
 *   - Detecta la ruta actual con useLocation() para resaltar el enlace activo.
 *   - El enlace activo recibe la clase CSS "active" que muestra un indicador dorado.
 *   - El logo enlaza al inicio (/).
 *   - Muestra "Admin" si hay sesión activa, o "Iniciar Sesion" si no.
 *   - Responsive: se adapta a móvil con menú colapsable.
 *
 * Nota de ubicación:
 *   - En Home, el NavBar se renderiza DENTRO del hero (fondo oscuro transparente).
 *   - En las demás páginas, se renderiza DENTRO de PageHeader (fondo oscuro gradiente).
 *   - En ambas ubicaciones, el texto es blanco sobre fondo oscuro.
 */

// Importa Link para navegación SPA (sin recarga) y useLocation para leer la ruta actual
import { Link, useLocation } from 'react-router-dom';
// Importa el hook de autenticación para saber si hay sesión activa y mostrar el enlace correcto
import { useAuth } from '../context/AuthContext';

/**
 * Componente NavBar.
 * Renderiza una barra de navegación responsiva con logo, enlaces y botón de auth.
 */
export default function NavBar() {
    // Obtiene el objeto de ubicación actual de React Router
    // Contiene pathname, search, hash, state
    const location = useLocation();
    // Extrae solo la cadena de la ruta (ej: "/horarios", "/quienes-somos")
    // Se usa para comparar con cada enlace y determinar cuál está activo
    const path = location.pathname;
    // Extrae el objeto user del contexto de autenticación
    // Si user es null, no hay sesión activa; si tiene datos, el usuario está autenticado
    const { user } = useAuth();

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
                {/* Contenedor colapsable con los enlaces del menú */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto nav-links">
                        {/* Enlace de Inicio - activo si path === '/' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/' ? 'active' : ''}`} to="/">Inicio</Link>
                        </li>
                        {/* Enlace de Horarios - activo si path === '/horarios' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/horarios' ? 'active' : ''}`} to="/horarios">Horarios</Link>
                        </li>
                        {/* Enlace de Quiénes Somos - activo si path === '/quienes-somos' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/quienes-somos' ? 'active' : ''}`} to="/quienes-somos">Quiénes Somos</Link>
                        </li>
                        {/* Enlace de Pastores - activo si path === '/pastores' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/pastores' ? 'active' : ''}`} to="/pastores">Pastores</Link>
                        </li>
                        {/* Enlace de Eventos - activo si path === '/eventos' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/eventos' ? 'active' : ''}`} to="/eventos">Eventos</Link>
                        </li>
                        {/* Enlace de Contacto - activo si path === '/contacto' */}
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/contacto' ? 'active' : ''}`} to="/contacto">Contacto</Link>
                        </li>
                        {/* Enlace Admin/Login: "Admin" si hay sesión, "Iniciar Sesion" si no */}
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
} // Fin del componente NavBar
