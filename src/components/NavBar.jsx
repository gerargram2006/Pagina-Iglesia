import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/horarios', label: 'Horarios' },
    { to: '/quienes-somos', label: 'Quiénes Somos' },
    { to: '/pastores', label: 'Pastores' },
    { to: '/eventos', label: 'Eventos' },
    { to: '/anexos', label: 'Anexos' },
    { to: '/contacto', label: 'Contacto' },
];

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4">
            {/* Bloque Izquierdo: Logo + Nombre */}
            <Link to="/" className="flex items-center gap-4 shrink-0">
                <img
                    src="/img/logo-oficial.png"
                    alt="Logo Asamblea de Dios"
                    className="h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                />
                <span className="font-bold text-white text-xl tracking-wide whitespace-nowrap">
                    Asamblea de Dios
                </span>
            </Link>

            {/* Bloque Central: Enlaces de navegación */}
            <nav className="hidden md:flex items-center gap-8">
                {navLinks.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            `text-white font-medium text-sm tracking-wide transition-colors duration-200 hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                        }
                    >
                        {label}
                    </NavLink>
                ))}
            </nav>

            {/* Bloque Derecho: Iniciar Sesión */}
            <Link
                to="/login"
                className="hidden md:flex items-center gap-2 text-yellow-400 font-bold text-sm shrink-0 transition-colors duration-200 hover:text-yellow-300"
            >
                <i className="bi bi-person-circle text-lg"></i>
                Iniciar Sesión
            </Link>

            {/* Botón hamburguesa (solo móvil) */}
            <button
                type="button"
                className="md:hidden flex flex-col gap-1.5 p-2 border border-white/20 rounded-lg bg-transparent cursor-pointer z-50 hover:border-white/50 hover:bg-white/10 transition-all duration-200"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
            >
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
            </button>

            {/* Menú móvil (overlay) */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-primary-900/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-white text-2xl font-semibold tracking-wide transition-colors duration-200 hover:text-yellow-400 ${isActive ? 'text-yellow-400' : ''}`
                            }
                        >
                            {label}
                        </NavLink>
                    ))}
                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-yellow-400 font-bold text-xl mt-4 transition-colors duration-200 hover:text-yellow-300"
                    >
                        <i className="bi bi-person-circle text-2xl"></i>
                        Iniciar Sesión
                    </Link>
                </div>
            )}
        </header>
    );
};

export default NavBar;
