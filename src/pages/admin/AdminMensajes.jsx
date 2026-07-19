/**
 * Componente AdminMensajes - Panel de bandeja de entrada de mensajes.
 *
 * Este componente muestra los mensajes recibidos desde el formulario
 * de contacto público y permite eliminarlos.
 *
 * Funcionalidades:
 *   - Listado de mensajes en tarjetas con avatar, nombre, email, fecha y contenido
 *   - Eliminación con confirmación de seguridad
 *   - Estado vacío amigable cuando no hay mensajes
 *   - Contador total de mensajes en el header
 *
 * Endpoints utilizados (a través de src/api/index.js):
 *   - GET /api/mensajes       → Cargar todos los mensajes (ordenados por fecha descendente)
 *   - DELETE /api/mensajes/:id → Eliminar un mensaje específico
 *
 * Estructura del componente:
 *   - Header con título "Bandeja de Entrada" y badge con cantidad de mensajes
 *   - Lista de tarjetas de mensajes (cada una con avatar, info del remitente, fecha y contenido)
 *   - Estado vacío con icono de sobre abierto cuando no hay mensajes
 */

// Importa hooks de React: useState para estado local, useEffect para efectos secundarios
import { useState, useEffect } from 'react';
// Importa el objeto api que centraliza todas las peticiones al backend
import { api } from '../../api';

/**
 * Componente funcional AdminMensajes.
 * Renderiza la bandeja de entrada de mensajes del panel de administración.
 */
export default function AdminMensajes() {
    // Estado que almacena el array de mensajes cargados desde el backend
    const [mensajes, setMensajes] = useState([]);
    // Estado que indica si se están cargando los datos (muestra spinner)
    const [loading, setLoading] = useState(true);
    // Estado que almacena mensaje de error si falla la carga
    const [error, setError] = useState('');

    // Efecto que se ejecuta una vez al montar el componente para cargar los mensajes
    useEffect(() => {
        cargarMensajes(); // Llama a la función que obtiene los mensajes del backend
    }, []); // Array vacío = se ejecuta solo al montar

    /**
     * Función asíncrona que carga todos los mensajes desde el backend.
     * Los mensajes se ordenan por fecha de envío descendente (más recientes primero).
     * Actualiza el estado 'mensajes' con los datos recibidos.
     */
    const cargarMensajes = async () => {
        try {
            setLoading(true); // Activa el estado de carga
            // Realiza petición GET al backend para obtener todos los mensajes
            const data = await api.mensajes.getAll();
            setMensajes(data); // Actualiza el estado con los mensajes recibidos
        } catch (err) {
            setError('Error al cargar los mensajes'); // Muestra error si falla la petición
        } finally {
            setLoading(false); // Siempre desactiva el estado de carga al terminar
        }
    };

    /**
     * Elimina un mensaje después de confirmación del usuario.
     * @param {number} id - ID del mensaje a eliminar
     */
    const handleDelete = async (id) => {
        // Muestra diálogo de confirmación del navegador antes de eliminar
        if (!window.confirm('¿Estás seguro de que quieres borrar este mensaje?')) return;
        try {
            await api.mensajes.delete(id); // Envía petición DELETE al backend
            await cargarMensajes(); // Recarga la lista después de eliminar
        } catch (err) {
            // Muestra alerta con el error si falla la eliminación
            alert('Error al borrar: ' + err.message);
        }
    };

    // Muestra spinner de carga mientras se obtienen los mensajes del backend
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando bandeja de entrada...</div>;

    // Renderiza la interfaz de bandeja de entrada
    return (
        <div className="admin-crud-section">
            {/* Header de la sección con título y badge con la cantidad de mensajes */}
            <div className="admin-crud-header">
                <h2>Bandeja de Entrada</h2>
                <div className="admin-crud-actions">
                    {/* Badge que muestra el total de mensajes */}
                    <span className="badge-count">{mensajes.length} Mensajes</span>
                </div>
            </div>

            {/* Mensaje de error (solo se muestra si hay error) */}
            {error && <div className="admin-error-msg">{error}</div>}

            {/* Lista de mensajes recibidos */}
            <div className="admin-messages-list">
                {/* Estado vacío: se muestra cuando no hay mensajes */}
                {mensajes.length === 0 ? (
                    <div className="admin-empty-state">
                        <i className="bi bi-envelope-open"></i>
                        <p>No tienes mensajes nuevos</p>
                    </div>
                ) : (
                    /* Renderiza cada mensaje como una tarjeta */
                    mensajes.map(msg => (
                        <div key={msg.id} className="admin-message-card">
                            {/* Header del mensaje: info del remitente y fecha */}
                            <div className="admin-message-header">
                                <div className="admin-message-sender">
                                    {/* Avatar con la inicial del nombre del remitente */}
                                    <div className="admin-message-avatar">
                                        {msg.nombre.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="admin-message-info">
                                        <h4>{msg.nombre}</h4>
                                        {/* Enlace mailto para responder directamente al remitente */}
                                        <a href={`mailto:${msg.email}`}>{msg.email}</a>
                                    </div>
                                </div>
                                <div className="admin-message-meta">
                                    {/* Fecha y hora de envío formateada en español peruano */}
                                    <span className="admin-message-date">
                                        {new Date(msg.fecha_envio).toLocaleDateString('es-PE')} 
                                        {' a las '}
                                        {new Date(msg.fecha_envio).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                    {/* Botón de eliminar mensaje */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(msg.id)} title="Borrar mensaje">
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                            {/* Cuerpo del mensaje con el texto completo */}
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
