// Importa el hook useEffect de React para ejecutar efectos secundarios
import { useEffect } from 'react';
// Importa useLocation para conocer la ruta actual de la aplicación
import { useLocation } from 'react-router-dom';

// Define el hook que activa las animaciones de scroll sobre los elementos marcados
export default function useScrollAnimations(): void {
  // Obtiene la ruta actual para reiniciar las observaciones al navegar
  const { pathname } = useLocation();

  // Ejecuta el efecto cada vez que cambia la ruta
  useEffect(() => {
    // Crea un observador de intersección que detecta elementos visibles en pantalla
    const observer = new IntersectionObserver(
      // Función que se ejecuta cuando cambia la visibilidad de los elementos observados
      (entries: IntersectionObserverEntry[]) => {
        // Recorre cada elemento que cruzó el umbral
        entries.forEach((entry) => {
          // Si el elemento es visible en la pantalla
          if (entry.isIntersecting) {
            // Agrega la clase 'animated' para disparar la animación CSS
            entry.target.classList.add('animated');
            // Deja de observar el elemento para no repetir la animación
            observer.unobserve(entry.target);
          }
        });
      },
      // Configuración del observador
      {
        // Se activa cuando al menos el 10% del elemento es visible
        threshold: 0.1,
        // Adelanta el margen inferior para activar la animación un poco antes
        rootMargin: '0px 0px -30px 0px',
      }
    );

    // Define la función que busca y observa todos los elementos a animar
    const observeElements = () => {
      // Selecciona los elementos con el atributo data-animate que aún no están animados
      const elements = document.querySelectorAll<HTMLElement>('[data-animate]:not(.animated)');
      // Observa cada elemento seleccionado
      elements.forEach((el) => observer.observe(el));
    };

    // Ejecuta la observación inicial de los elementos presentes en la página
    observeElements();

    // Crea un observador de mutaciones para detectar nuevos elementos en el DOM
    const mutationObserver = new MutationObserver(() => {
      // Cuando el DOM cambia, vuelve a observar los elementos nuevos
      observeElements();
    });

    // Observa los cambios en el cuerpo del documento y sus descendientes
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Función de limpieza al desmontar el efecto
    return () => {
      // Detiene el observador de intersección
      observer.disconnect();
      // Detiene el observador de mutaciones
      mutationObserver.disconnect();
    };
  }, [pathname]);
}
