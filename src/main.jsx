/**
 * Punto de entrada de la aplicación React.
 *
 * - Carga los estilos globales: Bootstrap, Bootstrap Icons y estilos personalizados.
 * - Renderiza el componente <App /> dentro de StrictMode para detectar problemas.
 * - React.StrictMode ejecuta efectos dos veces en desarrollo para ayudar a encontrar bugs.
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/styles.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
