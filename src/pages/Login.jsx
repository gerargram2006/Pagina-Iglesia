/**
 * Componente Login - Página de inicio de sesión del panel de administración.
 *
 * Funcionalidades:
 *   - Diseño split-screen: branding a la izquierda, formulario a la derecha
 *   - Glassmorphism en la tarjeta del formulario
 *   - Orbes animados flotantes en el fondo
 *   - Indicador de fortaleza de contraseña (débil/media/fuerte)
 *   - Formulario con email y contraseña
 *   - Botón para mostrar/ocultar contraseña (ojo)
 *   - Checkbox "Recordar sesión" que guarda el email en localStorage
 *   - Validación en tiempo real de campos obligatorios
 *   - Animación de entrada suave para la tarjeta
 *   - Mensaje de error animado con shake cuando falla el login
 *   - Spinner de carga durante el envío
 *   - Redirección automática a /admin si ya hay sesión activa
 *   - Enlace para volver al sitio principal
 */

// Importa hooks de React para manejar estado local y efectos
import { useState, useEffect, useMemo } from 'react';
// Importa useNavigate para redirección programática y Link para navegación SPA
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth del contexto de autenticación
import { useAuth } from '../context/AuthContext';

/**
 * Función que calcula la fortaleza de una contraseña.
 * @param {string} pwd - Contraseña a evaluar
 * @returns {{ score: number, label: string, color: string }} Objeto con nivel, etiqueta y color
 */
function getPasswordStrength(pwd) {
    if (!pwd || pwd.length === 0) return { score: 0, label: '', color: 'transparent' };

    let score = 0;
    // Longitud mínima
    if (pwd.length >= 6) score++;
    // Longitud buena
    if (pwd.length >= 10) score++;
    // Tiene mayúsculas y minúsculas
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    // Tiene números
    if (/\d/.test(pwd)) score++;
    // Tiene caracteres especiales
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: Math.max(1, score), label: 'Debil', color: '#ef4444' };
    if (score <= 3) return { score: 3, label: 'Media', color: '#f59e0b' };
    return { score: Math.min(score, 5), label: 'Fuerte', color: '#22c55e' };
}

/**
 * Componente Login.
 * Renderiza un diseño split-screen con branding decorativo a la izquierda
 * y formulario glassmorphism a la derecha.
 */
