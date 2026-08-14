// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiPastor para consumir el backend
import { api, type ApiPastor } from '../../api';

// Define la estructura de los datos del formulario del miembro del equipo pastoral
interface PastorFormData {
    // Identificador opcional del miembro (null si es nuevo)
    id: number | null;
    // Nombre completo del miembro
    nombre: string;
    // Cargo o rol del miembro
    cargo: string;
    // Biografía o descripción del miembro
    biografia: string;
    // URL de la foto ya existente
    foto_url: string;
    // Archivo de foto seleccionado para subir
    foto: File | null;
}

// Define los valores iniciales para el formulario de un miembro vacío
const emptyPastor: PastorFormData = { id: null, nombre: '', cargo: '', biografia: '', foto_url: '', foto: null };

// Convierte un miembro de la API en datos para el formulario
function pastorForm(pastor: ApiPastor | null): PastorFormData {
    // Si no hay miembro, retorna los valores por defecto
    if (!pastor) return emptyPastor;
    // Construye el objeto con los datos del miembro recibido
    return {
        // Copia el id del miembro
        id: pastor.id,
        // Usa el nombre guardado o una cadena vacía
        nombre: pastor.nombre ?? '',
        // Usa el cargo guardado o una cadena vacía
        cargo: pastor.cargo ?? '',
        // Usa la biografía guardada o una cadena vacía
        biografia: pastor.biografia ?? '',
        // Usa la URL de la foto guardada o una cadena vacía
        foto_url: pastor.foto_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        foto: null,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración del equipo pastoral
export default function AdminPastores() {
    // Estado con la lista de miembros cargados desde el backend
    const [pastores, setPastores] = useState<ApiPastor[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<PastorFormData>(emptyPastor);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del miembro que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de miembros desde el backend
    const cargarPastores = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los miembros y los guarda en el estado
            setPastores(await api.pastores.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudo cargar el equipo pastoral.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los miembros automáticamente al montar el componente
    useEffect(() => { cargarPastores(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (pastor: ApiPastor | null = null) => {
        // Carga los datos del miembro (o vacíos) en el formulario
        setFormData(pastorForm(pastor));
        // Limpia el error del formulario
        setFormError('');
        // Abre el modal
        setModalOpen(true);
    };

    // Cierra el modal y limpia el formulario
    const handleCloseModal = () => {
        // No permite cerrar el modal mientras se está guardando
        if (saving) return;
        // Cierra el modal
        setModalOpen(false);
        // Reinicia el formulario a los valores vacíos
        setFormData(emptyPastor);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el miembro al enviar el formulario
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Limpia el error del formulario antes de guardar
        setFormError('');
        // Activa el indicador de guardado
        setSaving(true);
        // Crea un FormData para enviar archivos y datos al backend
        const payload = new FormData();
        // Añade el nombre al payload
        payload.append('nombre', formData.nombre);
        // Añade el cargo al payload
        payload.append('cargo', formData.cargo);
        // Añade la biografía al payload
        payload.append('biografia', formData.biografia);
        // Si se seleccionó un archivo de foto
        if (formData.foto) {
            // Añade el archivo de foto al payload
            payload.append('foto', formData.foto);
        } else if (formData.foto_url) {
            // Si no hay archivo, envía la URL de la foto existente
            payload.append('foto_url', formData.foto_url);
        }

        // Inicia el bloque de manejo de errores
        try {
            // Si tiene id, actualiza el miembro existente
            if (formData.id) await api.pastores.update(formData.id, payload);
            // Si no tiene id, crea un miembro nuevo
            else await api.pastores.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyPastor);
            // Recarga la lista para reflejar los cambios
            await cargarPastores();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el registro.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un miembro tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este registro? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del miembro en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el miembro
            await api.pastores.delete(id);
            // Quita el miembro borrado de la lista del estado
            setPastores((items) => items.filter((pastor) => pastor.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el registro.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando equipo pastoral...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Equipo Pastoral</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de miembros manualmente */}
                    <button className="btn-secondary" onClick={cargarPastores}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un miembro nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-person-plus"></i> Añadir miembro</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de miembros */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Foto</th><th>Nombre</th><th>Cargo</th><th>Biografía</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de miembros para mostrar una fila por cada uno */}
                        {pastores.map((pastor) => (
                            <tr key={pastor.id}>
                                <td>{pastor.id}</td>
                                {/* Muestra el avatar de la foto o un marcador de posición si no hay URL */}
                                <td>{pastor.foto_url ? <img src={pastor.foto_url.startsWith('http') ? pastor.foto_url : `http://localhost:3307${pastor.foto_url}`} alt="" className="admin-table-avatar" /> : <div className="admin-table-avatar-placeholder"><i className="bi bi-person"></i></div>}</td>
                                <td><strong>{pastor.nombre}</strong></td>
                                <td><span className="badge-cargo">{pastor.cargo}</span></td>
                                {/* Muestra la biografía recortada con un ancho máximo en la tabla */}
                                <td className="text-truncate" style={{ maxWidth: '200px' }}>{pastor.biografia}</td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del miembro para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(pastor)} title="Editar miembro" aria-label={`Editar ${pastor.nombre}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el miembro, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(pastor.id)} title="Borrar miembro" aria-label={`Borrar ${pastor.nombre}`} disabled={deletingId === pastor.id}><i className={deletingId === pastor.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay miembros registrados */}
                        {pastores.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay miembros registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="pastor-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="pastor-modal-title">{formData.id ? 'Editar miembro' : 'Nuevo miembro'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del nombre completo del miembro */}
                            <div className="form-group"><label htmlFor="pastor-name">Nombre completo</label><input id="pastor-name" type="text" required maxLength={100} value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} /></div>
                            {/* Campo del cargo o rol del miembro */}
                            <div className="form-group"><label htmlFor="pastor-role">Cargo o rol</label><input id="pastor-role" type="text" required maxLength={100} value={formData.cargo} onChange={(e) => setFormData({ ...formData, cargo: e.target.value })} /></div>
                            <div className="form-group">
                                <label htmlFor="pastor-photo">Foto (Opcional)</label>
                                {/* Selector de archivo de foto que guarda la imagen elegida en el formulario */}
                                <input id="pastor-photo" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, foto: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {/* Avisa que la foto actual se reemplazará si se sube una nueva */}
                                {formData.foto_url && !formData.foto && <small className="text-muted d-block mt-1">Foto actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            {/* Área de texto para la biografía del miembro */}
                            <div className="form-group"><label htmlFor="pastor-bio">Biografía</label><textarea id="pastor-bio" rows={4} maxLength={5000} value={formData.biografia} onChange={(e) => setFormData({ ...formData, biografia: e.target.value })}></textarea></div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar cambios</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
