import { useEffect, useState } from 'react';
import { api, getUploadUrl, type ApiRecurso } from '../../api';

interface RecursoFormData {
    id: number | null;
    titulo: string;
    descripcion: string;
    tipo: string;
    archivo_url: string;
    archivo: File | null;
}

const emptyRecurso: RecursoFormData = { id: null, titulo: '', descripcion: '', tipo: 'PDF', archivo_url: '', archivo: null };

function recursoForm(recurso: ApiRecurso | null): RecursoFormData {
    if (!recurso) return emptyRecurso;
    return {
        id: recurso.id,
        titulo: recurso.titulo ?? '',
        descripcion: recurso.descripcion ?? '',
        tipo: recurso.tipo ?? 'PDF',
        archivo_url: recurso.archivo_url ?? '',
        archivo: null,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminRecursos() {
    const [recursos, setRecursos] = useState<ApiRecurso[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<RecursoFormData>(emptyRecurso);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filteredRecursos = recursos.filter(r =>
        r.titulo.toLowerCase().includes(search.toLowerCase()) ||
        r.tipo.toLowerCase().includes(search.toLowerCase())
    );

    const cargarRecursos = async () => {
        try {
            setLoading(true);
            setError('');
            setRecursos(await api.recursos.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los recursos.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarRecursos(); }, []);

    const handleOpenModal = (recurso: ApiRecurso | null = null) => {
        setFormData(recursoForm(recurso));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyRecurso);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('descripcion', formData.descripcion);
        payload.append('tipo', formData.tipo);
        if (formData.archivo) {
            payload.append('archivo', formData.archivo);
        } else if (formData.archivo_url) {
            payload.append('archivo_url', formData.archivo_url);
        } else {
            setFormError('Debe seleccionar un archivo.');
            setSaving(false);
            return;
        }

        try {
            if (formData.id) await api.recursos.update(formData.id, payload);
            else await api.recursos.create(payload);
            setModalOpen(false);
            setFormData(emptyRecurso);
            await cargarRecursos();
            showToast(formData.id ? 'Recurso actualizado correctamente' : 'Recurso creado correctamente');
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el recurso.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este recurso? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.recursos.delete(id);
            setRecursos((items) => items.filter((recurso) => recurso.id !== id));
            showToast('Recurso eliminado correctamente');
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el recurso.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando recursos...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2><i className="bi bi-folder2-open" style={{ marginRight: '10px', color: 'var(--gold-500)' }}></i>Gestión de Recursos Descargables</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count"><i className="bi bi-collection"></i> {recursos.length} registros</span>
                    <button className="btn-secondary" onClick={cargarRecursos}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-cloud-arrow-up"></i> Nuevo Recurso</button>
                </div>
            </div>

            <div className="admin-crud-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar por título o tipo..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="admin-crud-search-clear" onClick={() => setSearch('')}><i className="bi bi-x-circle"></i></button>}
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de recursos */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Tipo</th><th>Título</th><th>Descripción</th><th>Archivo</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {filteredRecursos.map((recurso) => (
                            <tr key={recurso.id}>
                                <td>{recurso.id}</td>
                                <td><span className="badge-cargo">{recurso.tipo}</span></td>
                                <td><strong>{recurso.titulo}</strong></td>
                                <td className="text-truncate" style={{ maxWidth: '250px' }}>{recurso.descripcion}</td>
                                <td>
                                    {recurso.archivo_url && recurso.archivo_url !== '#' ? (
                                        <a href={getUploadUrl(recurso.archivo_url)} target="_blank" rel="noreferrer" className="btn-icon" title="Ver archivo">
                                            <i className="bi bi-file-earmark-pdf"></i>
                                        </a>
                                    ) : (
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
                        {filteredRecursos.length === 0 && <tr><td colSpan={6} className="admin-table-empty">{search ? 'No se encontraron recursos.' : 'No hay recursos registrados.'}</td></tr>}
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
            {toast.show && (
                <div className={`admin-toast admin-toast--${toast.type}`}>
                    <i className={`bi ${toast.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'}`}></i>
                    {toast.text}
                </div>
            )}
        </div>
    );
}
