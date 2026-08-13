import { useEffect, useState } from 'react';
import { api, type ApiPastor } from '../api';

function initials(name: string): string {
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]!)
        .join('')
        .toUpperCase();
}

interface PastorsSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

export default function PastorsSection({ title = 'Nuestros Pastores', subtitle = 'Liderazgo espiritual al servicio de Dios', id = 'pastores' }: PastorsSectionProps) {
    const [pastors, setPastors] = useState<ApiPastor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const loadPastors = async () => {
            try {
                const data = await api.pastores.getAll();
                if (active) setPastors(data);
            } catch {
                if (active) setError('No se pudo cargar el equipo pastoral.');
            } finally {
                if (active) setLoading(false);
            }
        };

        loadPastors();
        return () => { active = false; };
    }, []);

    return (
        <section id={id} className="section section-alt">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        <p>Cargando equipo pastoral...</p>
                    </div>
                )}

                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        <p>{error}</p>
                    </div>
                )}

                {!loading && !error && pastors.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        <i className="bi bi-people text-2xl block mb-3"></i>
                        <p>El equipo pastoral será publicado próximamente.</p>
                    </div>
                )}

                {!loading && !error && pastors.length > 0 && (
                    <div className="pastors-grid">
                        {pastors.map((pastor) => (
                            <article key={pastor.id} className="pastor-card" data-animate="fade-in-up">
                                <div className="pastor-card-glow" aria-hidden="true"></div>
                                <div className="pastor-card-inner">
                                    <div className="pastor-img-wrapper">
                                        {pastor.foto_url ? (
                                            <img src={pastor.foto_url} alt={pastor.nombre} className="pastor-img pastor-photo" loading="lazy" />
                                        ) : (
                                            <div className="pastor-img pastor-placeholder" aria-hidden="true">
                                                <span className="pastor-initials">{initials(pastor.nombre)}</span>
                                            </div>
                                        )}
                                        <div className="pastor-img-ring" aria-hidden="true"></div>
                                        <div className="pastor-img-ring pastor-img-ring-2" aria-hidden="true"></div>
                                    </div>
                                    <div className="pastor-info">
                                        <span className="pastor-role-badge">
                                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                                            {pastor.cargo}
                                        </span>
                                        <h3 className="pastor-name">{pastor.nombre}</h3>
                                        {pastor.biografia && <p className="pastor-desc">{pastor.biografia}</p>}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
