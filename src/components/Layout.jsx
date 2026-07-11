/**
 * Componente Layout (envolvente de todas las páginas).
 *
 * Funciones:
 *   1. Renderiza el componente hijo (<Outlet />) correspondiente a la ruta actual.
 *   2. Muestra el <Footer /> en todas las páginas.
 *   3. Hace scroll automático al tope de la página al cambiar de ruta.
 *   4. Activa las animaciones de scroll (useScrollAnimations) para los
 *      elementos con atributo [data-animate] en la página actual.
 *
 * Este componente NO incluye el NavBar, ya que cada página lo maneja
 * de forma independiente (Home lo pone en el hero, las demás en PageHeader).
 */
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function Layout() {
    const { pathname } = useLocation();

    /* Scroll al tope cuando cambiamos de página (comportamiento instantáneo) */
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    /* Activar animaciones de scroll en cada navegación */
    useScrollAnimations();

    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}
