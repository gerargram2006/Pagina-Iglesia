// ScheduleSection.tsx: Sección con los horarios de culto y anexos.
import { Sun, BookOpen, Cross, Music } from 'lucide-react';

interface ScheduleSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
    showCentral?: boolean;
    showAnexos?: boolean;
}

export default function ScheduleSection({ 
    title = "Horarios de Culto", 
    subtitle = "Te esperamos en nuestras reuniones semanales", 
    id = "horarios",
    showCentral = true,
    showAnexos = true
}: ScheduleSectionProps) {
    return (
        <section id={id} className="section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}

                {/* Horarios Iglesia Central */}
{showCentral && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Tarjeta 1: Domingo */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                            <span className="absolute top-4 right-4 text-5xl font-bold text-gray-50 opacity-50 transition-opacity group-hover:opacity-100">01</span>
                            
                            <div className="w-16 h-16 mx-auto bg-[#fdfaf2] rounded-full flex justify-center items-center mb-6 relative z-10">
                                <Sun className="w-8 h-8 text-[#d4af37]" />
                            </div>
                            <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mb-4 opacity-50"></div>
                            <h3 className="text-xl font-bold text-[#4a5d4e] mb-2 relative z-10">Domingo</h3>
                            <p className="text-[#d4af37] font-bold mb-1 relative z-10">10:30 AM</p>
                            <p className="text-gray-500 text-sm relative z-10">Culto Dominical</p>
                        </div>

                        {/* Tarjeta 2: Miércoles */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                            <span className="absolute top-4 right-4 text-5xl font-bold text-gray-50 opacity-50 transition-opacity group-hover:opacity-100">02</span>
                            
                            <div className="w-16 h-16 mx-auto bg-[#fdfaf2] rounded-full flex justify-center items-center mb-6 relative z-10">
                                <BookOpen className="w-8 h-8 text-[#d4af37]" />
                            </div>
                            <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mb-4 opacity-50"></div>
                            <h3 className="text-xl font-bold text-[#4a5d4e] mb-2 relative z-10">Miércoles</h3>
                            <p className="text-[#d4af37] font-bold mb-1 relative z-10">6:00 PM - 8:00 PM</p>
                            <p className="text-gray-500 text-sm relative z-10">Culto de Enseñanza</p>
                        </div>

                        {/* Tarjeta 3: Viernes */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                            <span className="absolute top-4 right-4 text-5xl font-bold text-gray-50 opacity-50 transition-opacity group-hover:opacity-100">03</span>
                            
                            <div className="w-16 h-16 mx-auto bg-[#fdfaf2] rounded-full flex justify-center items-center mb-6 relative z-10">
                                <Cross className="w-8 h-8 text-[#d4af37]" />
                            </div>
                            <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mb-4 opacity-50"></div>
                            <h3 className="text-xl font-bold text-[#4a5d4e] mb-2 relative z-10">Viernes</h3>
                            <p className="text-[#d4af37] font-bold mb-1 relative z-10">6:00 PM - 8:00 PM</p>
                            <p className="text-gray-500 text-sm relative z-10">Culto de Doctrina</p>
                        </div>

                        {/* Tarjeta 4: Sábado */}
                        <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-lg hover:-translate-y-1 transition-transform duration-300 relative overflow-hidden group">
                            <span className="absolute top-4 right-4 text-5xl font-bold text-gray-50 opacity-50 transition-opacity group-hover:opacity-100">04</span>
                            
                            <div className="w-16 h-16 mx-auto bg-[#fdfaf2] rounded-full flex justify-center items-center mb-6 relative z-10">
                                <Music className="w-8 h-8 text-[#d4af37]" />
                            </div>
                            <div className="w-12 h-[2px] bg-[#d4af37] mx-auto mb-4 opacity-50"></div>
                            <h3 className="text-xl font-bold text-[#4a5d4e] mb-2 relative z-10">Sábado</h3>
                            <p className="text-[#d4af37] font-bold mb-1 relative z-10">5:00 PM - 7:00 PM</p>
                            <p className="text-gray-500 text-sm relative z-10">Culto de Jóvenes</p>
                        </div>
                    </div>
                )}

                {/* Sección de Anexos */}
                {showAnexos && (
                    <div className="mt-20" data-animate="fade-in-up">
                        <h3 className="text-2xl font-playfair font-bold text-center text-[#606C59] mb-10 relative pb-4">
                            Nuestros Anexos
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 shadow-sm opacity-80"></div>
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Anexo APIPA */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center transition-all hover:-translate-y-2 hover:shadow-md hover:border-gold-200">
                                <h4 className="font-playfair text-xl font-bold text-[#606C59] mb-6">Anexo APIPA</h4>
                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Jueves 6:30 PM</span>
                                        <span className="text-text-light text-sm">Escuela Bíblica</span>
                                    </div>
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Domingo 10:00 AM</span>
                                        <span className="text-text-light text-sm">Culto de Adoración</span>
                                    </div>
                                </div>
                                <div className="text-sm text-text-muted mt-auto pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
                                    <i className="bi bi-geo-alt-fill text-gold-500 text-lg"></i>
                                    Sector 9, zona B, Mz. 18, APIPA
                                </div>
                            </div>

                            {/* Anexo 3 de Octubre */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center transition-all hover:-translate-y-2 hover:shadow-md hover:border-gold-200 delay-100">
                                <h4 className="font-playfair text-xl font-bold text-[#606C59] mb-6">Anexo 3 de Octubre</h4>
                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Jueves 6:30 PM</span>
                                        <span className="text-text-light text-sm">Escuela Bíblica</span>
                                    </div>
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Domingo 6:00 PM</span>
                                        <span className="text-text-light text-sm">Culto de Adoración</span>
                                    </div>
                                </div>
                                <div className="text-sm text-text-muted mt-auto pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
                                    <i className="bi bi-geo-alt-fill text-gold-500 text-lg"></i>
                                    <span>C. Andrés Avelino Cáceres <br className="hidden lg:block"/> con La Mar, Socabaya</span>
                                </div>
                            </div>

                            {/* Anexo Selva Alegre */}
                            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center transition-all hover:-translate-y-2 hover:shadow-md hover:border-gold-200 delay-200">
                                <h4 className="font-playfair text-xl font-bold text-[#606C59] mb-6">Anexo Selva Alegre</h4>
                                <div className="space-y-4 mb-8">
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Martes 6:00 PM</span>
                                        <span className="text-text-light text-sm">Escuela Bíblica</span>
                                    </div>
                                    <div className="bg-gray-50/50 rounded-xl p-3">
                                        <span className="font-semibold text-gold-600 block text-lg">Domingo 6:00 PM</span>
                                        <span className="text-text-light text-sm">Culto de Adoración</span>
                                    </div>
                                </div>
                                <div className="text-sm text-text-muted mt-auto pt-5 border-t border-gray-100 flex items-center justify-center gap-2">
                                    <i className="bi bi-geo-alt-fill text-gold-500 text-lg"></i>
                                    Av. Huascar N° 203, Selva Alegre 04004
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
