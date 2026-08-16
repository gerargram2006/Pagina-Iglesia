import PageHeader from '../components/PageHeader';

export default function RedesSociales() {
    const redes = [
        {
            id: 1,
            nombre: "Facebook",
            url: "https://www.facebook.com/profile.php?id=100076728549417",
            icono: "bi-facebook",
            descripcion: "Noticias, fotos y transmisiones en vivo",
            gradiente: "from-[#1877F2] to-[#0d65d9]",
        },
        {
            id: 2,
            nombre: "Instagram",
            url: "https://www.instagram.com/asambleaarequipadedios_16/",
            icono: "bi-instagram",
            descripcion: "Momentos especiales de nuestra comunidad",
            gradiente: "from-[#E4405F] to-[#C13584]",
        },
        {
            id: 3,
            nombre: "TikTok",
            url: "https://www.tiktok.com/@asamblea_de_dios16?is_from_webapp=1&sender_device=pc",
            icono: "bi-tiktok",
            descripcion: "Videos cortos de alabanza y testimonios",
            gradiente: "from-[#010101] to-[#333333]",
        }
    ];

    return (
        <>
            <PageHeader title="Conéctate con Nosotros" subtitle="Síguenos en nuestras redes sociales para estar al tanto de todo" />
            <main>
                <section className="section">
                    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                        <p className="section-subtitle" data-animate="fade-in-up">
                            Mantente conectado durante toda la semana. Compartimos mensajes, transmisiones en vivo, anuncios y momentos especiales de nuestra comunidad.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
                            {redes.map((red, i) => (
                                <a
                                    key={red.id}
                                    href={red.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group"
                                    data-animate="fade-in-up"
                                >
                                    <div className={`flex flex-col items-center text-center p-8 rounded-tw-lg bg-white shadow-tw-sm border border-gray-200 hover:shadow-tw-lg hover:-translate-y-2 transition-all duration-350 ease-spring delay-${i + 1}`}>
                                        <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${red.gradiente} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-350 ease-spring shadow-lg`}>
                                            <i className={`bi ${red.icono} text-white text-3xl`}></i>
                                        </div>
                                        <h3 className="font-playfair text-lg font-bold text-[#606C59] mb-2">{red.nombre}</h3>
                                        <p className="text-sm text-text-light leading-relaxed mb-4">{red.descripcion}</p>
                                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 group-hover:text-gold-500 transition-colors">
                                            Síguenos
                                            <i className="bi bi-arrow-right group-hover:translate-x-1 transition-transform"></i>
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}
