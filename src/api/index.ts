const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configuredApiUrl || '/api').replace(/\/$/, '');

export interface ApiEvento {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  lugar: string;
  imagen_url: string | null;
}

export interface EventoInput {
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  imagen_url: string;
}

export interface ApiPastor {
  id: number;
  nombre: string;
  cargo: string;
  biografia: string | null;
  foto_url: string | null;
}

export interface PastorInput {
  nombre: string;
  cargo: string;
  biografia: string;
  foto_url: string;
}

export interface ApiMensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha_envio: string;
}

export interface MensajeInput {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    rol: string;
  };
}

interface ApiErrorResponse {
  error?: string;
  message?: string;
}

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');

  const token = localStorage.getItem('admin_token');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  const data: unknown = response.status === 204 ? null : await response.json().catch(() => null);

  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;
    throw new Error(errorData?.error || errorData?.message || `Error HTTP ${response.status}`);
  }

  return data as T;
}

export const api = {
  auth: {
    login: (email: string, password: string): Promise<AuthResponse> =>
      fetchAPI<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  },
  eventos: {
    getAll: (): Promise<ApiEvento[]> => fetchAPI<ApiEvento[]>('/eventos'),
    create: (data: EventoInput): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>('/eventos', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: EventoInput): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>(`/eventos/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/eventos/${id}`, { method: 'DELETE' }),
  },
  pastores: {
    getAll: (): Promise<ApiPastor[]> => fetchAPI<ApiPastor[]>('/pastores'),
    create: (data: PastorInput): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>('/pastores', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: PastorInput): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>(`/pastores/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/pastores/${id}`, { method: 'DELETE' }),
  },
  mensajes: {
    getAll: (): Promise<ApiMensaje[]> => fetchAPI<ApiMensaje[]>('/mensajes'),
    create: (data: MensajeInput): Promise<MensajeInput & { id: number }> =>
      fetchAPI<MensajeInput & { id: number }>('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/mensajes/${id}`, { method: 'DELETE' }),
  },
};
