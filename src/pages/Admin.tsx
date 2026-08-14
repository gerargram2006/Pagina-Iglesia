// Importa useNavigate para redirigir y Link para crear enlaces de navegación
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook de autenticación del contexto
import { useAuth } from '../context/AuthContext';
// Importa los hooks de React para manejar estado y efectos secundarios
import { useState, useEffect } from 'react';
// Importa el componente de administración de eventos
import AdminEventos from './admin/AdminEventos';
// Importa el componente de administración de pastores
import AdminPastores from './admin/AdminPastores';
// Importa el componente de administración de mensajes
import AdminMensajes from './admin/AdminMensajes';
// Importa el componente de administración de anuncios
import AdminAnuncios from './admin/AdminAnuncios';
// Importa el componente de administración de recursos
import AdminRecursos from './admin/AdminRecursos';
// Importa el componente de administración de slides del Hero
import AdminSlides from './admin/AdminSlides';
// Importa el componente de administración de horarios
import AdminHorarios from './admin/AdminHorarios';
// Importa el componente de administración de la galería
import AdminGaleria from './admin/AdminGaleria';
// Importa el cliente de la API para consultar estadísticas
import { api } from '../api';

// Función que retorna un saludo según la hora del día
function getGreeting(): string {
    // Obtiene la hora actual del sistema
    const hour = new Date().getHours();
    // Si es antes del mediodía, saluda con "Buenos días"
    if (hour < 12) return 'Buenos días';
    // Si es antes de las 7 p.m., saluda con "Buenas tardes"
    if (hour < 19) return 'Buenas tardes';
    // En cualquier otro caso, saluda con "Buenas noches"
    return 'Buenas noches';
}

// Función que retorna el ícono adecuado según la hora del día
function getTimeIcon(): string {
    // Obtiene la hora actual del sistema
    const hour = new Date().getHours();
    // Si es de mañana, retorna el ícono del sol
    if (hour < 12) return 'bi-sun';
    // Si es de tarde, retorna el ícono de sol entre nubes
    if (hour < 19) return 'bi-cloud-sun';
    // Si es de noche, retorna el ícono de luna y estrellas
    return 'bi-moon-stars';
}

// Define la interfaz que describe una tarjeta del panel de administración
interface AdminCard {
    // Título de la tarjeta
    title: string;
    // Descripción de la funcionalidad de la tarjeta
    description: string;
    // Clase del ícono de Bootstrap Icons
    icon: string;
    // Gradiente de color del fondo del ícono
    gradient: string;
}

// Lista de tarjetas de acceso rápido al panel de administración
const adminCards: AdminCard[] = [
    // Tarjeta de administración de eventos
    { title: 'Eventos', description: 'Crear y administrar eventos de la iglesia', icon: 'bi-calendar-event', gradient: 'linear-gradient(135deg, #606C59, #77856f)' },
    // Tarjeta de administración de anuncios
    { title: 'Anuncios', description: 'Publicar anuncios para la congregación', icon: 'bi-megaphone', gradient: 'linear-gradient(135deg, #b8942e, #dbb958)' },
    // Tarjeta de administración de miembros
    { title: 'Miembros', description: 'Administrar el directorio de miembros', icon: 'bi-people', gradient: 'linear-gradient(135deg, #4b5545, #606C59)' },
    // Tarjeta de administración de mensajes
    { title: 'Mensajes', description: 'Revisar mensajes de contacto', icon: 'bi-chat-dots', gradient: 'linear-gradient(135deg, #c9a84c, #e8cf7a)' },
    // Tarjeta de administración de recursos
    { title: 'Recursos', description: 'Gestionar material descargable (PDFs)', icon: 'bi-folder2-open', gradient: 'linear-gradient(135deg, #606C59, #77856f)' },
    // Tarjeta de administración de slides
    { title: 'Slides', description: 'Gestionar el slider principal del Hero', icon: 'bi-images', gradient: 'linear-gradient(135deg, #4a6fa5, #6b8cce)' },
    // Tarjeta de administración de horarios
    { title: 'Horarios', description: 'Configurar horarios de reuniones', icon: 'bi-clock', gradient: 'linear-gradient(135deg, #7b2d8e, #a855c7)' },
    // Tarjeta de administración de la galería
    { title: 'Galería', description: 'Administrar fotos de la comunidad', icon: 'bi-camera', gradient: 'linear-gradient(135deg, #d4772c, #e8a04c)' },
];

