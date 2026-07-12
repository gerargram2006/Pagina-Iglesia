import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Admin() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="admin-page">
            <div className="admin-container">
                <div className="admin-header">
                    <div className="admin-user-info">
                        <div className="admin-avatar">
                            <i className="bi bi-person-fill"></i>
                        </div>
                        <div>
                            <h1>Bienvenido, {user?.name || 'Administrador'}</h1>
                            <p className="admin-email">{user?.email}</p>
                        </div>
                    </div>
                    <div className="admin-actions">
                        <button onClick={handleLogout} className="btn btn-secondary admin-logout-btn">
                            <i className="bi bi-box-arrow-right"></i>
                            Cerrar Sesion
                        </button>
                    </div>
                </div>

                <div className="admin-section">
                    <h2>
                        <i className="bi bi-grid"></i>
                        Panel de Control
                    </h2>
                    <p className="admin-section-desc">
                        Aqui puedes gestionar el contenido de la iglesia.
                        Esta seccion esta en construccion.
                    </p>

                    <div className="admin-cards">
                        <div className="admin-card">
                            <div className="admin-card-icon">
                                <i className="bi bi-calendar-event"></i>
                            </div>
                            <h3>Eventos</h3>
                            <p>Crear y administrar eventos de la iglesia</p>
                        </div>
                        <div className="admin-card">
                            <div className="admin-card-icon">
                                <i className="bi bi-megaphone"></i>
                            </div>
                            <h3>Anuncios</h3>
                            <p>Publicar anuncios para la congregacion</p>
                        </div>
                        <div className="admin-card">
                            <div className="admin-card-icon">
                                <i className="bi bi-people"></i>
                            </div>
                            <h3>Miembros</h3>
                            <p>Administrar el directorio de miembros</p>
                        </div>
                        <div className="admin-card">
                            <div className="admin-card-icon">
                                <i className="bi bi-chat-dots"></i>
                            </div>
                            <h3>Mensajes</h3>
                            <p>Revisar mensajes de contacto</p>
                        </div>
                    </div>
                </div>

                <div className="admin-footer-link">
                    <Link to="/">
                        <i className="bi bi-arrow-left"></i>
                        Volver al sitio
                    </Link>
                </div>
            </div>
        </div>
    );
}
