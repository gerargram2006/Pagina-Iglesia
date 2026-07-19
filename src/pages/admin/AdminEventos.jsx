/**
 * Componente AdminEventos - Panel de gestión CRUD de eventos.
 *
 * Este componente permite a los administradores crear, editar y eliminar
 * eventos de la iglesia desde el panel de administración.
 *
 * Funcionalidades:
 *   - Listado de eventos en una tabla con imagen thumbnail, título, fecha y lugar
 *   - Modal de creación/edición con formulario completo
 *   - Eliminación con confirmación de seguridad
 *   - Estados de carga y error manejados correctamente
 *   - Formateo de fechas en formato local peruano (es-PE)
 *
 * Endpoints utilizados (a través de src/api/index.js):
 *   - GET /api/eventos     → Cargar todos los eventos
 *   - POST /api/eventos    → Crear nuevo evento
 *   - PUT /api/eventos/:id → Actualizar evento existente
 *   - DELETE /api/eventos/:id → Eliminar evento
 *
 * Estructura del componente:
 *   - Header con título y botón "Nuevo Evento"
 *   - Tabla de eventos con columnas: ID, Imagen, Título, Fecha, Lugar, Acciones
 *   - Modal overlay con formulario para crear/editar eventos
 *   - Cada fila tiene botones de Editar (pencil) y Borrar (trash)
 */

// Importa hooks de React: useState para estado local, useEffect para efectos secundarios
import { useState, useEffect } from 'react';
// Importa el objeto api que centraliza todas las peticiones al backend
import { api } from '../../api';

/**
 * Componente funcional AdminEventos.
 * Renderiza la gestión de eventos del panel de administración.
 */
