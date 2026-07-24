// Importa los componentes de enrutamiento de React Router v7
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Importa el proveedor de autenticación y el hook personalizado useAuth
import { AuthProvider, useAuth } from './context/AuthContext';
// Importa el componente Layout que envuelve todas las rutas públicas con NavBar y Footer
import Layout from './components/Layout';
// Importa todas las páginas del sitio
import Home from './pages/Home';           // Página de inicio con hero y secciones
import Horarios from './pages/Horarios';   // Página de horarios de culto
import QuienesSomos from './pages/QuienesSomos'; // Página "Quiénes Somos"
import Pastores from './pages/Pastores';   // Página de pastores
import Eventos from './pages/Eventos';     // Página de eventos
import Contacto from './pages/Contacto';   // Página de contacto
import Anexos from './pages/Anexos';       // Página de anexos/sedes
import Login from './pages/Login';         // Página de inicio de sesión
import Admin from './pages/Admin';         // Panel de administración

/**
 * ProtectedRoute - Componente que protege rutas privadas
 * Si el usuario NO está autenticado, redirige a /login
 * Si está autenticado, renderiza el componente hijo (children)
 */
function ProtectedRoute({ children }) {
    // Obtiene el usuario actual y el estado de carga del contexto de autenticación
    const { user, loading } = useAuth();
    // Mientras se verifica la sesión, no muestra nada (evita parpadeos)
    if (loading) return null;
    // Si no hay usuario autenticado, redirige a la página de login
    if (!user) return <Navigate to="/login" replace />;
    // Si hay usuario, muestra el contenido protegido
    return children;
}

/**
 * App - Componente raíz de la aplicación
 * Define todas las rutas y envuelve todo en los proveedores necesarios
 */
export default function App() {
    return (
        // BrowserRouter habilita el enrutamiento basado en URL del navegador
        <BrowserRouter>
            {/* AuthProvider comparte el estado de autenticación (user, token, login, logout) */}
            <AuthProvider>
                {/* Routes contiene todas las definiciones de rutas de la aplicación */}
                <Routes>
                    {/* Ruta raíz "/" usa Layout como plantilla ( NavBar + Outlet + Footer ) */}
                    <Route path="/" element={<Layout />}>
                        {/* Ruta index: muestra Home cuando la URL es "/" exactamente */}
                        <Route index element={<Home />} />
                        {/* Ruta /horarios: página de horarios de culto */}
                        <Route path="horarios" element={<Horarios />} />
                        {/* Ruta /quienes-somos: historia y valores de la iglesia */}
                        <Route path="quienes-somos" element={<QuienesSomos />} />
                        {/* Ruta /pastores: equipo pastoral */}
                        <Route path="pastores" element={<Pastores />} />
                        {/* Ruta /eventos: próximos eventos */}
                        <Route path="eventos" element={<Eventos />} />
                        {/* Ruta /anexos: sedes e información de cada iglesia */}
                        <Route path="anexos" element={<Anexos />} />
                        {/* Ruta /contacto: formulario y datos de contacto */}
                        <Route path="contacto" element={<Contacto />} />
                    </Route>

                    {/* Ruta /login: página de inicio de sesión (fuera del Layout principal) */}
                    <Route path="/login" element={<Login />} />

                    {/* Ruta /admin: panel de administración PROTEGIDO */}
                    {/* Solo se accede si el usuario está autenticado (ProtectedRoute) */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
