/**
 * Componente raíz de la aplicación - App.jsx
 *
 * Define la estructura completa de rutas usando React Router v7.
 * Este componente es el punto de entrada de la aplicación React después de main.jsx.
 *
 * Estructura de rutas:
 *   - Rutas públicas (dentro de <Layout />): Home, Horarios, Quiénes Somos,
 *     Pastores, Eventos, Contacto - comparten footer y scroll-to-top.
 *   - Ruta de login (/login): standalone, sin layout compartido.
 *   - Ruta protegida (/admin): solo accesible si hay sesión activa.
 *
 * Componentes clave:
 *   - BrowserRouter: Proveedor de enrutamiento del navegador.
 *   - AuthProvider: Proveedor de autenticación (envuelve todas las rutas).
 *   - ProtectedRoute: Wrapper que protege rutas requiriendo autenticación.
 *   - Layout: Componente con Outlet para renderizar rutas hijas con footer.
 */

// Importamos los componentes de enrutamiento de React Router v7
// BrowserRouter: proveedor de contexto de enrutamiento basado en History API
// Routes: contenedor de todas las definiciones de rutas
// Route: define una ruta específica (path + componente)
// Navigate: componente para redirección programática
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Importamos el proveedor de autenticación y el hook de contexto
// AuthProvider: envuelve la app y provee user, token, login, logout
// useAuth: hook para acceder al contexto de autenticación
import { AuthProvider, useAuth } from './context/AuthContext';
// Importamos el componente de diseño general con footer y scroll
// Layout: contiene <Outlet /> para renderizar rutas hijas + Footer + scroll-to-top
import Layout from './components/Layout';
// Importamos la página principal (home) con hero y secciones destacadas
import Home from './pages/Home';
// Importamos la página de horarios de culto (sábado, domingo, miércoles)
import Horarios from './pages/Horarios';
// Importamos la página de historia y misión de la iglesia
import QuienesSomos from './pages/QuienesSomos';
// Importamos la página del equipo pastoral (pastores y líderes)
import Pastores from './pages/Pastores';
// Importamos la página de eventos y actividades de la iglesia
import Eventos from './pages/Eventos';
// Importamos la página de formulario y datos de contacto
import Contacto from './pages/Contacto';
// Importamos la página de inicio de sesión (login)
import Login from './pages/Login';
// Importamos la página de administración protegida (panel admin)
import Admin from './pages/Admin';

/**
 * Componente ProtectedRoute - Ruta protegida por autenticación.
 *
 * Wrapper que verifica si el usuario está autenticado antes de renderizar
 * el contenido protegido. Si no hay sesión activa, redirige a /login.
 *
 * Flujo:
 *   1. Mientras loading es true, no renderiza nada (evita parpadeos).
 *   2. Si user es null (no autenticado), redirige a /login con replace.
 *   3. Si user existe (autenticado), renderiza los children normalmente.
 *
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido protegido a renderizar
 */
function ProtectedRoute({ children }) {
    // Obtiene el usuario actual y el estado de carga del contexto de autenticación
    const { user, loading } = useAuth();

    // Si la app está verificando la sesión inicial, no renderiza nada
    // Esto evita un parpadeo donde se mostraría el login antes de verificar localStorage
    if (loading) return null;

    // Si no hay usuario autenticado, redirige a la página de login
    // replace: true reemplaza la entrada actual en el historial (no se puede volver con "Atrás")
    if (!user) return <Navigate to="/login" replace />;

    // Si hay usuario autenticado, renderiza el contenido protegido normalmente
    return children;
}

/**
 * Componente principal de la aplicación - App
 *
 * Define la estructura completa de rutas de la SPA.
 * Todas las rutas públicas están anidadas dentro de <Layout /> para compartir
 * el footer y el comportamiento de scroll-to-top al navegar.
 *
 * Jerarquía de componentes:
 *   BrowserRouter
 *     └── AuthProvider (provee contexto de autenticación)
 *           └── Routes (define todas las rutas)
 *                 ├── Layout (rutas públicas con footer)
 *                 │     ├── Home (/)
 *                 │     ├── Horarios (/horarios)
 *                 │     ├── QuienesSomos (/quienes-somos)
 *                 │     ├── Pastores (/pastores)
 *                 │     ├── Eventos (/eventos)
 *                 │     └── Contacto (/contacto)
 *                 ├── Login (/login) - standalone
 *                 └── ProtectedRoute → Admin (/admin) - protegida
 */
function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Rutas públicas dentro de Layout (con footer y scroll-to-top) */}
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="horarios" element={<Horarios />} />
                        <Route path="quienes-somos" element={<QuienesSomos />} />
                        <Route path="pastores" element={<Pastores />} />
                        <Route path="eventos" element={<Eventos />} />
                        <Route path="contacto" element={<Contacto />} />
                    </Route>

                    {/* Ruta de login - standalone (sin Layout) */}
                    <Route path="/login" element={<Login />} />

                    {/* Ruta de administración - protegida */}
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
// Esto permite que main.jsx lo importe con: import App from './App'
export default App;
