import { useEffect, useState } from 'react';
import { api, type ApiMensaje } from '../../api';

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminMensajes() {
    const [mensajes, setMensajes] = useState<ApiMensaje[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filteredMensajes = mensajes.filter(m =>
        m.nombre.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        m.mensaje.toLowerCase().includes(search.toLowerCase())
    );

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

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este mensaje? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.mensajes.delete(id);
            setMensajes((items) => items.filter((mensaje) => mensaje.id !== id));
            showToast('Mensaje eliminado correctamente');
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
                <h2><i className="bi bi-envelope" style={{ marginRight: '10px', color: 'var(--gold-500)' }}></i>Bandeja de entrada</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count"><i className="bi bi-envelope-open"></i> {mensajes.length} mensajes</span>
                    <button className="btn-secondary" onClick={cargarMensajes}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                </div>
            </div>

            <div className="admin-crud-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar por nombre, email o contenido..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="admin-crud-search-clear" onClick={() => setSearch('')}><i className="bi bi-x-circle"></i></button>}
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor de la lista de mensajes */}
            <div className="admin-messages-list">
                {/* Si no hay mensajes muestra un estado vacío, si no lista las tarjetas */}
                {filteredMensajes.length === 0 ? (
                    <div className="admin-empty-state"><i className="bi bi-envelope-open"></i><p>{search ? 'No se encontraron mensajes.' : 'No tienes mensajes nuevos'}</p></div>
                ) : filteredMensajes.map((mensaje) => (
                    <article key={mensaje.id} className="admin-message-card">
                        <div className="admin-message-header">
                            <div className="admin-message-sender">
                                {/* Avatar con la inicial del nombre del remitente */}
                                <div className="admin-message-avatar">{mensaje.nombre.charAt(0).toUpperCase()}</div>
                                <div className="admin-message-info"><h4>{mensaje.nombre}</h4><a href={`mailto:${mensaje.email}`}>{mensaje.email}</a></div>
                            </div>
                            <div className="admin-message-meta">
                                {/* Fecha de envío formateada en el idioma es-PE */}
                                <time className="admin-message-date" dateTime={mensaje.fecha_envio}>{new Date(mensaje.fecha_envio).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })}</time>
                                {/* Botón que borra el mensaje, con icono girando mientras se elimina */}
                                <button className="btn-icon btn-delete" onClick={() => handleDelete(mensaje.id)} title="Borrar mensaje" aria-label={`Borrar mensaje de ${mensaje.nombre}`} disabled={deletingId === mensaje.id}><i className={deletingId === mensaje.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                            </div>
                        </div>
                        {/* Cuerpo del mensaje con el texto enviado */}
                        <div className="admin-message-body"><p>{mensaje.mensaje}</p></div>
                    </article>
                ))}
            </div>

            {toast.show && (
                <div className={`admin-toast admin-toast--${toast.type}`}>
                    <i className={`bi ${toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`}></i>
                    {toast.text}
                </div>
            )}
        </div>
    );
}