export default function Login() {
    // Estado del campo de email - se inicializa con el valor guardado si existe "rememberedEmail"
    const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
    // Estado del campo de contraseña - inicia vacío por seguridad
    const [password, setPassword] = useState('');
    // Estado del mensaje de error - vacío cuando no hay error
    const [error, setError] = useState('');
    // Estado que indica si el formulario se está enviando (deshabilita el botón y muestra spinner)
    const [submitting, setSubmitting] = useState(false);
    // Estado que controla si la contraseña se muestra en texto plano o con asteriscos
    const [showPassword, setShowPassword] = useState(false);
    // Estado del checkbox "Recordar sesión" - se inicializa true si hay email guardado
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));

    // Calcula la fortaleza de la contraseña
    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

    // Extrae la función login del contexto de autenticación
    const { login } = useAuth();
    // Crea una instancia de navigate para redirigir después del login exitoso
    const navigate = useNavigate();

    // Efecto que redirige al admin si el usuario ya tiene sesión activa
    useEffect(() => {
        // Obtiene el usuario y token guardados en localStorage
        const storedUser = localStorage.getItem('admin_user');
        const storedToken = localStorage.getItem('admin_token');
        // Si ambos existen, el usuario ya está autenticado - redirigir a /admin
        if (storedUser && storedToken) {
            navigate('/admin', { replace: true });
        }
    }, [navigate]); // Se ejecuta cuando cambia navigate (una vez al montar)

    /**
     * Maneja el envío del formulario de login.
     * Valida campos, envía credenciales al backend, maneja éxito y error.
     * @param {Event} e - Evento del formulario
     */
    const handleSubmit = async (e) => {
        // Previene que el formulario recargue la página (comportamiento por defecto de HTML)
        e.preventDefault();
        // Limpia cualquier mensaje de error anterior
        setError('');
        // Activa el estado de envío para mostrar spinner y deshabilitar botón
        setSubmitting(true);

        try {
            // Llama a la función login del AuthContext que envía POST al backend
            await login(email, password);

            // Si "Recordar sesión" está marcado, guarda el email en localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                // Si no está marcado, elimina el email guardado previamente
                localStorage.removeItem('rememberedEmail');
            }

            // Redirige al panel de administración después del login exitoso
            navigate('/admin');
        } catch (err) {
            // Si hay error, muestra el mensaje del servidor o uno genérico
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            // Siempre desactiva el estado de envío al terminar (éxito o error)
            setSubmitting(false);
        }
    };

    /**
     * Calcula si el formulario es válido para habilitar/deshabilitar el botón.
     * @returns {boolean} true si email tiene contenido y password tiene al menos 6 caracteres
     */
    const isFormValid = () => {
        return email.trim().length > 0 && password.length >= 6;
    };

    // Renderiza la página completa de login con diseño split-screen
    return (
        <div className="login-page">
            {/* Orbes decorativos animados en el fondo */}
            <div className="login-orb login-orb-1" aria-hidden="true"></div>
            <div className="login-orb login-orb-2" aria-hidden="true"></div>
            <div className="login-orb login-orb-3" aria-hidden="true"></div>
            <div className="login-orb login-orb-4" aria-hidden="true"></div>

            {/* Layout split-screen */}
            <div className="login-split">
                {/* Panel izquierdo - Branding decorativo (solo visible en desktop) */}
                <div className="login-branding" aria-hidden="true">
                    <div className="login-branding-content">
                        {/* Logo grande decorativo */}
                        <img src="/img/LogoAD.PNG" alt="" className="login-branding-logo" />
                        {/* Título de bienvenida */}
                        <h2 className="login-branding-title">Asamblea de Dios</h2>
                        {/* Línea decorativa */}
                        <div className="login-branding-divider"></div>
                        {/* Subtítulo */}
                        <p className="login-branding-subtitle">
                            Administra el contenido de tu iglesia de forma sencilla y segura.
                        </p>
                        {/* Features miniatura */}
                        <div className="login-branding-features">
                            <div className="login-branding-feature">
                                <i className="bi bi-shield-check"></i>
                                <span>Acceso seguro</span>
                            </div>
                            <div className="login-branding-feature">
                                <i className="bi bi-speedometer2"></i>
                                <span>Panel intuitivo</span>
                            </div>
                            <div className="login-branding-feature">
                                <i className="bi bi-phone"></i>
                                <span>Responsive</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Panel derecho - Formulario */}
                <div className="login-form-panel">
                    <div className="login-container">
                        {/* Tarjeta glassmorphism del formulario */}
                        <div className="login-card">
                            {/* Encabezado con logo, título y subtítulo */}
                            <div className="login-header">
                                {/* Logo de la iglesia (visible en móvil, oculto en desktop) */}
                                <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="login-logo" />
                                {/* Título principal del panel */}
                                <h1>Panel de Administracion</h1>
                                {/* Subtítulo indicando qué hacer */}
                                <p>Ingresa tus credenciales para acceder</p>
                            </div>

                            {/* Formulario de login con manejo de envío */}
                            <form className="login-form" onSubmit={handleSubmit}>
                                {/* Mensaje de error - solo se muestra cuando hay un error */}
                                {error && (
                                    <div className="login-error" role="alert">
                                        {/* Icono de exclamation-circle de Bootstrap Icons */}
                                        <i className="bi bi-exclamation-circle"></i>
                                        {/* Texto del error */}
                                        {error}
                                    </div>
                                )}

                                {/* Campo de correo electrónico */}
                                <div className="login-field">
                                    {/* Etiqueta del campo */}
                                    <label htmlFor="email">Correo electronico</label>
                                    {/* Wrapper que contiene el icono y el input */}
                                    <div className="login-input-wrapper">
                                        {/* Icono de sobre (correo) */}
                                        <i className="bi bi-envelope"></i>
                                        {/* Input de tipo email con validación HTML5 */}
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="admin@iglesia.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            autoComplete="email"
                                        />
                                    </div>
                                </div>

                                {/* Campo de contraseña con toggle de visibilidad */}
                                <div className="login-field">
                                    {/* Etiqueta del campo */}
                                    <label htmlFor="password">Contrasena</label>
                                    {/* Wrapper que contiene icono, input y botón de toggle */}
                                    <div className="login-input-wrapper login-input-with-toggle">
                                        {/* Icono de candado */}
                                        <i className="bi bi-lock"></i>
                                        {/* Input con tipo dinámico: password o text según showPassword */}
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Ingresa tu contrasena"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="current-password"
                                            minLength={6}
                                        />
                                        {/* Botón para mostrar/ocultar contraseña - accesible con aria-label */}
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                                            tabIndex={-1}
                                            title={showPassword ? 'Ocultar contrasena' : 'Mostrar contrasena'}
                                        >
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle-icon`}></i>
                                        </button>
                                    </div>
                                    {/* Indicador de fortaleza de contraseña */}
                                    {password.length > 0 && (
                                        <div className="login-password-strength">
                                            <div className="login-strength-bar">
                                                <div
                                                    className="login-strength-fill"
                                                    style={{
                                                        width: `${(passwordStrength.score / 5) * 100}%`,
                                                        background: passwordStrength.color,
                                                    }}
                                                ></div>
                                            </div>
                                            <span
                                                className="login-strength-label"
                                                style={{ color: passwordStrength.color }}
                                            >
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Fila con checkbox "Recordar sesión" */}
                                <div className="login-options">
                                    {/* Checkbox para recordar el email en el navegador */}
                                    <label className="login-checkbox">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                        />
                                        {/* Cuadro personalizado que reemplaza el checkbox nativo */}
                                        <span className="login-checkbox-custom"></span>
                                        Recordar mi correo
                                    </label>
                                </div>

                                {/* Botón principal de envío del formulario */}
                                <button
                                    type="submit"
                                    className="login-btn"
                                    disabled={submitting || !isFormValid()}
                                >
                                    {/* Contenido condicional: spinner si está enviando, icono+texto si no */}
                                    {submitting ? (
                                        <>
                                            {/* Spinner animado circular */}
                                            <span className="login-spinner"></span>
                                            Ingresando...
                                        </>
                                    ) : (
                                        <>
                                            {/* Icono de flecha de entrada */}
                                            <i className="bi bi-box-arrow-in-right"></i>
                                            Iniciar Sesion
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Pie de página de la tarjeta con enlace de regreso */}
                            <div className="login-footer">
                                {/* Enlace SPA de vuelta a la página principal */}
                                <Link to="/">
                                    {/* Icono de flecha izquierda */}
                                    <i className="bi bi-arrow-left"></i>
                                    Volver al sitio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
