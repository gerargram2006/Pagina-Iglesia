// Importa los hooks de React y el tipo ReactNode para el contexto de autenticación
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
// Importa el objeto de la API y el tipo de respuesta de autenticación
import { api, type AuthResponse } from '../api';

// Define la estructura del usuario autenticado
interface AuthUser {
    id: number;
    name: string;
    email: string;
    rol: string;
}

// Define la estructura del valor que expone el contexto de autenticación
interface AuthContextValue {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    logout: () => void;
}

// Crea el contexto de autenticación con un valor inicial nulo
const AuthContext = createContext<AuthContextValue | null>(null);

// Define el proveedor que envuelve la app y gestiona la sesión del usuario
export function AuthProvider({ children }: { children: ReactNode }) {
    // Estado que guarda el usuario autenticado
    const [user, setUser] = useState<AuthUser | null>(null);
    // Estado que guarda el token de sesión
    const [token, setToken] = useState<string | null>(null);
    // Estado que indica si se está verificando la sesión guardada
    const [loading, setLoading] = useState(true);

    // Define la función que cierra la sesión del usuario
    const logout = () => {
        // Limpia el usuario en memoria
        setUser(null);
        // Limpia el token en memoria
        setToken(null);
        // Elimina el usuario guardado en localStorage
        localStorage.removeItem('admin_user');
        // Elimina el token guardado en localStorage
        localStorage.removeItem('admin_token');
    };

    // Al montar el proveedor, restaura la sesión guardada en localStorage
    useEffect(() => {
        try {
            // Lee el usuario guardado en localStorage
            const storedUser = localStorage.getItem('admin_user');
            // Lee el token guardado en localStorage
            const storedToken = localStorage.getItem('admin_token');

            // Si existen usuario y token guardados, restaura la sesión
            if (storedUser && storedToken) {
                // Convierte el usuario guardado de JSON a objeto
                const parsed = JSON.parse(storedUser) as AuthUser;
                // Si el usuario parseado tiene email, se considera válido
                if (parsed?.email) {
                    // Restaura el usuario en memoria
                    setUser(parsed);
                    // Restaura el token en memoria
                    setToken(storedToken);
                } else {
                    // Si el usuario no es válido, elimina los datos guardados
                    localStorage.removeItem('admin_user');
                    localStorage.removeItem('admin_token');
                }
            }
        } catch {
            // Si ocurre un error al leer, limpia los datos guardados
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_token');
        } finally {
            // Indica que la verificación de la sesión terminó
            setLoading(false);
        }
    }, []);

    // Define la función que inicia sesión con email y contraseña
    const login = async (email: string, password: string): Promise<AuthUser> => {
        // Llama a la API para autenticar al usuario
        const data: AuthResponse = await api.auth.login(email, password);
        // Guarda el usuario devuelto en el estado
        setUser(data.user);
        // Guarda el token devuelto en el estado
        setToken(data.token);
        // Persiste el usuario en localStorage
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        // Persiste el token en localStorage
        localStorage.setItem('admin_token', data.token);
        // Devuelve el usuario autenticado
        return data.user;
    };

    return (
        // Expone el contexto de autenticación a los componentes hijos
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {/* Renderiza los hijos envueltos por el proveedor */}
            {children}
        </AuthContext.Provider>
    );
}

// Hook que permite consumir el contexto de autenticación desde cualquier componente
export function useAuth(): AuthContextValue {
    // Obtiene el valor actual del contexto
    const context = useContext(AuthContext);
    // Si no hay proveedor, lanza un error de uso incorrecto
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    // Devuelve el valor del contexto
    return context;
}
