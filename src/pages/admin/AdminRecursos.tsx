// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiRecurso para consumir el backend
import { api, type ApiRecurso } from '../../api';

// Define la estructura de los datos del formulario del recurso descargable
interface RecursoFormData {
    // Identificador opcional del recurso (null si es nuevo)
    id: number | null;
    // Título del recurso
    titulo: string;
    // Descripción del recurso
    descripcion: string;
    // Tipo de archivo (PDF, DOCX, ZIP, etc.)
    tipo: string;
    // URL del archivo ya existente
    archivo_url: string;
    // Archivo seleccionado para subir
    archivo: File | null;
}

// Define los valores iniciales para el formulario de un recurso vacío
const emptyRecurso: RecursoFormData = { id: null, titulo: '', descripcion: '', tipo: 'PDF', archivo_url: '', archivo: null };

// Convierte un recurso de la API en datos para el formulario
function recursoForm(recurso: ApiRecurso | null): RecursoFormData {
    // Si no hay recurso, retorna los valores por defecto
    if (!recurso) return emptyRecurso;
    // Construye el objeto con los datos del recurso recibido
    return {
        // Copia el id del recurso
        id: recurso.id,
        // Usa el título guardado o una cadena vacía
        titulo: recurso.titulo ?? '',
        // Usa la descripción guardada o una cadena vacía
        descripcion: recurso.descripcion ?? '',
        // Usa el tipo guardado o 'PDF' como valor por defecto
        tipo: recurso.tipo ?? 'PDF',
        // Usa la URL del archivo guardada o una cadena vacía
        archivo_url: recurso.archivo_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        archivo: null,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de recursos descargables
export default function AdminRecursos() {
    // Estado con la lista de recursos cargados desde el backend
    const [recursos, setRecursos] = useState<ApiRecurso[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<RecursoFormData>(emptyRecurso);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del recurso que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de recursos desde el backend
    const cargarRecursos = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los recursos y los guarda en el estado
            setRecursos(await api.recursos.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los recursos.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los recursos automáticamente al montar el componente
    useEffect(() => { cargarRecursos(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (recurso: ApiRecurso | null = null) => {
        // Carga los datos del recurso (o vacíos) en el formulario
        setFormData(recursoForm(recurso));
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
        setFormData(emptyRecurso);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el recurso al enviar el formulario
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Limpia el error del formulario antes de guardar
        setFormError('');
        // Activa el indicador de guardado
        setSaving(true);
        // Crea un FormData para enviar archivos y datos al backend
        const payload = new FormData();
        // Añade el título al payload
        payload.append('titulo', formData.titulo);
        // Añade la descripción al payload
        payload.append('descripcion', formData.descripcion);
        // Añade el tipo de archivo al payload
        payload.append('tipo', formData.tipo);
        // Si se seleccionó un archivo
        if (formData.archivo) {
            // Añade el archivo al payload
            payload.append('archivo', formData.archivo);
        } else if (formData.archivo_url) {
            // Si no hay archivo, envía la URL del archivo existente
            payload.append('archivo_url', formData.archivo_url);
        } else {
            // Muestra un error si no hay archivo ni URL
            setFormError('Debe seleccionar un archivo.');
            // Desactiva el indicador de guardado
            setSaving(false);
            // Detiene el envío del formulario
            return;
        }

        // Inicia el bloque de manejo de errores
        try {
            // Si tiene id, actualiza el recurso existente
            if (formData.id) await api.recursos.update(formData.id, payload);
            // Si no tiene id, crea un recurso nuevo
            else await api.recursos.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyRecurso);
            // Recarga la lista para reflejar los cambios
            await cargarRecursos();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el recurso.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un recurso tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este recurso? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del recurso en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el recurso
            await api.recursos.delete(id);
            // Quita el recurso borrado de la lista del estado
            setRecursos((items) => items.filter((recurso) => recurso.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el recurso.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando recursos...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Recursos Descargables</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de recursos manualmente */}
                    <button className="btn-secondary" onClick={cargarRecursos}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un recurso nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-cloud-arrow-up"></i> Nuevo Recurso</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de recursos */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Tipo</th><th>Título</th><th>Descripción</th><th>Archivo</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de recursos para mostrar una fila por cada uno */}
                        {recursos.map((recurso) => (
                            <tr key={recurso.id}>
                                <td>{recurso.id}</td>
                                <td><span className="badge-cargo">{recurso.tipo}</span></td>
                                <td><strong>{recurso.titulo}</strong></td>
                                {/* Muestra la descripción recortada con un ancho máximo en la tabla */}
                                <td className="text-truncate" style={{ maxWidth: '250px' }}>{recurso.descripcion}</td>
                                <td>
                                    {/* Si el recurso tiene un archivo real muestra un enlace para verlo */}
                                    {recurso.archivo_url && recurso.archivo_url !== '#' ? (
                                        <a href={recurso.archivo_url.startsWith('http') ? recurso.archivo_url : `http://localhost:3307${recurso.archivo_url}`} target="_blank" rel="noreferrer" className="btn-icon" title="Ver archivo">
                                            <i className="bi bi-file-earmark-pdf"></i>
                                        </a>
                                    ) : (
                                        // Si no hay archivo muestra un guion
                                        <span className="text-muted"><i className="bi bi-dash"></i></span>
                                    )}
                                </td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del recurso para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(recurso)} title="Editar recurso" aria-label={`Editar ${recurso.titulo}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el recurso, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(recurso.id)} title="Borrar recurso" aria-label={`Borrar ${recurso.titulo}`} disabled={deletingId === recurso.id}><i className={deletingId === recurso.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay recursos registrados */}
                        {recursos.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay recursos registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="recurso-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="recurso-modal-title">{formData.id ? 'Editar Recurso' : 'Nuevo Recurso'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del título del recurso */}
                            <div className="form-group"><label htmlFor="recurso-title">Título del recurso</label><input id="recurso-title" type="text" required maxLength={150} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} /></div>
                            {/* Campo del tipo de archivo del recurso */}
                            <div className="form-group"><label htmlFor="recurso-type">Tipo de archivo</label><input id="recurso-type" type="text" required maxLength={50} value={formData.tipo} onChange={(e) => setFormData({ ...formData, tipo: e.target.value })} placeholder="Ej. PDF, DOCX, ZIP" /></div>
                            <div className="form-group">
                                <label htmlFor="recurso-file">Archivo (PDF)</label>
                                {/* Selector de archivo PDF que guarda el archivo elegido en el formulario */}
                                <input id="recurso-file" type="file" accept="application/pdf" onChange={(e) => setFormData({ ...formData, archivo: e.target.files?.[0] || null })} required={!formData.archivo_url && !formData.id} />
                                {/* Avisa que el archivo actual se reemplazará si se sube uno nuevo */}
                                {formData.archivo_url && !formData.archivo && <small className="text-muted d-block mt-1">Archivo actual guardado. Si subes uno nuevo, lo reemplazará.</small>}
                            </div>
                            {/* Área de texto para la descripción del recurso */}
                            <div className="form-group"><label htmlFor="recurso-description">Descripción</label><textarea id="recurso-description" rows={4} maxLength={5000} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}></textarea></div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar recurso</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
