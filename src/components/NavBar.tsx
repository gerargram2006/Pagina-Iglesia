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

    // Bloquear scroll del body cuando el menú móvil está abierto
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out ${isScrolled
                    ? 'py-2 shadow-[0_4px_30px_rgba(0,0,0,0.15)]'
                    : 'py-3 sm:py-4'
                }`}
            style={{
                background: isScrolled
                    ? 'rgba(57, 66, 52, 0.92)'
                    : 'rgba(0, 0, 0, 0.15)',
                backdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'blur(12px)',
                WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(1.4)' : 'blur(12px)',
                borderBottom: isScrolled
                    ? '1px solid rgba(255,255,255,0.06)'
                    : '1px solid rgba(255,255,255,0.08)',
            }}
        >
            <div className="mx-auto max-w-7xl flex justify-between items-center px-4 sm:px-6 lg:px-8">

                {/* ── LOGO + MARCA ── */}
                <Link to="/" className="flex items-center gap-3 group shrink-0">
                    {/* Logo con ring dorado al hover */}
                    <div className="relative">
                        <img
                            src="/img/logo-oficial.png"
                            alt="Logo Asamblea de Dios"
                            className={`w-auto object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] transition-all duration-500 ${isScrolled ? 'h-9' : 'h-11'
                                }`}
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-gold-400/40 transition-all duration-500" />
                    </div>
                    {/* Nombre con tipografía Cormorant Garamond — editorial y elegante */}
                    <div className="hidden sm:flex flex-col leading-none">
                        <span className="font-cormorant text-white font-semibold text-xl tracking-[0.04em] group-hover:text-gold-300 transition-colors duration-300">
                            Asamblea de Dios
                        </span>
                        <span className="text-[10px] tracking-[0.25em] uppercase text-white/40 font-inter mt-0.5">
                            Arequipa
                        </span>
                    </div>
                </Link>

                {/* ── NAVEGACIÓN DESKTOP ── */}
                <nav className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ to, label }) => (
                        <NavLink
                            key={to}
                            to={to}
                            className={({ isActive }) =>
                                `relative px-4 py-2 text-[13px] font-medium tracking-[0.06em] uppercase transition-all duration-300 rounded-lg group
                                ${isActive
                                    ? 'text-gold-300'
                                    : 'text-white/80 hover:text-white hover:bg-white/[0.06]'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {label}
                                    {/* Línea dorada animada debajo del link activo */}
                                    <span
                                        className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 transition-all duration-500 ease-out
                                        ${isActive ? 'w-3/5 opacity-100' : 'w-0 opacity-0 group-hover:w-2/5 group-hover:opacity-60'}`}
                                    />
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* ── BOTÓN LOGIN DESKTOP ── */}
                <Link
                    to="/login"
                    className="hidden md:flex items-center gap-2 text-white/70 hover:text-gold-300 transition-all duration-300 shrink-0 ml-4 group"
                    title="Iniciar Sesión"
                    aria-label="Iniciar Sesión"
                >
                    <div className="relative flex items-center justify-center w-9 h-9 rounded-full border border-white/15 group-hover:border-gold-400/40 group-hover:bg-gold-400/[0.06] transition-all duration-300">
                        <i className="bi bi-person text-lg"></i>
                    </div>
                </Link>

                {/* ── HAMBURGUESA MOBILE ── */}
                <button
                    type="button"
                    className="md:hidden relative flex flex-col items-center justify-center w-10 h-10 rounded-lg border border-white/15 bg-transparent cursor-pointer z-50 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-300"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                >
                    <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                    <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 my-[3.5px] ${menuOpen ? 'opacity-0 scale-0' : ''}`}></span>
                    <span className={`block w-5 h-[1.5px] bg-white rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                </button>
            </div>

            {/* ── MENÚ MOBILE FULLSCREEN ── */}
            <div
                className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 ${menuOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 pointer-events-none'
                    }`}
                style={{
                    background: 'linear-gradient(170deg, rgba(57,66,52,0.97) 0%, rgba(27,32,24,0.98) 100%)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                }}
            >
                {/* Decoración — línea dorada vertical sutil */}
                <div className="absolute left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

                <nav className="flex flex-col items-center gap-6">
                    {navLinks.map(({ to, label }, index) => (
                        <NavLink
                            key={to}
                            to={to}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                `font-cormorant text-3xl font-semibold tracking-[0.04em] transition-all duration-300
                                ${isActive
                                    ? 'text-gold-300'
                                    : 'text-white/70 hover:text-white'
                                }`
                            }
                            style={{
                                transitionDelay: menuOpen ? `${index * 60}ms` : '0ms',
                                transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                                opacity: menuOpen ? 1 : 0,
                            }}
                        >
                            {label}
                        </NavLink>
                    ))}

                    {/* Separador */}
                    <div
                        className="w-12 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mt-2"
                        style={{
                            transitionDelay: menuOpen ? `${navLinks.length * 60}ms` : '0ms',
                            opacity: menuOpen ? 1 : 0,
                        }}
                    />

                    {/* Login en mobile */}
                    <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 text-white/50 hover:text-gold-300 transition-all duration-300 mt-2"
                        title="Iniciar Sesión"
                        aria-label="Iniciar Sesión"
                        style={{
                            transitionDelay: menuOpen ? `${(navLinks.length + 1) * 60}ms` : '0ms',
                            transform: menuOpen ? 'translateY(0)' : 'translateY(20px)',
                            opacity: menuOpen ? 1 : 0,
                        }}
                    >
                        <i className="bi bi-person-circle text-2xl"></i>
                        <span className="font-inter text-sm tracking-[0.1em] uppercase">Iniciar Sesión</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default NavBar;
