import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';
import ScrollToTop from '../ui/ScrollToTop';
import useScrollAnimations from '../../hooks/useScrollAnimations';

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    useScrollAnimations();

    return (
        <>
            {/* Renderiza el contenido de la ruta hija actual */}
            <Outlet />
            {/* Muestra el pie de pÃ¡gina en todas las pÃ¡ginas */}
            <Footer />
            {/* Incluye el botÃ³n de volver al inicio */}
            <ScrollToTop />
        </>
    );
}
