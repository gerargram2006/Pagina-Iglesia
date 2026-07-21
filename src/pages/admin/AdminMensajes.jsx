import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function AdminMensajes() {
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => { cargarMensajes(); }, []);

    const cargarMensajes = async () => {
        try {
            setLoading(true);
            const data = await api.mensajes.getAll();
            setMensajes(data);
        } catch {
            setError('Error al cargar los mensajes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres borrar este mensaje?')) return;
        try {
            await api.mensajes.delete(id);
            await cargarMensajes();
        } catch (err) {
            alert('Error al borrar: ' + err.message);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando bandeja de entrada...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Bandeja de Entrada</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count">{mensajes.length} Mensajes</span>
                </div>
            </div>

            {error && <div className="admin-error-msg">{error}</div>}

            <div className="admin-messages-list">
                {mensajes.length === 0 ? (
                    <div className="admin-empty-state">
                        <i className="bi bi-envelope-open"></i>
                        <p>No tienes mensajes nuevos</p>
                    </div>
                ) : (
                    mensajes.map(msg => (
                        <div key={msg.id} className="admin-message-card">
                            <div className="admin-message-header">
                                <div className="admin-message-sender">
                                    <div className="admin-message-avatar">
                                        {msg.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="admin-message-info">
                                        <h4>{msg.nombre}</h4>
                                        <a href={`mailto:${msg.email}`}>{msg.email}</a>
                                    </div>
                                </div>
                                <div className="admin-message-meta">
                                    <span className="admin-message-date">
                                        {new Date(msg.fecha_envio).toLocaleDateString('es-PE')}
                                        {' a las '}
                                        {new Date(msg.fecha_envio).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(msg.id)} title="Borrar mensaje">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="admin-message-body">
                                <p>{msg.mensaje}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
