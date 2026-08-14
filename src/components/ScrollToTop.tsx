// Importa los hooks useState y useEffect de React
import { useState, useEffect } from 'react';

// Define el componente ScrollToTop como un componente funcional
export default function ScrollToTop() {
    // Estado que indica si el botón debe ser visible según el scroll
    const [visible, setVisible] = useState(false);

    // Efecto que se ejecuta una sola vez al montar el componente
    useEffect(() => {
        // Función que detecta el desplazamiento de la página
        const handleScroll = () => {
            // Muestra el botón si el usuario se desplazó más de 400 píxeles
            setVisible(window.scrollY > 400);
        };

        // Escucha el evento de desplazamiento de la ventana
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Limpia el evento al desmontar el componente
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Función que desplaza la página suavemente hasta arriba
    const scrollToTop = () => {
        // Mueve la ventana al inicio con un desplazamiento suave
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Devuelve el botón de volver al inicio
    return (
        // Define el botón de volver al inicio
        <button
            // Indica que el botón es de tipo botón
            type="button"
            // Agrega la clase visible solo cuando el botón debe mostrarse
            className={`scroll-to-top ${visible ? 'visible' : ''}`}
            // Ejecuta la función de desplazamiento al hacer clic
            onClick={scrollToTop}
            // Etiqueta de accesibilidad del botón
            aria-label="Volver al inicio"
            // Título emergente del botón
            title="Volver al inicio"
        >
            {/* Ícono de flecha hacia arriba */}
            <i className="bi bi-chevron-up" aria-hidden="true"></i>
        </button>
    );
}
