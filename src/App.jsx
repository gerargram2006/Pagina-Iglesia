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
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

// Componente principal de la aplicación que define todas las rutas
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="horarios" element={<Horarios />} />
                        <Route path="quienes-somos" element={<QuienesSomos />} />
                        <Route path="pastores" element={<Pastores />} />
                        <Route path="eventos" element={<Eventos />} />
                        <Route path="contacto" element={<Contacto />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
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

// Exportamos el componente App como componente por defecto de este archivo
export default App;
