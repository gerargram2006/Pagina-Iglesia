/**
 * Punto de entrada de la aplicación React.
 *
 * - Carga los estilos globales: Bootstrap, Bootstrap Icons y estilos personalizados.
 * - Renderiza el componente <App /> dentro de StrictMode para detectar problemas.
 * - React.StrictMode ejecuta efectos dos veces en desarrollo para ayudar a encontrar bugs.
 */
// Importa StrictMode de React para habilitar el modo estricto en desarrollo
import { StrictMode } from 'react'
// Importa createRoot para crear el punto de montaje de la aplicación React 18
import { createRoot } from 'react-dom/client'
// Importa los estilos base de Bootstrap para el sistema de diseño y componentes
import 'bootstrap/dist/css/bootstrap.min.css'
// Importa los estilos de los iconos de Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'
// Importa los estilos CSS personalizados del proyecto
import './styles/styles.css'
// Importa el componente principal de la aplicación
import App from './App.jsx'

// Crea el punto de montaje en el elemento con id 'root' y renderiza la aplicación
createRoot(document.getElementById('root')).render(
    {/* Envuelve la aplicación en StrictMode para detectar problemas en desarrollo */}
    <StrictMode>
        {/* Componente principal que contiene toda la aplicación */}
        <App />
    </StrictMode>, // Cierra el componente StrictMode con coma para el método render
) // Fin de la llamada al método render
