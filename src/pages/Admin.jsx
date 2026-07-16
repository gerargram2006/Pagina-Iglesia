/**
 * Componente Admin - Panel de administración protegido.
 *
 * Funcionalidades:
 *   - Sidebar colapsable con navegación lateral
 *   - Header compacto con info del usuario y acciones
 *   - Saludo dinámico según la hora del día (Buenos días / Buenas tardes / Buenas noches)
 *   - Muestra información del usuario autenticado (nombre, email, rol)
 *   - Tarjetas del panel de control con iconos, descripción y efectos hover premium
 *   - Estadísticas con iconos mejorados
 *   - Timeline de actividad reciente (placeholder elegante)
 *   - Quick actions para acceso rápido
 *   - Botón de cerrar sesión con confirmación visual
 *   - Animación de entrada suave para todo el contenido
 *   - Enlace para volver al sitio principal
 *   - Responsive: sidebar colapsable en móvil
 */

// Importa hooks de navegación y enlaces de react-router-dom
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth para acceder al contexto de autenticación
import { useAuth } from '../context/AuthContext';
// Importa useState y useEffect de React para estado local y efectos secundarios
import { useState, useEffect } from 'react';

// Importa los sub-componentes de administración
import AdminEventos from './admin/AdminEventos';
import AdminPastores from './admin/AdminPastores';
import AdminMensajes from './admin/AdminMensajes';

import { api } from '../api';

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
    return 'bi-moon-stars';
}

/**
 * Arreglo de objetos que define las tarjetas del panel de control.
 * Cada tarjeta tiene: título, descripción, icono, color de acento y gradiente.
 */
const adminCards = [
    {
        title: 'Eventos',
        description: 'Crear y administrar eventos de la iglesia',
        icon: 'bi-calendar-event',
        gradient: 'linear-gradient(135deg, #2d6a4f, #40916c)',
        accent: 'var(--primary-600)',
    },
    {
        title: 'Anuncios',
        description: 'Publicar anuncios para la congregacion',
        icon: 'bi-megaphone',
        gradient: 'linear-gradient(135deg, #b8942e, #dbb958)',
        accent: 'var(--gold-500)',
    },
    {
        title: 'Miembros',
        description: 'Administrar el directorio de miembros',
        icon: 'bi-people',
        gradient: 'linear-gradient(135deg, #1b4332, #2d6a4f)',
        accent: 'var(--primary-500)',
    },
    {
        title: 'Mensajes',
        description: 'Revisar mensajes de contacto',
        icon: 'bi-chat-dots',
        gradient: 'linear-gradient(135deg, #c9a84c, #e8cf7a)',
        accent: 'var(--gold-600)',
    },
];

/**
 * Arreglo de estadísticas del dashboard.
 */
const dashboardStats = [
    { label: 'Miembros', icon: 'bi-people-fill', value: '--', trend: 'up', color: 'var(--primary-600)' },
    { label: 'Eventos', icon: 'bi-calendar-check', value: '--', trend: 'up', color: 'var(--gold-500)' },
    { label: 'Mensajes', icon: 'bi-envelope-fill', value: '--', trend: 'neutral', color: 'var(--primary-500)' },
    { label: 'Visitas', icon: 'bi-eye-fill', value: '--', trend: 'up', color: 'var(--gold-600)' },
];

/**
 * Arreglo de actividades recientes (placeholder).
 */
const recentActivity = [
    { text: 'Sistema iniciado correctamente', time: 'Ahora', icon: 'bi-check-circle-fill', type: 'success' },
    { text: 'Panel de administracion activo', time: 'Hace 1 min', icon: 'bi-gear-fill', type: 'info' },
    { text: 'Seccion de eventos disponible pronto', time: 'Proximamente', icon: 'bi-clock-fill', type: 'pending' },
];

/**
 * Sidebar items de navegación.
 */
const sidebarItems = [
    { label: 'Dashboard', icon: 'bi-grid-1x2-fill', active: true },
    { label: 'Eventos', icon: 'bi-calendar-event' },
    { label: 'Anuncios', icon: 'bi-megaphone' },
    { label: 'Miembros', icon: 'bi-people' },
    { label: 'Mensajes', icon: 'bi-chat-dots' },
    { label: 'Configuracion', icon: 'bi-gear' },
];

