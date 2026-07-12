import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            await login(email, password);
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="login-logo" />
                        <h1>Panel de Administracion</h1>
                        <p>Ingresa tus credenciales para acceder</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        {error && (
                            <div className="login-error">
                                <i className="bi bi-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div className="login-field">
                            <label htmlFor="email">Correo electronico</label>
                            <div className="login-input-wrapper">
                                <i className="bi bi-envelope"></i>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="admin@iglesia.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <label htmlFor="password">Contrasena</label>
                            <div className="login-input-wrapper">
                                <i className="bi bi-lock"></i>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Ingresa tu contrasena"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary login-btn"
                            disabled={submitting}
                        >
                            {submitting ? (
                                <>
                                    <span className="login-spinner"></span>
                                    Ingresando...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-box-arrow-in-right"></i>
                                    Iniciar Sesion
                                </>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <Link to="/">
                            <i className="bi bi-arrow-left"></i>
                            Volver al sitio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
