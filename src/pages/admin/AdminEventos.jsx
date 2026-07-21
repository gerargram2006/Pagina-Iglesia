import { useState, useEffect } from 'react';
import { api } from '../../api';

export default function AdminEventos() {
    const [eventos, setEventos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({ id: null, titulo: '', descripcion: '', fecha: '', lugar: '', imagen_url: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => { cargarEventos(); }, []);

    const cargarEventos = async () => {
        try {
            setLoading(true);
            const data = await api.eventos.getAll();
            setEventos(data);
        } catch {
            setError('Error al cargar los eventos');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (evento = null) => {
        if (evento) {
            const formattedDate = new Date(evento.fecha).toISOString().slice(0, 16);
            setFormData({ ...evento, fecha: formattedDate });
        } else {
            setFormData({ id: null, titulo: '', descripcion: '', fecha: '', lugar: 'Auditorio Principal', imagen_url: '' });
        }
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setFormData({ id: null, titulo: '', descripcion: '', fecha: '', lugar: '', imagen_url: '' });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const mysqlDate = formData.fecha.replace('T', ' ') + ':00';
            const payload = { ...formData, fecha: mysqlDate };

            if (formData.id) {
                await api.eventos.update(formData.id, payload);
            } else {
                await api.eventos.create(payload);
            }
            await cargarEventos();
            handleCloseModal();
        } catch (err) {
            alert('Error al guardar: ' + err.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de que quieres borrar este evento?')) return;
        try {
            await api.eventos.delete(id);
            await cargarEventos();
        } catch (err) {
            alert('Error al borrar: ' + err.message);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando eventos...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Eventos</h2>
                <button className="btn-primary" onClick={() => handleOpenModal()}>
                    <i className="bi bi-plus-circle"></i> Nuevo Evento
                </button>
            </div>

            {error && <div className="admin-error-msg">{error}</div>}

            <div className="admin-table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imagen</th>
                            <th>Título</th>
                            <th>Fecha</th>
                            <th>Lugar</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {eventos.map(evt => (
                            <tr key={evt.id}>
                                <td>{evt.id}</td>
                                <td>
                                    {evt.imagen_url ?
                                        <img src={evt.imagen_url} alt="thumbnail" className="admin-table-img" /> :
                                        <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>
                                    }
                                </td>
                                <td><strong>{evt.titulo}</strong></td>
                                <td>{new Date(evt.fecha).toLocaleDateString('es-PE')} {new Date(evt.fecha).toLocaleTimeString('es-PE', {hour: '2-digit', minute:'2-digit'})}</td>
                                <td>{evt.lugar}</td>
                                <td>
                                    <div className="admin-table-actions">
                                        <button className="btn-icon btn-edit" onClick={() => handleOpenModal(evt)} title="Editar"><i className="bi bi-pencil"></i></button>
                                        <button className="btn-icon btn-delete" onClick={() => handleDelete(evt.id)} title="Borrar"><i className="bi bi-trash"></i></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {eventos.length === 0 && (
                            <tr><td colSpan="6" className="admin-table-empty">No hay eventos registrados.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalOpen && (
                <div className="admin-modal-overlay">
                    <div className="admin-modal">
                        <div className="admin-modal-header">
                            <h3>{formData.id ? 'Editar Evento' : 'Nuevo Evento'}</h3>
                            <button className="admin-modal-close" onClick={handleCloseModal}><i className="bi bi-x-lg"></i></button>
                        </div>
                        <form onSubmit={handleSave} className="admin-modal-form">
                            <div className="form-group">
                                <label>Título del Evento</label>
                                <input type="text" required value={formData.titulo} onChange={e => setFormData({...formData, titulo: e.target.value})} placeholder="Ej. Servicio Dominical" />
                            </div>
                            <div className="form-group">
                                <label>Fecha y Hora</label>
                                <input type="datetime-local" required value={formData.fecha} onChange={e => setFormData({...formData, fecha: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label>Lugar</label>
                                <input type="text" required value={formData.lugar} onChange={e => setFormData({...formData, lugar: e.target.value})} placeholder="Ej. Auditorio Principal" />
                            </div>
                            <div className="form-group">
                                <label>URL de Imagen</label>
                                <input type="url" value={formData.imagen_url} onChange={e => setFormData({...formData, imagen_url: e.target.value})} placeholder="https://..." />
                                <small>Enlace directo a una imagen web para mostrar en la tarjeta.</small>
                            </div>
                            <div className="form-group">
                                <label>Descripción</label>
                                <textarea rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})} placeholder="Detalles del evento..."></textarea>
                            </div>
                            <div className="admin-modal-footer">
                                <button type="button" className="btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                <button type="submit" className="btn-primary" disabled={saving}>
                                    {saving ? <i className="bi bi-arrow-repeat spin"></i> : <i className="bi bi-save"></i>}
                                    {saving ? ' Guardando...' : ' Guardar Evento'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
