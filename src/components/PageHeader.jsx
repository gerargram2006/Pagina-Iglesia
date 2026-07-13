/**
 * Componente PageHeader - Encabezado de páginas internas.
 *
 * Se usa en todas las páginas EXCEPTO Home (que usa el hero).
 * Muestra un fondo degradado oscuro con el NavBar y un título/subtítulo centrados.
 *
 * Props:
 *   @param {string} title    - Título principal que se muestra grande (ej: "Horarios")
 *   @param {string} subtitle - Subtítulo descriptivo debajo del título
 *
 * Estructura visual:
 *   ┌──────────────────────────────┐
 *   │  [NavBar]                    │
 *   │                              │
 *   │       Título Grande          │
 *   │     Subtítulo descriptivo    │
 *   │                              │
 *   └──────────────────────────────┘
 */
import NavBar from './NavBar'; // Importa el componente de navegación para mostrarlo en el encabezado

export default function PageHeader({ title, subtitle }) { // Exporta PageHeader recibiendo las props title y subtitle
    return ( // Retorna el JSX del encabezado de página
        <header className="page-header"> {/* Elemento semántico header con clase personalizada para el estilo degradado */}
            <NavBar /> {/* Renderiza la barra de navegación dentro del encabezado */}
            <div className="container page-header-title"> {/* Contenedor centrado para el título y subtítulo */}
                <h1>{title}</h1> {/* Título principal de la página, rendered desde la prop */}
                <p>{subtitle}</p> {/* Subtítulo descriptivo debajo del título, rendered desde la prop */}
            </div> {/* Cierra el contenedor del título */}
        </header> // Fin del elemento header
    ); // Fin del return
} // Fin del componente PageHeader
