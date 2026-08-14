// Importa Outlet para renderizar las rutas hijas y useLocation para conocer la ruta actual
import { Outlet, useLocation } from 'react-router-dom';
// Importa useEffect de React para ejecutar efectos secundarios
import { useEffect } from 'react';
// Importa el pie de página que se muestra en todas las páginas
import Footer from './Footer';
// Importa el componente que desplaza la ventana al inicio al navegar
import ScrollToTop from './ScrollToTop';
// Importa el hook que activa las animaciones de scroll
import useScrollAnimations from '../hooks/useScrollAnimations';

// Define el componente Layout que envuelve el contenido de cada página
export default function Layout() {
    // Obtiene la ruta actual para detectar cambios de página
    const { pathname } = useLocation();

    // Al cambiar de ruta, desplaza la ventana hacia arriba
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    // Activa las animaciones de scroll en la página actual
    useScrollAnimations();

    return (
        <>
            {/* Renderiza el contenido de la ruta hija actual */}
            <Outlet />
            {/* Muestra el pie de página en todas las páginas */}
            <Footer />
            {/* Incluye el botón de volver al inicio */}
            <ScrollToTop />
        </>
    );
}
