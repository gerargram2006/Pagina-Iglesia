/**
 * Componente AdminPastores - Panel de gestión CRUD del equipo pastoral.
 *
 * Este componente permite a los administradores gestionar (crear, editar,
 * eliminar) los registros de pastores y líderes de la iglesia.
 *
 * Funcionalidades:
 *   - Listado de pastores en una tabla con foto, nombre, cargo y biografía
 *   - Modal de creación/edición con formulario completo
 *   - Eliminación con confirmación de seguridad
 *   - Estados de carga y error manejados correctamente
 *
 * Endpoints utilizados (a través de src/api/index.js):
 *   - GET /api/pastores      → Cargar todos los pastores
 *   - POST /api/pastores     → Crear nuevo pastor
 *   - PUT /api/pastores/:id  → Actualizar pastor existente
 *   - DELETE /api/pastores/:id → Eliminar pastor
 *
 * Estructura del componente:
 *   - Header con título y botón "Añadir Miembro"
 *   - Tabla de pastores con columnas: ID, Foto, Nombre, Cargo, Biografía, Acciones
 *   - Modal overlay con formulario para crear/editar pastores
 *   - Cada fila tiene botones de Editar (pencil) y Borrar (trash)
 */

// Importa hooks de React: useState para estado local, useEffect para efectos secundarios
import { useState, useEffect } from 'react';
// Importa el objeto api que centraliza todas las peticiones al backend
import { api } from '../../api';

/**
 * Componente funcional AdminPastores.
 * Renderiza la gestión del equipo pastoral del panel de administración.
 */
