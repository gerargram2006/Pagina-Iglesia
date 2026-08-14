// Importa los hooks useState y useEffect de React
import { useState, useEffect } from 'react';
// Importa la API y el tipo ApiHorario para obtener los horarios
import { api, type ApiHorario } from '../api';

// Define las propiedades que acepta el componente ScheduleSection
interface ScheduleSectionProps {
    // Título de la sección (opcional)
    title?: string | null;
    // Subtítulo de la sección (opcional)
    subtitle?: string | null;
    // Identificador del ancla de la sección (opcional)
    id?: string;
}

// Mapa con un ícono para cada día de la semana
const DAY_ICONS: Record<string, string> = {
    // Ícono para el domingo
    'Domingo': '⛪',
    // Ícono para el lunes
    'Lunes': '📖',
    // Ícono para el martes
    'Martes': '🙏',
    // Ícono para el miércoles
    'Miércoles': '📖',
    // Ícono para el jueves
    'Jueves': '✝️',
    // Ícono para el viernes
    'Viernes': '✝️',
    // Ícono para el sábado
    'Sábado': '⭐',
};

// Función que convierte una hora de formato 24 horas a formato 12 horas con AM/PM
function formatHora(hora: string): string {
    // Separa la hora y los minutos
    const [h, m] = hora.split(':');
    // Convierte la hora a número
    const hour = Number(h);
    // Determina el sufijo AM o PM según si la hora es mayor o igual a 12
    const suffix = hour >= 12 ? 'PM' : 'AM';
    // Convierte la hora a formato de 12 horas
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    // Devuelve la hora formateada con los minutos y el sufijo
    return `${display}:${m?.padStart(2, '0') ?? '00'} ${suffix}`;
}

// Define el componente ScheduleSection con valores por defecto para sus propiedades
export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }: ScheduleSectionProps) {
    // Estado que guarda la lista de horarios obtenidos de la API
    const [schedules, setSchedules] = useState<ApiHorario[]>([]);
    // Estado que indica si los horarios se están cargando
    const [loading, setLoading] = useState(true);
    // Estado que guarda el mensaje de error si ocurre uno
    const [error, setError] = useState('');

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función asíncrona que obtiene los horarios desde la API
        const fetchSchedules = async () => {
            try {
                // Obtiene todos los horarios desde la API
                const data = await api.horarios.getAll();
                // Guarda los horarios en el estado, validando que sea un arreglo
                setSchedules(Array.isArray(data) ? data : []);
            } catch {
                // Guarda un mensaje de error si la petición falla
                setError('No se pudieron cargar los horarios.');
            } finally {
                // Desactiva el estado de carga en cualquier caso
                setLoading(false);
            }
        };
        // Llama a la función que obtiene los horarios
        fetchSchedules();
    }, []);

    // Devuelve el contenido JSX de la sección
    return (
        // Crea la sección de horarios con su identificador y estilos
        <section id={id} className="section">
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen los horarios */}
                {loading && (
                    // Contenedor centrado con el mensaje de carga
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando horarios" */}
                        <p>Cargando horarios...</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si ocurrió uno */}
                {error && !loading && (
                    // Contenedor centrado con el error
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de advertencia */}
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        {/* Muestra el mensaje de error */}
                        <p>{error}</p>
                    </div>
                )}

                {/* Muestra un aviso si no hay horarios publicados */}
                {!loading && !error && schedules.length === 0 && (
                    // Contenedor centrado con el aviso
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de reloj */}
                        <i className="bi bi-clock text-2xl block mb-3"></i>
                        {/* Texto indicando que los horarios se publicarán próximamente */}
                        <p>Los horarios serán publicados próximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrícula de horarios solo si hay datos disponibles */}
                {!loading && !error && schedules.length > 0 && (
                    // Cuadrícula responsiva de tarjetas de horario
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Recorre la lista de horarios para generar cada tarjeta */}
                        {schedules.map((schedule, index) => (
                            // Contenedor de cada tarjeta de horario
                            <div key={schedule.id}>
                                {/* Tarjeta del horario con retraso de animación según su posición */}
                                <div className={`schedule-card delay-${index + 1}`} data-animate="fade-in-up">
                                    {/* Número de paso del horario oculto para lectores de pantalla */}
                                    <span className="schedule-step-number" aria-hidden="true">
                                        {/* Muestra el índice del horario con dos dígitos */}
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    {/* Muestra el ícono del día o uno por defecto */}
                                    <span className="schedule-icon">{DAY_ICONS[schedule.dia] || '📖'}</span>
                                    {/* Divisor decorativo de la tarjeta */}
                                    <div className="schedule-divider" aria-hidden="true"></div>
                                    {/* Muestra el día del horario */}
                                    <div className="schedule-day">{schedule.dia}</div>
                                    {/* Muestra la hora formateada */}
                                    <div className="schedule-time">{formatHora(schedule.hora)}</div>
                                    {/* Muestra el nombre de la actividad */}
                                    <div className="schedule-name">{schedule.actividad}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
