// Lee la URL de la API configurada desde la variable de entorno y le quita espacios
const configuredApiUrl = import.meta.env.VITE_API_URL?.trim();
// Define la URL base de la API: usa la configurada o '/api' por defecto, sin barra final
const API_URL = (configuredApiUrl || '/api').replace(/\/$/, '');

// Define la estructura de un evento que devuelve la API
export interface ApiEvento {
  id: number;
  titulo: string;
  descripcion: string | null;
  fecha: string;
  lugar: string;
  imagen_url: string | null;
}

// Define la estructura de datos para crear o actualizar un evento
export interface EventoInput {
  titulo: string;
  descripcion: string;
  fecha: string;
  lugar: string;
  imagen?: File;
  imagen_url?: string;
}

// Define la estructura de un pastor que devuelve la API
export interface ApiPastor {
  id: number;
  nombre: string;
  cargo: string;
  biografia: string | null;
  foto_url: string | null;
}

// Define la estructura de datos para crear o actualizar un pastor
export interface PastorInput {
  nombre: string;
  cargo: string;
  biografia: string;
  foto?: File;
  foto_url?: string;
}

// Define la estructura de un anuncio que devuelve la API
export interface ApiAnuncio {
  id: number;
  titulo: string;
  descripcion: string | null;
  imagen_url: string | null;
  fecha_creacion: string;
}

// Define la estructura de datos para crear o actualizar un anuncio
export interface AnuncioInput {
  titulo: string;
  descripcion: string;
  imagen?: File;
  imagen_url?: string;
}

// Define la estructura de un recurso que devuelve la API
export interface ApiRecurso {
  id: number;
  titulo: string;
  descripcion: string | null;
  tipo: string;
  archivo_url: string;
  fecha_creacion: string;
}

// Define la estructura de datos para crear o actualizar un recurso
export interface RecursoInput {
  titulo: string;
  descripcion: string;
  tipo: string;
  archivo?: File;
  archivo_url?: string;
}

// Define la estructura de un mensaje de contacto que devuelve la API
export interface ApiMensaje {
  id: number;
  nombre: string;
  email: string;
  mensaje: string;
  fecha_envio: string;
}

// Define la estructura de datos para enviar un mensaje de contacto
export interface MensajeInput {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
}

// Define la estructura de una diapositiva del carrusel que devuelve la API
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

// Define la estructura de un horario que devuelve la API
export interface ApiHorario {
  id: number;
  dia: string;
  hora: string;
  actividad: string;
}

// Define la estructura de un elemento de la galería que devuelve la API
export interface ApiGaleria {
  id: number;
  titulo: string;
  imagen_url: string;
  destacada: number;
  orden: number;
}

// Define la respuesta del backend al iniciar sesión
export interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
    rol: string;
  };
}

// Define la estructura de un posible error devuelto por la API
interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// Función genérica que realiza las peticiones HTTP a la API
async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  // Crea los encabezados de la petición a partir de los opcionales
  const headers = new Headers(options.headers);
  // Si la petición no envía FormData, se usa JSON como contenido
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Lee el token de administración almacenado en localStorage
  const token = localStorage.getItem('admin_token');
  // Si existe token, se agrega al encabezado de autorización
  if (token) headers.set('Authorization', `Bearer ${token}`);

  // Ejecuta la petición fetch hacia la API con la URL y opciones dadas
  const response = await fetch(`${API_URL}${endpoint}`, { ...options, headers });
  // Convierte la respuesta a JSON (o null si la respuesta es 204 o no es JSON válido)
  const data: unknown = response.status === 204 ? null : await response.json().catch(() => null);

  // Si la respuesta indica error, se lanza una excepción con el mensaje del servidor
  if (!response.ok) {
    const errorData = data as ApiErrorResponse | null;
    throw new Error(errorData?.error || errorData?.message || `Error HTTP ${response.status}`);
  }

  // Devuelve los datos ya tipados
  return data as T;
}

