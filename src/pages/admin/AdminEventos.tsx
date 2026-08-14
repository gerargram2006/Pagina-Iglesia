// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiEvento para consumir el backend
import { api, type ApiEvento } from '../../api';

// Define la estructura de los datos del formulario del evento
interface EventFormData {
    // Identificador opcional del evento (null si es nuevo)
    id: number | null;
    // Título del evento
    titulo: string;
    // Descripción detallada del evento
    descripcion: string;
    // Fecha y hora del evento en formato de entrada local
    fecha: string;
    // Lugar donde se realizará el evento
    lugar: string;
    // URL de la imagen ya existente
    imagen_url: string;
    // Archivo de imagen seleccionado para subir
    imagen: File | null;
}

// Define los valores iniciales para el formulario de un evento vacío
const emptyEvent: EventFormData = { id: null, titulo: '', descripcion: '', fecha: '', lugar: 'Auditorio Principal', imagen_url: '', imagen: null };

// Convierte un evento de la API en datos para el formulario
function eventForm(evento: ApiEvento | null): EventFormData {
    // Si no hay evento, retorna los valores por defecto
    if (!evento) return emptyEvent;
    // Construye el objeto con los datos del evento recibido
    return {
        // Copia el id del evento
        id: evento.id,
        // Usa el título guardado o una cadena vacía
        titulo: evento.titulo ?? '',
        // Usa la descripción guardada o una cadena vacía
        descripcion: evento.descripcion ?? '',
        // Convierte la fecha con espacio a formato datetime-local y recorta los segundos
        fecha: String(evento.fecha ?? '').replace(' ', 'T').slice(0, 16),
        // Usa el lugar guardado o una cadena vacía
        lugar: evento.lugar ?? '',
        // Usa la URL de la imagen guardada o una cadena vacía
        imagen_url: evento.imagen_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        imagen: null,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de eventos
export default function AdminEventos() {
    // Estado con la lista de eventos cargados desde el backend
    const [eventos, setEventos] = useState<ApiEvento[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<EventFormData>(emptyEvent);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del evento que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de eventos desde el backend
    const cargarEventos = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los eventos y los guarda en el estado
            setEventos(await api.eventos.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los eventos.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los eventos automáticamente al montar el componente
    useEffect(() => { cargarEventos(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (evento: ApiEvento | null = null) => {
        // Carga los datos del evento (o vacíos) en el formulario
        setFormData(eventForm(evento));
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
        setFormData(emptyEvent);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el evento al enviar el formulario
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
        // Convierte la fecha local a formato con espacio y añade los segundos
        payload.append('fecha', `${formData.fecha.replace('T', ' ')}:00`);
        // Añade el lugar al payload
        payload.append('lugar', formData.lugar);
        // Si se seleccionó un archivo de imagen
        if (formData.imagen) {
            // Añade el archivo de imagen al payload
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            // Si no hay archivo, envía la URL de la imagen existente
            payload.append('imagen_url', formData.imagen_url);
        }

        // Inicia el bloque de manejo de errores
        try {
            // Si tiene id, actualiza el evento existente
            if (formData.id) await api.eventos.update(formData.id, payload);
            // Si no tiene id, crea un evento nuevo
            else await api.eventos.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyEvent);
            // Recarga la lista para reflejar los cambios
            await cargarEventos();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el evento.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un evento tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este evento? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del evento en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el evento
            await api.eventos.delete(id);
            // Quita el evento borrado de la lista del estado
            setEventos((items) => items.filter((evento) => evento.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el evento.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando eventos...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Eventos</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de eventos manualmente */}
                    <button className="btn-secondary" onClick={cargarEventos}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un evento nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-plus-circle"></i> Nuevo Evento</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de eventos */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Imagen</th><th>Título</th><th>Fecha</th><th>Lugar</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de eventos para mostrar una fila por cada uno */}
                        {eventos.map((evento) => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                {/* Muestra la miniatura de la imagen o un marcador de posición si no hay URL */}
                                <td>{evento.imagen_url ? <img src={evento.imagen_url.startsWith('/uploads/') ? `http://localhost:3307${evento.imagen_url}` : evento.imagen_url} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                <td><strong>{evento.titulo}</strong></td>
                                {/* Formatea la fecha del evento en el idioma es-PE */}
                                <td>{new Date(evento.fecha).toLocaleString('es-PE', { dateStyle: 'medium', timeStyle: 'short' })}</td>
                                <td>{evento.lugar}</td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del evento para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(evento)} title="Editar evento" aria-label={`Editar ${evento.titulo}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el evento, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(evento.id)} title="Borrar evento" aria-label={`Borrar ${evento.titulo}`} disabled={deletingId === evento.id}><i className={deletingId === evento.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay eventos registrados */}
                        {eventos.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay eventos registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="event-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="event-modal-title">{formData.id ? 'Editar Evento' : 'Nuevo Evento'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del título del evento */}
                            <div className="form-group"><label htmlFor="event-title">Título del evento</label><input id="event-title" type="text" required maxLength={150} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} /></div>
                            {/* Campo de fecha y hora del evento */}
                            <div className="form-group"><label htmlFor="event-date">Fecha y hora</label><input id="event-date" type="datetime-local" required value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} /></div>
                            {/* Campo del lugar del evento */}
                            <div className="form-group"><label htmlFor="event-place">Lugar</label><input id="event-place" type="text" required maxLength={150} value={formData.lugar} onChange={(e) => setFormData({ ...formData, lugar: e.target.value })} /></div>
                            <div className="form-group">
                                <label htmlFor="event-image">Imagen del evento (Opcional)</label>
                                {/* Selector de archivo de imagen que guarda la foto elegida en el formulario */}
                                <input id="event-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {/* Avisa que la imagen actual se reemplazará si se sube una nueva */}
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            {/* Área de texto para la descripción del evento */}
                            <div className="form-group"><label htmlFor="event-description">Descripción</label><textarea id="event-description" rows={3} maxLength={5000} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}></textarea></div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar evento</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
