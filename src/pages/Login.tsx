// Importa los hooks de React para manejar estado, efectos y memoización
import { useState, useEffect, useMemo } from 'react';
// Importa useNavigate para redirigir y Link para crear enlaces de navegación
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook de autenticación del contexto
import { useAuth } from '../context/AuthContext';

// Define la interfaz que describe el nivel de fortaleza de una contraseña
interface PasswordStrength {
    // Puntaje numérico de la fortaleza
    score: number;
    // Etiqueta descriptiva (Débil, Media o Fuerte)
    label: string;
    // Color asociado al nivel de fortaleza
    color: string;
}

// Función que calcula la fortaleza de una contraseña
function getPasswordStrength(pwd: string): PasswordStrength {
    // Si la contraseña está vacía, retorna un estado neutro sin color
    if (!pwd || pwd.length === 0) return { score: 0, label: '', color: 'transparent' };
    // Inicializa el puntaje de fortaleza en cero
    let score = 0;
    // Suma un punto si la contraseña tiene al menos 6 caracteres
    if (pwd.length >= 6) score++;
    // Suma un punto si la contraseña tiene al menos 10 caracteres
    if (pwd.length >= 10) score++;
    // Suma un punto si la contraseña combina mayúsculas y minúsculas
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    // Suma un punto si la contraseña incluye al menos un número
    if (/\d/.test(pwd)) score++;
    // Suma un punto si la contraseña incluye caracteres especiales
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    // Si el puntaje es 2 o menos, clasifica la contraseña como débil
    if (score <= 2) return { score: Math.max(1, score), label: 'Débil', color: '#ef4444' };
    // Si el puntaje es 3, clasifica la contraseña como media
    if (score <= 3) return { score: 3, label: 'Media', color: '#f59e0b' };
    // Si el puntaje es mayor, clasifica la contraseña como fuerte
    return { score: Math.min(score, 5), label: 'Fuerte', color: '#22c55e' };
}

