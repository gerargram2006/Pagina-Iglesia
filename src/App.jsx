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
import Login from './pages/Login';
import Admin from './pages/Admin';

/** Ruta protegida: redirige a /login si no hay sesión activa. */
function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    if (loading) return null;
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
