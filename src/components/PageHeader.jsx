import NavBar from './NavBar';

export default function PageHeader({ title, subtitle }) {
    return (
        <header className="page-header">
            <div className="page-header-shapes" aria-hidden="true">
                <span className="page-header-shape page-header-shape-1"></span>
                <span className="page-header-shape page-header-shape-2"></span>
            </div>
            <NavBar />
            <div className="container page-header-title">
                <span className="page-header-badge" data-animate="fade-in-down">✦ Asamblea de Dios ✦</span>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
            </div>
            <div className="page-header-wave" aria-hidden="true">
                <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
                    <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,60 L0,60 Z" fill="currentColor" />
                </svg>
            </div>
        </header>
    );
}
