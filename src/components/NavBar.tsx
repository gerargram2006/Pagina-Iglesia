import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

interface NavLinkItem {
    to: string;
    label: string;
}

const navLinks: NavLinkItem[] = [
    { to: '/', label: 'Inicio' },
    { to: '/horarios', label: 'Horarios' },
    { to: '/quienes-somos', label: 'Nosotros' },
    { to: '/eventos', label: 'Eventos' },
    { to: '/contacto', label: 'Contacto' },
    { to: '/donaciones', label: 'Donaciones' },
];

const NavBar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 sm:px-6 md:px-8 transition-all duration-300 ${isScrolled
                    ? 'py-2 sm:py-3 bg-[#606C59] shadow-lg border-b border-white/5'
                    : 'py-3 sm:py-4 bg-black/20 backdrop-blur-md border-b border-white/10'
                }`}
        >
            <Link to="/" className="flex items-center gap-2 sm:gap-4 shrink-0">
                <img
                    src="/img/logo-oficial.png"
                    alt="Logo Asamblea de Dios"
                    className="h-9 sm:h-11 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.2)]"
                />
                <span className="font-bold text-white text-base sm:text-xl tracking-wide whitespace-nowrap hidden sm:inline">
                    Asamblea de Dios
                </span>
            </Link>

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

            <Link
                to="/login"
                className="hidden md:flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-200 shrink-0 ml-2"
                title="Iniciar Sesión"
                aria-label="Iniciar Sesión"
            >
                <i className="bi bi-person-circle text-2xl"></i>
            </Link>

            <button
                type="button"
                className="md:hidden flex flex-col gap-1.5 p-1.5 sm:p-2 border border-white/20 rounded-lg bg-transparent cursor-pointer z-50 hover:border-white/50 hover:bg-white/10 transition-all duration-200"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-expanded={menuOpen}
                aria-label="Toggle navigation"
            >
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? 'rotate-45 translate-x-1.5 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-white rounded-sm transition-all duration-200 ${menuOpen ? '-rotate-45 translate-x-1.5 -translate-y-1.5' : ''}`}></span>
            </button>

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
                        className="flex items-center justify-center text-white hover:text-yellow-400 transition-colors duration-200 mt-4"
                        title="Iniciar Sesión"
                        aria-label="Iniciar Sesión"
                    >
                        <i className="bi bi-person-circle text-4xl"></i>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default NavBar;

