// Importa funciones de React para crear contextos y manejar estado/efectos
import { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto de autenticación con valor inicial null
const AuthContext = createContext(null);
// URL del endpoint de login en el backend
const API_URL = '/api/auth/login';

/**
 * AuthProvider - Componente proveedor del contexto de autenticación
 * Proporciona a toda la app: user, token, loading, login(), logout()
 * Se encarga de:
 * - Restaurar sesión desde localStorage al recargar la página
 * - Iniciar sesión (enviar credenciales al backend)
 * - Cerrar sesión (limpiar localStorage y estado)
 */
export function AuthProvider({ children }) {
    // Estado del usuario autenticado (objeto con id, name, email, rol o null)
    const [user, setUser] = useState(null);
    // Estado del token JWT (string o null)
    const [token, setToken] = useState(null);
    // Estado de carga: true mientras se verifica si hay sesión guardada
    const [loading, setLoading] = useState(true);

    // Efecto que se ejecuta UNA VEZ al montar el componente
    // Verifica si hay credenciales guardadas en localStorage para restaurar la sesión
    useEffect(() => {
        try {
            // Intenta leer el usuario y token guardados del navegador
            const storedUser = localStorage.getItem('admin_user');
            const storedToken = localStorage.getItem('admin_token');
            // Si ambos existen, intenta parsear el usuario
            if (storedUser && storedToken) {
                const parsed = JSON.parse(storedUser);
                // Verifica que el objeto parseado tenga email (datos válidos)
                if (parsed?.email) {
                    setUser(parsed);      // Restaura el usuario en el estado
                    setToken(storedToken); // Restaura el token en el estado
                } else {
                    // Si los datos están corruptos, los elimina
                    localStorage.removeItem('admin_user');
                    localStorage.removeItem('admin_token');
                }
            }
        } catch {
            // Si hay error al parsear JSON, limpia el localStorage
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_token');
        }
        // Marca que la carga inicial terminó (ya sea con sesión o sin ella)
        setLoading(false);
    }, []); // Array vacío = solo se ejecuta una vez

    /**
     * login - Función para iniciar sesión
     * @param {string} email - Correo del usuario
     * @param {string} password - Contraseña del usuario
     * @returns {object} Datos del usuario autenticado
     * @throws {Error} Si las credenciales son incorrectas
     */
    const login = async (email, password) => {
        // Envía POST al backend con las credenciales
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        // Parsea la respuesta del servidor
        const data = await res.json();
        // Si la respuesta no es exitosa (código 4xx o 5xx), lanza error
        if (!res.ok) throw new Error(data.message || data.error || 'Credenciales incorrectas');

        // Guarda el usuario y token en el estado de React
        setUser(data.user);
        setToken(data.token);
        // Persiste en localStorage para sobrevivir recargas de página
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        localStorage.setItem('admin_token', data.token);
        // Retorna los datos del usuario para uso externo
        return data.user;
    };

    /**
     * logout - Función para cerrar sesión
     * Limpia todo el estado y el localStorage
     */
    const logout = () => {
        setUser(null);  // Limpia el usuario del estado
        setToken(null); // Limpia el token del estado
        // Elimina las credenciales guardadas del navegador
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    return (
        {/* Proveedor del contexto: comparte los valores con todos los componentes hijos */}
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

/**
 * useAuth - Hook personalizado para acceder al contexto de autenticación
 * @returns {object} { user, token, loading, login, logout }
 * @throws {Error} Si se usa fuera de un AuthProvider
 */
export function useAuth() {
    const context = useContext(AuthContext);
    // Error si se intenta usar useAuth fuera del AuthProvider
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
}
