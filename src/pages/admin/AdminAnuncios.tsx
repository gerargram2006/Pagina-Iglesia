import { useEffect, useState } from 'react';
import { api, type ApiAnuncio } from '../../api';

interface AnuncioFormData {
    id: number | null;
    titulo: string;
    descripcion: string;
    imagen_url: string;
    imagen: File | null;
}

const emptyAnuncio: AnuncioFormData = { id: null, titulo: '', descripcion: '', imagen_url: '', imagen: null };

function anuncioForm(anuncio: ApiAnuncio | null): AnuncioFormData {
    if (!anuncio) return emptyAnuncio;
    return {
        id: anuncio.id,
        titulo: anuncio.titulo ?? '',
        descripcion: anuncio.descripcion ?? '',
        imagen_url: anuncio.imagen_url ?? '',
        imagen: null,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminAnuncios() {
    const [anuncios, setAnuncios] = useState<ApiAnuncio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<AnuncioFormData>(emptyAnuncio);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const cargarAnuncios = async () => {
        try {
            setLoading(true);
            setError('');
            setAnuncios(await api.anuncios.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los anuncios.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarAnuncios(); }, []);

    const handleOpenModal = (anuncio: ApiAnuncio | null = null) => {
        setFormData(anuncioForm(anuncio));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyAnuncio);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('titulo', formData.titulo);
        payload.append('descripcion', formData.descripcion);
        if (formData.imagen) {
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            payload.append('imagen_url', formData.imagen_url);
        }

        try {
            if (formData.id) await api.anuncios.update(formData.id, payload);
            else await api.anuncios.create(payload);
            setModalOpen(false);
            setFormData(emptyAnuncio);
            await cargarAnuncios();
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el anuncio.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este anuncio? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.anuncios.delete(id);
            setAnuncios((items) => items.filter((anuncio) => anuncio.id !== id));
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el anuncio.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando anuncios...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Anuncios</h2>
                <div className="admin-crud-actions">
                    <button className="btn-secondary" onClick={cargarAnuncios}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-megaphone"></i> Nuevo Anuncio</button>
                </div>
            </div>

            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead><tr><th>ID</th><th>Imagen</th><th>Título</th><th>Descripción</th><th>Fecha</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {anuncios.map((anuncio) => (
                            <tr key={anuncio.id}>
                                <td>{anuncio.id}</td>
                                <td>{anuncio.imagen_url ? <img src={anuncio.imagen_url.startsWith('http') ? anuncio.imagen_url : `http://localhost:3307${anuncio.imagen_url}`} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                <td><strong>{anuncio.titulo}</strong></td>
                                <td className="text-truncate" style={{ maxWidth: '250px' }}>{anuncio.descripcion}</td>
                                <td>{new Date(anuncio.fecha_creacion).toLocaleDateString('es-PE', { dateStyle: 'medium' })}</td>
                                <td><div className="admin-table-actions">
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(anuncio)} title="Editar anuncio" aria-label={`Editar ${anuncio.titulo}`}><i className="bi bi-pencil"></i></button>
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(anuncio.id)} title="Borrar anuncio" aria-label={`Borrar ${anuncio.titulo}`} disabled={deletingId === anuncio.id}><i className={deletingId === anuncio.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {anuncios.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay anuncios registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="anuncio-modal-title">
                        <div className="admin-modal-header"><h3 id="anuncio-modal-title">{formData.id ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            <div className="form-group"><label htmlFor="anuncio-title">Título del anuncio</label><input id="anuncio-title" type="text" required maxLength={150} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} /></div>
                            <div className="form-group">
                                <label htmlFor="anuncio-image">Imagen del anuncio (Opcional)</label>
                                <input id="anuncio-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            <div className="form-group"><label htmlFor="anuncio-description">Descripción</label><textarea id="anuncio-description" rows={4} maxLength={5000} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}></textarea></div>
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar anuncio</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
