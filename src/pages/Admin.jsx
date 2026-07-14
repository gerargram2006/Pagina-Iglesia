/**
 * Componente Admin - Panel de administración protegido.
 *
 * Funcionalidades:
 *   - Saludo dinámico según la hora del día (Buenos días / Buenas tardes / Buenas noches)
 *   - Muestra información del usuario autenticado (nombre, email, rol)
 *   - Tarjetas del panel de control con iconos, descripción y badge "Próximamente"
 *   - Botón de cerrar sesión con confirmación visual
 *   - Animación de entrada suave para todo el contenido
 *   - Enlace para volver al sitio principal
 *   - Responsive: se adapta a móvil, tablet y escritorio
 */

// Importa hooks de navegación y enlaces de react-router-dom
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth para acceder al contexto de autenticación
import { useAuth } from '../context/AuthContext';
// Importa useState y useEffect de React para estado local y efectos secundarios
import { useState, useEffect } from 'react';

/**
 * Función auxiliar que retorna un saludo según la hora actual del sistema.
 * @returns {string} "Buenos días", "Buenas tardes" o "Buenas noches"
 */
function getGreeting() {
    // Obtiene la hora actual (0-23) del sistema
    const hour = new Date().getHours();
    // Retorna saludo matutino si es antes de las 12
    if (hour < 12) return 'Buenos dias';
    // Retorna saludo vespertino si es entre 12 y 19
    if (hour < 19) return 'Buenas tardes';
    // Retorna saludo nocturno si es después de las 19
    return 'Buenas noches';
}

/**
 * Función auxiliar que retorna un icono de Bootstrap según la hora del día.
 * @returns {string} Clase CSS del icono de Bootstrap Icons
 */
function getTimeIcon() {
    // Obtiene la hora actual (0-23) del sistema
    const hour = new Date().getHours();
    // Icono de sol para la mañana
    if (hour < 12) return 'bi-sun';
    // Icono de sol nublado para la tarde
    if (hour < 19) return 'bi-cloud-sun';
    // Icono de luna para la noche
    return 'bi-moon';
}

/**
 * Arreglo de objetos que define las tarjetas del panel de control.
 * Cada tarjeta tiene: título, descripción, icono y color de acento.
 */
const adminCards = [
    {
        // Título de la tarjeta
        title: 'Eventos',
        // Descripción breve de la funcionalidad
        description: 'Crear y administrar eventos de la iglesia',
        // Clase del icono de Bootstrap Icons
        icon: 'bi-calendar-event',
        // Color de acento personalizado para el icono
        accent: 'var(--primary-600)',
    },
    {
        title: 'Anuncios',
        description: 'Publicar anuncios para la congregacion',
        icon: 'bi-megaphone',
        accent: 'var(--gold-500)',
    },
    {
        title: 'Miembros',
        description: 'Administrar el directorio de miembros',
        icon: 'bi-people',
        accent: 'var(--primary-500)',
    },
    {
        title: 'Mensajes',
        description: 'Revisar mensajes de contacto',
        icon: 'bi-chat-dots',
        accent: 'var(--gold-600)',
    },
];