// Exporta el objeto con los métodos de acceso a la API agrupados por recurso
export const api = {
  // Grupo de funciones de autenticación
  auth: {
    // Inicia sesión enviando email y contraseña al backend
    login: (email: string, password: string): Promise<AuthResponse> =>
      fetchAPI<AuthResponse>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  },
  // Grupo de funciones para gestionar eventos
  eventos: {
    // Obtiene todos los eventos
    getAll: (): Promise<ApiEvento[]> => fetchAPI<ApiEvento[]>('/eventos'),
    // Crea un nuevo evento enviando un FormData
    create: (data: FormData): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>('/eventos', { method: 'POST', body: data }),
    // Actualiza un evento existente por su id
    update: (id: number, data: FormData): Promise<ApiEvento> =>
      fetchAPI<ApiEvento>(`/eventos/${id}`, { method: 'PUT', body: data }),
    // Elimina un evento por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/eventos/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar pastores
  pastores: {
    // Obtiene todos los pastores
    getAll: (): Promise<ApiPastor[]> => fetchAPI<ApiPastor[]>('/pastores'),
    // Crea un nuevo pastor enviando un FormData
    create: (data: FormData): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>('/pastores', { method: 'POST', body: data }),
    // Actualiza un pastor existente por su id
    update: (id: number, data: FormData): Promise<ApiPastor> =>
      fetchAPI<ApiPastor>(`/pastores/${id}`, { method: 'PUT', body: data }),
    // Elimina un pastor por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/pastores/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar mensajes de contacto
  mensajes: {
    // Obtiene todos los mensajes de contacto
    getAll: (): Promise<ApiMensaje[]> => fetchAPI<ApiMensaje[]>('/mensajes'),
    // Envía un nuevo mensaje de contacto en formato JSON
    create: (data: MensajeInput): Promise<MensajeInput & { id: number }> =>
      fetchAPI<MensajeInput & { id: number }>('/mensajes', { method: 'POST', body: JSON.stringify(data) }),
    // Elimina un mensaje de contacto por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/mensajes/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar anuncios
  anuncios: {
    // Obtiene todos los anuncios
    getAll: (): Promise<ApiAnuncio[]> => fetchAPI<ApiAnuncio[]>('/anuncios'),
    // Crea un nuevo anuncio enviando un FormData
    create: (data: FormData): Promise<ApiAnuncio> =>
      fetchAPI<ApiAnuncio>('/anuncios', { method: 'POST', body: data }),
    // Actualiza un anuncio existente por su id
    update: (id: number, data: FormData): Promise<ApiAnuncio> =>
      fetchAPI<ApiAnuncio>(`/anuncios/${id}`, { method: 'PUT', body: data }),
    // Elimina un anuncio por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/anuncios/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar recursos
  recursos: {
    // Obtiene todos los recursos
    getAll: (): Promise<ApiRecurso[]> => fetchAPI<ApiRecurso[]>('/recursos'),
    // Crea un nuevo recurso enviando un FormData
    create: (data: FormData): Promise<ApiRecurso> =>
      fetchAPI<ApiRecurso>('/recursos', { method: 'POST', body: data }),
    // Actualiza un recurso existente por su id
    update: (id: number, data: FormData): Promise<ApiRecurso> =>
      fetchAPI<ApiRecurso>(`/recursos/${id}`, { method: 'PUT', body: data }),
    // Elimina un recurso por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/recursos/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar las diapositivas del carrusel
  slides: {
    // Obtiene todas las diapositivas
    getAll: (): Promise<ApiSlide[]> => fetchAPI<ApiSlide[]>('/slides'),
    // Crea una nueva diapositiva enviando un FormData
    create: (data: FormData): Promise<ApiSlide> =>
      fetchAPI<ApiSlide>('/slides', { method: 'POST', body: data }),
    // Actualiza una diapositiva existente por su id
    update: (id: number, data: FormData): Promise<ApiSlide> =>
      fetchAPI<ApiSlide>(`/slides/${id}`, { method: 'PUT', body: data }),
    // Elimina una diapositiva por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/slides/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar horarios
  horarios: {
    // Obtiene todos los horarios
    getAll: (): Promise<ApiHorario[]> => fetchAPI<ApiHorario[]>('/horarios'),
    // Crea un nuevo horario enviando JSON
    create: (data: ApiHorario): Promise<ApiHorario> =>
      fetchAPI<ApiHorario>('/horarios', { method: 'POST', body: JSON.stringify(data) }),
    // Actualiza un horario existente por su id
    update: (id: number, data: ApiHorario): Promise<ApiHorario> =>
      fetchAPI<ApiHorario>(`/horarios/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    // Elimina un horario por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/horarios/${id}`, { method: 'DELETE' }),
  },
  // Grupo de funciones para gestionar la galería de imágenes
  galeria: {
    // Obtiene todos los elementos de la galería
    getAll: (): Promise<ApiGaleria[]> => fetchAPI<ApiGaleria[]>('/galeria'),
    // Crea un nuevo elemento en la galería enviando un FormData
    create: (data: FormData): Promise<ApiGaleria> =>
      fetchAPI<ApiGaleria>('/galeria', { method: 'POST', body: data }),
    // Actualiza un elemento de la galería por su id
    update: (id: number, data: FormData): Promise<ApiGaleria> =>
      fetchAPI<ApiGaleria>(`/galeria/${id}`, { method: 'PUT', body: data }),
    // Elimina un elemento de la galería por su id
    delete: (id: number): Promise<void> => fetchAPI<void>(`/galeria/${id}`, { method: 'DELETE' }),
  },
};
