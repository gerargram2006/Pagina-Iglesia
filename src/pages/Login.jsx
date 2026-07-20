import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getPasswordStrength(pwd) {
    if (!pwd || pwd.length === 0) return { score: 0, label: '', color: 'transparent' };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 10) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/\d/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score <= 2) return { score: Math.max(1, score), label: 'Débil', color: '#ef4444' };
    if (score <= 3) return { score: 3, label: 'Media', color: '#f59e0b' };
    return { score: Math.min(score, 5), label: 'Fuerte', color: '#22c55e' };
}

export default function Login() {
    const [email, setEmail] = useState(() => localStorage.getItem('rememberedEmail') || '');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(() => !!localStorage.getItem('rememberedEmail'));
    const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

    const { login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('admin_user');
        const storedToken = localStorage.getItem('admin_token');
        if (storedUser && storedToken) navigate('/admin', { replace: true });
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        try {
            await login(email, password);
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            navigate('/admin');
        } catch (err) {
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setSubmitting(false);
        }
    };

    const isFormValid = () => email.trim().length > 0 && password.length >= 6;

    return (
        <div className="login-page">
            <div className="login-orb login-orb-1" aria-hidden="true"></div>
            <div className="login-orb login-orb-2" aria-hidden="true"></div>
            <div className="login-orb login-orb-3" aria-hidden="true"></div>
            <div className="login-orb login-orb-4" aria-hidden="true"></div>

            <div className="login-split">
                <div className="login-branding" aria-hidden="true">
                    <div className="login-branding-content">
                        <img src="/img/LogoAD.PNG" alt="" className="login-branding-logo" />
                        <h2 className="login-branding-title">Asamblea de Dios</h2>
                        <div className="login-branding-divider"></div>
                        <p className="login-branding-subtitle">Administra el contenido de tu iglesia de forma sencilla y segura.</p>
                        <div className="login-branding-features">
                            <div className="login-branding-feature"><i className="bi bi-shield-check"></i><span>Acceso seguro</span></div>
                            <div className="login-branding-feature"><i className="bi bi-speedometer2"></i><span>Panel intuitivo</span></div>
                            <div className="login-branding-feature"><i className="bi bi-phone"></i><span>Responsive</span></div>
                        </div>
                    </div>
                </div>

                <div className="login-form-panel">
                    <div className="login-container">
                        <div className="login-card">
                            <div className="login-header">
                                <img src="/img/LogoAD.PNG" alt="Asamblea de Dios" className="login-logo" />
                                <h1>Panel de Administración</h1>
                                <p>Ingresa tus credenciales para acceder</p>
                            </div>

                            <form className="login-form" onSubmit={handleSubmit}>
                                {error && (
                                    <div className="login-error" role="alert">
                                        <i className="bi bi-exclamation-circle"></i>
                                        {error}
                                    </div>
                                )}

                                <div className="login-field">
                                    <label htmlFor="email">Correo electrónico</label>
                                    <div className="login-input-wrapper">
                                        <i className="bi bi-envelope"></i>
                                        <input id="email" type="email" placeholder="admin@iglesia.com" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
                                    </div>
                                </div>

                                <div className="login-field">
                                    <label htmlFor="password">Contraseña</label>
                                    <div className="login-input-wrapper login-input-with-toggle">
                                        <i className="bi bi-lock"></i>
                                        <input id="password" type={showPassword ? 'text' : 'password'} placeholder="Ingresa tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" minLength={6} />
                                        <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)} aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} tabIndex={-1}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} password-toggle-icon`}></i>
                                        </button>
                                    </div>
                                    {password.length > 0 && (
                                        <div className="login-password-strength">
                                            <div className="login-strength-bar">
                                                <div className="login-strength-fill" style={{ width: `${(passwordStrength.score / 5) * 100}%`, background: passwordStrength.color }}></div>
                                            </div>
                                            <span className="login-strength-label" style={{ color: passwordStrength.color }}>{passwordStrength.label}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="login-options">
                                    <label className="login-checkbox">
                                        <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                                        <span className="login-checkbox-custom"></span>
                                        Recordar mi correo
                                    </label>
                                </div>

                                <button type="submit" className="login-btn" disabled={submitting || !isFormValid()}>
                                    {submitting ? (<><span className="login-spinner"></span> Ingresando...</>) : (<><i className="bi bi-box-arrow-in-right"></i> Iniciar Sesión</>)}
                                </button>
                            </form>

                            <div className="login-footer">
                                <Link to="/"><i className="bi bi-arrow-left"></i> Volver al sitio</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
