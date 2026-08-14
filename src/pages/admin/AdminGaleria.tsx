// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiGaleria para consumir el backend
import { api, type ApiGaleria } from '../../api';

// Define la estructura de los datos del formulario de la galería
interface GaleriaFormData {
    // Identificador opcional de la imagen (null si es nueva)
    id: number | null;
    // Título o etiqueta de la imagen
    titulo: string;
    // URL de la imagen ya existente
    imagen_url: string;
    // Archivo de imagen seleccionado para subir
    imagen: File | null;
    // Indica si la imagen debe mostrarse como destacada
    destacada: boolean;
    // Número de orden para posicionar la imagen
    orden: number;
}

// Define los valores iniciales para el formulario de una imagen vacía
const emptyGaleria: GaleriaFormData = { id: null, titulo: '', imagen_url: '', imagen: null, destacada: false, orden: 0 };

// Convierte una imagen de la API en datos para el formulario
function galeriaForm(item: ApiGaleria | null): GaleriaFormData {
    // Si no hay imagen, retorna los valores por defecto
    if (!item) return emptyGaleria;
    // Construye el objeto con los datos de la imagen recibida
    return {
        // Copia el id de la imagen
        id: item.id,
        // Usa el título guardado o una cadena vacía
        titulo: item.titulo ?? '',
        // Usa la URL de la imagen guardada o una cadena vacía
        imagen_url: item.imagen_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        imagen: null,
        // Convierte el valor 0/1 de la API a booleano
        destacada: item.destacada === 1,
        // Usa el orden guardado o 0 por defecto
        orden: item.orden ?? 0,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de la galería
export default function AdminGaleria() {
    // Estado con la lista de imágenes cargadas desde el backend
    const [galeria, setGaleria] = useState<ApiGaleria[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<GaleriaFormData>(emptyGaleria);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id de la imagen que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de imágenes desde el backend
    const cargarGaleria = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene las imágenes y las guarda en el estado
            setGaleria(await api.galeria.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar las imágenes.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga la galería automáticamente al montar el componente
    useEffect(() => { cargarGaleria(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (item: ApiGaleria | null = null) => {
        // Carga los datos de la imagen (o vacíos) en el formulario
        setFormData(galeriaForm(item));
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
        setFormData(emptyGaleria);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) la imagen al enviar el formulario
    const handleSave = async (event: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario recargue la página
        event.preventDefault();
        // Limpia el error del formulario antes de guardar
        setFormError('');
        // Activa el indicador de guardado
        setSaving(true);
        // Crea un FormData para enviar archivos e imágenes al backend
        const payload = new FormData();
        // Añade el título al payload
        payload.append('titulo', formData.titulo);
        // Añade la marca de destacada como '1' o '0'
        payload.append('destacada', formData.destacada ? '1' : '0');
        // Añade el orden convertido a texto
        payload.append('orden', String(formData.orden));
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
            // Si tiene id, actualiza la imagen existente
            if (formData.id) await api.galeria.update(formData.id, payload);
            // Si no tiene id, crea una imagen nueva
            else await api.galeria.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptyGaleria);
            // Recarga la lista para reflejar los cambios
            await cargarGaleria();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar la imagen.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina una imagen tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar esta imagen? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id de la imagen en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar la imagen
            await api.galeria.delete(id);
            // Quita la imagen borrada de la lista del estado
            setGaleria((items) => items.filter((item) => item.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar la imagen.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando galería...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Galería de Fotos</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de imágenes manualmente */}
                    <button className="btn-secondary" onClick={cargarGaleria}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear una imagen nueva */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-image"></i> Nueva Foto</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de imágenes */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>Orden</th><th>Imagen</th><th>Título</th><th>Destacada</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de imágenes para mostrar una fila por cada una */}
                        {galeria.map((item) => (
                            <tr key={item.id}>
                                <td><span className="badge-cargo">{item.orden}</span></td>
                                {/* Muestra la miniatura de la imagen o un marcador de posición si no hay URL */}
                                <td>{item.imagen_url ? <img src={item.imagen_url.startsWith('http') ? item.imagen_url : `http://localhost:3307${item.imagen_url}`} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
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
                        {galeria.length === 0 && <tr><td colSpan={5} className="admin-table-empty">No hay imágenes en la galería.</td></tr>}
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
        </div>
    );
}
