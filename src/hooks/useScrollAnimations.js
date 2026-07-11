import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook personalizado que activa animaciones de scroll en elementos del DOM.
 *
 * Usa IntersectionObserver para detectar cuando los elementos con el
 * atributo [data-animate] entran en el viewport, y les agrega la clase
 * "animated" para activar la transición CSS correspondiente.
 *
 * Se re-inicializa cada vez que cambia la ruta (pathname) para asegurar
 * que los elementos de la nueva página sean observados correctamente.
 *
 * Tipos de animación soportados (definidos en data-animate):
 *   - "fade-in-up"    →元素从 abajo hacia arriba
 *   - "fade-in-down"  →元素 desde arriba hacia abajo
 *   - "fade-in-left"  →元素 desde la izquierda
 *   - "fade-in-right" →元素 desde la derecha
 *   - "scale-in"      →元素 con efecto de escala
 *
 * @returns {void}
 */
export default function useScrollAnimations() {
    const { pathname } = useLocation();

    useEffect(() => {
        const elements = document.querySelectorAll('[data-animate]');
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
        );

        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [pathname]);
}
