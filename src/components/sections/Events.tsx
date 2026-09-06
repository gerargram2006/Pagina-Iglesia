// Importa los hooks de React para manejar estado, efectos y memoizaciÃ³n
import { useState, useEffect, useMemo } from 'react';

// Tipos de vista soportados por el calendario embebido de Google
export type CalendarMode = 'MONTH' | 'WEEK' | 'AGENDA';

// Etiquetas en espaÃ±ol para cada vista del calendario
const MODE_LABELS: Record<CalendarMode, string> = {
    MONTH: 'Mes',
    WEEK: 'Semana',
    AGENDA: 'Agenda',
};

// Propiedades configurables del componente de calendario
interface EventsProps {
    // Identificador pÃºblico del calendario de Google
    calendarId?: string;
    // Zona horaria en la que se muestra la agenda
    timezone?: string;
    // Idioma del calendario (cÃ³digo ISO, ej: es)
    language?: string;
    // Vista inicial del calendario
    initialMode?: CalendarMode;
    // Muestra el tÃ­tulo del calendario
    showTitle?: boolean;
    // Muestra los botones de navegaciÃ³n entre meses/semanas
    showNavigation?: boolean;
    // Muestra la fecha actual
    showDate?: boolean;
    // Muestra las pestaÃ±as de vista dentro del iframe
    showTabs?: boolean;
    // Muestra la lista de calendarios
    showCalendars?: boolean;
    // Muestra el botÃ³n de impresiÃ³n
    showPrint?: boolean;
    // Muestra la zona horaria
    showTimezone?: boolean;
}

// Identificador por defecto del calendario de la iglesia
const DEFAULT_CALENDAR_ID = 'multimedia.058243@gmail.com';
// Zona horaria por defecto (PerÃº)
const DEFAULT_TIMEZONE = 'America/Lima';
// Idioma por defecto del calendario
const DEFAULT_LANGUAGE = 'es';

// Cultos fijos que la iglesia celebra cada semana
const cultosSemanales = [
    { dia: 'MiÃ©rcoles', hora: '6:00 PM - 8:00 PM', titulo: 'Culto de EnseÃ±anza' },
    { dia: 'Viernes', hora: '6:00 PM - 8:00 PM', titulo: 'Culto de Doctrina' },
    { dia: 'SÃ¡bado', hora: '5:00 PM - 7:00 PM', titulo: 'Culto de JÃ³venes' },
    { dia: 'Domingos', hora: '10:30 AM', titulo: 'Culto Dominical' },
];

// Construye la URL del iframe de Google Calendar con los parÃ¡metros configurados
function buildEmbedUrl(
    calendarId: string,
    timezone: string,
    language: string,
    mode: CalendarMode,
    options: Omit<EventsProps, 'calendarId' | 'timezone' | 'language' | 'initialMode'>
): string {
    // Crea los parÃ¡metros de la URL del calendario
    const params = new URLSearchParams();
    // Define el calendario pÃºblico que se muestra
    params.set('src', calendarId);
    // Define la zona horaria de la agenda
    params.set('ctz', timezone);
    // Define el idioma del calendario
    params.set('hl', language);
    // Define la vista inicial (mes, semana o agenda)
    params.set('mode', mode);
    // Oculta el tÃ­tulo del calendario si estÃ¡ desactivado
    if (options.showTitle === false) params.set('showTitle', '0');
    // Oculta la navegaciÃ³n si estÃ¡ desactivada
    if (options.showNavigation === false) params.set('showNav', '0');
    // Oculta la fecha si estÃ¡ desactivada
    if (options.showDate === false) params.set('showDate', '0');
    // Oculta las pestaÃ±as de vista si estÃ¡n desactivadas
    if (options.showTabs === false) params.set('showTabs', '0');
    // Oculta la lista de calendarios si estÃ¡ desactivada
    if (options.showCalendars === false) params.set('showCalendars', '0');
    // Oculta el botÃ³n de impresiÃ³n si estÃ¡ desactivado
    if (options.showPrint === false) params.set('showPrint', '0');
    // Oculta la zona horaria si estÃ¡ desactivada
    if (options.showTimezone === false) params.set('showTz', '0');
    // Devuelve la URL completa del calendario embebido
    return `https://calendar.google.com/calendar/embed?${params.toString()}`;
}