// Exporta el componente Admin como exportación por defecto
export default function Admin() {
    // Extrae el usuario actual y la función logout del contexto de autenticación
    const { user, logout } = useAuth();
    // Crea una instancia de navigate para redirigir al usuario a otras rutas
    const navigate = useNavigate();
    // Estado para la fecha y hora actual que se actualiza cada minuto
    const [currentTime, setCurrentTime] = useState(new Date());
    // Estado para controlar la visibilidad del sidebar en móvil
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Estado para la pestaña activa
    const [activeTab, setActiveTab] = useState('Dashboard');
    
    // Estado para las estadísticas del dashboard
    const [stats, setStats] = useState({ miembros: '--', eventos: '--', mensajes: '--', visitas: '124' });

    // Efecto para cargar estadísticas reales al entrar al Dashboard
    useEffect(() => {
        if (activeTab === 'Dashboard') {
            const fetchStats = async () => {
                try {
                    const [pastoresRes, eventosRes, mensajesRes] = await Promise.all([
                        api.pastores.getAll(),
                        api.eventos.getAll(),
                        api.mensajes.getAll()
                    ]);
                    setStats({
                        miembros: pastoresRes.length,
                        eventos: eventosRes.length,
                        mensajes: mensajesRes.length,
                        visitas: '124' // Mock
                    });
                } catch (e) {
                    console.error("Error al cargar estadísticas", e);
                }
            };
            fetchStats();
        }
    }, [activeTab]);

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

    // Retorna el JSX que renderiza la página de administración con sidebar
    return (
        <div className="admin-page">
            {/* Sidebar de navegación */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
                {/* Header del sidebar con logo */}
                <div className="admin-sidebar-header">
                    <img src="/img/LogoAD.PNG" alt="Logo" className="admin-sidebar-logo" />
                    <span className="admin-sidebar-brand">Admin Panel</span>
                    {/* Botón para cerrar sidebar en móvil */}
                    <button
                        className="admin-sidebar-close"
                        onClick={() => setSidebarOpen(false)}
                        aria-label="Cerrar menu"
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                {/* Items de navegación del sidebar */}
                <nav className="admin-sidebar-nav">
                    {sidebarItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
                            className={`admin-sidebar-item ${activeTab === item.label ? 'admin-sidebar-item--active' : ''}`}
                            title={item.label}
                        >
                            <i className={`bi ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                {/* Footer del sidebar con enlace al sitio */}
                <div className="admin-sidebar-footer">
                    <Link to="/" className="admin-sidebar-back">
                        <i className="bi bi-arrow-left"></i>
                        <span>Volver al sitio</span>
                    </Link>
                </div>
            </aside>

            {/* Overlay para cerrar sidebar en móvil */}
            {sidebarOpen && (
                <div
                    className="admin-sidebar-overlay"
                    onClick={() => setSidebarOpen(false)}
                    aria-hidden="true"
                ></div>
            )}

            {/* Contenido principal */}
            <main className="admin-main">
                {/* Header superior compacto */}
                <header className="admin-topbar">
                    {/* Botón hamburguesa para abrir sidebar en móvil */}
                    <button
                        className="admin-topbar-menu"
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Abrir menu"
                    >
                        <i className="bi bi-list"></i>
                    </button>

                    {/* Info del saludo y fecha */}
                    <div className="admin-topbar-greeting">
                        <h1>
                            <i className={`bi ${getTimeIcon()} admin-time-icon`}></i>
                            {getGreeting()}, <strong>{user?.name || 'Administrador'}</strong>
                        </h1>
                        <p className="admin-topbar-date">
                            <i className="bi bi-clock"></i>
                            {formattedTime} — <span className="admin-topbar-date-text">{formattedDate}</span>
                        </p>
                    </div>

                    {/* Acciones del header */}
                    <div className="admin-topbar-actions">
                        {/* Badge del rol */}
                        <span className="admin-role-badge">
                            <i className="bi bi-shield-check"></i>
                            {user?.rol || 'admin'}
                        </span>
                        {/* Botón de cerrar sesión */}
                        <button onClick={handleLogout} className="admin-logout-btn">
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Cerrar Sesion</span>
                        </button>
                    </div>
                </header>

                {/* Contenido del dashboard dinámico según la pestaña activa */}
                <div className="admin-content">
                    {activeTab === 'Dashboard' && (
                        <>
                            {/* Banner de Bienvenida Premium */}
                            <div className="admin-welcome-banner">
                                <div className="admin-welcome-content">
                                    <h2>Bendiciones, {user?.name || 'Administrador'}</h2>
                                    <p>Aquí tienes el panel general de la iglesia. Que Dios guíe cada paso que tomes en la administración de este ministerio hoy.</p>
                                </div>
                                <div className="admin-welcome-icon">
                                    <i className="bi bi-stars"></i>
                                </div>
                            </div>

                            {/* Sección de estadísticas dinámicas */}
                            <section className="admin-stats">
                                {[
                                    { label: 'Miembros', icon: 'bi-people-fill', value: stats.miembros, trend: 'up', color: 'var(--primary-600)' },
                                    { label: 'Eventos', icon: 'bi-calendar-check', value: stats.eventos, trend: 'up', color: 'var(--gold-500)' },
                                    { label: 'Mensajes', icon: 'bi-envelope-fill', value: stats.mensajes, trend: 'neutral', color: 'var(--primary-500)' },
                                    { label: 'Visitas', icon: 'bi-eye-fill', value: stats.visitas, trend: 'up', color: 'var(--gold-600)' }
                                ].map((stat, index) => (
                                    <div
                                        key={stat.label}
                                        className="admin-stat-card"
                                        style={{ animationDelay: `${index * 0.08}s` }}
                                    >
                                        <div className="admin-stat-icon" style={{ color: stat.color }}>
                                            <i className={`bi ${stat.icon}`}></i>
                                        </div>
                                        <div className="admin-stat-info">
                                            <span className="admin-stat-number">{stat.value}</span>
                                            <span className="admin-stat-label">{stat.label}</span>
                                        </div>
                                        {stat.trend === 'up' && (
                                            <div className="admin-stat-trend admin-stat-trend--up">
                                                <i className="bi bi-arrow-up-short"></i>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </section>

                            {/* Grid de dos columnas: tarjetas + actividad */}
                            <div className="admin-dashboard-grid">
                                {/* Columna izquierda: Panel de control */}
                                <section className="admin-section">
                                    <div className="admin-section-header">
                                        <h2>
                                            <i className="bi bi-grid"></i>
                                            Panel de Control
                                        </h2>
                                        <span className="admin-status-badge">
                                            <span className="admin-status-dot"></span>
                                            Activo
                                        </span>
                                    </div>
                                    <p className="admin-section-desc">
                                        Gestiona el contenido de la iglesia desde aqui. Selecciona una opción en el menú lateral para comenzar.
                                    </p>

                                    {/* Grid de tarjetas interactivo */}
                                    <div className="admin-cards">
                                        {adminCards.map((card, index) => (
                                            <div
                                                key={card.title}
                                                className="admin-card"
                                                onClick={() => setActiveTab(card.title === 'Miembros' ? 'Pastores' : card.title)}
                                                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                                            >
                                                <div
                                                    className="admin-card-icon"
                                                    style={{ background: card.gradient }}
                                                >
                                                    <i className={`bi ${card.icon}`}></i>
                                                </div>
                                                <div className="admin-card-body">
                                                    <h3>{card.title}</h3>
                                                    <p>{card.description}</p>
                                                </div>
                                                <div className="admin-card-shine"></div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                {/* Columna derecha: Actividad reciente + Quick actions */}
                                <aside className="admin-sidebar-right">
                                    {/* Quick Actions */}
                                    <div className="admin-quick-actions">
                                        <h3>
                                            <i className="bi bi-lightning-fill"></i>
                                            Acciones rapidas
                                        </h3>
                                        <div className="admin-quick-btns">
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Eventos')}>
                                                <i className="bi bi-plus-circle"></i>
                                                Nuevo evento
                                            </button>
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Mensajes')}>
                                                <i className="bi bi-chat-dots"></i>
                                                Ver Mensajes
                                            </button>
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Miembros')}>
                                                <i className="bi bi-person-plus"></i>
                                                Agregar pastor
                                            </button>
                                        </div>
                                    </div>

                                    {/* Actividad reciente */}
                                    <div className="admin-activity">
                                        <h3>
                                            <i className="bi bi-activity"></i>
                                            Actividad reciente
                                        </h3>
                                        <div className="admin-activity-list">
                                            {recentActivity.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className={`admin-activity-item admin-activity-item--${item.type}`}
                                                >
                                                    <div className="admin-activity-icon">
                                                        <i className={`bi ${item.icon}`}></i>
                                                    </div>
                                                    <div className="admin-activity-info">
                                                        <span className="admin-activity-text">{item.text}</span>
                                                        <span className="admin-activity-time">{item.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Info del usuario */}
                                    <div className="admin-user-card">
                                        <div className="admin-user-card-avatar">
                                            <i className="bi bi-person-fill"></i>
                                        </div>
                                        <div className="admin-user-card-info">
                                            <span className="admin-user-card-name">{user?.name || 'Administrador'}</span>
                                            <span className="admin-user-card-email">{user?.email}</span>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </>
                    )}

                    {activeTab === 'Eventos' && <AdminEventos />}
                    {activeTab === 'Miembros' && <AdminPastores />}
                    {activeTab === 'Mensajes' && <AdminMensajes />}
                    {activeTab === 'Anuncios' && <div className="admin-coming-soon"><i className="bi bi-megaphone"></i><h2>Módulo de Anuncios</h2><p>Próximamente disponible.</p></div>}
                    {activeTab === 'Configuracion' && <div className="admin-coming-soon"><i className="bi bi-gear"></i><h2>Configuración</h2><p>Próximamente disponible.</p></div>}

                </div>
            </main>
        </div>
    );
}
