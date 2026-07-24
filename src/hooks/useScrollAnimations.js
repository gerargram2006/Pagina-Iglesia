// Importa useEffect de React para ejecutar el observer después del render
import { useEffect } from 'react';
// Importa useLocation de React Router para detectar cambios de ruta
import { useLocation } from 'react-router-dom';

/**
 * useScrollAnimations - Hook personalizado que activa animaciones al hacer scroll
 * Utiliza IntersectionObserver para detectar cuando los elementos entran en el viewport
 * y les agrega la clase "animated" para activar las animaciones CSS
 *
 * Uso en componentes: <div data-animate="fade-in-up"> contenido </div>
 * Tipos de animación: fade-in-up, fade-in-down, fade-in-left, fade-in-right, scale-in
 */
export default function useScrollAnimations() {
    // Obtiene la ruta actual para reiniciar las animaciones al cambiar de página
    const { pathname } = useLocation();

    // Efecto que se ejecuta cada vez que cambia la ruta
    useEffect(() => {
        // Selecciona TODOS los elementos del DOM que tengan el atributo data-animate
        const elements = document.querySelectorAll('[data-animate]');
        // Si no hay elementos con animaciones, sale sin hacer nada
        if (!elements.length) return;

        // Crea un IntersectionObserver que observa la intersección con el viewport
        const observer = new IntersectionObserver(
            // Callback que se ejecuta cuando un elemento cambia su estado de intersección
            (entries) => {
                entries.forEach((entry) => {
                    // Si el elemento está visible en el viewport (intersecting)
                    if (entry.isIntersecting) {
                        // Agrega la clase "animated" que activa la animación CSS
                        entry.target.classList.add('animated');
                        // Deja de observar este elemento (la animación solo se ejecuta una vez)
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                // threshold: 0.1 = activa cuando el 10% del elemento es visible
                threshold: 0.1,
                // rootMargin: margen adicional para activar un poco antes de que sea 100% visible
                // -30px en la parte inferior = se activa antes de llegar al centro
                rootMargin: '0px 0px -30px 0px'
            }
        );

        // Observa cada elemento encontrado en el DOM
        elements.forEach((el) => observer.observe(el));

        // Función de limpieza: desconecta el observer al desmontar o cambiar de ruta
        // Esto evita memory leaks y resetea las animaciones
        return () => observer.disconnect();
    }, [pathname]); // Se re-ejecuta cada vez que cambia la URL/ruta
}