// Define la interfaz que describe un elemento de la actividad reciente
interface ActivityItem {
    // Texto que describe la actividad
    text: string;
    // Hora relativa en que ocurrió la actividad
    time: string;
    // Clase del ícono de Bootstrap Icons
    icon: string;
    // Tipo de actividad: éxito, información o pendiente
    type: 'success' | 'info' | 'pending';
}

// Lista estática de actividades recientes mostradas en el panel
const recentActivity: ActivityItem[] = [
    // Actividad de inicio correcto del sistema
    { text: 'Sistema iniciado correctamente', time: 'Ahora', icon: 'bi-check-circle-fill', type: 'success' },
    // Actividad de panel de administración activo
    { text: 'Panel de administración activo', time: 'Hace 1 min', icon: 'bi-gear-fill', type: 'info' },
    // Actividad pendiente de la sección de eventos
    { text: 'Sección de eventos disponible pronto', time: 'Próximamente', icon: 'bi-clock-fill', type: 'pending' },
];

// Define la interfaz que describe un elemento del menú lateral
interface SidebarItem {
    // Etiqueta de texto del elemento del menú
    label: string;
    // Clase del ícono de Bootstrap Icons
    icon: string;
}

// Lista de elementos del menú lateral de navegación
const sidebarItems: SidebarItem[] = [
    // Opción de Dashboard
    { label: 'Dashboard', icon: 'bi-grid-1x2-fill' },
    // Opción de Eventos
    { label: 'Eventos', icon: 'bi-calendar-event' },
    // Opción de Anuncios
    { label: 'Anuncios', icon: 'bi-megaphone' },
    // Opción de Miembros
    { label: 'Miembros', icon: 'bi-people' },
    // Opción de Mensajes
    { label: 'Mensajes', icon: 'bi-chat-dots' },
    // Opción de Recursos
    { label: 'Recursos', icon: 'bi-folder2-open' },
    // Opción de Slides
    { label: 'Slides', icon: 'bi-images' },
    // Opción de Horarios
    { label: 'Horarios', icon: 'bi-clock' },
    // Opción de Galería
    { label: 'Galería', icon: 'bi-camera' },
    // Opción de Configuración
    { label: 'Configuración', icon: 'bi-gear' },
];

// Define la interfaz que describe las estadísticas mostradas en el Dashboard
interface AdminStats {
    // Cantidad de miembros (puede ser un número o un guion mientras se carga)
    miembros: number | string;
    // Cantidad de eventos (puede ser un número o un guion mientras se carga)
    eventos: number | string;
    // Cantidad de mensajes (puede ser un número o un guion mientras se carga)
    mensajes: number | string;
    // Cantidad de visitas al sitio
    visitas: string;
}

