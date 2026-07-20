import NavBar from './NavBar';

export default function PageHeader({ title, subtitle }) {
    return (
        <header className="page-header">
            <NavBar />
            <div className="container page-header-title">
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </header>
    );
}
