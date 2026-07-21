import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function AdminPastores() {
    const [pastores, setPastores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => { cargarPastores(); }, []);

    const cargarPastores = async () => {
        try {
            setLoading(true);
            const data = await api.pastores.getAll();
            setPastores(data);
        } catch {
            setError('Error al cargar la lista de pastores');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (pastor = null) => {
        setFormData(pastor || { id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setFormData({ id: null, nombre: '', cargo: '', biografia: '', foto_url: '' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            if (formData.id) {
                await api.pastores.update(formData.id, formData);
            } else {
                await api.pastores.create(formData);
            }
            await cargarPastores();
            handleCloseModal();
        } catch (err) {
            alert('Error al guardar: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres borrar este registro?')) return;
        try {
            await api.pastores.delete(id);
            await cargarPastores();
        } catch (err) {
            alert('Error al borrar: ' + err.message);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando equipo pastoral...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Equipo Pastoral</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <i className="bi bi-person-plus"></i> Añadir Miembro
                </button>
            </div>

            {error && <div className="admin-error-msg">{error}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Foto</th>
                            <th>Nombre</th>
                            <th>Cargo</th>
                            <th>Biografía</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pastores.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td>
                                    {p.foto_url ?
                                        <img src={p.foto_url} alt="foto" className="admin-table-avatar" /> :
                                        <div className="admin-table-avatar-placeholder"><i className="bi bi-person"></i></div>
                                    }
                                </td>
                                <td><strong>{p.nombre}</strong></td>
                                <td><span className="badge-cargo">{p.cargo}</span></td>
                                <td className="text-truncate" style={{maxWidth: '200px'}}>{p.biografia}</td>
                                <td>
                                    <div className="admin-table-actions">
                                        <button className="btn-icon btn-edit" onClick={() => handleOpenModal(p)} title="Editar"><i className="bi bi-pencil"></i></button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(p.id)} title="Borrar"><i className="bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pastores.length === 0 && (
                            <tr><td colSpan="6" className="admin-table-empty">No hay pastores registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{formData.id ? 'Editar Miembro' : 'Nuevo Miembro'}</h3>
                            <button className="admin-modal-close" onClick={handleCloseModal}><i className="bi bi-x-lg"></i></button>
                        </div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} placeholder="Ej. Juan Pérez" />
                            </div>
                            <div className="form-group">
                                <label>Cargo / Rol</label>
                                <input type="text" required value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} placeholder="Ej. Pastor Principal" />
                            </div>
                            <div className="form-group">
                                <label>URL de la Foto</label>
                                <input type="url" value={formData.foto_url} onChange={e => setFormData({...formData, foto_url: e.target.value})} placeholder="https://..." />
                            </div>
                            <div className="form-group">
                                <label>Biografía Breve</label>
                                <textarea rows="4" value={formData.biografia} onChange={e => setFormData({...formData, biografia: e.target.value})} placeholder="Breve historia o presentación..."></textarea>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary" disabled={saving}>
                                    {saving ? <i className="bi bi-arrow-repeat spin"></i> : <i className="bi bi-save"></i>}
                                    {saving ? ' Guardando...' : ' Guardar Cambios'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
