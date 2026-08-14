// Importa los hooks de React para manejar efectos secundarios y estado
import { useEffect, useState } from 'react';
// Importa el objeto api y el tipo ApiSlide para consumir el backend
import { api, type ApiSlide } from '../../api';

// Define la estructura de los datos del formulario del slide
interface SlideFormData {
    // Identificador opcional del slide (null si es nuevo)
    id: number | null;
    // Título principal del slide
    titulo: string;
    // Subtítulo o descripción del slide
    subtitulo: string;
    // URL de la imagen de fondo ya existente
    imagen_url: string;
    // Archivo de imagen seleccionado para subir
    imagen: File | null;
    // Texto del botón principal del slide
    btn_principal: string;
    // Texto del botón secundario del slide
    btn_secundario: string;
    // Número de orden del slide en el carrusel
    orden: number;
    // Indica si el slide está visible en la web
    activo: boolean;
}

// Define los valores iniciales para el formulario de un slide vacío
const emptySlide: SlideFormData = { id: null, titulo: '', subtitulo: '', imagen_url: '', imagen: null, btn_principal: '', btn_secundario: '', orden: 0, activo: true };

// Convierte un slide de la API en datos para el formulario
function slideForm(slide: ApiSlide | null): SlideFormData {
    // Si no hay slide, retorna los valores por defecto
    if (!slide) return emptySlide;
    // Construye el objeto con los datos del slide recibido
    return {
        // Copia el id del slide
        id: slide.id,
        // Usa el título guardado o una cadena vacía
        titulo: slide.titulo ?? '',
        // Usa el subtítulo guardado o una cadena vacía
        subtitulo: slide.subtitulo ?? '',
        // Usa la URL de la imagen guardada o una cadena vacía
        imagen_url: slide.imagen_url ?? '',
        // No se carga el archivo al editar (se conserva la URL actual)
        imagen: null,
        // Usa el texto del botón principal guardado o una cadena vacía
        btn_principal: slide.btn_principal ?? '',
        // Usa el texto del botón secundario guardado o una cadena vacía
        btn_secundario: slide.btn_secundario ?? '',
        // Usa el orden guardado o 0 por defecto
        orden: slide.orden ?? 0,
        // Convierte el valor 0/1 de la API a booleano
        activo: slide.activo === 1,
    };
}

// Retorna el mensaje del error si es un Error, si no usa el texto de respaldo
function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

