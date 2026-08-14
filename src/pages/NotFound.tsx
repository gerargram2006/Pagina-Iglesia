// Importa el componente Link de react-router-dom para crear enlaces de navegación
import { Link } from 'react-router-dom';

// Define y exporta el componente de la página de error 404
export default function NotFound() {
    // Retorna el JSX de la página de error
    return (
        // Contenedor principal de la página de error
        <div className="not-found-page">
            // Contenedor del contenido de la página de error
            <div className="not-found-content">
                // Muestra el código de error 404
                <span className="not-found-code">404</span>
                // Título que indica que la página no fue encontrada
                <h1 className="not-found-title">Página no encontrada</h1>
                // Párrafo con el mensaje de error
                <p className="not-found-text">
                    // Mensaje que informa que la página no existe o fue movida
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                // Enlace para volver a la página de inicio
                <Link to="/" className="btn btn-primary not-found-btn">
                    // Ícono de casa que acompaña al enlace de regreso
                    <i className="bi bi-house-door" aria-hidden="true"></i>
                    // Texto del enlace para volver al inicio
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
