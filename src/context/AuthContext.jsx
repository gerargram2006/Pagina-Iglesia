/**
 * Módulo AuthContext - Proveedor de contexto de autenticación.
 *
 * Este archivo define el sistema de autenticación completo de la aplicación:
 *   - AuthProvider: Componente proveedor que envuelve la app y comparte el estado
 *     de autenticación (usuario, token, estado de carga) a través de React Context.
 *   - useAuth: Hook personalizado para consumir el contexto de autenticación
 *     de forma segura desde cualquier componente hijo.
 *
 * Flujo de autenticación:
 *   1. Al cargar la app, se verifica si hay credenciales guardadas en localStorage.
 *   2. El usuario ingresa email/contraseña en el formulario Login.
 *   3. Se envía POST a /api/auth/login con las credenciales.
 *   4. El backend valida con bcrypt y devuelve un JWT + datos del usuario.
 *   5. Se guarda el token y usuario en estado + localStorage.
 *   6. La ProtectedRoute verifica si hay usuario para permitir acceso a /admin.
 *   7. Al cerrar sesión, se limpia todo el estado y localStorage.
 *
 * Seguridad:
 *   - El token JWT se almacena en localStorage (aceptable para apps internas).
 *   - La contraseña nunca se almacena en el frontend.
 *   - Las credenciales se limpian automáticamente al cerrar sesión.
 */

// Importa herramientas de React:
// createContext - crea un objeto de contexto que puede ser compartido entre componentes
// useContext - hook para consumir un contexto desde un componente funcional
// useState - hook para manejar estado local reactivo
// useEffect - hook para ejecutar efectos secundarios (ciclo de vida del componente)
import { createContext, useContext, useState, useEffect } from 'react';

/**
 * Crea el contexto de autenticación con valor inicial null.
 * Null indica que no hay proveedor activo (útil para detectar uso incorrecto).
 */
const AuthContext = createContext(null);

/**
 * URL del endpoint de login del backend.
 * Se usa ruta relativa porque Vite proxy redirige /api a localhost:3000
 * tanto en desarrollo como en producción (si se configura).
 */
const API_URL = '/api/auth/login';

/**
 * Componente AuthProvider - Proveedor del contexto de autenticación.
 *
 * Envuelve la aplicación (o parte de ella) y proporciona:
 *   - user: Objeto del usuario autenticado (id, name, email, rol) o null.
 *   - token: String con el token JWT o null.
 *   - loading: Boolean que indica si se está verificando la sesión inicial.
 *   - login(email, password): Función asíncrona para autenticar.
 *   - logout(): Función para cerrar la sesión y limpiar todo.
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos que tendrán acceso al contexto
 */
