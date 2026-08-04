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
import Donaciones from './pages/Donaciones';
import Login from './pages/Login';
import Admin from './pages/Admin';
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
            <i className="bi bi-arrow-repeat spin" style={{ fontSize: '2.5rem', color: '#2d6a4f' }}></i>
            <span style={{ color: '#5a635e', fontWeight: 500, fontSize: '0.95rem' }}>Verificando sesión...</span>
        </div>
    );
    if (!user) return <Navigate to="/login" replace />;
    return children;
}

export default function App() {
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
                        <Route path="anexos" element={<Anexos />} />
                        <Route path="redes" element={<RedesSociales />} />
                        <Route path="contacto" element={<Contacto />} />
                        <Route path="donaciones" element={<Donaciones />} />
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
