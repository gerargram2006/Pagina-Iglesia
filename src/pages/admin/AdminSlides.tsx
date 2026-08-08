import { useEffect, useState } from 'react';
import { api, type ApiSlide } from '../../api';

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
                <h2>Slides del Hero Principal</h2>
                <div className="admin-crud-actions">
                    <button className="btn-secondary" onClick={cargarSlides}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-plus-circle"></i> Nuevo Slide</button>
                </div>
            </div>

            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>Orden</th><th>Imagen</th><th>Título</th><th>Botones</th><th>Estado</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {slides.map((slide) => (
                            <tr key={slide.id} style={{ opacity: slide.activo ? 1 : 0.5 }}>
                                <td><span className="badge-cargo">{slide.orden}</span></td>
                                <td>{slide.imagen_url ? <img src={slide.imagen_url.startsWith('http') ? slide.imagen_url : `http://localhost:3307${slide.imagen_url}`} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                <td><strong>{slide.titulo.replace(/\n/g, ' ')}</strong><br /><small style={{ color: '#888' }}>{(slide.subtitulo ?? '').slice(0, 60)}...</small></td>
                                <td><small>{slide.btn_principal} / {slide.btn_secundario}</small></td>
                                <td><span className={`badge-cargo`} style={{ background: slide.activo ? '#2d6a4f22' : '#dc354522', color: slide.activo ? '#2d6a4f' : '#dc3545' }}>{slide.activo ? 'Activo' : 'Inactivo'}</span></td>
                                <td><div className="admin-table-actions">
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(slide)} title="Editar slide" aria-label={`Editar ${slide.titulo}`}><i className="bi bi-pencil"></i></button>
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(slide.id)} title="Borrar slide" aria-label={`Borrar ${slide.titulo}`} disabled={deletingId === slide.id}><i className={deletingId === slide.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {slides.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay slides registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="slide-modal-title">
                        <div className="admin-modal-header"><h3 id="slide-modal-title">{formData.id ? 'Editar Slide' : 'Nuevo Slide'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            <div className="form-group"><label htmlFor="slide-title">Título del slide</label><input id="slide-title" type="text" required maxLength={200} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} placeholder="Ej: Bienvenido a&#10;Asamblea de Dios" /></div>
                            <div className="form-group"><label htmlFor="slide-subtitle">Subtítulo / Descripción</label><textarea id="slide-subtitle" rows={2} maxLength={5000} value={formData.subtitulo} onChange={(e) => setFormData({ ...formData, subtitulo: e.target.value })}></textarea></div>
                            <div className="form-group">
                                <label htmlFor="slide-image">Imagen de fondo</label>
                                <input id="slide-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label htmlFor="slide-btn1">Botón principal</label><input id="slide-btn1" type="text" maxLength={100} value={formData.btn_principal} onChange={(e) => setFormData({ ...formData, btn_principal: e.target.value })} placeholder="Ej: Conéctate" /></div>
                                <div className="form-group"><label htmlFor="slide-btn2">Botón secundario</label><input id="slide-btn2" type="text" maxLength={100} value={formData.btn_secundario} onChange={(e) => setFormData({ ...formData, btn_secundario: e.target.value })} placeholder="Ej: Saber más" /></div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                <div className="form-group"><label htmlFor="slide-order">Orden</label><input id="slide-order" type="number" min={0} value={formData.orden} onChange={(e) => setFormData({ ...formData, orden: Number(e.target.value) || 0 })} /></div>
                                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '24px' }}>
                                    <input id="slide-active" type="checkbox" checked={formData.activo} onChange={(e) => setFormData({ ...formData, activo: e.target.checked })} style={{ width: '18px', height: '18px' }} />
                                    <label htmlFor="slide-active" style={{ margin: 0 }}>Visible en la web</label>
                                </div>
                            </div>
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar slide</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
