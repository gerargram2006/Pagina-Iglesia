import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function NavBar() {
    const location = useLocation();
    const path = location.pathname;
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [path]);

    return (
        <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo d-flex align-items-center gap-3">
                    <img src="/img/logo-oficial.png" alt="Asamblea de Dios" className="navbar-logo" />
                    <span className="navbar-title">Asamblea de Dios</span>
                </Link>

                <button
                    className={`navbar-toggler ${menuOpen ? 'active' : ''}`}
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Menú"
                >
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                </button>

                <div className={`nav-menu ${menuOpen ? 'nav-menu-open' : ''}`}>
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
                            <Link className={`nav-link ${path === '/anexos' ? 'active' : ''}`} to="/anexos">Anexos</Link>
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
                                {user ? 'Admin' : 'Iniciar Sesión'}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
