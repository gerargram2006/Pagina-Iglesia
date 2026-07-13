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
import { Outlet, useLocation } from 'react-router-dom'; // Importa Outlet para renderizar rutas hijas y useLocation para obtener la ruta actual
import { useEffect } from 'react'; // Importa useEffect para ejecutar efectos secundarios tras renderizaciones
import Footer from './Footer'; // Importa el componente de pie de página
import useScrollAnimations from '../hooks/useScrollAnimations'; // Importa el hook personalizado que activa animaciones al hacer scroll

export default function Layout() { // Exporta el componente Layout como exportación por defecto
    const { pathname } = useLocation(); // Obtiene la ruta actual de la URL del navegador

    /* Scroll al tope cuando cambiamos de página (comportamiento instantáneo) */
    useEffect(() => { // Efecto que se ejecuta cada vez que cambia la dependencia pathname
        window.scrollTo({ top: 0, behavior: 'instant' }); // Desplaza la ventana al tope de la página de forma instantánea
    }, [pathname]); // Se re-ejecuta únicamente cuando la ruta cambia

    /* Activar animaciones de scroll en cada navegación */
    useScrollAnimations(); // Lanza el hook que observa elementos con [data-animate] y los anima al hacer scroll

    return ( // Retorna el JSX que compone la estructura del layout
        <> {/* Fragmento React vacío para agrupar hijos sin añadir nodos extra al DOM */}
            <Outlet /> {/* Renderiza el componente hijo correspondiente a la ruta actual */}
            <Footer /> {/* Renderiza el pie de página en todas las rutas */}
        </> {/* Cierra el fragmento React */}
    ); // Fin del return
} // Fin del componente Layout