// Componente principal que embebe el calendario de Google y muestra los horarios
export default function Events({
    calendarId = DEFAULT_CALENDAR_ID,
    timezone = DEFAULT_TIMEZONE,
    language = DEFAULT_LANGUAGE,
    initialMode = 'MONTH',
    showTitle = true,
    showNavigation = true,
    showDate = true,
    showTabs = true,
    showCalendars = true,
    showPrint = true,
    showTimezone = false,
}: EventsProps) {
    // Estado con la vista activa del calendario
    const [mode, setMode] = useState<CalendarMode>(initialMode);
    // Estado que indica si el calendario todavÃ­a estÃ¡ cargando
    const [loading, setLoading] = useState(true);
    // Estado que indica si ocurriÃ³ un error al cargar el calendario
    const [error, setError] = useState(false);

    // Calcula la URL del iframe solo cuando cambian las dependencias
    const src = useMemo(
        () =>
            buildEmbedUrl(calendarId, timezone, language, mode, {
                showTitle,
                showNavigation,
                showDate,
                showTabs,
                showCalendars,
                showPrint,
                showTimezone,
            }),
        [calendarId, timezone, language, mode, showTitle, showNavigation, showDate, showTabs, showCalendars, showPrint, showTimezone]
    );

    // Cuando cambia la URL (vista, idioma, etc.) se vuelve a mostrar el indicador de carga
    useEffect(() => {
        setLoading(true);
        setError(false);
    }, [src]);

    // Abre el calendario pÃºblico en una pestaÃ±a nueva de Google Calendar
    const openCalendar = () => {
        window.open(`https://calendar.google.com/calendar/render?cid=${encodeURIComponent(calendarId)}`, '_blank', 'noopener,noreferrer');
    };

    return (
        // Contenedor principal de la secciÃ³n con fondo verde oscuro
        <section className="container mx-auto px-6 py-24 bg-[#606C59] text-white">
            {/* Rejilla de dos columnas en pantallas grandes */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* COLUMNA IZQUIERDA: EL CALENDARIO DE GOOGLE */}
                <div className="bg-white p-2 rounded-xl shadow-2xl overflow-hidden w-full">
                    {/* Barra de selecciÃ³n de vista del calendario */}
                    <div className="flex gap-2 p-2">
                        {/* Recorre las tres vistas disponibles */}
                        {(['MONTH', 'WEEK', 'AGENDA'] as CalendarMode[]).map((m) => (
                            // BotÃ³n que cambia la vista del calendario
                            <button
                                // Identificador Ãºnico de cada botÃ³n
                                key={m}
                                // Evita que el botÃ³n envÃ­e formularios
                                type="button"
                                // Cambia la vista activa al hacer clic
                                onClick={() => setMode(m)}
                                // Indica a lectores de pantalla quÃ© vista estÃ¡ activa
                                aria-pressed={mode === m}
                                // Estilo del botÃ³n segÃºn estÃ© activo o no
                                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-200 ${mode === m
                                    ? 'bg-[#eab308] text-[#606C59]'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                            >
                                {/* Etiqueta de la vista */}
                                {MODE_LABELS[m]}
                            </button>
                        ))}
                    </div>

                    {/* Contenedor del iframe con indicador de carga superpuesto */}
                    <div className="relative w-full">
                        {/* Indicador de carga mientras se descarga el calendario */}
                        {loading && !error && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-gray-50 text-[#606C59]">
                                {/* Spinner animado de carga */}
                                <span className="inline-block h-10 w-10 rounded-full border-4 border-[#606C59] border-t-transparent animate-spin"></span>
                                {/* Texto del indicador de carga */}
                                <p className="text-sm font-medium">Cargando calendario...</p>
                            </div>
                        )}

                        {/* Mensaje de error con alternativa para abrir el calendario */}
                        {error ? (
                            <div className="w-full h-[480px] flex flex-col items-center justify-center gap-4 bg-gray-50 text-gray-700">
                                {/* Ãcono de alerta */}
                                <span className="text-4xl" aria-hidden="true">âš ï¸</span>
                                {/* DescripciÃ³n del error */}
                                <p className="text-sm text-center px-6">No se pudo cargar el calendario en esta pÃ¡gina.</p>
                                {/* BotÃ³n que abre el calendario en una pestaÃ±a nueva */}
                                <button
                                    type="button"
                                    onClick={openCalendar}
                                    className="px-5 py-2 rounded-lg bg-[#606C59] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                                >
                                    Ver en Google Calendar
                                </button>
                            </div>
                        ) : (
                            // Iframe que embebe el calendario; la clave lo recarga al cambiar de vista
                            <iframe
                                // Recarga el iframe cuando cambia la URL
                                key={src}
                                // URL del calendario embebido
                                src={src}
                                // Oculta los bordes del iframe
                                style={{ border: 0 }}
                                // Ocupa todo el ancho del contenedor
                                className="w-full h-[480px] block"
                                // Permite mostrar el contenido a pantalla completa
                                allowFullScreen
                                // Oculta las barras de desplazamiento internas
                                scrolling="no"
                                // Etiqueta accesible del iframe
                                title="Calendario de Eventos AD"
                                // Quita la referencia cuando se hace clic fuera
                                referrerPolicy="no-referrer-when-downgrade"
                                // Oculta el indicador de carga cuando el iframe termina de cargar
                                onLoad={() => setLoading(false)}
                                // Activa el estado de error si el iframe no carga
                                onError={() => setError(true)}
                            ></iframe>
                        )}
                    </div>
                </div>

                {/* COLUMNA DERECHA: TEXTO Y HORARIOS */}
                <div className="flex flex-col justify-center h-full">
                    {/* TÃ­tulo principal de la secciÃ³n */}
                    <h2 className="text-4xl font-bold mb-6 text-[#eab308]">
                        Agenda Oficial de Eventos
                    </h2>
                    {/* DescripciÃ³n de la agenda */}
                    <p className="mb-8 text-lg text-gray-200">
                        Revisa nuestra agenda y mantente al tanto de nuestros encuentros a lo largo del aÃ±o.
                    </p>

                    {/* SubtÃ­tulo de los cultos semanales */}
                    <h3 className="text-2xl font-semibold mb-4 border-b border-gray-500 pb-2">
                        AdemÃ¡s de las fechas programadas, siempre estamos reunidos:
                    </h3>

                    {/* Lista de cultos semanales */}
                    <ul className="list-none mb-10 space-y-4 text-lg">
                        {/* Recorre los cultos fijos de la semana */}
                        {cultosSemanales.map((culto) => (
                            // Elemento de la lista con indicador dorado
                            <li key={culto.titulo} className="flex items-center gap-3">
                                {/* Punto decorativo dorado */}
                                <span className="h-3 w-3 bg-[#eab308] rounded-full"></span>
                                {/* Muestra el dÃ­a, la hora y el nombre del culto */}
                                <p>
                                    <span className="font-bold">{culto.dia}: {culto.hora}</span> - {culto.titulo}
                                </p>
                            </li>
                        ))}
                    </ul>

                    {/* Enlace para abrir el calendario completo en Google */}
                    <a
                        // URL del calendario pÃºblico
                        href={src}
                        // Abre el enlace en una pestaÃ±a nueva
                        target="_blank"
                        // Protege contra el robo de referencia
                        rel="noopener noreferrer"
                        // Estilos del botÃ³n de enlace
                        className="inline-flex items-center gap-2 self-start px-6 py-3 rounded-lg bg-[#eab308] text-[#606C59] font-bold hover:opacity-90 transition-opacity no-underline"
                    >
                        {/* Ãcono de calendario */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                            <path d="M2 5h12v10H2zM4 2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0V2zm6 0a.5.5 0 0 1 1 0v2a.5.5 0 0 1-1 0V2z"/>
                        </svg>
                        Ver calendario en Google
                    </a>
                </div>

            </div>
        </section>
    );
}
