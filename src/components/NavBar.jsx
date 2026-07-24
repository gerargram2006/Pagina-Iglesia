// Importa Link (para navegación) y useLocation (para obtener la URL actual) de React Router
import { Link, useLocation } from 'react-router-dom';
// Importa useAuth para saber si hay usuario logueado (mostrar "Admin" o "Iniciar Sesión")
import { useAuth } from '../context/AuthContext';
// Importa useState (estado local) y useEffect (efectos secundarios) de React
import { useState, useEffect } from 'react';

/**
 * NavBar - Componente de barra de navegación principal
 * Se muestra en todas las páginas del sitio
 * Incluye: logo, enlaces de navegación, menú hamburguesa (móvil), y botón de admin/login
 */
export default function NavBar() {
    // Obtiene la ubicación actual (URL) para resaltar el enlace activo
    const location = useLocation();
    // Extrae solo el pathname (ej: "/eventos") para comparar con cada enlace
    const path = location.pathname;
    // Obtiene el usuario del contexto de autenticación (null si no está logueado)
    const { user } = useAuth();
    // Estado para controlar si el menú móvil está abierto o cerrado
    const [menuOpen, setMenuOpen] = useState(false);
    // Estado para detectar si el usuario ha hecho scroll (cambia el estilo del navbar)
    const [scrolled, setScrolled] = useState(false);

    // Efecto que escucha el evento de scroll para cambiar el estilo del navbar
    // Se activa cuando el usuario scrollea más de 60px hacia abajo
    useEffect(() => {
        // Función que actualiza el estado scrolled basado en la posición del scroll
        const handleScroll = () => setScrolled(window.scrollY > 60);
        // Agrega el event listener al window (passive: true para mejor rendimiento)
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Limpia el event listener cuando el componente se desmonta
        return () => window.removeEventListener('scroll', handleScroll);
    }, []); // Array vacío = solo se ejecuta una vez al montar

    // Efecto que cierra el menú móvil cuando cambia la ruta (al navegar a otra página)
    useEffect(() => {
        setMenuOpen(false); // Cierra el menú al cambiar de página
    }, [path]); // Se ejecuta cada vez que cambia la URL

    return (
        {/* Elemento nav principal con clase base "navbar" y clase condicional "navbar-scrolled" */}
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            {/* Contenedor centrado con ancho máximo (clase de Bootstrap) */}
            <div className="container">
                {/* Logo de la iglesia: enlace al inicio con imagen y texto */}
                <Link to="/" className="logo navbar-brand">
                    {/* Imagen del logo oficial (45px de altura definido en CSS) */}
                    <img src="/img/logo-oficial.png" alt="Asamblea de Dios" className="navbar-logo" />
                    {/* Nombre de la iglesia al lado del logo */}
                    <span className="navbar-title">Asamblea de Dios</span>
                </Link>

                {/* Botón hamburguesa para abrir/cerrar el menú en dispositivos móviles */}
                <button
                    className={`navbar-toggler ${menuOpen ? 'active' : ''}`}
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)} // Alterna el estado del menú
                    aria-expanded={menuOpen} // Accesibilidad: indica si el menú está abierto
                    aria-label="Menú" // Accesibilidad: texto alternativo para lectores de pantalla
                >
                    {/* Tres barras horizontales que forman el ícono de hamburguesa */}
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                </button>

                {/* Contenedor del menú de navegación (se oculta en móvil, se muestra al abrir) */}
                <div className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
                    {/* Lista de enlaces de navegación */}
                    <ul className="nav-links">
                        {/* Cada nav-item contiene un Link de React Router */}
                        <li className="nav-item">
                            {/* Enlace a Inicio: se resalta (active) cuando la URL es "/" */}
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
                            <Link className={`nav-link ${path === '/anexos' ? 'active' : ''}`} to="/anexos">Anexos</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${path === '/contacto' ? 'active' : ''}`} to="/contacto">Contacto</Link>
                        </li>
                        {/* Botón de Admin / Login: cambia según si hay sesión activa */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link nav-admin-link ${path === '/admin' || path === '/login' ? 'active' : ''}`}
                                // Si hay usuario, lleva a /admin; si no, lleva a /login
                                to={user ? '/admin' : '/login'}
                            >
                                {/* Icono de usuario (ícono de Bootstrap Icons) */}
                                <i className="bi bi-person-circle"></i>
                                {/* Texto dinámico: "Admin" si está logueado, "Iniciar Sesión" si no */}
                                {user ? 'Admin' : 'Iniciar Sesión'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