export default function AdminEventos() {
    // Estado que almacena el array de eventos cargados desde el backend
    const [eventos, setEventos] = useState([]);
    // Estado que indica si se están cargando los datos (muestra spinner)
    const [loading, setLoading] = useState(true);
    // Estado que almacena mensaje de error si falla la carga
    const [error, setError] = useState('');
    
    // Estado que controla la visibilidad del modal de formulario
    const [modalOpen, setModalOpen] = useState(false);
    // Estado que almacena los datos del formulario del modal (campos: id, titulo, descripcion, fecha, lugar, imagen_url)
    const [formData, setFormData] = useState({ id: null, titulo: '', descripcion: '', fecha: '', lugar: '', imagen_url: '' });
    // Estado que indica si se está guardando (deshabilita botón y muestra spinner)
    const [saving, setSaving] = useState(false);

    // Efecto que se ejecuta una vez al montar el componente para cargar los eventos
    useEffect(() => {
        cargarEventos(); // Llama a la función que obtiene los eventos del backend
    }, []); // Array vacío = se ejecuta solo al montar

    /**
     * Función asíncrona que carga todos los eventos desde el backend.
     * Actualiza el estado 'eventos' con los datos recibidos.
     * Maneja errores mostrando un mensaje de error.
     */
    const cargarEventos = async () => {
        try {
            setLoading(true); // Activa el estado de carga
            // Realiza petición GET al backend para obtener todos los eventos
            const data = await api.eventos.getAll();
            setEventos(data); // Actualiza el estado con los eventos recibidos
        } catch (err) {
            setError('Error al cargar los eventos'); // Muestra error si falla la petición
        } finally {
            setLoading(false); // Siempre desactiva el estado de carga al terminar
        }
    };

    /**
     * Abre el modal de formulario para crear o editar un evento.
     * @param {Object|null} evento - Si se pasa un evento, se abre en modo edición; si es null, en modo creación
     */
    const handleOpenModal = (evento = null) => {
        if (evento) {
            // Modo edición: formatea la fecha para el input datetime-local (YYYY-MM-DDThh:mm)
            const dateObj = new Date(evento.fecha); // Convierte la fecha del backend a objeto Date
            const formattedDate = dateObj.toISOString().slice(0, 16); // Formatea para input HTML: "2026-07-19T10:00"
            
            // Rellena el formulario con los datos del evento existente
            setFormData({ ...evento, fecha: formattedDate });
        } else {
            // Modo creación: inicializa el formulario con valores vacíos y lugar por defecto
            setFormData({ id: null, titulo: '', descripcion: '', fecha: '', lugar: 'Auditorio Principal', imagen_url: '' });
        }
        setModalOpen(true); // Muestra el modal
    };

    /**
     * Cierra el modal de formulario y limpia los datos del formulario.
     */
    const handleCloseModal = () => {
        setModalOpen(false); // Oculta el modal
        // Resetea el formulario a valores vacíos
        setFormData({ id: null, titulo: '', descripcion: '', fecha: '', lugar: '', imagen_url: '' });
    };

    /**
     * Maneja el envío del formulario del modal.
     * Decide si crear o actualizar según si formData.id existe.
     * @param {Event} e - Evento de envío del formulario
     */
    const handleSave = async (e) => {
        e.preventDefault(); // Previene que el formulario recargue la página
        try {
            setSaving(true); // Activa estado de guardado (deshabilita botón)
            // Formatea la fecha de HTML datetime-local a formato MySQL (YYYY-MM-DD HH:mm:ss)
            const mysqlDate = formData.fecha.replace('T', ' ') + ':00'; // Reemplaza 'T' por espacio y agrega segundos
            // Crea el payload con la fecha formateada para MySQL
            const payload = { ...formData, fecha: mysqlDate };

            if (formData.id) {
                // Si tiene id, es una actualización → PUT al backend
                await api.eventos.update(formData.id, payload);
            } else {
                // Si no tiene id, es una creación → POST al backend
                await api.eventos.create(payload);
            }
            await cargarEventos(); // Recarga la lista de eventos después de guardar
            handleCloseModal(); // Cierra el modal
        } catch (err) {
            // Muestra alerta con el error si falla la operación
            alert('Error al guardar: ' + err.message);
        } finally {
            setSaving(false); // Siempre desactiva el estado de guardado
        }
    };

    /**
     * Elimina un evento después de confirmación del usuario.
     * @param {number} id - ID del evento a eliminar
     */
    const handleDelete = async (id) => {
        // Muestra diálogo de confirmación del navegador antes de eliminar
        if (!window.confirm('¿Estás seguro de que quieres borrar este evento?')) return;
        try {
            await api.eventos.delete(id); // Envía petición DELETE al backend
            await cargarEventos(); // Recarga la lista después de eliminar
        } catch (err) {
            // Muestra alerta con el error si falla la eliminación
            alert('Error al borrar: ' + err.message);
        }
    };

    // Muestra spinner de carga mientras se obtienen los eventos del backend
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando eventos...</div>;

    // Renderiza la interfaz de gestión de eventos
    return (
        <div className="admin-crud-section">
            {/* Header de la sección con título y botón para crear nuevo evento */}
            <div className="admin-crud-header">
                <h2>Gestión de Eventos</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <i className="bi bi-plus-circle"></i> Nuevo Evento
                </button>
            </div>

            {/* Mensaje de error (solo se muestra si hay error) */}
            {error && <div className="admin-error-msg">{error}</div>}

            {/* Contenedor de la tabla de eventos */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Lugar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderiza cada evento como una fila de la tabla */}
                        {eventos.map(evt => (
                            <tr key={evt.id}>
                                <td>{evt.id}</td>
                                <td>
                                    {/* Muestra imagen thumbnail si existe URL, sino muestra placeholder */}
                                    {evt.imagen_url ? 
                                        <img src={evt.imagen_url} alt="thumbnail" className="admin-table-img" /> : 
                                        <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>
                                    }
                                </td>
                                <td><strong>{evt.titulo}</strong></td>
                                {/* Formatea la fecha en español peruano con hora */}
                                <td>{new Date(evt.fecha).toLocaleDateString('es-PE')} {new Date(evt.fecha).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}</td>
                                <td>{evt.lugar}</td>
                                <td>
                                    {/* Botones de acción: Editar y Borrar */}
                                    <div className="admin-table-actions">
                                        <button className="btn-icon btn-edit" onClick={() => handleOpenModal(evt)} title="Editar">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(evt.id)} title="Borrar">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* Fila de "vacío" cuando no hay eventos */}
                        {eventos.length === 0 && (
                            <tr><td colSpan="6" className="admin-table-empty">No hay eventos registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal overlay de formulario para crear/editar eventos */}
            {modalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        {/* Header del modal con título dinámico */}
                        <div className="admin-modal-header">
                            <h3>{formData.id ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                            <button className="admin-modal-close" onClick={handleCloseModal}><i className="bi bi-x-lg"></i></button>
                        </div>
                        {/* Formulario del modal */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-group">
                                <label>Título del Evento</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.titulo} 
                                    onChange={e => setFormData({...formData, titulo: e.target.value})}
                                    placeholder="Ej. Servicio Dominical"
                                />
                            </div>
                            <div className="form-group">
                                <label>Fecha y Hora</label>
                                <input 
                                    type="datetime-local" 
                                    required 
                                    value={formData.fecha} 
                                    onChange={e => setFormData({...formData, fecha: e.target.value})}
                                />
                            </div>
                            <div className="form-group">
                                <label>Lugar</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.lugar} 
                                    onChange={e => setFormData({...formData, lugar: e.target.value})}
                                    placeholder="Ej. Auditorio Principal"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL de Imagen</label>
                                <input 
                                    type="url" 
                                    value={formData.imagen_url} 
                                    onChange={e => setFormData({...formData, imagen_url: e.target.value})}
                                    placeholder="https://..."
                                />
                                <small>Enlace directo a una imagen web para mostrar en la tarjeta.</small>
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea 
                                    rows="3" 
                                    value={formData.descripcion} 
                                    onChange={e => setFormData({...formData, descripcion: e.target.value})}
                                    placeholder="Detalles del evento..."
                                ></textarea>
                            </div>
                            
                            {/* Footer del modal con botones Cancelar y Guardar */}
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary" disabled={saving}>
                                    {saving ? <i className="bi bi-arrow-repeat spin"></i> : <i className="bi bi-save"></i>} 
                                    {saving ? ' Guardando...' : ' Guardar Evento'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
