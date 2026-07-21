import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
