
const Eventos = () => {
    return (
        <div className="container mx-auto px-6 py-24 bg-[#1a3b2b] text-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                {/* COLUMNA IZQUIERDA: EL CALENDARIO DE GOOGLE */}
                <div className="bg-white p-2 rounded-lg shadow-lg">
                    <iframe
                        src="https://calendar.google.com/calendar/embed?src=multimedia.058243@gmail.com"
                        style={{ border: 0, width: '100%', height: '500px' }}
                        frameBorder="0"
                        scrolling="no"
                    ></iframe>
                </div>

                {/* COLUMNA DERECHA: EL TEXTO Y LOS HORARIOS */}
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-6">Confira nuestra agenda de eventos...</h2>
                    <p className="mb-4">Además de las fechas programadas, siempre estamos reunidos:</p>
                    <ul className="list-disc pl-5 mb-8 space-y-2">
                        <li>Martes: 19:30h - Culto de Oración</li>
                        <li>Jueves: 19:30h - Estudio Bíblico</li>
                        <li>Domingos: 18:00h - Culto General</li>
                    </ul>
                    {/* Aquí irían tus enlaces a redes sociales */}
                </div>

            </div>
        </div>
    );
};

export default Eventos;