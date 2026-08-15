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
            {/* Contenedor central con ancho máximo y márgenes responsivos */}
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Muestra el título solo si existe */}
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {/* Muestra el subtítulo solo si existe */}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Muestra el indicador de carga mientras se obtienen los pastores */}
                {loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono animado de carga */}
                        <i className="bi bi-arrow-repeat spin text-2xl block mb-3"></i>
                        {/* Texto de "cargando equipo pastoral" */}
                        <p>Cargando equipo pastoral...</p>
                    </div>
                )}

                {/* Muestra el mensaje de error si ocurrió uno */}
                {error && !loading && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de advertencia */}
                        <i className="bi bi-exclamation-triangle text-2xl block mb-3 text-gold-500"></i>
                        {/* Muestra el mensaje de error */}
                        <p>{error}</p>
                    </div>
                )}

                {/* Muestra un aviso si no hay pastores publicados */}
                {!loading && !error && pastors.length === 0 && (
                    <div className="text-center py-16 text-text-muted">
                        {/* Icono de personas */}
                        <i className="bi bi-people text-2xl block mb-3"></i>
                        {/* Texto indicando que el equipo pastoral se publicará próximamente */}
                        <p>El equipo pastoral será publicado próximamente.</p>
                    </div>
                )}

                {/* Muestra la cuadrícula de pastores solo si hay datos disponibles */}
                {!loading && !error && pastors.length > 0 && (
                    <div className="pastors-grid">
                        {/* Recorre la lista de pastores para generar cada tarjeta */}
                        {pastors.map((pastor) => (
                            <article key={pastor.id} className="pastor-card" data-animate="fade-in-up">
                                {/* Efecto decorativo de brillo en la tarjeta */}
                                <div className="pastor-card-glow" aria-hidden="true"></div>
                                {/* Contenedor interior de la tarjeta */}
                                <div className="pastor-card-inner">
                                    {/* Contenedor de la foto del pastor */}
                                    <div className="pastor-img-wrapper">
                                        {/* Muestra la foto si el pastor tiene una */}
                                        {pastor.foto_url ? (
                                            <img src={pastor.foto_url} alt={pastor.nombre} className="pastor-img pastor-photo" loading="lazy" />
                                        ) : (
                                            <div className="pastor-img pastor-placeholder" aria-hidden="true">
                                                {/* Muestra las iniciales del nombre del pastor */}
                                                <span className="pastor-initials">{initials(pastor.nombre)}</span>
                                            </div>
                                        )}
                                        {/* Anillo decorativo alrededor de la foto */}
                                        <div className="pastor-img-ring" aria-hidden="true"></div>
                                        {/* Segundo anillo decorativo alrededor de la foto */}
                                        <div className="pastor-img-ring pastor-img-ring-2" aria-hidden="true"></div>
                                    </div>
                                    {/* Contenedor con la información del pastor */}
                                    <div className="pastor-info">
                                        {/* Insignia con el cargo del pastor */}
                                        <span className="pastor-role-badge">
                                            {/* Ícono de estrella junto al cargo */}
                                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                                            {/* Texto con el cargo del pastor */}
                                            {pastor.cargo}
                                        </span>
                                        {/* Nombre del pastor */}
                                        <h3 className="pastor-name">{pastor.nombre}</h3>
                                        {/* Muestra la biografía solo si existe */}
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
