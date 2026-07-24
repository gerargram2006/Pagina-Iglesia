// URL base del servidor backend (API REST)
const API_URL = 'http://localhost:3000/api';

/**
 * fetchAPI - Función centralizada para hacer peticiones HTTP al backend
 * Maneja automáticamente:
 * - Headers JSON
 * - Inyección del token JWT desde localStorage
 * - Manejo de errores HTTP
 * @param {string} endpoint - Ruta del endpoint (ej: "/eventos", "/pastores")
 * @param {object} options - Opciones de fetch (method, body, headers, etc.)
 * @returns {Promise<object>} Datos de la respuesta JSON
 * @throws {Error} Si la respuesta no es exitosa
 */
async function fetchAPI(endpoint, options = {}) {
    // Configura los headers por defecto (Content-Type JSON)
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers, // Permite sobreescribir headers personalizados
    };

    // Intenta obtener el token JWT del localStorage para autenticación
    const authData = localStorage.getItem('auth');
    if (authData) {
        try {
            // Parsea el objeto que contiene el token
            const parsed = JSON.parse(authData);
            // Si existe un token, lo agrega al header Authorization
            if (parsed?.token) {
                headers['Authorization'] = `Bearer ${parsed.token}`;
            }
        } catch (e) {
            // Si hay error al parsear, lo muestra en consola (no bloquea la app)
            console.error('Error parseando token auth del localStorage', e);
        }
    }

    // Combina las opciones originales con los headers actualizados
    const config = { ...options, headers };

    try {
        // Realiza la petición HTTP al backend
        const response = await fetch(`${API_URL}${endpoint}`, config);
        // Intenta parsear la respuesta como JSON (fallback: null si no es JSON válido)
        const data = await response.json().catch(() => null);

        // Si la respuesta no es exitosa (4xx o 5xx), lanza un error
        if (!response.ok) {
            throw new Error(data?.error || `Error HTTP: ${response.status}`);
        }

        // Retorna los datos parseados exitosamente
        return data;
    } catch (error) {
        // Muestra el error en consola y lo relanza para que el componente lo maneje
        console.error(`API Error en ${endpoint}:`, error);
        throw error;
    }
}

/**
 * api - Objeto que agrupa todas las funciones de la API organizadas por recurso
 * Uso: api.eventos.getAll(), api.pastores.create(data), etc.
 */
export const api = {
    // Endpoints de Eventos (CRUD completo)
    eventos: {
        // GET /api/eventos - Obtener todos los eventos
        getAll: () => fetchAPI('/eventos'),
        // POST /api/eventos - Crear un nuevo evento
        create: (data) => fetchAPI('/eventos', { method: 'POST', body: JSON.stringify(data) }),
        // PUT /api/eventos/:id - Actualizar un evento existente
        update: (id, data) => fetchAPI(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        // DELETE /api/eventos/:id - Eliminar un evento
        delete: (id) => fetchAPI(`/eventos/${id}`, { method: 'DELETE' }),
    },
    // Endpoints de Pastores (CRUD completo)
    pastores: {
        // GET /api/pastores - Obtener todos los pastores
        getAll: () => fetchAPI('/pastores'),
        // POST /api/pastores - Crear un nuevo pastor
        create: (data) => fetchAPI('/pastores', { method: 'POST', body: JSON.stringify(data) }),
        // PUT /api/pastores/:id - Actualizar un pastor existente
        update: (id, data) => fetchAPI(`/pastores/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
        // DELETE /api/pastores/:id - Eliminar un pastor
        delete: (id) => fetchAPI(`/pastores/${id}`, { method: 'DELETE' }),
    },
    // Endpoints de Mensajes de contacto
    mensajes: {
        // GET /api/mensajes - Obtener todos los mensajes (requiere auth)
        getAll: () => fetchAPI('/mensajes'),
        // POST /api/mensajes - Enviar un mensaje de contacto (público)
        create: (data) => fetchAPI('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
        // DELETE /api/mensajes/:id - Eliminar un mensaje (requiere auth)
        delete: (id) => fetchAPI(`/mensajes/${id}`, { method: 'DELETE' }),
    },
};
