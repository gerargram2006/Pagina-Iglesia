const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
const API_URL = (configuredApiUrl || '/api').replace(/\/$/, '');

// Construye la URL completa de un recurso subido (uploads) usando el origen del backend
const UPLOAD_ORIGIN = configuredApiUrl
  ? new URL(configuredApiUrl).origin
  : window.location.origin;

/** Devuelve la URL completa para mostrar un archivo local o externo */
export function getUploadUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${UPLOAD_ORIGIN}${path}`;
}

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
  imagen?: File;
  imagen_url?: string;
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
  foto?: File;
  foto_url?: string;
}

export interface ApiAnuncio {
  id: number;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  fecha_creacion: string;
}

export interface AnuncioInput {
  titulo: string;
  descripcion: string;
  imagen?: File;
  imagen_url?: string;
}

export interface ApiRecurso {
  id: number;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  archivo_url: string;
  fecha_creacion: string;
}

export interface RecursoInput {
  titulo: string;
  descripcion: string;
  tipo: string;
  archivo?: File;
  archivo_url?: string;
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

export interface ApiSlide {
  id: number;
  titulo: string;
  subtitulo: string | null;
  imagen_url: string;
  btn_principal: string | null;
  btn_secundario: string | null;
  orden: number;
  activo: number;
}

export interface ApiHorario {
  id: number;
  dia: string;
  hora: string;
  actividad: string;
}

export interface ApiGaleria {
  id: number;
  titulo: string;
  imagen_url: string;
  destacada: number;
  orden: number;
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
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

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
    create: (data: FormData): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>('/eventos', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>(`/eventos/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/eventos/${id}`, { method: 'DELETE' }),
  },
  pastores: {
    getAll: (): Promise<ApiPastor[]> => fetchAPI<ApiPastor[]>('/pastores'),
    create: (data: FormData): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>('/pastores', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>(`/pastores/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/pastores/${id}`, { method: 'DELETE' }),
  },
  mensajes: {
    getAll: (): Promise<ApiMensaje[]> => fetchAPI<ApiMensaje[]>('/mensajes'),
    create: (data: MensajeInput): Promise<MensajeInput & { id: number }> =>
      fetchAPI<MensajeInput & { id: number }>('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/mensajes/${id}`, { method: 'DELETE' }),
  },
  anuncios: {
    getAll: (): Promise<ApiAnuncio[]> => fetchAPI<ApiAnuncio[]>('/anuncios'),
    create: (data: FormData): Promise<ApiAnuncio> =>
      fetchAPI<ApiAnuncio>('/anuncios', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiAnuncio> =>
      fetchAPI<ApiAnuncio>(`/anuncios/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/anuncios/${id}`, { method: 'DELETE' }),
  },
  recursos: {
    getAll: (): Promise<ApiRecurso[]> => fetchAPI<ApiRecurso[]>('/recursos'),
    create: (data: FormData): Promise<ApiRecurso> =>
      fetchAPI<ApiRecurso>('/recursos', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiRecurso> =>
      fetchAPI<ApiRecurso>(`/recursos/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/recursos/${id}`, { method: 'DELETE' }),
  },
  slides: {
    getAll: (): Promise<ApiSlide[]> => fetchAPI<ApiSlide[]>('/slides'),
    create: (data: FormData): Promise<ApiSlide> =>
      fetchAPI<ApiSlide>('/slides', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiSlide> =>
      fetchAPI<ApiSlide>(`/slides/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/slides/${id}`, { method: 'DELETE' }),
  },
  horarios: {
    getAll: (): Promise<ApiHorario[]> => fetchAPI<ApiHorario[]>('/horarios'),
    create: (data: ApiHorario): Promise<ApiHorario> =>
      fetchAPI<ApiHorario>('/horarios', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: ApiHorario): Promise<ApiHorario> =>
      fetchAPI<ApiHorario>(`/horarios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/horarios/${id}`, { method: 'DELETE' }),
  },
  galeria: {
    getAll: (): Promise<ApiGaleria[]> => fetchAPI<ApiGaleria[]>('/galeria'),
    create: (data: FormData): Promise<ApiGaleria> =>
      fetchAPI<ApiGaleria>('/galeria', { method: 'POST', body: data }),
    update: (id: number, data: FormData): Promise<ApiGaleria> =>
      fetchAPI<ApiGaleria>(`/galeria/${id}`, { method: 'PUT', body: data }),
    delete: (id: number): Promise<void> => fetchAPI<void>(`/galeria/${id}`, { method: 'DELETE' }),
  },
};