// Componente principal del panel de administración de slides del hero
export default function AdminSlides() {
    // Estado con la lista de slides cargados desde el backend
    const [slides, setSlides] = useState<ApiSlide[]>([]);
    // Estado que indica si la lista está cargándose
    const [loading, setLoading] = useState(true);
    // Estado con el mensaje de error de la lista
    const [error, setError] = useState('');
    // Estado que controla si el modal está abierto
    const [modalOpen, setModalOpen] = useState(false);
    // Estado con los datos actuales del formulario del modal
    const [formData, setFormData] = useState<SlideFormData>(emptySlide);
    // Estado con el mensaje de error del formulario
    const [formError, setFormError] = useState('');
    // Estado que indica si se está guardando el formulario
    const [saving, setSaving] = useState(false);
    // Estado con el id del slide que se está borrando
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // Función que carga la lista de slides desde el backend
    const cargarSlides = async () => {
        // Inicia el bloque de manejo de errores
        try {
            // Activa el indicador de carga
            setLoading(true);
            // Limpia el mensaje de error previo
            setError('');
            // Obtiene los slides y los guarda en el estado
            setSlides(await api.slides.getAll());
        } catch (requestError) {
            // Muestra un mensaje de error si falla la petición
            setError(errorMessage(requestError, 'No se pudieron cargar los slides.'));
        } finally {
            // Desactiva el indicador de carga al terminar
            setLoading(false);
        }
    };

    // Carga los slides automáticamente al montar el componente
    useEffect(() => { cargarSlides(); }, []);

    // Abre el modal con los datos del registro seleccionado para editarlo
    const handleOpenModal = (slide: ApiSlide | null = null) => {
        // Carga los datos del slide (o vacíos) en el formulario
        setFormData(slideForm(slide));
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
        setFormData(emptySlide);
        // Limpia el error del formulario
        setFormError('');
    };

    // Guarda (crea o actualiza) el slide al enviar el formulario
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
        // Añade el subtítulo al payload
        payload.append('subtitulo', formData.subtitulo);
        // Añade el texto del botón principal al payload
        payload.append('btn_principal', formData.btn_principal);
        // Añade el texto del botón secundario al payload
        payload.append('btn_secundario', formData.btn_secundario);
        // Añade el orden convertido a texto
        payload.append('orden', String(formData.orden));
        // Añade el estado activo como '1' o '0'
        payload.append('activo', formData.activo ? '1' : '0');
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
            // Si tiene id, actualiza el slide existente
            if (formData.id) await api.slides.update(formData.id, payload);
            // Si no tiene id, crea un slide nuevo
            else await api.slides.create(payload);
            // Cierra el modal al guardar correctamente
            setModalOpen(false);
            // Reinicia el formulario
            setFormData(emptySlide);
            // Recarga la lista para reflejar los cambios
            await cargarSlides();
        } catch (requestError) {
            // Muestra el error en el formulario si falla el guardado
            setFormError(errorMessage(requestError, 'No se pudo guardar el slide.'));
        } finally {
            // Desactiva el indicador de guardado
            setSaving(false);
        }
    };

    // Elimina un slide tras pedir confirmación al usuario
    const handleDelete = async (id: number) => {
        // Pide confirmación y cancela si el usuario no acepta
        if (!window.confirm('¿Seguro que quieres borrar este slide? Esta acción no se puede deshacer.')) return;

        // Inicia el bloque de manejo de errores
        try {
            // Marca el id del slide en proceso de borrado
            setDeletingId(id);
            // Limpia el error de la lista
            setError('');
            // Llama al backend para borrar el slide
            await api.slides.delete(id);
            // Quita el slide borrado de la lista del estado
            setSlides((items) => items.filter((slide) => slide.id !== id));
        } catch (requestError) {
            // Muestra un error si falla el borrado
            setError(errorMessage(requestError, 'No se pudo borrar el slide.'));
        } finally {
            // Limpia el id en proceso de borrado
            setDeletingId(null);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (loading) return <div className="admin-loading"><i className="bi bi-arrow-repeat spin"></i> Cargando slides del Hero...</div>;

    // Renderiza la sección principal del panel
    return (
        <div className="admin-crud-section">
            <div className="admin-crud-header">
                <h2>Slides del Hero Principal</h2>
                {/* Contenedor de los botones de acciones de la lista */}
                <div className="admin-crud-actions">
                    {/* Botón que recarga la lista de slides manualmente */}
                    <button className="btn-secondary" onClick={cargarSlides}><i className="bi bi-arrow-clockwise"></i> Actualizar</button>
                    {/* Botón que abre el modal para crear un slide nuevo */}
                    <button className="btn-primary" onClick={() => handleOpenModal()}><i className="bi bi-plus-circle"></i> Nuevo Slide</button>
                </div>
            </div>

            {/* Muestra el mensaje de error de la lista si existe */}
            {error && <div className="admin-error-msg" role="alert">{error}</div>}

            {/* Contenedor que envuelve la tabla de slides */}
            <div className="admin-table-container">
                <table className="admin-table">
                    {/* Encabezado de la tabla con las columnas de datos y acciones */}
                    <thead><tr><th>Orden</th><th>Imagen</th><th>Título</th><th>Botones</th><th>Estado</th><th>Acciones</th></tr></thead>
                    <tbody>
                        {/* Recorre la lista de slides para mostrar una fila por cada uno */}
                        {slides.map((slide) => (
                            // Fila que se atenúa visualmente si el slide está inactivo
                            <tr key={slide.id} style={{ opacity: slide.activo ? 1 : 0.5 }}>
                                <td><span className="badge-cargo">{slide.orden}</span></td>
                                {/* Muestra la miniatura de la imagen o un marcador de posición si no hay URL */}
                                <td>{slide.imagen_url ? <img src={slide.imagen_url.startsWith('http') ? slide.imagen_url : `http://localhost:3307${slide.imagen_url}`} alt="" className="admin-table-img" /> : <div className="admin-table-img-placeholder"><i className="bi bi-image"></i></div>}</td>
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
                        {slides.length === 0 && <tr><td colSpan={6} className="admin-table-empty">No hay slides registrados.</td></tr>}
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
                                <label htmlFor="slide-image">Imagen de fondo</label>
                                {/* Selector de archivo de imagen que guarda la foto elegida en el formulario */}
                                <input id="slide-image" type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, imagen: e.target.files ? (e.target.files[0] ?? null) : null })} />
                                {/* Avisa que la imagen actual se reemplazará si se sube una nueva */}
                                {formData.imagen_url && !formData.imagen && <small className="text-muted d-block mt-1">Imagen actual guardada. Si subes una nueva, la reemplazará.</small>}
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
        </div>
    );
}
