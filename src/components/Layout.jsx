// Importa Outlet (renderiza la ruta hija) y useLocation (obtiene la URL actual)
import { Outlet, useLocation } from 'react-router-dom';
// Importa useEffect para ejecutar código al cambiar de ruta
import { useEffect } from 'react';
// Importa el componente Footer que se muestra en todas las páginas públicas
import Footer from './Footer';
// Importa el hook personalizado para animaciones de scroll
import useScrollAnimations from '../hooks/useScrollAnimations';

/**
 * Layout - Componente de layout principal del sitio
 * Envuelve todas las rutas públicas con:
 * - Scroll al inicio al cambiar de página
 * - Animaciones de scroll (IntersectionObserver)
 * - Footer persistente al final
 * - Outlet renderiza el contenido de cada ruta hija
 */
export default function Layout() {
    // Obtiene la ruta actual (pathname) para detectar cambios de página
    const { pathname } = useLocation();

    // Efecto que hace scroll al inicio de la página cuando cambia la ruta
    // behavior: 'instant' = sin animación (respuesta inmediata)
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]); // Se ejecuta cada vez que cambia la URL

    // Activa las animaciones de scroll para todos los elementos con data-animate
    useScrollAnimations();

    return (
        <>
            {/* Outlet renderiza el componente de la ruta actual (Home, Horarios, etc.) */}
            <Outlet />
            {/* Footer se muestra al final de todas las páginas públicas */}
            <Footer />
        </>
    );
}