// Exporta el componente Admin como exportación por defecto
export default function Admin() {
    // Extrae el usuario actual y la función logout del contexto de autenticación
    const { user, logout } = useAuth();
    // Crea una instancia de navigate para redirigir al usuario a otras rutas
    const navigate = useNavigate();
    // Estado para la fecha y hora actual que se actualiza cada minuto
    const [currentTime, setCurrentTime] = useState(new Date());

    // Efecto que actualiza la hora cada 60 segundos para el reloj en tiempo real
    useEffect(() => {
        // Crea un intervalo que actualiza currentTime cada 60000ms (1 minuto)
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        // Limpia el intervalo al desmontar el componente para evitar memory leaks
        return () => clearInterval(timer);
    }, []); // Se ejecuta solo una vez al montar

    /**
     * Formatea la fecha actual en español con día, mes y año.
     * @returns {string} Fecha formateada como "lunes, 13 de julio de 2026"
     */
    const formattedDate = currentTime.toLocaleDateString('es-PE', {
        weekday: 'long', // Nombre completo del día de la semana
        year: 'numeric', // Año con 4 dígitos
        month: 'long', // Nombre completo del mes
        day: 'numeric', // Día del mes
    });

    /**
     * Formatea la hora actual en formato de 12 horas con minutos.
     * @returns {string} Hora formateada como "2:30 PM"
     */
    const formattedTime = currentTime.toLocaleTimeString('es-PE', {
        hour: '2-digit', // Horas con 2 dígitos
        minute: '2-digit', // Minutos con 2 dígitos
        hour12: true, // Formato de 12 horas (AM/PM)
    });

    /**
     * Maneja el cierre de sesión del usuario.
     * Llama a logout del contexto y redirige al login.
     */
    const handleLogout = () => {
        // Llama a logout para cerrar la sesión del usuario
        logout();
        // Redirige al usuario a la página de login después de cerrar sesión
        navigate('/login');
    };

    // Retorna el JSX que renderiza la página de administración
    return (
        <div className="admin-page">
            {/* Contenedor interno que centra y organiza el contenido */}
            <div className="admin-container">
                {/* Sección del encabezado con saludo, info del usuario y reloj */}
                <div className="admin-header">
                    {/* Contenedor de la información del usuario (avatar, nombre y correo) */}
                    <div className="admin-user-info">
                        {/* Avatar del usuario con icono de persona */}
                        <div className="admin-avatar">
                            {/* Icono de Bootstrap de persona rellena */}
                            <i className="bi bi-person-fill"></i>
                        </div>
                        {/* Contenedor del saludo dinámico y datos del usuario */}
                        <div>
                            {/* Saludo dinámico según hora + nombre del usuario */}
                            <h1>
                                {/* Icono dinámico según hora del día */}
                                <i className={`bi ${getTimeIcon()} admin-time-icon`}></i>
                                {/* Texto del saludo */}
                                {getGreeting()}, {user?.name || 'Administrador'}
                            </h1>
                            {/* Correo electrónico del usuario */}
                            <p className="admin-email">{user?.email}</p>
                            {/* Badge del rol del usuario */}
                            <span className="admin-role-badge">
                                <i className="bi bi-shield-check"></i>
                                {user?.rol || 'admin'}
                            </span>
                        </div>
                    </div>
                    {/* Contenedor de acciones: reloj y botón de cerrar sesión */}
                    <div className="admin-actions">
                        {/* Reloj en tiempo real mostrando fecha y hora */}
                        <div className="admin-clock">
                            {/* Icono de reloj */}
                            <i className="bi bi-clock"></i>
                            {/* Hora formateada */}
                            <span className="admin-clock-time">{formattedTime}</span>
                            {/* Fecha formateada */}
                            <span className="admin-clock-date">{formattedDate}</span>
                        </div>
                        {/* Botón que ejecuta handleLogout al hacer clic, con estilo de peligro */}
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
                    {/* Fila del título con icono y badge de estado */}
                    <div className="admin-section-header">
                        {/* Título de la sección del panel de control */}
                        <h2>
                            {/* Icono de Bootstrap de cuadrícula */}
                            <i className="bi bi-grid"></i>
                            {/* Texto del título del panel de control */}
                            Panel de Control
                        </h2>
                        {/* Badge indicando el estado del sistema */}
                        <span className="admin-status-badge">
                            {/* Punto verde indicando sistema activo */}
                            <span className="admin-status-dot"></span>
                            Activo
                        </span>
                    </div>
                    {/* Descripción de la sección indicando qué se puede hacer */}
                    <p className="admin-section-desc">
                        Aqui puedes gestionar el contenido de la iglesia.
                    </p>

                    {/* Contenedor grid de las tarjetas de opciones del panel de control */}
                    <div className="admin-cards">
                        {/* Renderiza cada tarjeta del arreglo adminCards usando map */}
                        {adminCards.map((card, index) => (
                            // Tarjeta individual con estilo personalizado
                            <div
                                key={card.title}
                                className="admin-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Contenedor del icono con color de acento personalizado */}
                                <div
                                    className="admin-card-icon"
                                    style={{ background: `linear-gradient(135deg, ${card.accent}, ${card.accent}dd)` }}
                                >
                                    {/* Icono de Bootstrap dinámico */}
                                    <i className={`bi ${card.icon}`}></i>
                                </div>
                                {/* Título de la tarjeta */}
                                <h3>{card.title}</h3>
                                {/* Descripción de la funcionalidad */}
                                <p>{card.description}</p>
                                {/* Badge que indica que la funcionalidad está en desarrollo */}
                                <span className="admin-card-badge">Proximamente</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sección con estadísticas rápidas */}
                <div className="admin-stats">
                    {/* Tarjeta de estadística:total de usuarios */}
                    <div className="admin-stat-item">
                        <i className="bi bi-people-fill"></i>
                        <div>
                            <span className="admin-stat-number">--</span>
                            <span className="admin-stat-label">Miembros</span>
                        </div>
                    </div>
                    {/* Tarjeta de estadística:total de eventos */}
                    <div className="admin-stat-item">
                        <i className="bi bi-calendar-check"></i>
                        <div>
                            <span className="admin-stat-number">--</span>
                            <span className="admin-stat-label">Eventos</span>
                        </div>
                    </div>
                    {/* Tarjeta de estadística:total de mensajes */}
                    <div className="admin-stat-item">
                        <i className="bi bi-envelope-fill"></i>
                        <div>
                            <span className="admin-stat-number">--</span>
                            <span className="admin-stat-label">Mensajes</span>
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
