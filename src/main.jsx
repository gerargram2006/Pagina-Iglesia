// Importa StrictMode de React para habilitar verificaciones adicionales en modo desarrollo
import { StrictMode } from 'react'
// Importa createRoot para crear el punto de montaje de React 18+
import { createRoot } from 'react-dom/client'
// Importa los estilos CSS de Bootstrap para el sistema de grid y utilidades
import 'bootstrap/dist/css/bootstrap.min.css'
// Importa los estilos CSS de Bootstrap Icons para usar iconos como bi-xxx
import 'bootstrap-icons/font/bootstrap-icons.css'
// Importa los estilos globales personalizados del proyecto (colores, tipografía, componentes)
import './styles/styles.css'
// Importa el componente principal App que contiene todas las rutas
import App from './App.jsx'

// Monta la aplicación React en el elemento con id="root" del HTML
// StrictMode activa advertencias útiles en desarrollo (no afecta producción)
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>,
)
