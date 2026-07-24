// Importa hooks de React: useState (estado), useEffect (efectos), useMemo (memorización)
import { useState, useEffect, useMemo } from 'react';
// Importa useNavigate (redirección) y Link (enlace) de React Router
import { useNavigate, Link } from 'react-router-dom';
// Importa useAuth para usar la función login del contexto de autenticación
import { useAuth } from '../context/AuthContext';

/**
 * getPasswordStrength - Evalúa la fortaleza de una contraseña
 * Analiza: longitud, mayúsculas/minúsculas, números, caracteres especiales
 * @param {string} pwd - Contraseña a evaluar
 * @returns {object} { score: 0-5, label: texto, color: hex }
 */
function getPasswordStrength(pwd) {
    // Si la contraseña está vacía, retorna score 0 (sin barra)
    if (!pwd || pwd.length === 0) return { score: 0, label: '', color: 'transparent' };
    let score = 0; // Puntaje acumulado (0-5)
    if (pwd.length >= 6) score++;    // +1 por tener al menos 6 caracteres
    if (pwd.length >= 10) score++;   // +1 más por tener 10+ caracteres
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++; // +1 por mezclar mayúsculas y minúsculas
    if (/\d/.test(pwd)) score++;     // +1 por incluir números
    if (/[^a-zA-Z0-9]/.test(pwd)) score++; // +1 por caracteres especiales (!@#$%^&*)

    // Clasifica según el puntaje acumulado
    if (score <= 2) return { score: Math.max(1, score), label: 'Débil', color: '#ef4444' }; // Rojo
    if (score <= 3) return { score: 3, label: 'Media', color: '#f59e0b' };                   // Amarillo
    return { score: Math.min(score, 5), label: 'Fuerte', color: '#22c55e' };                 // Verde
}

/**
 * Login - Página de inicio de sesión del panel de administración
 * Diseño: layout dividido (branding a la izquierda, formulario a la derecha)
 * Funcionalidades:
 * - Email y contraseña con validación
 * - Toggle de visibilidad de contraseña
 * - Indicador de fortaleza de contraseña
 * - Recordar email en localStorage
 * - Redirección automática si ya hay sesión activa
 */
