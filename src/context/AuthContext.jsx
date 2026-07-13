// Importa herramientas de React: createContext para crear el contexto, useContext para consumirlo, useState para estado local y useEffect para efectos secundarios
import { createContext, useContext, useState, useEffect } from 'react';

// Crea el contexto de autenticación con un valor inicial de null
const AuthContext = createContext(null);

// Define la URL del endpoint de login del backend
const API_URL = 'http://localhost:3000/api/auth/login';

// Componente proveedor que envuelve la app y comparte el estado de autenticación a través del contexto
export function AuthProvider({ children }) {
    // Estado que almacena el objeto del usuario autenticado (null si no hay sesión)
    const [user, setUser] = useState(null);
    // Estado que almacena el token JWT del usuario autenticado (null si no hay sesión)
    const [token, setToken] = useState(null);
    // Estado que indica si se está verificando la sesión al cargar la app (true inicialmente)
    const [loading, setLoading] = useState(true);

    // Efecto que se ejecuta una sola vez al montar el componente para restaurar la sesión
    useEffect(() => {
        // Obtiene el usuario guardado en localStorage durante el login anterior
        const storedUser = localStorage.getItem('admin_user');
        // Obtiene el token guardado en localStorage durante el login anterior
        const storedToken = localStorage.getItem('admin_token');
        // Verifica que ambos valores existan en localStorage
        if (storedUser && storedToken) {
            // Convierte el JSON del usuario de texto a objeto y lo restaura en el estado
            setUser(JSON.parse(storedUser));
            // Restaura el token en el estado
            setToken(storedToken);
        }
        // Marca que la verificación inicial de sesión ha terminado
        setLoading(false);
    }, []); // Array de dependencias vacío: solo se ejecuta al montar

    // Función asíncrona que realiza el login con email y contraseña
    const login = async (email, password) => {
        // Envía una petición POST al endpoint de login con las credenciales
        const res = await fetch(API_URL, {
            method: 'POST', // Método HTTP POST para enviar datos
            // Indica que el cuerpo de la petición contiene datos JSON
            headers: { 'Content-Type': 'application/json' },
            // Convierte el email y password a formato JSON para enviarlos al servidor
            body: JSON.stringify({ email, password }),
        });

        // Convierte la respuesta del servidor de JSON a un objeto JavaScript
        const data = await res.json();

        // Verifica si la respuesta HTTP indica un error (código 4xx o 5xx)
        if (!res.ok) {
            // Lanza un error con el mensaje del servidor o un mensaje por defecto
            throw new Error(data.message || 'Credenciales incorrectas');
        }

        // Guarda el usuario devuelto por el servidor en el estado
        setUser(data.user);
        // Guarda el token JWT devuelto por el servidor en el estado
        setToken(data.token);
        // Persiste el usuario en localStorage para mantener la sesión al recargar
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        // Persiste el token en localStorage para mantener la sesión al recargar
        localStorage.setItem('admin_token', data.token);

        // Devuelve el objeto del usuario para que quien llame a login pueda usarlo
        return data.user;
    };

    // Función que cierra la sesión del usuario limpiando todo el estado y almacenamiento
    const logout = () => {
        // Elimina el usuario del estado
        setUser(null);
        // Elimina el token del estado
        setToken(null);
        // Elimina el usuario guardado del localStorage
        localStorage.removeItem('admin_user');
        // Elimina el token guardado del localStorage
        localStorage.removeItem('admin_token');
    };

    // Renderiza el proveedor del contexto con los valores compartidos y sus hijos
    return (
        // Proveedor del contexto que expone user, token, loading, login y logout
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {/* Renderiza los componentes hijos dentro del proveedor */}
            {children}
        </AuthContext.Provider>
    );
}

// Hook personalizado para consumir el contexto de autenticación de forma segura
export function useAuth() {
    // Obtiene el valor del contexto de autenticación
    const context = useContext(AuthContext);
    // Verifica que el hook se esté usando dentro de un AuthProvider
    if (!context) {
        // Lanza error si se usa fuera del proveedor para evitar bugs silenciosos
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    // Devuelve el contexto con user, token, loading, login y logout
    return context;
}
