import { useEffect, useState } from 'react';
import { api } from '../../api';

function errorMessage(error, fallback) {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminMensajes() {
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const cargarMensajes = async () => {
        try {
            setLoading(true);
            setError('');
            setMensajes(await api.mensajes.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los mensajes.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarMensajes(); }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que quieres borrar este mensaje? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.mensajes.delete(id);
            setMensajes((items) => items.filter((mensaje) => mensaje.id !== id));
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el mensaje.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando bandeja de entrada...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Bandeja de entrada</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count">{mensajes.length} mensajes</span>
                    <button className="btn-secondary" onClick={cargarMensajes}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                </div>
            </div>

            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            <div className="admin-messages-list">
                {mensajes.length === 0 ? (
                    <div className="admin-empty-state"><i className="bi bi-envelope-open"></i><p>No tienes mensajes nuevos</p></div>
                ) : mensajes.map((mensaje) => (
                    <article key={mensaje.id} className="admin-message-card">
                        <div className="admin-message-header">
                            <div className="admin-message-sender">
                                <div className="admin-message-avatar">{mensaje.nombre.charAt(0).toUpperCase()}</div>
                                <div className="admin-message-info"><h4>{mensaje.nombre}</h4><a href={`mailto:${mensaje.email}`}>{mensaje.email}</a></div>
                            </div>
                            <div className="admin-message-meta">
                                <time className="admin-message-date" dateTime={mensaje.fecha_envio}>{new Date(mensaje.fecha_envio).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })}</time>
                                <button className="btn-icon btn-delete" onClick={() => handleDelete(mensaje.id)} title="Borrar mensaje" aria-label={`Borrar mensaje de ${mensaje.nombre}`} disabled={deletingId === mensaje.id}><i className={deletingId === mensaje.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                            </div>
                        </div>
                        <div className="admin-message-body"><p>{mensaje.mensaje}</p></div>
                    </article>
                ))}
            </div>
        </div>
    );
}
