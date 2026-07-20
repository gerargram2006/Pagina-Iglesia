const API_URL = 'http://localhost:3000/api';

async function fetchAPI(endpoint, options = {}) {
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            const parsed = JSON.parse(authData);
            if (parsed?.token) {
                headers['Authorization'] = `Bearer ${parsed.token}`;
            }
        } catch (e) {
            console.error('Error parseando token auth del localStorage', e);
        }
    }

    const config = { ...options, headers };

    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
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

export const api = {
    eventos: {
        getAll: () => fetchAPI('/eventos'),
        create: (data) => fetchAPI('/eventos', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) => fetchAPI(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => fetchAPI(`/eventos/${id}`, { method: 'DELETE' }),
    },
    pastores: {
        getAll: () => fetchAPI('/pastores'),
        create: (data) => fetchAPI('/pastores', { method: 'POST', body: JSON.stringify(data) }),
        update: (id, data) => fetchAPI(`/pastores/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        delete: (id) => fetchAPI(`/pastores/${id}`, { method: 'DELETE' }),
    },
    mensajes: {
        getAll: () => fetchAPI('/mensajes'),
        create: (data) => fetchAPI('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
        delete: (id) => fetchAPI(`/mensajes/${id}`, { method: 'DELETE' }),
    },
};
