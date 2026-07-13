// Importa el hook useState de React para manejar el estado local
import { useState } from 'react';
// Importa useNavigate para redirección y Link para navegación con React Router
import { useNavigate, Link } from 'react-router-dom';
// Importa el hook personalizado useAuth del contexto de autenticación
import { useAuth } from '../context/AuthContext';

// Exporta como componente por defecto la función Login
export default function Login() {
    // Estado que almacena el correo electrónico ingresado por el usuario
    const [email, setEmail] = useState('');
    // Estado que almacena la contraseña ingresada por el usuario
    const [password, setPassword] = useState('');
    // Estado que almacena el mensaje de error si falla el inicio de sesión
    const [error, setError] = useState('');
    // Estado que controla si el formulario está enviando datos (para deshabilitar el botón)
    const [submitting, setSubmitting] = useState(false);
    // Extrae la función login del contexto de autenticación para autenticar al usuario
    const { login } = useAuth();
    // Obtiene la función navigate para redirigir al usuario después del login
    const navigate = useNavigate();

    // Define la función asíncrona que se ejecuta al enviar el formulario
    const handleSubmit = async (e) => {
        // Previene el comportamiento por defecto del formulario (recarga de página)
        e.preventDefault();
        // Limpia cualquier mensaje de error previo antes de intentar iniciar sesión
        setError('');
        // Indica que el formulario está en proceso de envío
        setSubmitting(true);

        // Bloque try para manejar la petición de inicio de sesión
        try {
            // Llama a la función login con el email y password, espera la respuesta
            await login(email, password);
            // Si el login es exitoso, redirige al panel de administración
            navigate('/admin');
        // Bloque catch para manejar errores durante el inicio de sesión
        } catch (err) {
            // Establece el mensaje de error del servidor o uno por defecto
            setError(err.message || 'Credenciales incorrectas');
        // Bloque finally que se ejecuta siempre, tanto si hay error como si no
        } finally {
            // Indica que el envío ha terminado, reactivando el botón de submit
            setSubmitting(false);
        }
    };

    // Retorna el JSX que renderiza la interfaz completa de la página de login
    return (
        {/* Contenedor principal de toda la página de login */}
        <div className="login-page">
            {/* Contenedor centrado que envuelve la tarjeta de login */}
            <div className="login-container">
                {/* Tarjeta visual que contiene el formulario de login */}
                <div className="login-card">
                    {/* Encabezado de la tarjeta con logo, título e instrucciones */}
                    <div className="login-header">
                        {/* Logo de la iglesia con texto alternativo para accesibilidad */}
                        <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="login-logo" />
                        {/* Título principal que identifica el panel de administración */}
                        <h1>Panel de Administracion</h1>
                        {/* Texto descriptivo que indica al usuario qué debe hacer */}
                        <p>Ingresa tus credenciales para acceder</p>
                    </div>

                    {/* Formulario que maneja el envío de credenciales de login */}
                    <form className="login-form" onSubmit={handleSubmit}>
                        {/* Renderizado condicional: muestra el error solo si existe */}
                        {error && (
                            {/* Contenedor del mensaje de error con ícono de alerta */}
                            <div className="login-error">
                                {/* Ícono de círculo de exclamación para indicar error */}
                                <i className="bi bi-exclamation-circle"></i>
                                {/* Muestra el texto del mensaje de error */}
                                {error}
                            </div>
                        )}

                        {/* Campo del formulario para el correo electrónico */}
                        <div className="login-field">
                            {/* Etiqueta del campo de email, vinculada por htmlFor al input */}
                            <label htmlFor="email">Correo electronico</label>
                            {/* Contenedor del ícono y el campo de entrada de email */}
                            <div className="login-input-wrapper">
                                {/* Ícono de sobre que representa el campo de correo */}
                                <i className="bi bi-envelope"></i>
                                {/* Campo de entrada para el correo electrónico */}
                                <input
                                    {/* ID del input, usado por htmlFor del label para accesibilidad */}
                                    id="email"
                                    {/* Tipo email para validación nativa del navegador */}
                                    type="email"
                                    {/* Texto de ejemplo que sugiere el formato esperado */}
                                    placeholder="admin@iglesia.com"
                                    {/* Valor controlado vinculado al estado email */}
                                    value={email}
                                    {/* Actualiza el estado email cada vez que el usuario escribe */}
                                    onChange={(e) => setEmail(e.target.value)}
                                    {/* Campo obligatorio, impide enviar el formulario si está vacío */}
                                    required
                                    {/* Indica al navegador que autorellene con emails guardados */}
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Campo del formulario para la contraseña */}
                        <div className="login-field">
                            {/* Etiqueta del campo de contraseña, vinculada por htmlFor al input */}
                            <label htmlFor="password">Contrasena</label>
                            {/* Contenedor del ícono y el campo de entrada de contraseña */}
                            <div className="login-input-wrapper">
                                {/* Ícono de candado que representa el campo de contraseña */}
                                <i className="bi bi-lock"></i>
                                {/* Campo de entrada para la contraseña */}
                                <input
                                    {/* ID del input, usado por htmlFor del label para accesibilidad */}
                                    id="password"
                                    {/* Tipo password para ocultar los caracteres escritos */}
                                    type="password"
                                    {/* Texto de placeholder que indica qué ingresar */}
                                    placeholder="Ingresa tu contrasena"
                                    {/* Valor controlado vinculado al estado password */}
                                    value={password}
                                    {/* Actualiza el estado password cada vez que el usuario escribe */}
                                    onChange={(e) => setPassword(e.target.value)}
                                    {/* Campo obligatorio, impide enviar el formulario si está vacío */}
                                    required
                                    {/* Indica al navegador que autorellene con contraseñas guardadas */}
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        {/* Botón de envío del formulario de login */}
                        <button
                            {/* Tipo submit para que active el onSubmit del formulario */}
                            type="submit"
                            {/* Clases CSS: botón primario con estilo específico de login */}
                            className="btn btn-primary login-btn"
                            {/* Deshabilita el botón mientras se procesa el envío */}
                            disabled={submitting}
                        >
                            {/* Renderizado condicional según si se está enviando o no */}
                            {submitting ? (
                                {/* Fragmento que agrupa el spinner y texto durante el envío */}
                                <>
                                    {/* Indicador visual de carga (spinner animado) */}
                                    <span className="login-spinner"></span>
                                    {/* Texto que indica que se está procesando el login */}
                                    Ingresando...
                                </>
                            ) : (
                                {/* Fragmento que agrupa ícono y texto en estado normal */}
                                <>
                                    {/* Ícono de flecha que representa entrar al sistema */}
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    {/* Texto del botón para iniciar sesión */}
                                    Iniciar Sesion
                                </>
                            )}
                        </button>
                    </form>

                    {/* Pie de página de la tarjeta con enlace de retorno */}
                    <div className="login-footer">
                        {/* Enlace que redirige al usuario a la página principal del sitio */}
                        <Link to="/">
                            {/* Ícono de flecha izquierda que indica volver atrás */}
                            <i className="bi bi-arrow-left"></i>
                            {/* Texto del enlace que indica la acción de volver */}
                            Volver al sitio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
