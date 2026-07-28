import PageHeader from '../components/PageHeader';

export default function RedesSociales() {
    const redes = [
        {
            id: 1,
            nombre: "Facebook",
            url: "https://facebook.com",
            icono: "bi-facebook",
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            id: 2,
            nombre: "Instagram",
            url: "https://instagram.com",
            icono: "bi-instagram",
            color: "text-pink-600",
            bg: "bg-pink-50"
        },
        {
            id: 3,
            nombre: "YouTube",
            url: "https://youtube.com",
            icono: "bi-youtube",
            color: "text-red-600",
            bg: "bg-red-50"
        },
        {
            id: 4,
            nombre: "TikTok",
            url: "https://tiktok.com",
            icono: "bi-tiktok",
            color: "text-black",
            bg: "bg-gray-100"
        }
    ];

    return (
        <>
            <PageHeader title="Conéctate con Nosotros" subtitle="Síguenos en nuestras redes sociales para estar al tanto de todo" />
            <main className="min-h-screen bg-gray-50 py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 text-center">
                        <i className="bi bi-phone text-5xl text-primary-600 mb-4 inline-block"></i>
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestras Redes Sociales</h2>
                        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
                            Mantente conectado durante toda la semana. Compartimos mensajes, transmisiones en vivo, anuncios y momentos especiales de nuestra comunidad.
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {redes.map((red) => (
                                <a 
                                    key={red.id}
                                    href={red.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center p-6 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-1 ${red.bg}`}
                                >
                                    <i className={`bi ${red.icono} text-4xl ${red.color} mr-4`}></i>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold text-gray-900">{red.nombre}</h3>
                                        <span className="text-sm text-gray-600 font-medium">Síguenos</span>
                                    </div>
                                    <i className="bi bi-box-arrow-up-right ml-auto text-gray-400"></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
