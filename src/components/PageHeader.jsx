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
import NavBar from './NavBar';

export default function PageHeader({ title, subtitle }) {
    return (
        <header className="page-header">
            <NavBar />
            <div className="container page-header-title">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </header>
    );
}
