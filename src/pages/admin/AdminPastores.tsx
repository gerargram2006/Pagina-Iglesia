import { useEffect, useState } from 'react';
import { api, type ApiPastor } from '../../api';

interface PastorFormData {
    id: number | null;
    nombre: string;
    cargo: string;
    biografia: string;
    foto_url: string;
    foto: File | null;
}

const emptyPastor: PastorFormData = { id: null, nombre: '', cargo: '', biografia: '', foto_url: '', foto: null };

function pastorForm(pastor: ApiPastor | null): PastorFormData {
    if (!pastor) return emptyPastor;
    return {
        id: pastor.id,
        nombre: pastor.nombre ?? '',
        cargo: pastor.cargo ?? '',
        biografia: pastor.biografia ?? '',
        foto_url: pastor.foto_url ?? '',
        foto: null,
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function AdminPastores() {
    const [pastores, setPastores] = useState<ApiPastor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<PastorFormData>(emptyPastor);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const cargarPastores = async () => {
        try {
            setLoading(true);
            setError('');
            setPastores(await api.pastores.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo cargar el equipo pastoral.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarPastores(); }, []);

    const handleOpenModal = (pastor: ApiPastor | null = null) => {
        setFormData(pastorForm(pastor));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyPastor);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);
        const payload = new FormData();
        payload.append('nombre', formData.nombre);
        payload.append('cargo', formData.cargo);
        payload.append('biografia', formData.biografia);
        if (formData.foto) {
            payload.append('foto', formData.foto);
        } else if (formData.foto_url) {
            payload.append('foto_url', formData.foto_url);
        }

        try {
            if (formData.id) await api.pastores.update(formData.id, payload);
            else await api.pastores.create(payload);
            setModalOpen(false);
            setFormData(emptyPastor);
            await cargarPastores();
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el registro.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este registro? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.pastores.delete(id);
            setPastores((items) => items.filter((pastor) => pastor.id !== id));
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el registro.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando equipo pastoral...</div>;

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
