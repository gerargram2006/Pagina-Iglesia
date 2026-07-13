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

    return ( // Retorna el JSX de la barra de navegación
        <nav className="navbar navbar-expand-lg navbar-dark"> {/* Elemento nav de Bootstrap, expandible en lg, tema oscuro */}
            <div className="container"> {/* Contenedor Bootstrap para centrar y limitar el ancho del contenido */}
                <Link to="/" className="logo"> {/* Enlace al inicio con clase personalizada "logo" */}
                    <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="logo-img" /> {/* Imagen del logo con texto alternativo */}
                    <span className="logo-text">Asamblea de Dios</span> {/* Texto del nombre de la iglesia junto al logo */}
                </Link> {/* Cierra el enlace del logo */}
                <button {/* Botón hamburguesa de Bootstrap para pantallas pequeñas */}
                    className="navbar-toggler" {/* Clase de Bootstrap para el botón de alternar menú */}
                    type="button" {/* Tipo de botón estándar */}
                    data-bs-toggle="collapse" {/* Atributo de Bootstrap para controlar la apertura del colapso */}
                    data-bs-target="#navbarNav" {/* Apunta al ID del div que se desplegará/ocultará */}
                    aria-controls="navbarNav" {/* Atributo de accesibilidad vincula el botón al menú */}
                    aria-expanded="false" {/* Estado inicial del menú: colapsado (cerrado) */}
                    aria-label="Menú" {/* Etiqueta accesible para lectores de pantalla */}
                > {/* Cierra la apertura del botón */}
                    <span className="navbar-toggler-icon"></span> {/* Icono de tres líneas del botón hamburguesa */}
                </button> {/* Cierra el botón hamburguesa */}
                <div className="collapse navbar-collapse" id="navbarNav"> {/* Contenedor colapsable que contiene los enlaces del menú */}
                    <ul className="navbar-nav ms-auto nav-links"> {/* Lista de navegación alineada a la derecha (ms-auto) */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Inicio */}
                            <Link className={`nav-link ${path === '/' ? 'active' : ''}`} to="/">Inicio</Link> {/* Enlace a Inicio, se marca activo si la ruta es exactamente "/" */}
                        </li> {/* Cierra el elemento de lista de Inicio */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Horarios */}
                            <Link className={`nav-link ${path === '/horarios' ? 'active' : ''}`} to="/horarios">Horarios</Link> {/* Enlace a Horarios, activo si la ruta es "/horarios" */}
                        </li> {/* Cierra el elemento de lista de Horarios */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Quiénes Somos */}
                            <Link className={`nav-link ${path === '/quienes-somos' ? 'active' : ''}`} to="/quienes-somos">Quiénes Somos</Link> {/* Enlace a Quiénes Somos, activo si la ruta coincide */}
                        </li> {/* Cierra el elemento de lista de Quiénes Somos */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Pastores */}
                            <Link className={`nav-link ${path === '/pastores' ? 'active' : ''}`} to="/pastores">Pastores</Link> {/* Enlace a Pastores, activo si la ruta coincide */}
                        </li> {/* Cierra el elemento de lista de Pastores */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Eventos */}
                            <Link className={`nav-link ${path === '/eventos' ? 'active' : ''}`} to="/eventos">Eventos</Link> {/* Enlace a Eventos, activo si la ruta coincide */}
                        </li> {/* Cierra el elemento de lista de Eventos */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace Contacto */}
                            <Link className={`nav-link ${path === '/contacto' ? 'active' : ''}`} to="/contacto">Contacto</Link> {/* Enlace a Contacto, activo si la ruta coincide */}
                        </li> {/* Cierra el elemento de lista de Contacto */}
                        <li className="nav-item"> {/* Elemento de lista para el enlace de administración */}
                            <Link {/* Enlace condicional: redirige a /admin si hay sesión, o /login si no */}
                                className={`nav-link nav-admin-link ${path === '/admin' || path === '/login' ? 'active' : ''}`} {/* Clase activa si está en rutas de admin o login */}
                                to={user ? '/admin' : '/login'} {/* Ruta dinámica según estado de autenticación */}
                            > {/* Cierra la apertura del Link */}
                                <i className="bi bi-person-circle"></i> {/* Icono de usuario de Bootstrap Icons */}
                                {user ? 'Admin' : 'Iniciar Sesion'} {/* Muestra "Admin" si hay sesión, "Iniciar Sesion" si no */}
                            </Link> {/* Cierra el enlace de administración */}
                        </li> {/* Cierra el elemento de lista de administración */}
                    </ul> {/* Cierra la lista de navegación */}
                </div> {/* Cierra el contenedor colapsable del menú */}
            </div> {/* Cierra el contenedor principal */}
        </nav> {/* Cierra el elemento nav */}
    ); // Fin del return
} // Fin del componente NavBar
