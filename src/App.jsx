/**
 * Componente raíz de la aplicación.
 *
 * Define la estructura de rutas usando React Router v7.
 * Todas las páginas comparten un layout común (<Layout />) que incluye
 * el footer y el scroll automático al tope al navegar.
 *
 * Rutas:
 *   /              → Home (página principal con hero y secciones)
 *   /horarios      → Horarios de culto
 *   /quienes-somos → Historia y misión de la iglesia
 *   /pastores      → Equipo pastoral
 *   /eventos       → Eventos y actividades
 *   /contacto      → Formulario y datos de contacto
 */
// Importamos los componentes de enrutamiento de React Router v7
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Importamos el proveedor de autenticación y el hook de contexto
import { AuthProvider, useAuth } from './context/AuthContext';
// Importamos el componente de diseño general con footer y scroll
import Layout from './components/Layout';
// Importamos la página principal (home) con hero y secciones
import Home from './pages/Home';
// Importamos la página de horarios de culto
import Horarios from './pages/Horarios';
// Importamos la página de historia y misión de la iglesia
import QuienesSomos from './pages/QuienesSomos';
// Importamos la página del equipo pastoral
import Pastores from './pages/Pastores';
// Importamos la página de eventos y actividades
import Eventos from './pages/Eventos';
// Importamos la página de formulario y datos de contacto
import Contacto from './pages/Contacto';
// Importamos la página de inicio de sesión
import Login from './pages/Login';
// Importamos la página de administración protegida
import Admin from './pages/Admin';

// Componente de ruta protegida que solo permite acceso a usuarios autenticados
function ProtectedRoute({ children }) {
    // Obtenemos el usuario actual y el estado de carga del contexto de autenticación
    const { user, loading } = useAuth();
    // Si aún se está cargando la información de autenticación, no renderizamos nada
    if (loading) return null;
    // Si no hay usuario autenticado, redirigimos a la página de inicio de sesión
    if (!user) return <Navigate to="/login" replace />;
    // Si el usuario está autenticado, renderizamos los hijos protegidos
    return children;
}

// Componente principal de la aplicación que define todas las rutas
function App() {
    return (
        {/* Envolvemos toda la aplicación en el enrutador del navegador */}
        <BrowserRouter>
            {/* Proveedor de autenticación para gestionar sesiones de usuario */}
            <AuthProvider>
                {/* Contenedor principal de todas las rutas definidas */}
                <Routes>
                    {/* Ruta raíz que usa el layout compartido con footer y scroll */}
                    <Route path="/" element={<Layout />}>
                        {/* Ruta del índice: página principal con hero y secciones */}
                        <Route index element={<Home />} />
                        {/* Ruta de horarios de culto */}
                        <Route path="horarios" element={<Horarios />} />
                        {/* Ruta de historia y misión de la iglesia */}
                        <Route path="quienes-somos" element={<QuienesSomos />} />
                        {/* Ruta del equipo pastoral */}
                        <Route path="pastores" element={<Pastores />} />
                        {/* Ruta de eventos y actividades */}
                        <Route path="eventos" element={<Eventos />} />
                        {/* Ruta de formulario y datos de contacto */}
                        <Route path="contacto" element={<Contacto />} />
                    </Route>
                    {/* Ruta de inicio de sesión (fuera del layout principal) */}
                    <Route path="/login" element={<Login />} />
                    {/* Ruta de administración protegida por autenticación */}
                    <Route
                        {/* Ruta URL para el panel de administración */}
                        path="/admin"
                        {/* Elemento renderizado: componente Admin dentro de ProtectedRoute */}
                        element={
                            {/* Envolvemos Admin en la ruta protegida para verificar autenticación */}
                            <ProtectedRoute>
                                {/* Componente de administración solo accesible para usuarios autenticados */}
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

// Exportamos el componente App como componente por defecto de este archivo
export default App;
