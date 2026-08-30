import { useEffect, useState } from 'react';
import { api, getUploadUrl, type ApiGaleria } from '../../api';

interface GaleriaFormData {
    id: number | null;
    titulo: string;
    imagen_url: string;
    imagen: File | null;
    destacada: boolean;
    orden: number;
}

const emptyGaleria: GaleriaFormData = { id: null, titulo: '', imagen_url: '', imagen: null, destacada: false, orden: 0 };

function galeriaForm(item: ApiGaleria | null): GaleriaFormData {
    if (!item) return emptyGaleria;
    return {
        id: item.id,
        titulo: item.titulo ?? '',
        imagen_url: item.imagen_url ?? '',
        imagen: null,
        destacada: item.destacada === 1,
        orden: item.orden ?? 0,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminGaleria() {
    const [galeria, setGaleria] = useState<ApiGaleria[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<GaleriaFormData>(emptyGaleria);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filteredGaleria = galeria.filter(g =>
        g.titulo.toLowerCase().includes(search.toLowerCase())
    );

    const cargarGaleria = async () => {
        try {
            setLoading(true);
            setError('');
            setGaleria(await api.galeria.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar las imágenes.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarGaleria(); }, []);

    const handleOpenModal = (item: ApiGaleria | null = null) => {
        setFormData(galeriaForm(item));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyGaleria);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('destacada', formData.destacada ? '1' : '0');
        payload.append('orden', String(formData.orden));
        if (formData.imagen) {
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            payload.append('imagen_url', formData.imagen_url);
        }

        try {
            if (formData.id) await api.galeria.update(formData.id, payload);
            else await api.galeria.create(payload);
            setModalOpen(false);
            setFormData(emptyGaleria);
            await cargarGaleria();
            showToast(formData.id ? 'Imagen actualizada correctamente' : 'Imagen agregada correctamente');
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar la imagen.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar esta imagen? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.galeria.delete(id);
            setGaleria((items) => items.filter((item) => item.id !== id));
            showToast('Imagen eliminada correctamente');
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar la imagen.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando galería...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2><i className="bi bi-camera" style={{ marginRight: '10px', color: 'var(--gold-500)' }}></i>Galería de Fotos</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count"><i className="bi bi-collection"></i> {galeria.length} registros</span>
                    <button className="btn-secondary" onClick={cargarGaleria}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-image"></i> Nueva Foto</button>
                </div>
            </div>

            <div className="admin-crud-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar por título..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="admin-crud-search-clear" onClick={() => setSearch('')}><i className="bi bi-x-circle"></i></button>}
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de imágenes */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>Orden</th><th>Imagen</th><th>Título</th><th>Destacada</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {filteredGaleria.map((item) => (
                            <tr key={item.id}>
                                <td><span className="badge-cargo">{item.orden}</span></td>
                                <td>{item.imagen_url ? <img src={getUploadUrl(item.imagen_url)} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                <td><strong>{item.titulo}</strong></td>
                                {/* Muestra una insignia según si la imagen es destacada o normal */}
                                <td><span className="badge-cargo" style={{ background: item.destacada ? '#b8942e22' : '#6c757d22', color: item.destacada ? '#b8942e' : '#6c757d' }}>{item.destacada ? '⭐ Destacada' : 'Normal'}</span></td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos de la imagen para editarla */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(item)} title="Editar imagen" aria-label={`Editar ${item.titulo}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra la imagen, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(item.id)} title="Borrar imagen" aria-label={`Borrar ${item.titulo}`} disabled={deletingId === item.id}><i className={deletingId === item.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay imágenes registradas */}
                        {filteredGaleria.length === 0 && <tr><td colSpan={5} className="admin-table-empty">{search ? 'No se encontraron imágenes.' : 'No hay imágenes en la galería.'}</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="galeria-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="galeria-modal-title">{formData.id ? 'Editar Imagen' : 'Nueva Imagen'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del título con límite de 150 caracteres */}
                            <div className="form-group"><label htmlFor="galeria-title">Título / Etiqueta</label><input id="galeria-title" type="text" required maxLength={150} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} placeholder="Ej: Alabanza y Adoración" /></div>
                            <div className="form-group">
                                <label htmlFor="galeria-image">Foto</label>
                                {/* Selector de archivo de imagen que guarda la foto elegida en el formulario */}
                                <input id="galeria-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} required={!formData.imagen_url && !formData.id} />
                                {/* Avisa que la imagen actual se reemplazará si se sube una nueva */}
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            {/* Contenedor con dos columnas para orden y destacada */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {/* Campo numérico del orden */}
                                <div className="form-group"><label htmlFor="galeria-order">Orden</label><input id="galeria-order" type="number" min={0} value={formData.orden} onChange={(e) => setFormData({ ...formData, orden: Number(e.target.value) || 0 })} /></div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                                    {/* Casilla para marcar la imagen como destacada */}
                                    <input id="galeria-featured" type="checkbox" checked={formData.destacada} onChange={(e) => setFormData({ ...formData, destacada: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                                    <label htmlFor="galeria-featured" style={{ margin: 0 }}>Imagen destacada (ancha)</label>
                                </div>
                            </div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar imagen</>}</button></div>
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