export default function Login() {
    // Estado del campo email (se restaura si el usuario marcó "Recordar")
    const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
    // Estado del campo contraseña
    const [password, setPassword] = useState('');
    // Estado del mensaje de error (se muestra si falla el login)
    const [error, setError] = useState('');
    // Estado de envío: true mientras se procesa el login (deshabilita botón)
    const [submitting, setSubmitting] = useState(false);
    // Estado de visibilidad de contraseña (text o password)
    const [showPassword, setShowPassword] = useState(false);
    // Estado del checkbox "Recordar mi correo"
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));
    // Fortaleza de la contraseña (memorizado para no recalcular en cada render)
    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

    // Obtiene la función login del contexto de autenticación
    const { login } = useAuth();
    // Obtiene la función navigate para redirigir después del login
    const navigate = useNavigate();

    // Efecto que redirige a /admin si ya hay una sesión activa
    useEffect(() => {
        const storedUser = localStorage.getItem('admin_user');
        const storedToken = localStorage.getItem('admin_token');
        // Si hay credenciales guardadas, redirige al admin (evita ver login innecesariamente)
        if (storedUser && storedToken) navigate('/admin', { replace: true });
    }, [navigate]); // Se ejecuta cuando cambia navigate

    /**
     * handleSubmit - Procesa el envío del formulario de login
     * Llama a login() del AuthContext, maneja éxito/error, y redirige
     */
    const handleSubmit = async (e) => {
        e.preventDefault();   // Previene que el formulario recargue la página
        setError('');         // Limpia errores anteriores
        setSubmitting(true);  // Marca que está procesando (deshabilita botón)
        try {
            // Llama a la función login del AuthContext (envía credenciales al backend)
            await login(email, password);
            // Si el checkbox "Recordar" está marcado, guarda el email en localStorage
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                // Si no, elimina el email guardado
                localStorage.removeItem('rememberedEmail');
            }
            // Redirige al panel de administración después del login exitoso
            navigate('/admin');
        } catch (err) {
            // Si hay error (credenciales incorrectas), muestra el mensaje
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setSubmitting(false); // Siempre desactiva el estado de envío
        }
    };

    // Valida si el formulario está completo para habilitar el botón
    const isFormValid = () => email.trim().length > 0 && password.length >= 6;

    return (
        {/* Contenedor principal de la página de login */}
        <div className="login-page">
            {/* Orbs decorativos animados (círculos con gradientes difusos) */}
            <div className="login-orb login-orb-1" aria-hidden="true"></div>
            <div className="login-orb login-orb-2" aria-hidden="true"></div>
            <div className="login-orb login-orb-3" aria-hidden="true"></div>
            <div className="login-orb login-orb-4" aria-hidden="true"></div>

            {/* Layout dividido: branding (izq) + formulario (der) */}
            <div className="login-split">

                {/* PANEL IZQUIERDO: Branding de la iglesia (solo visual) */}
                <div className="login-branding" aria-hidden="true">
                    <div className="login-branding-content">
                        <img src="/img/logo-oficial.png" alt="" className="login-branding-logo" />
                        <h2 className="login-branding-title">Asamblea de Dios</h2>
                        <div className="login-branding-divider"></div>
                        <p className="login-branding-subtitle">Administra el contenido de tu iglesia de forma sencilla y segura.</p>
                        {/* Características destacadas con iconos */}
                        <div className="login-branding-features">
                            <div className="login-branding-feature"><i className="bi bi-shield-check"></i><span>Acceso seguro</span></div>
                            <div className="login-branding-feature"><i className="bi bi-speedometer2"></i><span>Panel intuitivo</span></div>
                            <div className="login-branding-feature"><i className="bi bi-phone"></i><span>Responsive</span></div>
                        </div>
                    </div>
                </div>

                {/* PANEL DERECHO: Formulario de login */}
                <div className="login-form-panel">
                    <div className="login-container">
                        <div className="login-card">
                            {/* Encabezado del formulario */}
                            <div className="login-header">
                                <h1>Panel de Administración</h1>
                                <p>Ingresa tus credenciales para acceder</p>
                            </div>

                            {/* Formulario de login */}
                            <form className="login-form" onSubmit={handleSubmit}>
                                {/* Mensaje de error (se muestra si falla el login) */}
                                {error && (
                                    <div className="login-error" role="alert">
                                        <i className="bi bi-exclamation-circle"></i>
                                        {error}
                                    </div>
                                )}

                                {/* Campo: Correo electrónico */}
                                <div className="login-field">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <div className="login-input-wrapper">
                                        <i className="bi bi-envelope"></i>
                                        <input id="email" type="email" placeholder="admin@iglesia.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                                    </div>
                                </div>

                                {/* Campo: Contraseña con toggle de visibilidad */}
                                <div className="login-field">
                                    <label htmlFor="password">Contraseña</label>
                                    <div className="login-input-wrapper login-input-with-toggle">
                                        <i className="bi bi-lock"></i>
                                        {/* Input que cambia entre text y password según showPassword */}
                                        <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" minLength={6} />
                                        {/* Botón para mostrar/ocultar contraseña */}
                                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} tabIndex={-1}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle-icon`}></i>
                                        </button>
                                    </div>
                                    {/* Barra de fortaleza de contraseña (solo se muestra si hay texto) */}
                                    {password.length > 0 && (
                                        <div className="login-password-strength">
                                            <div className="login-strength-bar">
                                                {/* Barra de progreso con ancho y color dinámicos */}
                                                <div className="login-strength-fill" style={{ width: `${(passwordStrength.score / 5) * 100}%`, background: passwordStrength.color }}></div>
                                            </div>
                                            {/* Etiqueta: Débil, Media o Fuerte */}
                                            <span className="login-strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Checkbox: Recordar mi correo */}
                                <div className="login-options">
                                    <label className="login-checkbox">
                                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <span className="login-checkbox-custom"></span>
                                        Recordar mi correo
                                    </label>
                                </div>

                                {/* Botón de envío: muestra spinner mientras se procesa */}
                                <button type="submit" className="login-btn" disabled={submitting || !isFormValid()}>
                                    {submitting ? (
                                        // Estado de carga
                                        <><span className="login-spinner"></span> Ingresando...</>
                                    ) : (
                                        // Estado normal
                                        <><i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión</>
                                    )}
                                </button>
                            </form>

                            {/* Enlace para volver al sitio web */}
                            <div className="login-footer">
                                <Link to="/"><i className="bi bi-arrow-left"></i> Volver al sitio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
