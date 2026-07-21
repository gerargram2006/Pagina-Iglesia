import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import AdminEventos from './admin/AdminEventos';
import AdminPastores from './admin/AdminPastores';
import AdminMensajes from './admin/AdminMensajes';
import { api } from '../api';

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 19) return 'Buenas tardes';
    return 'Buenas noches';
}

function getTimeIcon() {
    const hour = new Date().getHours();
    if (hour < 12) return 'bi-sun';
    if (hour < 19) return 'bi-cloud-sun';
    return 'bi-moon-stars';
}

const adminCards = [
    { title: 'Eventos', description: 'Crear y administrar eventos de la iglesia', icon: 'bi-calendar-event', gradient: 'linear-gradient(135deg, #2d6a4f, #40916c)' },
    { title: 'Anuncios', description: 'Publicar anuncios para la congregación', icon: 'bi-megaphone', gradient: 'linear-gradient(135deg, #b8942e, #dbb958)' },
    { title: 'Miembros', description: 'Administrar el directorio de miembros', icon: 'bi-people', gradient: 'linear-gradient(135deg, #1b4332, #2d6a4f)' },
    { title: 'Mensajes', description: 'Revisar mensajes de contacto', icon: 'bi-chat-dots', gradient: 'linear-gradient(135deg, #c9a84c, #e8cf7a)' },
];

const recentActivity = [
    { text: 'Sistema iniciado correctamente', time: 'Ahora', icon: 'bi-check-circle-fill', type: 'success' },
    { text: 'Panel de administración activo', time: 'Hace 1 min', icon: 'bi-gear-fill', type: 'info' },
    { text: 'Sección de eventos disponible pronto', time: 'Próximamente', icon: 'bi-clock-fill', type: 'pending' },
];

const sidebarItems = [
    { label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    { label: 'Eventos', icon: 'bi-calendar-event' },
    { label: 'Anuncios', icon: 'bi-megaphone' },
    { label: 'Miembros', icon: 'bi-people' },
    { label: 'Mensajes', icon: 'bi-chat-dots' },
    { label: 'Configuración', icon: 'bi-gear' },
];

export default function Admin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [stats, setStats] = useState({ miembros: '--', eventos: '--', mensajes: '--', visitas: '124' });

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
                        visitas: '124'
                    });
                } catch (e) {
                    console.error("Error al cargar estadísticas", e);
                }
            };
            fetchStats();
        }
    }, [activeTab]);

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const formattedDate = currentTime.toLocaleDateString('es-PE', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    const formattedTime = currentTime.toLocaleTimeString('es-PE', {
        hour: '2-digit', minute: '2-digit', hour12: true,
    });

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-page">
            <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
                <div className="admin-sidebar-header">
                    <img src="/img/logo-oficial.png" alt="Logo" className="admin-sidebar-logo" />
                    <span className="admin-sidebar-brand">Admin Panel</span>
                    <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

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

                <div className="admin-sidebar-footer">
                    <Link to="/" className="admin-sidebar-back">
                        <i className="bi bi-arrow-left"></i>
                        <span>Volver al sitio</span>
                    </Link>
                </div>
            </aside>

            {sidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true"></div>}

            <main className="admin-main">
                <header className="admin-topbar">
                    <button className="admin-topbar-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
                        <i className="bi bi-list"></i>
                    </button>
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
                    <div className="admin-topbar-actions">
                        <span className="admin-role-badge">
                            <i className="bi bi-shield-check"></i>
                            {user?.rol || 'admin'}
                        </span>
                        <button onClick={handleLogout} className="admin-logout-btn">
                            <i className="bi bi-box-arrow-right"></i>
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </header>

                <div className="admin-content">
                    {activeTab === 'Dashboard' && (
                        <>
                            <div className="admin-welcome-banner">
                                <div className="admin-welcome-content">
                                    <h2>Bendiciones, {user?.name || 'Administrador'}</h2>
                                    <p>Aquí tienes el panel general de la iglesia. Que Dios guíe cada paso que tomes en la administración de este ministerio hoy.</p>
                                </div>
                                <div className="admin-welcome-icon"><i className="bi bi-stars"></i></div>
                            </div>

                            <section className="admin-stats">
                                {[
                                    { label: 'Miembros', icon: 'bi-people-fill', value: stats.miembros, color: 'var(--primary-600)' },
                                    { label: 'Eventos', icon: 'bi-calendar-check', value: stats.eventos, color: 'var(--gold-500)' },
                                    { label: 'Mensajes', icon: 'bi-envelope-fill', value: stats.mensajes, color: 'var(--primary-500)' },
                                    { label: 'Visitas', icon: 'bi-eye-fill', value: stats.visitas, color: 'var(--gold-600)' }
                                ].map((stat, index) => (
                                    <div key={stat.label} className="admin-stat-card" style={{ animationDelay: `${index * 0.08}s` }}>
                                        <div className="admin-stat-icon" style={{ color: stat.color }}>
                                            <i className={`bi ${stat.icon}`}></i>
                                        </div>
                                        <div className="admin-stat-info">
                                            <span className="admin-stat-number">{stat.value}</span>
                                            <span className="admin-stat-label">{stat.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            <div className="admin-dashboard-grid">
                                <section className="admin-section">
                                    <div className="admin-section-header">
                                        <h2><i className="bi bi-grid"></i> Panel de Control</h2>
                                        <span className="admin-status-badge"><span className="admin-status-dot"></span> Activo</span>
                                    </div>
                                    <p className="admin-section-desc">Gestiona el contenido de la iglesia desde aquí. Selecciona una opción en el menú lateral para comenzar.</p>
                                    <div className="admin-cards">
                                        {adminCards.map((card, index) => (
                                            <div key={card.title} className="admin-card" onClick={() => setActiveTab(card.title === 'Miembros' ? 'Miembros' : card.title)} style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}>
                                                <div className="admin-card-icon" style={{ background: card.gradient }}>
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

                                <aside className="admin-sidebar-right">
                                    <div className="admin-quick-actions">
                                        <h3><i className="bi bi-lightning-fill"></i> Acciones rápidas</h3>
                                        <div className="admin-quick-btns">
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Eventos')}>
                                                <i className="bi bi-plus-circle"></i> Nuevo evento
                                            </button>
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Mensajes')}>
                                                <i className="bi bi-chat-dots"></i> Ver Mensajes
                                            </button>
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Miembros')}>
                                                <i className="bi bi-person-plus"></i> Agregar pastor
                                            </button>
                                        </div>
                                    </div>

                                    <div className="admin-activity">
                                        <h3><i className="bi bi-activity"></i> Actividad reciente</h3>
                                        <div className="admin-activity-list">
                                            {recentActivity.map((item, index) => (
                                                <div key={index} className={`admin-activity-item admin-activity-item--${item.type}`}>
                                                    <div className="admin-activity-icon"><i className={`bi ${item.icon}`}></i></div>
                                                    <div className="admin-activity-info">
                                                        <span className="admin-activity-text">{item.text}</span>
                                                        <span className="admin-activity-time">{item.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="admin-user-card">
                                        <div className="admin-user-card-avatar"><i className="bi bi-person-fill"></i></div>
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
                    {activeTab === 'Configuración' && <div className="admin-coming-soon"><i className="bi bi-gear"></i><h2>Configuración</h2><p>Próximamente disponible.</p></div>}
                </div>
            </main>
        </div>
    );
}
