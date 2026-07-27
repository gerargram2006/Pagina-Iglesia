import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { api, type AuthResponse } from '../api';

interface AuthUser {
    id: number;
    name: string;
    email: string;
    rol: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<AuthUser>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('admin_user');
            const storedToken = localStorage.getItem('admin_token');

            if (storedUser && storedToken) {
                const parsed = JSON.parse(storedUser) as AuthUser;
                if (parsed?.email) {
                    setUser(parsed);
                    setToken(storedToken);
                } else {
                    localStorage.removeItem('admin_user');
                    localStorage.removeItem('admin_token');
                }
            }
        } catch {
            localStorage.removeItem('admin_user');
            localStorage.removeItem('admin_token');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = async (email: string, password: string): Promise<AuthUser> => {
        const data: AuthResponse = await api.auth.login(email, password);
        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        localStorage.setItem('admin_token', data.token);
        return data.user;
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
}
