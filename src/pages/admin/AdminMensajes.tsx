// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiMensaje para consumir el backend
import { api, type ApiMensaje } from '../../api';

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de mensajes (bandeja de entrada)
export default function AdminMensajes() {
    // Estado con la lista de mensajes cargados desde el backend
    const [mensajes, setMensajes] = useState<ApiMensaje[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado con el id del mensaje que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de mensajes desde el backend
    const cargarMensajes = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los mensajes y los guarda en el estado
            setMensajes(await api.mensajes.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los mensajes.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los mensajes automáticamente al montar el componente
    useEffect(() => { cargarMensajes(); }, []);

    // Elimina un mensaje tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este mensaje? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del mensaje en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el mensaje
            await api.mensajes.delete(id);
            // Quita el mensaje borrado de la lista del estado
            setMensajes((items) => items.filter((mensaje) => mensaje.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el mensaje.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando bandeja de entrada...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Bandeja de entrada</h2>
                <div className="admin-crud-actions">
                    {/* Insignia que muestra la cantidad total de mensajes */}
                    <span className="badge-count">{mensajes.length} mensajes</span>
                    {/* Botón que recarga la lista de mensajes manualmente */}
                    <button className="btn-secondary" onClick={cargarMensajes}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor de la lista de mensajes */}
            <div className="admin-messages-list">
                {/* Si no hay mensajes muestra un estado vacío, si no lista las tarjetas */}
                {mensajes.length === 0 ? (
                    <div className="admin-empty-state"><i className="bi bi-envelope-open"></i><p>No tienes mensajes nuevos</p></div>
                ) : mensajes.map((mensaje) => (
                    // Tarjeta con los datos de cada mensaje
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
        </div>
    );
}
