// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiAnuncio para consumir el backend
import { api, type ApiAnuncio } from '../../api';

// Define la estructura de los datos del formulario del anuncio
interface AnuncioFormData {
    // Identificador opcional del anuncio (null si es nuevo)
    id: number | null;
    // Título del anuncio
    titulo: string;
    // Descripción detallada del anuncio
    descripcion: string;
    // URL de la imagen ya existente
    imagen_url: string;
    // Archivo de imagen seleccionado para subir
    imagen: File | null;
}

// Define los valores iniciales para el formulario de un anuncio vacío
const emptyAnuncio: AnuncioFormData = { id: null, titulo: '', descripcion: '', imagen_url: '', imagen: null };

// Convierte un anuncio de la API en datos para el formulario
function anuncioForm(anuncio: ApiAnuncio | null): AnuncioFormData {
    // Si no hay anuncio, retorna los valores por defecto
    if (!anuncio) return emptyAnuncio;
    // Construye el objeto con los datos del anuncio recibido
    return {
        // Copia el id del anuncio
        id: anuncio.id,
        // Usa el título guardado o una cadena vacía
        titulo: anuncio.titulo ?? '',
        // Usa la descripción guardada o una cadena vacía
        descripcion: anuncio.descripcion ?? '',
        // Usa la URL de la imagen guardada o una cadena vacía
        imagen_url: anuncio.imagen_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        imagen: null,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de anuncios
export default function AdminAnuncios() {
    // Estado con la lista de anuncios cargados desde el backend
    const [anuncios, setAnuncios] = useState<ApiAnuncio[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<AnuncioFormData>(emptyAnuncio);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del anuncio que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de anuncios desde el backend
    const cargarAnuncios = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los anuncios y los guarda en el estado
            setAnuncios(await api.anuncios.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los anuncios.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los anuncios automáticamente al montar el componente
    useEffect(() => { cargarAnuncios(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (anuncio: ApiAnuncio | null = null) => {
        // Carga los datos del anuncio (o vacíos) en el formulario
        setFormData(anuncioForm(anuncio));
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
        setFormData(emptyAnuncio);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el anuncio al enviar el formulario
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Limpia el error del formulario antes de guardar
        setFormError('');
        // Activa el indicador de guardado
        setSaving(true);
        // Crea un FormData para enviar archivos y datos al backend
        const payload = new FormData();
        // Añade el título al payload
        payload.append('titulo', formData.titulo);
        // Añade la descripción al payload
        payload.append('descripcion', formData.descripcion);
        // Si se seleccionó un archivo de imagen
        if (formData.imagen) {
            // Añade el archivo de imagen al payload
            payload.append('imagen', formData.imagen);
        } else if (formData.imagen_url) {
            // Si no hay archivo, envía la URL de la imagen existente
            payload.append('imagen_url', formData.imagen_url);
        }

        // Inicia el bloque de manejo de errores
        try {
            // Si tiene id, actualiza el anuncio existente
            if (formData.id) await api.anuncios.update(formData.id, payload);
            // Si no tiene id, crea un anuncio nuevo
            else await api.anuncios.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyAnuncio);
            // Recarga la lista para reflejar los cambios
            await cargarAnuncios();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el anuncio.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un anuncio tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este anuncio? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del anuncio en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el anuncio
            await api.anuncios.delete(id);
            // Quita el anuncio borrado de la lista del estado
            setAnuncios((items) => items.filter((anuncio) => anuncio.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el anuncio.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando anuncios...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Gestión de Anuncios</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de anuncios manualmente */}
                    <button className="btn-secondary" onClick={cargarAnuncios}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un anuncio nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-megaphone"></i> Nuevo Anuncio</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de anuncios */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>ID</th><th>Imagen</th><th>Título</th><th>Descripción</th><th>Fecha</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de anuncios para mostrar una fila por cada uno */}
                        {anuncios.map((anuncio) => (
                            <tr key={anuncio.id}>
                                <td>{anuncio.id}</td>
                                {/* Muestra la miniatura de la imagen o un marcador de posición si no hay URL */}
                                <td>{anuncio.imagen_url ? <img src={anuncio.imagen_url.startsWith('http') ? anuncio.imagen_url : `http://localhost:3307${anuncio.imagen_url}`} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
                                <td><strong>{anuncio.titulo}</strong></td>
                                {/* Muestra la descripción recortada con un ancho máximo en la tabla */}
                                <td className="text-truncate" style={{ maxWidth: '250px' }}>{anuncio.descripcion}</td>
                                {/* Formatea la fecha de creación en el idioma es-PE */}
                                <td>{new Date(anuncio.fecha_creacion).toLocaleDateString('es-PE', { dateStyle: 'medium' })}</td>
                                {/* Contenedor de los botones de acción de la fila */}
                                <td><div className="admin-table-actions">
                                    {/* Botón que abre el modal con los datos del anuncio para editarlo */}
                                    <button className="btn-icon btn-edit" onClick={() => handleOpenModal(anuncio)} title="Editar anuncio" aria-label={`Editar ${anuncio.titulo}`}><i className="bi bi-pencil"></i></button>
                                    {/* Botón que borra el anuncio, con icono girando mientras se elimina */}
                                    <button className="btn-icon btn-delete" onClick={() => handleDelete(anuncio.id)} title="Borrar anuncio" aria-label={`Borrar ${anuncio.titulo}`} disabled={deletingId === anuncio.id}><i className={deletingId === anuncio.id ? 'bi bi-arrow-repeat spin' : 'bi bi-trash'}></i></button>
                                </div></td>
                            </tr>
                        ))}
                        {/* Muestra un mensaje en la tabla si no hay anuncios registrados */}
                        {anuncios.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay anuncios registrados.</td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Muestra el modal solo cuando está abierto */}
            {modalOpen && (
                <div className="admin-modal-overlay" role="presentation">
                    <div className="admin-modal" role="dialog" aria-modal="true" aria-labelledby="anuncio-modal-title">
                        {/* Encabezado del modal con título y botón de cierre */}
                        <div className="admin-modal-header"><h3 id="anuncio-modal-title">{formData.id ? 'Editar Anuncio' : 'Nuevo Anuncio'}</h3><button className="admin-modal-close" onClick={handleCloseModal} aria-label="Cerrar"><i className="bi bi-x-lg"></i></button></div>
                        {/* Formulario que envía los datos al guardar */}
                        <form onSubmit={handleSave} className="admin-modal-form">
                            {/* Muestra el error del formulario si existe */}
                            {formError && <div className="admin-error-msg" role="alert">{formError}</div>}
                            {/* Campo del título del anuncio */}
                            <div className="form-group"><label htmlFor="anuncio-title">Título del anuncio</label><input id="anuncio-title" type="text" required maxLength={150} value={formData.titulo} onChange={(e) => setFormData({ ...formData, titulo: e.target.value })} /></div>
                            <div className="form-group">
                                <label htmlFor="anuncio-image">Imagen del anuncio (Opcional)</label>
                                {/* Selector de archivo de imagen que guarda la foto elegida en el formulario */}
                                <input id="anuncio-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {/* Avisa que la imagen actual se reemplazará si se sube una nueva */}
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
                            </div>
                            {/* Área de texto para la descripción del anuncio */}
                            <div className="form-group"><label htmlFor="anuncio-description">Descripción</label><textarea id="anuncio-description" rows={4} maxLength={5000} value={formData.descripcion} onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}></textarea></div>
                            {/* Pie del modal con botones de cancelar y guardar */}
                            <div className="admin-modal-footer"><button type="button" className="btn-secondary" onClick={handleCloseModal} disabled={saving}>Cancelar</button><button type="submit" className="btn-primary" disabled={saving}>{saving ? <><i className="bi bi-arrow-repeat spin"></i> Guardando...</> : <><i className="bi bi-save"></i> Guardar anuncio</>}</button></div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
