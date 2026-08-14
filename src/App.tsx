// Importa los componentes de React Router para gestionar la navegación
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Importa el proveedor de autenticación y su hook
import { AuthProvider, useAuth } from './context/AuthContext';
// Importa el componente de diseño que envuelve las páginas
import Layout from './components/Layout';
// Importa la página de inicio
import Home from './pages/Home';
// Importa la página de horarios
import Horarios from './pages/Horarios';
// Importa la página de Quiénes Somos
import QuienesSomos from './pages/QuienesSomos';
// Importa la página de pastores
import Pastores from './pages/Pastores';
// Importa la página de eventos
import Eventos from './pages/Eventos';
// Importa la página de contacto
import Contacto from './pages/Contacto';
// Importa la página de anexos
import Anexos from './pages/Anexos';
// Importa la página de redes sociales
import RedesSociales from './pages/RedesSociales';
// Importa la página de donaciones
import Donaciones from './pages/Donaciones';
// Importa la página de inicio de sesión
import Login from './pages/Login';
// Importa la página de administración
import Admin from './pages/Admin';
// Importa la página de error 404
import NotFound from './pages/NotFound';
// Importa el tipo ReactNode para tipar los children
import type { ReactNode } from 'react';

// Define el componente que protege las rutas del panel de administración
function ProtectedRoute({ children }: { children: ReactNode }) {
    // Obtiene el usuario y el estado de carga de la sesión
    const { user, loading } = useAuth();
    // Si todavía está verificando la sesión, muestra un indicador de carga
    if (loading) return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f3f5f1',
            gap: '16px'
        }}>
            {/* Icono animado de carga mientras se verifica la sesión */}
            <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2.5rem', color: '#606C59' }}></i>
            {/* Texto que indica que se está verificando la sesión */}
            <span style={{ color: '#5a635e', fontWeight: 500, fontSize: '0.95rem' }}>Verificando sesión...</span>
        </div>
    );
    // Si no hay usuario autenticado, redirige a la página de login
    if (!user) return <Navigate to="/login" replace />;
    // Si hay sesión activa, renderiza el contenido protegido
    return children;
}

// Define el componente principal de la aplicación
export default function App() {
    return (
        // Envuelve la aplicación con el enrutador de React Router
        <BrowserRouter>
            {/* Provee el contexto de autenticación a toda la aplicación */}
            <AuthProvider>
                {/* Define las rutas de la aplicación */}
                <Routes>
                    {/* Define la ruta principal que usa el Layout */}
                    <Route path="/" element={<Layout />}>
                        {/* Define la ruta de inicio */}
                        <Route index element={<Home />} />
                        {/* Define la ruta de horarios */}
                        <Route path="horarios" element={<Horarios />} />
                        {/* Define la ruta de Quiénes Somos */}
                        <Route path="quienes-somos" element={<QuienesSomos />} />
                        {/* Define la ruta de pastores */}
                        <Route path="pastores" element={<Pastores />} />
                        {/* Define la ruta de eventos */}
                        <Route path="eventos" element={<Eventos />} />
                        {/* Define la ruta de anexos */}
                        <Route path="anexos" element={<Anexos />} />
                        {/* Define la ruta de redes sociales */}
                        <Route path="redes" element={<RedesSociales />} />
                        {/* Define la ruta de contacto */}
                        <Route path="contacto" element={<Contacto />} />
                        {/* Define la ruta de donaciones */}
                        <Route path="donaciones" element={<Donaciones />} />
                    </Route>

                    {/* Define la ruta de inicio de sesión */}
                    <Route path="/login" element={<Login />} />

                    {/* Define la ruta comodín para páginas no encontradas */}
                    <Route path="*" element={<NotFound />} />

                    {/* Define la ruta del panel de administración protegida */}
                    <Route
                        path="/admin"
                        element={
                            // Protege la ruta para que solo accedan usuarios autenticados
                            <ProtectedRoute>
                                {/* Renderiza el panel de administración */}
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
