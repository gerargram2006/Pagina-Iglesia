import { useEffect, useState } from 'react';
import { api, type ApiHorario } from '../../api';

interface HorarioFormData {
    id: number | null;
    dia: string;
    hora: string;
    actividad: string;
}

const emptyHorario: HorarioFormData = { id: null, dia: 'Domingo', hora: '10:00', actividad: '' };

const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

function horarioForm(horario: ApiHorario | null): HorarioFormData {
    if (!horario) return emptyHorario;
    return {
        id: horario.id,
        dia: horario.dia ?? 'Domingo',
        hora: (horario.hora ?? '10:00').slice(0, 5),
        actividad: horario.actividad ?? '',
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

function formatHora(hora: string): string {
    const [h, m] = hora.split(':');
    const hour = Number(h);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${display}:${m} ${suffix}`;
}

export default function AdminHorarios() {
    const [horarios, setHorarios] = useState<ApiHorario[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<HorarioFormData>(emptyHorario);
    const [formError, setFormError] = useState('');
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState<{ show: boolean; text: string; type: 'success' | 'error' }>({ show: false, text: '', type: 'success' });

    const showToast = (text: string, type: 'success' | 'error' = 'success') => {
        setToast({ show: true, text, type });
        setTimeout(() => setToast(t => ({ ...t, show: false })), 3000);
    };

    const filteredHorarios = horarios.filter(h =>
        h.dia.toLowerCase().includes(search.toLowerCase()) ||
        h.actividad.toLowerCase().includes(search.toLowerCase())
    );

    const cargarHorarios = async () => {
        try {
            setLoading(true);
            setError('');
            setHorarios(await api.horarios.getAll());
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudieron cargar los horarios.'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { cargarHorarios(); }, []);

    const handleOpenModal = (horario: ApiHorario | null = null) => {
        setFormData(horarioForm(horario));
        setFormError('');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        if (saving) return;
        setModalOpen(false);
        setFormData(emptyHorario);
        setFormError('');
    };

    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError('');
        setSaving(true);

        const payload = {
            id: formData.id ?? 0,
            dia: formData.dia,
            hora: formData.hora,
            actividad: formData.actividad,
        };

        try {
            if (formData.id) await api.horarios.update(formData.id, payload);
            else await api.horarios.create(payload);
            setModalOpen(false);
            setFormData(emptyHorario);
            await cargarHorarios();
            showToast(formData.id ? 'Horario actualizado correctamente' : 'Horario creado correctamente');
        } catch (requestError) {
            setFormError(errorMessage(requestError, 'No se pudo guardar el horario.'));
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm('¿Seguro que quieres borrar este horario? Esta acción no se puede deshacer.')) return;

        try {
            setDeletingId(id);
            setError('');
            await api.horarios.delete(id);
            setHorarios((items) => items.filter((horario) => horario.id !== id));
            showToast('Horario eliminado correctamente');
        } catch (requestError) {
            setError(errorMessage(requestError, 'No se pudo borrar el horario.'));
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando horarios...</div>;

    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2><i className="bi bi-clock" style={{ marginRight: '10px', color: 'var(--gold-500)' }}></i>Gestión de Horarios</h2>
                <div className="admin-crud-actions">
                    <span className="badge-count"><i className="bi bi-collection"></i> {horarios.length} registros</span>
                    <button className="btn-secondary" onClick={cargarHorarios}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-clock"></i> Nuevo Horario</button>
                </div>
            </div>

            <div className="admin-crud-search">
                <i className="bi bi-search"></i>
                <input type="text" placeholder="Buscar por día o actividad..." value={search} onChange={e => setSearch(e.target.value)} />
                {search && <button className="admin-crud-search-clear" onClick={() => setSearch('')}><i className="bi bi-x-circle"></i></button>}
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de horarios */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Día</th><th>Hora</th><th>Actividad</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de horarios para mostrar una fila por cada uno */}
                        {filteredHorarios.map((horario) => (
                            <tr key={horario.id}>
                                <td>{horario.id}</td>
                                <td><span className="badge-cargo">{horario.dia}</span></td>
                                <td><strong>{formatHora(horario.hora)}</strong></td>
                                <td>{horario.actividad}</td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del horario para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(horario)} title="Editar horario" aria-label={`Editar ${horario.actividad}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el horario, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(horario.id)} title="Borrar horario" aria-label={`Borrar ${horario.actividad}`} disabled={deletingId === horario.id}><i className={deletingId === horario.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay horarios registrados */}
                        {filteredHorarios.length === 0 && <tr><td colSpan={5} className="admin-table-empty">{search ? 'No se encontraron horarios.' : 'No hay horarios registrados.'}</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="horario-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="horario-modal-title">{formData.id ? 'Editar Horario' : 'Nuevo Horario'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            <div className="form-group">
                                <label htmlFor="horario-day">Día de la semana</label>
                                {/* Selector del día, guarda el valor elegido en el formulario */}
                                <select id="horario-day" required value={formData.dia} onChange={(e) => setFormData({ ...formData, dia: e.target.value })} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.95rem', background: '#fff' }}>
                                    {/* Genera una opción por cada día de la semana */}
                                    {DIAS_SEMANA.map((dia) => <option key={dia} value={dia}>{dia}</option>)}
                                </select>
                            </div>
                            {/* Campo de hora, guarda el valor elegido en el formulario */}
                            <div className="form-group"><label htmlFor="horario-time">Hora</label><input id="horario-time" type="time" required value={formData.hora} onChange={(e) => setFormData({ ...formData, hora: e.target.value })} /></div>
                            {/* Campo de actividad con límite de 100 caracteres */}
                            <div className="form-group"><label htmlFor="horario-activity">Actividad / Nombre de la reunión</label><input id="horario-activity" type="text" required maxLength={100} value={formData.actividad} onChange={(e) => setFormData({ ...formData, actividad: e.target.value })} placeholder="Ej: Culto General" /></div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar horario</>}</button></div>
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