// Define y exporta el componente del panel de administración
export default function Admin() {
    // Obtiene el usuario autenticado y la función de cierre de sesión desde el contexto
    const { user, logout } = useAuth();
    // Obtiene la función de navegación de react-router-dom
    const navigate = useNavigate();
    // Estado que almacena la hora actual del sistema
    const [currentTime, setCurrentTime] = useState(new Date());
    // Estado que controla si el menú lateral está abierto en dispositivos móviles
    const [sidebarOpen, setSidebarOpen] = useState(false);
    // Estado que guarda la pestaña activa del panel (por defecto Dashboard)
    const [activeTab, setActiveTab] = useState('Dashboard');
    // Estado que almacena las estadísticas mostradas en el Dashboard
    const [stats, setStats] = useState<AdminStats>({ miembros: '--', eventos: '--', mensajes: '--', visitas: '124' });

    // Efecto que carga las estadísticas cada vez que cambia la pestaña activa
    useEffect(() => {
        // Solo carga estadísticas cuando la pestaña activa es el Dashboard
        if (activeTab === 'Dashboard') {
            // Función asíncrona que consulta las estadísticas a la API
            const fetchStats = async () => {
                // Intenta realizar las peticiones a la API
                try {
                    // Ejecuta las tres peticiones en paralelo para pastores, eventos y mensajes
                    const [pastoresRes, eventosRes, mensajesRes] = await Promise.all([
                        // Obtiene todos los pastores
                        api.pastores.getAll(),
                        // Obtiene todos los eventos
                        api.eventos.getAll(),
                        // Obtiene todos los mensajes
                        api.mensajes.getAll()
                    ]);
                    // Actualiza las estadísticas con la cantidad de registros obtenidos
                    setStats({
                        // Cuenta los pastores obtenidos como miembros
                        miembros: pastoresRes.length,
                        // Cuenta los eventos obtenidos
                        eventos: eventosRes.length,
                        // Cuenta los mensajes obtenidos
                        mensajes: mensajesRes.length,
                        // Valor fijo de visitas
                        visitas: '124'
                    });
                } catch (e) {
                    // Muestra el error en consola si alguna petición falla
                    console.error("Error al cargar estadísticas", e);
                }
            };
            // Ejecuta la función de carga de estadísticas
            fetchStats();
        }
        // Dependencia del efecto: la pestaña activa
    }, [activeTab]);

    // Efecto que actualiza la hora actual cada minuto
    useEffect(() => {
        // Crea un intervalo que actualiza la hora cada 60 segundos
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        // Limpia el intervalo cuando el componente se desmonta
        return () => clearInterval(timer);
        // Arreglo de dependencias vacío para que el efecto se ejecute solo al montar
    }, []);

    // Formatea la fecha actual en español de Perú
    const formattedDate = currentTime.toLocaleDateString('es-PE', {
        // Muestra el día de la semana, año, mes y día en formato largo
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });

    // Formatea la hora actual en español de Perú
    const formattedTime = currentTime.toLocaleTimeString('es-PE', {
        // Muestra la hora y los minutos con formato de 12 horas
        hour: '2-digit', minute: '2-digit', hour12: true,
    });

    // Función que cierra la sesión del usuario
    const handleLogout = () => {
        // Llama a la función de logout del contexto
        logout();
        // Redirige a la página de inicio de sesión
        navigate('/login');
    };

    // Retorna el JSX del panel de administración
    return (
        // Contenedor principal de la página de administración
        <div className="admin-page">
            // Menú lateral que se abre o cierra según el estado sidebarOpen
            <aside className={`admin-sidebar ${sidebarOpen ? 'admin-sidebar--open' : ''}`}>
                // Encabezado del menú lateral
                <div className="admin-sidebar-header">
                    // Contenedor flexible con el logo y el título del panel
                    <div className="d-flex flex-column align-items-center text-center p-3" style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
                        // Logo oficial de la iglesia
                        <img src="/img/logo-oficial.png" alt="Logo" className="img-fluid" style={{ maxWidth: '130px' }} />
                        // Título "Admin Panel" en el encabezado
                        <span className="text-uppercase fs-6 text-white-50 mt-2 fw-semibold" style={{ letterSpacing: '1.5px' }}>Admin Panel</span>
                    </div>
                    // Botón que cierra el menú lateral
                    <button className="admin-sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="Cerrar menú">
                        // Ícono de "X" para cerrar el menú
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                // Navegación con las opciones del menú lateral
                <nav className="admin-sidebar-nav">
                    // Recorre la lista de elementos del menú y genera un botón por cada uno
                    {sidebarItems.map((item) => (
                        // Botón de navegación del menú lateral
                        <button
                            // Clave única de React para cada elemento
                            key={item.label}
                            // Al hacer clic, activa la pestaña y cierra el menú en móviles
                            onClick={() => { setActiveTab(item.label); setSidebarOpen(false); }}
                            // Aplica la clase activa si el elemento corresponde a la pestaña actual
                            className={`admin-sidebar-item ${activeTab === item.label ? 'admin-sidebar-item--active' : ''}`}
                            // Texto de ayuda que se muestra al pasar el cursor
                            title={item.label}
                        >
                            // Ícono del elemento del menú
                            <i className={`bi ${item.icon}`}></i>
                            // Etiqueta de texto del elemento del menú
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                // Pie del menú lateral con el enlace de regreso al sitio
                <div className="admin-sidebar-footer">
                    // Enlace que lleva de vuelta a la página principal del sitio
                    <Link to="/" className="admin-sidebar-back">
                        // Ícono de flecha hacia la izquierda
                        <i className="bi bi-arrow-left"></i>
                        // Texto del enlace "Volver al sitio"
                        <span>Volver al sitio</span>
                    </Link>
                </div>
            </aside>

            // Fondo oscuro superpuesto que aparece en móviles cuando el menú está abierto
            {sidebarOpen && <div className="admin-sidebar-overlay" onClick={() => setSidebarOpen(false)} aria-hidden="true"></div>}

            // Contenido principal del panel de administración
            <main className="admin-main">
                // Barra superior del panel de administración
                <header className="admin-topbar">
                    // Botón que abre el menú lateral en dispositivos móviles
                    <button className="admin-topbar-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
                        // Ícono de lista para el botón de menú
                        <i className="bi bi-list"></i>
                    </button>
                    // Bloque con el saludo y la fecha actual
                    <div className="admin-topbar-greeting">
                        // Título con el saludo personalizado
                        <h1>
                            // Ícono del clima según la hora del día
                            <i className={`bi ${getTimeIcon()} admin-time-icon`}></i>
                            // Saludo y nombre del usuario o texto por defecto
                            {getGreeting()}, <strong>{user?.name || 'Administrador'}</strong>
                        </h1>
                        // Párrafo que muestra la hora y la fecha actuales
                        <p className="admin-topbar-date">
                            // Ícono de reloj
                            <i className="bi bi-clock"></i>
                            // Hora y fecha formateadas
                            {formattedTime} — <span className="admin-topbar-date-text">{formattedDate}</span>
                        </p>
                    </div>
                    // Contenedor de las acciones de la barra superior
                    <div className="admin-topbar-actions">
                        // Insignia que muestra el rol del usuario
                        <span className="admin-role-badge">
                            // Ícono de escudo de verificación
                            <i className="bi bi-shield-check"></i>
                            // Rol del usuario o "admin" por defecto
                            {user?.rol || 'admin'}
                        </span>
                        // Botón que cierra la sesión del usuario
                        <button onClick={handleLogout} className="admin-logout-btn">
                            // Ícono de salida del sistema
                            <i className="bi bi-box-arrow-right"></i>
                            // Texto del botón de cierre de sesión
                            <span>Cerrar Sesión</span>
                        </button>
                    </div>
                </header>

                // Contenedor del contenido dinámico del panel
                <div className="admin-content">
                    // Si la pestaña activa es Dashboard, muestra el panel principal
                    {activeTab === 'Dashboard' && (
                        // Fragmento que agrupa el contenido del Dashboard
                        <>
                            // Banner de bienvenida del panel
                            <div className="admin-welcome-banner">
                                // Contenido de texto del banner de bienvenida
                                <div className="admin-welcome-content">
                                    // Saludo de bienvenida con el nombre del usuario
                                    <h2>Bendiciones, {user?.name || 'Administrador'}</h2>
                                    // Mensaje de bienvenida al panel de administración
                                    <p>Aquí tienes el panel general de la iglesia. Que Dios guíe cada paso que tomes en la administración de este ministerio hoy.</p>
                                </div>
                                // Ícono decorativo de estrellas del banner
                                <div className="admin-welcome-icon"><i className="bi bi-stars"></i></div>
                            </div>

                            // Sección que muestra las estadísticas del sitio
                            <section className="admin-stats">
                                // Define los datos de las tarjetas de estadísticas
                                {[
                                    // Estadística de miembros
                                    { label: 'Miembros', icon: 'bi-people-fill', value: stats.miembros, color: 'var(--primary-600)' },
                                    // Estadística de eventos
                                    { label: 'Eventos', icon: 'bi-calendar-check', value: stats.eventos, color: 'var(--gold-500)' },
                                    // Estadística de mensajes
                                    { label: 'Mensajes', icon: 'bi-envelope-fill', value: stats.mensajes, color: 'var(--primary-500)' },
                                    // Estadística de visitas
                                    { label: 'Visitas', icon: 'bi-eye-fill', value: stats.visitas, color: 'var(--gold-600)' }
                                // Recorre las estadísticas y genera una tarjeta por cada una
                                ].map((stat, index) => (
                                    // Tarjeta de estadística con animación escalonada
                                    <div key={stat.label} className="admin-stat-card" style={{ animationDelay: `${index * 0.08}s` }}>
                                        // Contenedor del ícono de la estadística
                                        <div className="admin-stat-icon" style={{ color: stat.color }}>
                                            // Ícono de la estadística
                                            <i className={`bi ${stat.icon}`}></i>
                                        </div>
                                        // Información de la estadística
                                        <div className="admin-stat-info">
                                            // Valor numérico de la estadística
                                            <span className="admin-stat-number">{stat.value}</span>
                                            // Etiqueta de la estadística
                                            <span className="admin-stat-label">{stat.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </section>

                            // Cuadrícula principal del Dashboard con el panel de control y el panel lateral
                            <div className="admin-dashboard-grid">
                                // Sección del panel de control
                                <section className="admin-section">
                                    // Encabezado de la sección del panel de control
                                    <div className="admin-section-header">
                                        // Título de la sección con ícono de cuadrícula
                                        <h2><i className="bi bi-grid"></i> Panel de Control</h2>
                                        // Insignia de estado activo del sistema
                                        <span className="admin-status-badge"><span className="admin-status-dot"></span> Activo</span>
                                    </div>
                                    // Descripción de cómo usar el panel de control
                                    <p className="admin-section-desc">Gestiona el contenido de la iglesia desde aquí. Selecciona una opción en el menú lateral para comenzar.</p>
                                    // Contenedor de las tarjetas de acceso rápido
                                    <div className="admin-cards">
                                        // Recorre las tarjetas de administración y genera una por cada una
                                        {adminCards.map((card, index) => (
                                            // Tarjeta clicable que cambia a la pestaña correspondiente
                                            <div key={card.title} className="admin-card" onClick={() => setActiveTab(card.title === 'Miembros' ? 'Miembros' : card.title)} style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}>
                                                // Contenedor del ícono con el gradiente de la tarjeta
                                                <div className="admin-card-icon" style={{ background: card.gradient }}>
                                                    // Ícono de la tarjeta
                                                    <i className={`bi ${card.icon}`}></i>
                                                </div>
                                                // Cuerpo de la tarjeta con título y descripción
                                                <div className="admin-card-body">
                                                    // Título de la tarjeta
                                                    <h3>{card.title}</h3>
                                                    // Descripción de la tarjeta
                                                    <p>{card.description}</p>
                                                </div>
                                                // Brillo decorativo de la tarjeta
                                                <div className="admin-card-shine"></div>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                // Panel lateral del Dashboard con acciones rápidas y actividad reciente
                                <aside className="admin-sidebar-right">
                                    // Bloque de acciones rápidas
                                    <div className="admin-quick-actions">
                                        // Título del bloque de acciones rápidas
                                        <h3><i className="bi bi-lightning-fill"></i> Acciones rápidas</h3>
                                        // Contenedor de los botones de acciones rápidas
                                        <div className="admin-quick-btns">
                                            // Botón que abre la pestaña de Eventos
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Eventos')}>
                                                // Ícono de más y texto de nuevo evento
                                                <i className="bi bi-plus-circle"></i> Nuevo evento
                                            </button>
                                            // Botón que abre la pestaña de Mensajes
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Mensajes')}>
                                                // Ícono de burbuja de chat y texto "Ver Mensajes"
                                                <i className="bi bi-chat-dots"></i> Ver Mensajes
                                            </button>
                                            // Botón que abre la pestaña de Miembros
                                            <button className="admin-quick-btn" onClick={() => setActiveTab('Miembros')}>
                                                // Ícono de persona con más y texto "Agregar pastor"
                                                <i className="bi bi-person-plus"></i> Agregar pastor
                                            </button>
                                        </div>
                                    </div>

                                    // Bloque de actividad reciente
                                    <div className="admin-activity">
                                        // Título del bloque de actividad reciente
                                        <h3><i className="bi bi-activity"></i> Actividad reciente</h3>
                                        // Lista de actividades recientes
                                        <div className="admin-activity-list">
                                            // Recorre las actividades recientes y genera una fila por cada una
                                            {recentActivity.map((item, index) => (
                                                // Fila de actividad con estilo según su tipo
                                                <div key={index} className={`admin-activity-item admin-activity-item--${item.type}`}>
                                                    // Ícono de la actividad
                                                    <div className="admin-activity-icon"><i className={`bi ${item.icon}`}></i></div>
                                                    // Información de la actividad
                                                    <div className="admin-activity-info">
                                                        // Texto descriptivo de la actividad
                                                        <span className="admin-activity-text">{item.text}</span>
                                                        // Hora en que ocurrió la actividad
                                                        <span className="admin-activity-time">{item.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    // Tarjeta con los datos del usuario autenticado
                                    <div className="admin-user-card">
                                        // Avatar del usuario
                                        <div className="admin-user-card-avatar"><i className="bi bi-person-fill"></i></div>
                                        // Información del usuario
                                        <div className="admin-user-card-info">
                                            // Nombre del usuario o texto por defecto
                                            <span className="admin-user-card-name">{user?.name || 'Administrador'}</span>
                                            // Correo electrónico del usuario
                                            <span className="admin-user-card-email">{user?.email}</span>
                                        </div>
                                    </div>
                                </aside>
                            </div>
                        </>
                    )}

                    // Si la pestaña activa es Eventos, muestra el componente de administración de eventos
                    {activeTab === 'Eventos' && <AdminEventos />}
                    // Si la pestaña activa es Miembros, muestra el componente de administración de pastores
                    {activeTab === 'Miembros' && <AdminPastores />}
                    // Si la pestaña activa es Mensajes, muestra el componente de administración de mensajes
                    {activeTab === 'Mensajes' && <AdminMensajes />}
                    // Si la pestaña activa es Anuncios, muestra el componente de administración de anuncios
                    {activeTab === 'Anuncios' && <AdminAnuncios />}
                    // Si la pestaña activa es Recursos, muestra el componente de administración de recursos
                    {activeTab === 'Recursos' && <AdminRecursos />}
                    // Si la pestaña activa es Slides, muestra el componente de administración de slides
                    {activeTab === 'Slides' && <AdminSlides />}
                    // Si la pestaña activa es Horarios, muestra el componente de administración de horarios
                    {activeTab === 'Horarios' && <AdminHorarios />}
                    // Si la pestaña activa es Galería, muestra el componente de administración de la galería
                    {activeTab === 'Galería' && <AdminGaleria />}
                    // Si la pestaña activa es Configuración, muestra un aviso de "próximamente"
                    {activeTab === 'Configuración' && <div className="admin-coming-soon"><i className="bi bi-gear"></i><h2>Configuración</h2><p>Próximamente disponible.</p></div>}
                </div>
            </main>
        </div>
    );
}
