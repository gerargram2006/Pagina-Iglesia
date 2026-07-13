// Importa hooks de navegación y enlaces de react-router-dom
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth para acceder al contexto de autenticación
import { useAuth } from '../context/AuthContext';

// Exporta el componente Admin como exportación por defecto
export default function Admin() {
    // Extrae el usuario actual y la función logout del contexto de autenticación
    const { user, logout } = useAuth();
    // Crea una instancia de navigate para redirigir al usuario a otras rutas
    const navigate = useNavigate();

    // Define la función que se ejecuta al hacer clic en "Cerrar Sesión"
    const handleLogout = () => {
        // Llama a logout para cerrar la sesión del usuario
        logout();
        // Redirige al usuario a la página de login después de cerrar sesión
        navigate('/login');
    };

    // Retorna el JSX que renderiza la página de administración
    return (
        {/* Contenedor principal de la página de administración */}
        <div className="admin-page">
            {/* Contenedor interno que centra y organiza el contenido */}
            <div className="admin-container">
                {/* Sección del encabezado con información del usuario y botón de logout */}
                <div className="admin-header">
                    {/* Contenedor de la información del usuario (avatar, nombre y correo) */}
                    <div className="admin-user-info">
                        {/* Avatar del usuario con icono de persona */}
                        <div className="admin-avatar">
                            {/* Icono de Bootstrap de persona rellena */}
                            <i className="bi bi-person-fill"></i>
                        </div>
                        {/* Contenedor del nombre y correo del usuario */}
                        <div>
                            {/* Título con el nombre del usuario o "Administrador" por defecto */}
                            <h1>Bienvenido, {user?.name || 'Administrador'}</h1>
                            {/* Muestra el correo electrónico del usuario */}
                            <p className="admin-email">{user?.email}</p>
                        </div>
                    </div>
                    {/* Contenedor de acciones de administración (botón de cerrar sesión) */}
                    <div className="admin-actions">
                        {/* Botón que ejecuta handleLogout al hacer clic, con estilo secundario */}
                        <button onClick={handleLogout} className="btn btn-secondary admin-logout-btn">
                            {/* Icono de Bootstrap de flecha de salida */}
                            <i className="bi bi-box-arrow-right"></i>
                            {/* Texto del botón de cerrar sesión */}
                            Cerrar Sesion
                        </button>
                    </div>
                </div>

                {/* Sección principal del panel de control */}
                <div className="admin-section">
                    {/* Título de la sección del panel de control */}
                    <h2>
                        {/* Icono de Bootstrap de cuadrícula */}
                        <i className="bi bi-grid"></i>
                        {/* Texto del título del panel de control */}
                        Panel de Control
                    </h2>
                    {/* Descripción de la sección indicando que está en construcción */}
                    <p className="admin-section-desc">
                        {/* Primera línea de la descripción */}
                        Aqui puedes gestionar el contenido de la iglesia.
                        {/* Segunda línea indicando el estado de construcción */}
                        Esta seccion esta en construccion.
                    </p>

                    {/* Contenedor de las tarjetas de opciones del panel de control */}
                    <div className="admin-cards">
                        {/* Tarjeta de opciones para gestionar eventos */}
                        <div className="admin-card">
                            {/* Contenedor del icono de la tarjeta de eventos */}
                            <div className="admin-card-icon">
                                {/* Icono de Bootstrap de calendario con evento */}
                                <i className="bi bi-calendar-event"></i>
                            </div>
                            {/* Título de la tarjeta de eventos */}
                            <h3>Eventos</h3>
                            {/* Descripción de la funcionalidad de eventos */}
                            <p>Crear y administrar eventos de la iglesia</p>
                        </div>
                        {/* Tarjeta de opciones para publicar anuncios */}
                        <div className="admin-card">
                            {/* Contenedor del icono de la tarjeta de anuncios */}
                            <div className="admin-card-icon">
                                {/* Icono de Bootstrap de megáfono para anuncios */}
                                <i className="bi bi-megaphone"></i>
                            </div>
                            {/* Título de la tarjeta de anuncios */}
                            <h3>Anuncios</h3>
                            {/* Descripción de la funcionalidad de anuncios */}
                            <p>Publicar anuncios para la congregacion</p>
                        </div>
                        {/* Tarjeta de opciones para administrar miembros */}
                        <div className="admin-card">
                            {/* Contenedor del icono de la tarjeta de miembros */}
                            <div className="admin-card-icon">
                                {/* Icono de Bootstrap de grupo de personas */}
                                <i className="bi bi-people"></i>
                            </div>
                            {/* Título de la tarjeta de miembros */}
                            <h3>Miembros</h3>
                            {/* Descripción de la funcionalidad de miembros */}
                            <p>Administrar el directorio de miembros</p>
                        </div>
                        {/* Tarjeta de opciones para revisar mensajes */}
                        <div className="admin-card">
                            {/* Contenedor del icono de la tarjeta de mensajes */}
                            <div className="admin-card-icon">
                                {/* Icono de Bootstrap de burbujas de chat */}
                                <i className="bi bi-chat-dots"></i>
                            </div>
                            {/* Título de la tarjeta de mensajes */}
                            <h3>Mensajes</h3>
                            {/* Descripción de la funcionalidad de mensajes */}
                            <p>Revisar mensajes de contacto</p>
                        </div>
                    </div>
                </div>

                {/* Sección con enlace para volver al sitio principal */}
                <div className="admin-footer-link">
                    {/* Enlace de react-router-dom que redirige a la página de inicio */}
                    <Link to="/">
                        {/* Icono de Bootstrap de flecha izquierda */}
                        <i className="bi bi-arrow-left"></i>
                        {/* Texto del enlace para volver al sitio */}
                        Volver al sitio
                    </Link>
                </div>
            </div>
        </div>
    );
}
