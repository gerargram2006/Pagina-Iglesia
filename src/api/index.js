/**
 * Cliente API centralizado para el frontend.
 * Maneja todas las peticiones al backend (Express) e inyecta el token JWT
 * automáticamente en las peticiones que lo requieran.
 */

const API_URL = 'http://localhost:3000/api';

/**
 * Función genérica para hacer peticiones al backend.
 * @param {string} endpoint - Ruta del endpoint (ej. '/eventos')
 * @param {Object} options - Opciones de fetch (method, body, etc.)
 */
async function fetchAPI(endpoint, options = {}) {
    // 1. Configurar headers por defecto (JSON)
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    // 2. Obtener el token JWT del localStorage
    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            const parsed = JSON.parse(authData);
            if (parsed && parsed.token) {
                // Inyectar el token en el header Authorization
                headers['Authorization'] = `Bearer ${parsed.token}`;
            }
        } catch (e) {
            console.error('Error parseando token auth del localStorage', e);
        }
    }

    // 3. Configurar la petición final
    const config = {
        ...options,
        headers,
    };

    try {
        // 4. Hacer la petición fetch
        const response = await fetch(`${API_URL}${endpoint}`, config);
        
        // 5. Parsear respuesta (si es JSON)
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            throw new Error(data?.error || `Error HTTP: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`API Error en ${endpoint}:`, error);
        throw error;
    }
}

// --- SERVICIOS ESPECÍFICOS ---

export const api = {
    // Eventos
    eventos: {
        getAll: () => fetchAPI('/eventos'),
        create: (data) => fetchAPI('/eventos', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) => fetchAPI(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => fetchAPI(`/eventos/${id}`, { method: 'DELETE' }),
    },
    // Pastores
    pastores: {
        getAll: () => fetchAPI('/pastores'),
        create: (data) => fetchAPI('/pastores', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) => fetchAPI(`/pastores/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => fetchAPI(`/pastores/${id}`, { method: 'DELETE' }),
    },
    // Mensajes
    mensajes: {
        getAll: () => fetchAPI('/mensajes'),
        delete: (id) => fetchAPI(`/mensajes/${id}`, { method: 'DELETE' }),
    }
};
