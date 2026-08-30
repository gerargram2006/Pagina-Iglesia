import { useEffect, useState } from 'react';
import { api, getUploadUrl, type ApiSlide } from '../../api';

interface SlideFormData {
    id: number | null;
    titulo: string;
    subtitulo: string;
    imagen_url: string;
    imagen: File | null;
    btn_principal: string;
    btn_secundario: string;
    orden: number;
    activo: boolean;
}

const emptySlide: SlideFormData = { id: null, titulo: '', subtitulo: '', imagen_url: '', imagen: null, btn_principal: '', btn_secundario: '', orden: 0, activo: true };

function slideForm(slide: ApiSlide | null): SlideFormData {
    if (!slide) return emptySlide;
    return {
        id: slide.id,
        titulo: slide.titulo ?? '',
        subtitulo: slide.subtitulo ?? '',
        imagen_url: slide.imagen_url ?? '',
        imagen: null,
        btn_principal: slide.btn_principal ?? '',
        btn_secundario: slide.btn_secundario ?? '',
        orden: slide.orden ?? 0,
        activo: slide.activo === 1,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminSlides() {
    const [slides, setSlides] = useState<ApiSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<SlideFormData>(emptySlide);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filteredSlides = slides.filter(s =>
        s.titulo.toLowerCase().includes(search.toLowerCase())
    );

    const cargarSlides = async () => {
        try {
            setLoading(true);
            setError('');
            setSlides(await api.slides.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los slides.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarSlides(); }, []);

    const handleOpenModal = (slide: ApiSlide | null = null) => {
        setFormData(slideForm(slide));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptySlide);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('subtitulo', formData.subtitulo);
        payload.append('btn_principal', formData.btn_principal);
        payload.append('btn_secundario', formData.btn_secundario);
        payload.append('orden', String(formData.orden));
        payload.append('activo', formData.activo ? '1' : '0');
        if (formData.imagen) {
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            payload.append('imagen_url', formData.imagen_url);
        }

        try {
            if (formData.id) await api.slides.update(formData.id, payload);
            else await api.slides.create(payload);
            setModalOpen(false);
            setFormData(emptySlide);
            await cargarSlides();
            showToast(formData.id ? 'Slide actualizado' : 'Slide creado correctamente');
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el slide.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este slide? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.slides.delete(id);
            setSlides((items) => items.filter((slide) => slide.id !== id));
            showToast('Slide eliminado correctamente');
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el slide.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando slides del Hero...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2><i className="bi bi-images" style={{ marginRight: '10px', color: 'var(--gold-500)' }}></i>Slides del Hero Principal</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count"><i className="bi bi-collection"></i> {slides.length} registros</span>
                    <button className="btn-secondary" onClick={cargarSlides}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-plus-circle"></i> Nuevo Slide</button>
                </div>
            </div>

            <div className="admin-crud-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar por título..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="admin-crud-search-clear" onClick={() => setSearch('')}><i className="bi bi-x-circle"></i></button>}
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de slides */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>Orden</th><th>Imagen</th><th>Título</th><th>Botones</th><th>Estado</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {filteredSlides.map((slide) => (
                            <tr key={slide.id} style={{ opacity: slide.activo ? 1 : 0.5 }}>
                                <td><span className="badge-cargo">{slide.orden}</span></td>
                                <td>{slide.imagen_url ? (
                                    /\.(mp4|webm|mov|ogg)$/i.test(slide.imagen_url)
                                        ? <div className="admin-table-img-placeholder" style={{ background: '#606C5922', color: '#606C59' }}><i className="bi bi-camera-video"></i></div>
                                        : <img src={getUploadUrl(slide.imagen_url)} alt="" className="admin-table-img" />
                                ) : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                {/* Muestra el título sin saltos de línea y un fragmento del subtítulo */}
                                <td><strong>{slide.titulo.replace(/\n/g, ' ')}</strong><br /><small style={{ color: '#888' }}>{(slide.subtitulo ?? '').slice(0, 60)}...</small></td>
                                {/* Muestra el texto de ambos botones del slide */}
                                <td><small>{slide.btn_principal} / {slide.btn_secundario}</small></td>
                                {/* Muestra una insignia con el estado activo o inactivo del slide */}
                                <td><span className={`badge-cargo`} style={{ background: slide.activo ? '#606C5922' : '#dc354522', color: slide.activo ? '#606C59' : '#dc3545' }}>{slide.activo ? 'Activo' : 'Inactivo'}</span></td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del slide para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(slide)} title="Editar slide" aria-label={`Editar ${slide.titulo}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el slide, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(slide.id)} title="Borrar slide" aria-label={`Borrar ${slide.titulo}`} disabled={deletingId === slide.id}><i className={deletingId === slide.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay slides registrados */}
                        {filteredSlides.length === 0 && <tr><td colSpan={6} className="admin-table-empty">{search ? 'No se encontraron slides.' : 'No hay slides registrados.'}</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="slide-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="slide-modal-title">{formData.id ? 'Editar Slide' : 'Nuevo Slide'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del título del slide */}
                            <div className="form-group"><label htmlFor="slide-title">Título del slide</label><input id="slide-title" type="text" required maxLength={200} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} placeholder="Ej: Bienvenido a&#10;Asamblea de Dios" /></div>
                            {/* Área de texto para el subtítulo del slide */}
                            <div className="form-group"><label htmlFor="slide-subtitle">Subtítulo / Descripción</label><textarea id="slide-subtitle" rows={2} maxLength={5000} value={formData.subtitulo} onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}></textarea></div>
                            <div className="form-group">
                                <label htmlFor="slide-image">Imagen o Video de fondo</label>
                                {/* Selector de archivo de imagen/video que guarda el archivo elegido en el formulario */}
                                <input id="slide-image" type="file" accept="image/*,video/mp4,video/webm,video/quicktime" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {/* Avisa que el archivo actual se reemplazará si se sube uno nuevo */}
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Archivo actual guardado. Si subes uno nuevo, lo reemplazará.</small>}
                            </div>
                            {/* Contenedor con dos columnas para los textos de los botones */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {/* Campo del texto del botón principal */}
                                <div className="form-group"><label htmlFor="slide-btn1">Botón principal</label><input id="slide-btn1" type="text" maxLength={100} value={formData.btn_principal} onChange={(e) => setFormData({ ...formData, btn_principal: e.target.value })} placeholder="Ej: Conéctate" /></div>
                                {/* Campo del texto del botón secundario */}
                                <div className="form-group"><label htmlFor="slide-btn2">Botón secundario</label><input id="slide-btn2" type="text" maxLength={100} value={formData.btn_secundario} onChange={(e) => setFormData({ ...formData, btn_secundario: e.target.value })} placeholder="Ej: Saber más" /></div>
                            </div>
                            {/* Contenedor con dos columnas para orden y visibilidad */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                {/* Campo numérico del orden del slide */}
                                <div className="form-group"><label htmlFor="slide-order">Orden</label><input id="slide-order" type="number" min={0} value={formData.orden} onChange={(e) => setFormData({ ...formData, orden: Number(e.target.value) || 0 })} /></div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                                    {/* Casilla para controlar si el slide es visible en la web */}
                                    <input id="slide-active" type="checkbox" checked={formData.activo} onChange={(e) => setFormData({ ...formData, activo: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                                    <label htmlFor="slide-active" style={{ margin: 0 }}>Visible en la web</label>
                                </div>
                            </div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar slide</>}</button></div>
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
