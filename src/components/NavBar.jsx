/**
 * Componente NavBar - Barra de navegación principal con glassmorphism.
 *
 * Muestra el logo de la iglesia y los enlaces de navegación a todas las páginas.
 * Implementa efecto glassmorphism al hacer scroll y menú hamburguesa propio
 * para dispositivos móviles (sin depender de Bootstrap JS).
 *
 * Funcionalidades:
 *   - Detecta la ruta actual con useLocation() para resaltar el enlace activo.
 *   - Efecto glassmorphism al hacer scroll (backdrop-filter + blur).
 *   - Menú hamburguesa propio con useState para móvil.
 *   - Cierra el menú al navegar a otra página.
 *   - Muestra "Admin" si hay sesión activa, o "Iniciar Sesion" si no.
 */

import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const location = useLocation();
    const path = location.pathname;
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Detectar scroll para efecto glassmorphism
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 60);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Cerrar menú al cambiar de ruta
    useEffect(() => {
        setMenuOpen(false);
    }, [path]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="logo-img" />
                    <span className="logo-text">Asamblea de Dios</span>
                </Link>
                {/* Botón hamburguesa propio para pantallas pequeñas */}
                <button
                    className={`navbar-toggler ${menuOpen ? 'active' : ''}`}
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-controls="navbarNav"
                    aria-expanded={menuOpen}
                    aria-label="Menú"
                >
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                </button>
                {/* Contenedor del menú */}
                <div className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`} id="navbarNav">
                    <ul className="nav-links">
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
