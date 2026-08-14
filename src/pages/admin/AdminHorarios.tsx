// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiHorario para consumir el backend
import { api, type ApiHorario } from '../../api';

// Define la estructura de los datos del formulario de horario
interface HorarioFormData {
    // Identificador opcional del horario (null si es nuevo)
    id: number | null;
    // Día de la semana del horario
    dia: string;
    // Hora de la reunión
    hora: string;
    // Nombre o actividad de la reunión
    actividad: string;
}

// Define los valores iniciales para el formulario de un horario vacío
const emptyHorario: HorarioFormData = { id: null, dia: 'Domingo', hora: '10:00', actividad: '' };

// Lista fija de los días de la semana en español para el selector
const DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

// Convierte un horario de la API en datos para el formulario
function horarioForm(horario: ApiHorario | null): HorarioFormData {
    // Si no hay horario, retorna los valores por defecto
    if (!horario) return emptyHorario;
    // Construye el objeto con los datos del horario recibido
    return {
        // Copia el id del horario
        id: horario.id,
        // Usa el día guardado o 'Domingo' como valor por defecto
        dia: horario.dia ?? 'Domingo',
        // Toma la hora guardada (o '10:00') y recorta a los primeros 5 caracteres (HH:MM)
        hora: (horario.hora ?? '10:00').slice(0, 5),
        // Usa la actividad guardada o una cadena vacía
        actividad: horario.actividad ?? '',
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Formatea una hora en formato 24h a formato 12h con AM/PM
function formatHora(hora: string): string {
    // Separa la hora en horas y minutos
    const [h, m] = hora.split(':');
    // Convierte las horas a número
    const hour = Number(h);
    // Determina el sufijo AM o PM según si la hora es mayor o igual a 12
    const suffix = hour >= 12 ? 'PM' : 'AM';
    // Ajusta la hora al formato de 12 horas (0 y 12 se muestran como 12)
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    // Retorna la hora formateada con minutos y sufijo
    return `${display}:${m} ${suffix}`;
}

// Componente principal del panel de administración de horarios
export default function AdminHorarios() {
    // Estado con la lista de horarios cargados desde el backend
    const [horarios, setHorarios] = useState<ApiHorario[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<HorarioFormData>(emptyHorario);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del horario que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de horarios desde el backend
    const cargarHorarios = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los horarios y los guarda en el estado
            setHorarios(await api.horarios.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los horarios.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los horarios automáticamente al montar el componente
    useEffect(() => { cargarHorarios(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (horario: ApiHorario | null = null) => {
        // Carga los datos del horario (o vacíos) en el formulario
        setFormData(horarioForm(horario));
        // Limpia el error del formulario
        setFormError('');
        // Abre el modal
        setModalOpen(true);
    };

    // Cierra el modal y limpia el formulario
    const handleCloseModal = () => {
        // No permite cerrar el modal mientras se está guardando
        if (saving) return;
        // Cierra el modal
        setModalOpen(false);
        // Reinicia el formulario a los valores vacíos
        setFormData(emptyHorario);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el horario al enviar el formulario
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Limpia el error del formulario antes de guardar
        setFormError('');
        // Activa el indicador de guardado
        setSaving(true);

        // Construye el objeto con los datos a enviar al backend
        const payload = {
            // Envía el id (0 si es un horario nuevo)
            id: formData.id ?? 0,
            // Envía el día seleccionado
            dia: formData.dia,
            // Envía la hora del formulario
            hora: formData.hora,
            // Envía la actividad del formulario
            actividad: formData.actividad,
        };

        // Inicia el bloque de manejo de errores
        try {
            // Si tiene id, actualiza el horario existente
            if (formData.id) await api.horarios.update(formData.id, payload);
            // Si no tiene id, crea un horario nuevo
            else await api.horarios.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyHorario);
            // Recarga la lista para reflejar los cambios
            await cargarHorarios();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el horario.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un horario tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este horario? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del horario en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el horario
            await api.horarios.delete(id);
            // Quita el horario borrado de la lista del estado
            setHorarios((items) => items.filter((horario) => horario.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el horario.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando horarios...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Horarios</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de horarios manualmente */}
                    <button className="btn-secondary" onClick={cargarHorarios}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un horario nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-clock"></i> Nuevo Horario</button>
                </div>
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
                        {horarios.map((horario) => (
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
                        {horarios.length === 0 && <tr><td colSpan={5} className="admin-table-empty">No hay horarios registrados.</td></tr>}
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
        </div>
    );
}
