import { useEffect } from 'react';

/**
 * Hook que activa animaciones de scroll usando IntersectionObserver.
 * Observa todos los elementos con atributo [data-animate] y les
 * agrega la clase "animated" cuando entran al viewport.
 */
export default function useScrollAnimations() {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
