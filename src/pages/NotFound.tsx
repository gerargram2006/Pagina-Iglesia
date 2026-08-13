import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <span className="not-found-code">404</span>
                <h1 className="not-found-title">Página no encontrada</h1>
                <p className="not-found-text">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <Link to="/" className="btn btn-primary not-found-btn">
                    <i className="bi bi-house-door" aria-hidden="true"></i>
                    Volver al Inicio
                </Link>
            </div>
        </div>
    );
}
