import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="navbar">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between w-full relative z-10">

                <Link className="navbar-brand flex items-center gap-3 m-0 p-0" to="/">
                    <img
                        src="/img/logo-oficial.png"
                        alt="Logo Asamblea de Dios"
                        className="navbar-logo"
                    />
                    <span className="navbar-title m-0 p-0">
                        Asamblea de Dios
                    </span>
                </Link>

                <button
                    className="navbar-toggler border-0 shadow-none lg:hidden"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                    <span className="toggler-bar"></span>
                </button>

                <div className={`lg:flex lg:items-center lg:gap-3 ${menuOpen ? 'flex flex-col absolute top-full left-0 right-0 bg-primary-900/95 backdrop-blur-lg p-6 z-50 shadow-tw-xl' : 'hidden'} lg:relative lg:bg-transparent lg:p-0`}>
                    <ul className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 list-none m-0 p-0 lg:ms-auto">
                        <li>
                            <NavLink className="nav-link text-white" to="/" onClick={() => setMenuOpen(false)}>Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/horarios" onClick={() => setMenuOpen(false)}>Horarios</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/quienes-somos" onClick={() => setMenuOpen(false)}>Quiénes Somos</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/pastores" onClick={() => setMenuOpen(false)}>Pastores</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/eventos" onClick={() => setMenuOpen(false)}>Eventos</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/anexos" onClick={() => setMenuOpen(false)}>Anexos</NavLink>
                        </li>
                        <li>
                            <NavLink className="nav-link text-white" to="/contacto" onClick={() => setMenuOpen(false)}>Contacto</NavLink>
                        </li>

                        <li className="mt-3 lg:mt-0 lg:ms-3">
                            <Link
                                className="btn btn-outline-warning flex items-center gap-2 rounded-full px-4"
                                to="/login"
                                onClick={() => setMenuOpen(false)}
                            >
                                <i className="bi bi-person-circle"></i> Iniciar Sesión
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
