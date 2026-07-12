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
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Horarios from './pages/Horarios';
import QuienesSomos from './pages/QuienesSomos';
import Pastores from './pages/Pastores';
import Eventos from './pages/Eventos';
import Contacto from './pages/Contacto';
import Login from './pages/Login';
import Admin from './pages/Admin';

function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return null;
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

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

export default App;
