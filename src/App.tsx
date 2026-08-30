import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Horarios from './pages/Horarios';
import QuienesSomos from './pages/QuienesSomos';
import Pastores from './pages/Pastores';
import Eventos from './pages/Eventos';
import Contacto from './pages/Contacto';
import Anexos from './pages/Anexos';
import RedesSociales from './pages/RedesSociales';
import Login from './pages/Login';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import type { ReactNode } from 'react';

function ProtectedRoute({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
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
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default function App() {
    return (
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
                    </Route>

                    {/* Define la ruta de inicio de sesión */}
                    <Route path="/login" element={<Login />} />

                    {/* Define la ruta del panel de administración protegida */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute>
                                {/* Renderiza el panel de administración */}
                                <Admin />
                            </ProtectedRoute>
                        }
                    />

                    {/* Define la ruta comodín para páginas no encontradas */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