// Define y exporta el componente de la página de inicio de sesión
export default function Login() {
    // Estado del correo, inicializado con el correo recordado en localStorage si existe
    const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
    // Estado de la contraseña ingresada por el usuario
    const [password, setPassword] = useState('');
    // Estado que almacena el mensaje de error del inicio de sesión
    const [error, setError] = useState('');
    // Estado que indica si el formulario se está enviando
    const [submitting, setSubmitting] = useState(false);
    // Estado que controla si la contraseña se muestra u oculta
    const [showPassword, setShowPassword] = useState(false);
    // Estado que controla si se debe recordar el correo, según lo guardado en localStorage
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));
    // Calcula la fortaleza de la contraseña con useMemo para no recalcular en cada render
    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

    // Obtiene la función de inicio de sesión y el usuario autenticado desde el contexto
    const { login, user } = useAuth();
    // Obtiene la función de navegación de react-router-dom
    const navigate = useNavigate();

    // Efecto que redirige al panel de administración si ya hay un usuario autenticado
    useEffect(() => {
        // Si existe un usuario, navega a /admin reemplazando el historial
        if (user) navigate('/admin', { replace: true });
        // Dependencias del efecto: el usuario y la función de navegación
    }, [user, navigate]);

    // Maneja el envío del formulario de inicio de sesión
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        // Evita que el formulario se recargue al enviarse
        e.preventDefault();
        // Limpia cualquier mensaje de error anterior
        setError('');
        // Marca que el formulario está siendo enviado
        setSubmitting(true);
        // Intenta autenticar al usuario
        try {
            // Llama al login del contexto con el correo y la contraseña
            await login(email, password);
            // Si la opción recordar correo está activa
            if (rememberMe) {
                // Guarda el correo en localStorage para futuras sesiones
                localStorage.setItem('rememberedEmail', email);
            } else {
                // Elimina el correo guardado de localStorage
                localStorage.removeItem('rememberedEmail');
            }
            // Redirige al panel de administración tras el login exitoso
            navigate('/admin');
        } catch (err) {
            // Muestra el mensaje de error recibido o un mensaje genérico
            setError(err instanceof Error ? err.message : 'Credenciales incorrectas');
        } finally {
            // Indica que el envío terminó, haya o no errores
            setSubmitting(false);
        }
    };

    // Verifica si el formulario es válido: correo no vacío y contraseña de al menos 6 caracteres
    const isFormValid = () => email.trim().length > 0 && password.length >= 6;

    // Retorna el JSX de la página de inicio de sesión
    return (
        // Contenedor principal de la página de login
        <div className="login-page">
            // Orbe decorativo 1 del fondo
            <div className="login-orb login-orb-1" aria-hidden="true"></div>
            // Orbe decorativo 2 del fondo
            <div className="login-orb login-orb-2" aria-hidden="true"></div>
            // Orbe decorativo 3 del fondo
            <div className="login-orb login-orb-3" aria-hidden="true"></div>
            // Orbe decorativo 4 del fondo
            <div className="login-orb login-orb-4" aria-hidden="true"></div>

            // Contenedor que divide la pantalla en dos mitades
            <div className="login-split">

                // Panel lateral con la marca de la iglesia
                <div className="login-branding" aria-hidden="true">
                    // Contenedor del contenido de la marca
                    <div className="login-branding-content">
                        // Logo oficial de la iglesia
                        <img src="/img/logo-oficial.png" alt="" className="login-branding-logo" />
                        // Nombre de la iglesia
                        <h2 className="login-branding-title">Asamblea de Dios</h2>
                        // Divisor decorativo
                        <div className="login-branding-divider"></div>
                        // Texto que describe el propósito del panel
                        <p className="login-branding-subtitle">Administra el contenido de tu iglesia de forma sencilla y segura.</p>
                        // Contenedor de las características destacadas
                        <div className="login-branding-features">
                            // Característica de acceso seguro
                            <div className="login-branding-feature"><i className="bi bi-shield-check"></i><span>Acceso seguro</span></div>
                            // Característica de panel intuitivo
                            <div className="login-branding-feature"><i className="bi bi-speedometer2"></i><span>Panel intuitivo</span></div>
                            // Característica de diseño responsivo
                            <div className="login-branding-feature"><i className="bi bi-phone"></i><span>Responsive</span></div>
                        </div>
                    </div>
                </div>

                // Panel que contiene el formulario de inicio de sesión
                <div className="login-form-panel">
                    // Contenedor central del formulario
                    <div className="login-container">
                        // Tarjeta del formulario de login
                        <div className="login-card">
                            // Encabezado de la tarjeta de login
                            <div className="login-header">
                                // Título del panel de administración
                                <h1>Panel de Administración</h1>
                                // Texto que pide ingresar las credenciales
                                <p>Ingresa tus credenciales para acceder</p>
                            </div>

                            // Formulario que se envía con la función handleSubmit
                            <form className="login-form" onSubmit={handleSubmit}>
                                // Si existe un error, muestra el mensaje correspondiente
                                {error && (
                                    // Contenedor del mensaje de error con rol de alerta
                                    <div className="login-error" role="alert">
                                        // Ícono de exclamación del error
                                        <i className="bi bi-exclamation-circle"></i>
                                        // Texto del mensaje de error
                                        {error}
                                    </div>
                                )}

                                // Campo del formulario para el correo electrónico
                                <div className="login-field">
                                    // Etiqueta asociada al campo de correo
                                    <label htmlFor="email">Correo electrónico</label>
                                    // Contenedor del campo con el ícono
                                    <div className="login-input-wrapper">
                                        // Ícono de sobre para el campo de correo
                                        <i className="bi bi-envelope"></i>
                                        // Campo de entrada del correo con validaciones
                                        <input id="email" type="email" placeholder="admin@iglesia.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                                    </div>
                                </div>

                                // Campo del formulario para la contraseña
                                <div className="login-field">
                                    // Etiqueta asociada al campo de contraseña
                                    <label htmlFor="password">Contraseña</label>
                                    // Contenedor del campo con ícono y botón de mostrar/ocultar
                                    <div className="login-input-wrapper login-input-with-toggle">
                                        // Ícono de candado para el campo de contraseña
                                        <i className="bi bi-lock"></i>
                                        // Campo de entrada de la contraseña que cambia de tipo según showPassword
                                        <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" minLength={6} />
                                        // Botón que alterna entre mostrar y ocultar la contraseña
                                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} tabIndex={-1}>
                                            // Ícono de ojo que cambia según el estado de visibilidad
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle-icon`}></i>
                                        </button>
                                    </div>
                                    // Si la contraseña tiene contenido, muestra el indicador de fortaleza
                                    {password.length > 0 && (
                                        // Contenedor del indicador de fortaleza
                                        <div className="login-password-strength">
                                            // Barra de fortaleza
                                            <div className="login-strength-bar">
                                                // Relleno de la barra cuyo ancho y color dependen del puntaje
                                                <div className="login-strength-fill" style={{ width: `${(passwordStrength.score / 5) * 100}%`, background: passwordStrength.color }}></div>
                                            </div>
                                            // Etiqueta con el nivel de fortaleza y su color
                                            <span className="login-strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                                        </div>
                                    )}
                                </div>

                                // Fila de opciones adicionales del formulario
                                <div className="login-options">
                                    // Etiqueta de la casilla para recordar el correo
                                    <label className="login-checkbox">
                                        // Casilla de verificación controlada por rememberMe
                                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        // Casilla personalizada con estilos propios
                                        <span className="login-checkbox-custom"></span>
                                        // Texto de la opción recordar correo
                                        Recordar mi correo
                                    </label>
                                </div>

                                // Botón de envío que se deshabilita mientras se envía o si el formulario es inválido
                                <button type="submit" className="login-btn" disabled={submitting || !isFormValid()}>
                                    // Si se está enviando, muestra un indicador de carga
                                    {submitting ? (
                                        // Spinner y texto de "Ingresando..."
                                        <><span className="login-spinner"></span> Ingresando...</>
                                    ) : (
                                        // Ícono y texto del botón de inicio de sesión
                                        <><i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión</>
                                    )}
                                </button>
                            </form>

                            // Pie de la tarjeta con el enlace de regreso al sitio
                            <div className="login-footer">
                                // Enlace que lleva de vuelta a la página de inicio
                                <Link to="/"><i className="bi bi-arrow-left"></i> Volver al sitio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
