import { useEffect } from 'react'; // Importa el hook useEffect de React para efectos secundarios
import { useLocation } from 'react-router-dom'; // Importa useLocation para obtener la ruta actual del navegador

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
export default function useScrollAnimations() { // Exporta el hook como valor por defecto para uso en componentes
    const { pathname } = useLocation(); // Extrae la ruta actual del objeto de ubicación de React Router

    useEffect(() => { // Inicia un efecto que se ejecuta cada vez que cambia pathname
        const elements = document.querySelectorAll('[data-animate]'); // Selecciona todos los elementos del DOM con el atributo data-animate
        if (!elements.length) return; // Si no hay elementos con data-animate, termina el efecto sin hacer nada

        const observer = new IntersectionObserver( // Crea una instancia de IntersectionObserver para monitorear visibilidad
            (entries) => { // Callback que se ejecuta cuando cambia la intersección de algún elemento observado
                entries.forEach((entry) => { // Itera sobre cada entrada (elemento) que cambió su estado de intersección
                    if (entry.isIntersecting) { // Verifica si el elemento es visible en el viewport (al menos 10%)
                        entry.target.classList.add('animated'); // Agrega la clase 'animated' al elemento para activar la animación CSS
                        observer.unobserve(entry.target); // Deja de observar el elemento ya que no necesita reanimarse
                    } // Fin del condicional de intersección
                }); // Fin del forEach sobre las entries
            }, // Fin del callback del observer
            { threshold: 0.1, rootMargin: '0px 0px -30px 0px' } // Configura umbral al 10% y margen inferior negativo de 30px para activar antes
        ); // Fin de la creación del IntersectionObserver

        elements.forEach((el) => observer.observe(el)); // Observa cada elemento con data-animate para detectar su visibilidad

        return () => observer.disconnect(); // Función de limpieza: desconecta el observer al desmontar o cambiar ruta
    }, [pathname]); // Dependencia del efecto: se re-ejecuta cuando cambia la ruta de navegación
} // Fin del hook useScrollAnimations
