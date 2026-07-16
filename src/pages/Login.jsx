/**
 * Componente Login - Página de inicio de sesión del panel de administración.
 *
 * Funcionalidades:
 *   - Formulario de login con email y contraseña
 *   - Botón para mostrar/ocultar contraseña (ojo)
 *   - Checkbox "Recordar sesión" que guarda el email en localStorage
 *   - Validación en tiempo real de campos obligatorios
 *   - Indicador de fuerza visual del formulario (bordes, focus)
 *   - Animación de entrada suave para la tarjeta
 *   - Mensaje de error animado con shake cuando falla el login
 *   - Spinner de carga durante el envío
 *   - Redirección automática a /admin si ya hay sesión activa
 *   - Enlace para volver al sitio principal
 */

// Importa el hook useState de React para manejar el estado local del componente
import { useState, useEffect } from 'react';
// Importa useNavigate para redirección programática y Link para navegación con React Router
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth del contexto de autenticación
import { useAuth } from '../context/AuthContext';

/**
 * Componente Login.
 * Renderiza un formulario centrado con logo, campos de email/contraseña,
 * checkbox de recordar, toggle de visibilidad de contraseña y botón de envío.
 */
export default function Login() {
    // Estado del campo de email - se inicializa con el valor guardado si existe "rememberedEmail"
    const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
    // Estado del campo de contraseña - inicia vacío por seguridad
    const [password, setPassword] = useState('');
    // Estado del mensaje de error - null cuando no hay error
    const [error, setError] = useState('');
    // Estado que indica si el formulario se está enviando (deshabilita el botón y muestra spinner)
    const [submitting, setSubmitting] = useState(false);
    // Estado que controla si la contraseña se muestra en texto plano o con asteriscos
    const [showPassword, setShowPassword] = useState(false);
    // Estado del checkbox "Recordar sesión" - se inicializa true si hay email guardado
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));


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

    // Renderiza la página completa de login con fondo gradiente y tarjeta centrada
    return (
        <div className="login-page">
            {/* Contenedor externo que centra la tarjeta en la pantalla */}
            <div className="login-container">
                {/* Tarjeta blanca con sombra y animación de entrada */}
                <div className="login-card">
                    {/* Encabezado con logo, título y subtítulo */}
                    <div className="login-header">
                        {/* Logo de la iglesia */}
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
                        </div>

                        {/* Fila con checkbox "Recordar sesión" y indicador de fortaleza */}
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
                            className="btn btn-primary login-btn"
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
    );
}
