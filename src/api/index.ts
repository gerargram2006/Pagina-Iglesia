const API_URL = 'http://localhost:3000/api';

interface AuthData {
  token?: string;
}

interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

interface ApiEvento {
  id?: number;
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  imagen_url: string;
}

interface ApiPastor {
  id?: number;
  nombre: string;
  cargo: string;
  biografia: string;
  foto_url: string;
}

interface ApiMensaje {
  id?: number;
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

async function fetchAPI(endpoint: string, options: FetchOptions = {}): Promise<unknown> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const authData = localStorage.getItem('auth');
  if (authData) {
    try {
      const parsed: AuthData = JSON.parse(authData);
      if (parsed?.token) {
        headers['Authorization'] = `Bearer ${parsed.token}`;
      }
    } catch (e) {
      console.error('Error parseando token auth del localStorage', e);
    }
  }

  const config: RequestInit = { ...options, headers };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const errorData = data as { error?: string } | null;
      throw new Error(errorData?.error || `Error HTTP: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API Error en ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  eventos: {
    getAll: (): Promise<unknown> => fetchAPI('/eventos'),
    create: (data: ApiEvento): Promise<unknown> =>
      fetchAPI('/eventos', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: ApiEvento): Promise<unknown> =>
      fetchAPI(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number): Promise<unknown> => fetchAPI(`/eventos/${id}`, { method: 'DELETE' }),
  },
  pastores: {
    getAll: (): Promise<unknown> => fetchAPI('/pastores'),
    create: (data: ApiPastor): Promise<unknown> =>
      fetchAPI('/pastores', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: ApiPastor): Promise<unknown> =>
      fetchAPI(`/pastores/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number): Promise<unknown> => fetchAPI(`/pastores/${id}`, { method: 'DELETE' }),
  },
  mensajes: {
    getAll: (): Promise<unknown> => fetchAPI('/mensajes'),
    create: (data: ApiMensaje): Promise<unknown> =>
      fetchAPI('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: number): Promise<unknown> => fetchAPI(`/mensajes/${id}`, { method: 'DELETE' }),
  },
};
