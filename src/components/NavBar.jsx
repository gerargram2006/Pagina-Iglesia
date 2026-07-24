import React from 'react';
// Importamos Link y NavLink de react-router-dom para navegar sin recargar la página
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark position-absolute w-100 z-3">
            <div className="container py-2">

                {/* ==========================================
            1. SECCIÓN DEL LOGO Y TÍTULO (CORREGIDA) 
            ========================================== */}
                {/* d-flex: Convierte el contenedor en Flexbox para alinear cosas al lado de otras
            align-items-center: Centra verticalmente el barquito y el texto
            gap-3: Le da una separación bonita de 16px entre la imagen y el texto
            m-0 p-0: Quita cualquier margen o relleno fantasma que rompa el centrado */}
                <Link className="navbar-brand d-flex align-items-center gap-3 m-0 p-0" to="/">
                    <img
                        src="/img/logo-oficial.png"
                        alt="Logo Asamblea de Dios"
                        className="navbar-logo"
                    />
                    {/* text-white y fw-bold le dan el color y grosor. m-0 y p-0 evitan que el texto flote */}
                    <span className="navbar-title text-white fw-bold m-0 p-0">
                        Asamblea de Dios
                    </span>
                </Link>

                {/* ==========================================
            2. BOTÓN HAMBURGUESA (PARA CELULARES) 
            ========================================== */}
                <button
                    className="navbar-toggler border-0 shadow-none"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* ==========================================
            3. MENÚ DE ENLACES Y BOTÓN DE LOGIN 
            ========================================== */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    {/* ms-auto: empuja todo este bloque hacia la derecha de la pantalla */}
                    <ul className="navbar-nav ms-auto align-items-center gap-1 gap-lg-3">
                        <li className="nav-item">
                            {/* NavLink se da cuenta automáticamente si estás en esa página y se pinta diferente */}
                            <NavLink className="nav-link text-white" to="/">Inicio</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/horarios">Horarios</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/quienes-somos">Quiénes Somos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/pastores">Pastores</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/eventos">Eventos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/anexos">Anexos</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to="/contacto">Contacto</NavLink>
                        </li>

                        {/* BOTÓN DE INICIAR SESIÓN */}
                        <li className="nav-item ms-lg-3 mt-3 mt-lg-0">
                            <Link className="btn btn-outline-warning rounded-pill px-4 d-flex align-items-center gap-2" to="/login">
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