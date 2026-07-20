import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);
const API_URL = '/api/auth/login';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('admin_user');
            const storedToken = localStorage.getItem('admin_token');
            if (storedUser && storedToken) {
                const parsed = JSON.parse(storedUser);
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
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || data.error || 'Credenciales incorrectas');

        setUser(data.user);
        setToken(data.token);
        localStorage.setItem('admin_user', JSON.stringify(data.user));
        localStorage.setItem('admin_token', data.token);
        return data.user;
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_token');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
    return context;
}
