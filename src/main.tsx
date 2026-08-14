// Importa el modo estricto de React para detectar problemas en desarrollo
import { StrictMode } from 'react'
// Importa la función createRoot para montar la aplicación en el DOM
import { createRoot } from 'react-dom/client'
// Importa los estilos base de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
// Importa la fuente de iconos de Bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'
// Importa los estilos personalizados del proyecto
import './styles/styles.css'
// Importa el componente raíz de la aplicación
import App from './App'

// Monta la aplicación React en el elemento con id 'root'
createRoot(document.getElementById('root')!).render(
    // Activa el modo estricto que resalta posibles problemas en desarrollo
    <StrictMode>
        {/* Renderiza el componente principal de la aplicación */}
        <App />
    </StrictMode>,
)