export function AuthProvider({ children }) {
    // Estado que almacena el objeto del usuario autenticado (null si no hay sesión)
    const [user, setUser] = useState(null);
    // Estado que almacena el token JWT del usuario autenticado (null si no hay sesión)
    const [token, setToken] = useState(null);
    // Estado que indica si se está verificando la sesión al cargar la app (true inicialmente)
    const [loading, setLoading] = useState(true);

    /**
     * Efecto que se ejecuta una vez al montar el componente (array de dependencias vacío []).
     * Verifica si hay credenciales guardadas en localStorage para restaurar la sesión.
     * Esto permite que al recargar la página, el usuario siga autenticado.
     */
    useEffect(() => {
        try {
            // Obtiene el string del usuario guardado en localStorage
            const storedUser = localStorage.getItem('admin_user');
            // Obtiene el string del token JWT guardado en localStorage
            const storedToken = localStorage.getItem('admin_token');

            // Verifica que ambos valores existan (no sean null ni string vacío)
            if (storedUser && storedToken) {
                // Convierte el string JSON a objeto JavaScript
                const parsed = JSON.parse(storedUser);
                // Verifica que el objeto parseado tenga la propiedad email (validación básica)
                if (parsed && parsed.email) {
                    // Restaura el usuario en el estado
                    setUser(parsed);
                    // Restaura el token en el estado
                    setToken(storedToken);
                } else {
                    // Si el objeto parseado no tiene email, datos corruptos - limpiar
                    localStorage.removeItem('admin_user');
                    localStorage.removeItem('admin_token');
                }
            }
        } catch {
            // Si falla JSON.parse u otra operación, limpiar datos corruptos
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_token');
        }
        // Marca que la verificación inicial ha terminado (permite renderizar la app)
        setLoading(false);
    }, []); // Array vacío = se ejecuta solo una vez al montar el componente

    /**
     * Función asíncrona que realiza el login con email y contraseña.
     *
     * Flujo:
     *   1. Envía POST al backend con credenciales en formato JSON.
     *   2. El backend valida email, compara contraseña con bcrypt, genera JWT.
     *   3. Si es exitoso, guarda usuario y token en estado + localStorage.
     *   4. Si falla, lanza un error con el mensaje del servidor.
     *
     * @param {string} email - Correo electrónico del usuario
     * @param {string} password - Contraseña en texto plano (se envía al backend para comparar)
     * @returns {Promise<Object>} Objeto del usuario autenticado {id, name, email,rol}
     * @throws {Error} Si las credenciales son incorrectas o hay error de servidor
     */
    const login = async (email, password) => {
        // Envía una petición HTTP POST al endpoint de login del backend
        const res = await fetch(API_URL, {
            // Método HTTP POST - utilizado para enviar datos al servidor
            method: 'POST',
            // Indica que el cuerpo de la petición contiene datos en formato JSON
            headers: { 'Content-Type': 'application/json' },
            // Convierte el email y password a string JSON para enviarlos al servidor
            body: JSON.stringify({ email, password }),
        });

        // Convierte la respuesta del servidor de JSON a un objeto JavaScript
        // Esto es necesario porque fetch no parsea automáticamente el body
        const data = await res.json();

        // Verifica si la respuesta HTTP indica un error (código 4xx o 5xx)
        // res.ok es true solo para códigos 200-299
        if (!res.ok) {
            // Lanza un error con el mensaje del backend o uno genérico si no hay mensaje
            throw new Error(data.message || data.error || 'Credenciales incorrectas');
        }

        // Guarda el usuario devuelto por el servidor en el estado de React
        // Esto dispara un re-render y actualiza el valor del contexto
        setUser(data.user);
        // Guarda el token JWT devuelto por el servidor en el estado
        setToken(data.token);

        // Persiste el usuario en localStorage para mantener la sesión al recargar la página
        // JSON.stringify convierte el objeto a string para poder guardarlo
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        // Persiste el token JWT en localStorage
        localStorage.setItem('admin_token', data.token);

        // Devuelve el objeto del usuario para que quien llame a login pueda usarlo
        // (por ejemplo, para mostrar datos inmediatamente sin esperar al re-render)
        return data.user;
    };

    /**
     * Función que cierra la sesión del usuario.
     * Limpia todo el estado de autenticación y el almacenamiento local.
     * No necesita ser asíncrona porque solo modifica estado local.
     */
    const logout = () => {
        // Elimina el usuario del estado de React (provoca re-render)
        setUser(null);
        // Elimina el token del estado de React
        setToken(null);
        // Elimina el usuario guardado del localStorage del navegador
        localStorage.removeItem('admin_user');
        // Elimina el token guardado del localStorage del navegador
        localStorage.removeItem('admin_token');
    };

    /**
     * Renderiza el proveedor del contexto con los valores compartidos.
     * Los componentes hijos (a través de useAuth) pueden acceder a:
     *   - user: datos del usuario o null
     *   - token: JWT string o null
     *   - loading: boolean de estado de carga inicial
     *   - login: función para autenticar
     *   - logout: función para cerrar sesión
     */
    return (
        // Proveedor del contexto que expone los valores y funciones de autenticación
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {/* Renderiza los componentes hijos dentro del proveedor */}
            {children}
        </AuthContext.Provider>
    );
}

/**
 * Hook personalizado useAuth - Para consumir el contexto de autenticación.
 *
 * Uso:
 *   const { user, token, loading, login, logout } = useAuth();
 *
 * Debe usarse DENTRO de un AuthProvider, de lo contrario lanza un error claro.
 * Esto ayuda a detectar bugs temprano en desarrollo.
 *
 * @returns {Object} Objeto con user, token, loading, login, logout
 * @throws {Error} Si se usa fuera de un AuthProvider
 */
export function useAuth() {
    // Obtiene el valor del contexto de autenticación usando el hook de React
    const context = useContext(AuthContext);
    // Verifica que el hook se esté usando dentro de un AuthProvider
    // Si context es null, significa que no hay proveedor arriba en el árbol
    if (!context) {
        // Lanza error descriptivo si se usa fuera del proveedor
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    // Devuelve el contexto completo: { user, token, loading, login, logout }
    return context;
}
