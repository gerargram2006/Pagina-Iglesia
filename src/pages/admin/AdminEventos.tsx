import { useEffect, useState } from 'react';
import { api, type ApiEvento } from '../../api';

interface EventFormData {
    id: number | null;
    titulo: string;
    descripcion: string;
    fecha: string;
    lugar: string;
    imagen_url: string;
    imagen: File | null;
}

const emptyEvent: EventFormData = { id: null, titulo: '', descripcion: '', fecha: '', lugar: 'Auditorio Principal', imagen_url: '', imagen: null };

function eventForm(evento: ApiEvento | null): EventFormData {
    if (!evento) return emptyEvent;
    return {
        id: evento.id,
        titulo: evento.titulo ?? '',
        descripcion: evento.descripcion ?? '',
        fecha: String(evento.fecha ?? '').replace(' ', 'T').slice(0, 16),
        lugar: evento.lugar ?? '',
        imagen_url: evento.imagen_url ?? '',
        imagen: null,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminEventos() {
    const [eventos, setEventos] = useState<ApiEvento[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<EventFormData>(emptyEvent);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const cargarEventos = async () => {
        try {
            setLoading(true);
            setError('');
            setEventos(await api.eventos.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los eventos.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarEventos(); }, []);

    const handleOpenModal = (evento: ApiEvento | null = null) => {
        setFormData(eventForm(evento));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyEvent);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('descripcion', formData.descripcion);
        payload.append('fecha', `${formData.fecha.replace('T', ' ')}:00`);
        payload.append('lugar', formData.lugar);
        if (formData.imagen) {
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            payload.append('imagen_url', formData.imagen_url);
        }

        try {
            if (formData.id) await api.eventos.update(formData.id, payload);
            else await api.eventos.create(payload);
            setModalOpen(false);
            setFormData(emptyEvent);
            await cargarEventos();
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el evento.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este evento? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.eventos.delete(id);
            setEventos((items) => items.filter((evento) => evento.id !== id));
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el evento.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando eventos...</div>;

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