export default function AdminPastores() {
    // Estado que almacena el array de pastores cargados desde el backend
    const [pastores, setPastores] = useState([]);
    // Estado que indica si se están cargando los datos (muestra spinner)
    const [loading, setLoading] = useState(true);
    // Estado que almacena mensaje de error si falla la carga
    const [error, setError] = useState('');
    
    // Estado que controla la visibilidad del modal de formulario
    const [modalOpen, setModalOpen] = useState(false);
    // Estado que almacena los datos del formulario del modal (campos: id, nombre, cargo, biografia, foto_url)
    const [formData, setFormData] = useState({ id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
    // Estado que indica si se está guardando (deshabilita botón y muestra spinner)
    const [saving, setSaving] = useState(false);

    // Efecto que se ejecuta una vez al montar el componente para cargar los pastores
    useEffect(() => {
        cargarPastores(); // Llama a la función que obtiene los pastores del backend
    }, []); // Array vacío = se ejecuta solo al montar

    /**
     * Función asíncrona que carga todos los pastores desde el backend.
     * Actualiza el estado 'pastores' con los datos recibidos.
     * Maneja errores mostrando un mensaje de error.
     */
    const cargarPastores = async () => {
        try {
            setLoading(true); // Activa el estado de carga
            // Realiza petición GET al backend para obtener todos los pastores
            const data = await api.pastores.getAll();
            setPastores(data); // Actualiza el estado con los pastores recibidos
        } catch (err) {
            setError('Error al cargar la lista de pastores'); // Muestra error si falla la petición
        } finally {
            setLoading(false); // Siempre desactiva el estado de carga al terminar
        }
    };

    /**
     * Abre el modal de formulario para crear o editar un pastor.
     * @param {Object|null} pastor - Si se pasa un pastor, se abre en modo edición; si es null, en modo creación
     */
    const handleOpenModal = (pastor = null) => {
        if (pastor) {
            // Modo edición: rellena el formulario con los datos del pastor existente
            setFormData(pastor);
        } else {
            // Modo creación: inicializa el formulario con valores vacíos
            setFormData({ id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
        }
        setModalOpen(true); // Muestra el modal
    };

    /**
     * Cierra el modal de formulario y limpia los datos del formulario.
     */
    const handleCloseModal = () => {
        setModalOpen(false); // Oculta el modal
        // Resetea el formulario a valores vacíos
        setFormData({ id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
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
            if (formData.id) {
                // Si tiene id, es una actualización → PUT al backend
                await api.pastores.update(formData.id, formData);
            } else {
                // Si no tiene id, es una creación → POST al backend
                await api.pastores.create(formData);
            }
            await cargarPastores(); // Recarga la lista de pastores después de guardar
            handleCloseModal(); // Cierra el modal
        } catch (err) {
            // Muestra alerta con el error si falla la operación
            alert('Error al guardar: ' + err.message);
        } finally {
            setSaving(false); // Siempre desactiva el estado de guardado
        }
    };

    /**
     * Elimina un pastor después de confirmación del usuario.
     * @param {number} id - ID del pastor a eliminar
     */
    const handleDelete = async (id) => {
        // Muestra diálogo de confirmación del navegador antes de eliminar
        if (!window.confirm('¿Estás seguro de que quieres borrar este registro?')) return;
        try {
            await api.pastores.delete(id); // Envía petición DELETE al backend
            await cargarPastores(); // Recarga la lista después de eliminar
        } catch (err) {
            // Muestra alerta con el error si falla la eliminación
            alert('Error al borrar: ' + err.message);
        }
    };

    // Muestra spinner de carga mientras se obtienen los pastores del backend
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando equipo pastoral...</div>;

    // Renderiza la interfaz de gestión de pastores
    return (
        <div className="admin-crud-section">
            {/* Header de la sección con título y botón para añadir nuevo miembro */}
            <div className="admin-crud-header">
                <h2>Equipo Pastoral</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <i className="bi bi-person-plus"></i> Añadir Miembro
                </button>
            </div>

            {/* Mensaje de error (solo se muestra si hay error) */}
            {error && <div className="admin-error-msg">{error}</div>}

            {/* Contenedor de la tabla de pastores */}
            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Biografía</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Renderiza cada pastor como una fila de la tabla */}
                        {pastores.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    {/* Muestra foto si existe URL, sino muestra placeholder con icono */}
                                    {p.foto_url ? 
                                        <img src={p.foto_url} alt="foto" className="admin-table-avatar" /> : 
                                        <div className="admin-table-avatar-placeholder"><i className="bi bi-person"></i></div>
                                    }
                                </td>
                                <td><strong>{p.nombre}</strong></td>
                                {/* Badge con el cargo del pastor */}
                                <td><span className="badge-cargo">{p.cargo}</span></td>
                                {/* Biografía truncada a 200px de ancho máximo */}
                                <td className="text-truncate" style={{maxWidth: '200px'}}>{p.biografia}</td>
                                <td>
                                    {/* Botones de acción: Editar y Borrar */}
                                    <div className="admin-table-actions">
                                        <button className="btn-icon btn-edit" onClick={() => handleOpenModal(p)} title="Editar">
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(p.id)} title="Borrar">
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {/* Fila de "vacío" cuando no hay pastores */}
                        {pastores.length === 0 && (
                            <tr><td colSpan="6" className="admin-table-empty">No hay pastores registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal overlay de formulario para crear/editar pastores */}
            {modalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        {/* Header del modal con título dinámico */}
                        <div className="admin-modal-header">
                            <h3>{formData.id ? 'Editar Miembro' : 'Nuevo Miembro'}</h3>
                            <button className="admin-modal-close" onClick={handleCloseModal}><i className="bi bi-x-lg"></i></button>
                        </div>
                        {/* Formulario del modal */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.nombre} 
                                    onChange={e => setFormData({...formData, nombre: e.target.value})}
                                    placeholder="Ej. Juan Pérez"
                                />
                            </div>
                            <div className="form-group">
                                <label>Cargo / Rol</label>
                                <input 
                                    type="text" 
                                    required 
                                    value={formData.cargo} 
                                    onChange={e => setFormData({...formData, cargo: e.target.value})}
                                    placeholder="Ej. Pastor Principal"
                                />
                            </div>
                            <div className="form-group">
                                <label>URL de la Foto</label>
                                <input 
                                    type="url" 
                                    value={formData.foto_url} 
                                    onChange={e => setFormData({...formData, foto_url: e.target.value})}
                                    placeholder="https://..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Biografía Breve</label>
                                <textarea 
                                    rows="4" 
                                    value={formData.biografia} 
                                    onChange={e => setFormData({...formData, biografia: e.target.value})}
                                    placeholder="Breve historia o presentación..."
                                ></textarea>
                            </div>
                            
                            {/* Footer del modal con botones Cancelar y Guardar */}
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary" disabled={saving}>
                                    {saving ? <i className="bi bi-arrow-repeat spin"></i> : <i className="bi bi-save"></i>} 
                                    {saving ? ' Guardando...' : ' Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
