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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Domingo */}
                        <div className="schedule-card delay-1" data-animate="fade-in-up">
                            <span className="schedule-step-number" aria-hidden="true">01</span>
                            <span className="schedule-icon">⛪</span>
                            <div className="schedule-divider" aria-hidden="true"></div>
                            <div className="schedule-day">Domingo</div>
                            <div className="schedule-time">10:30 AM</div>
                            <div className="schedule-name">Culto Dominical</div>
                        </div>
                        {/* Miércoles */}
                        <div className="schedule-card delay-2" data-animate="fade-in-up">
                            <span className="schedule-step-number" aria-hidden="true">02</span>
                            <span className="schedule-icon">📖</span>
                            <div className="schedule-divider" aria-hidden="true"></div>
                            <div className="schedule-day">Miércoles</div>
                            <div className="schedule-time">6:00 PM - 8:00 PM</div>
                            <div className="schedule-name">Culto de Enseñanza</div>
                        </div>
                        {/* Viernes */}
                        <div className="schedule-card delay-3" data-animate="fade-in-up">
                            <span className="schedule-step-number" aria-hidden="true">03</span>
                            <span className="schedule-icon">✝️</span>
                            <div className="schedule-divider" aria-hidden="true"></div>
                            <div className="schedule-day">Viernes</div>
                            <div className="schedule-time">6:00 PM - 8:00 PM</div>
                            <div className="schedule-name">Culto de Doctrina</div>
                        </div>
                        {/* Sábado */}
                        <div className="schedule-card delay-4" data-animate="fade-in-up">
                            <span className="schedule-step-number" aria-hidden="true">04</span>
                            <span className="schedule-icon">⭐</span>
                            <div className="schedule-divider" aria-hidden="true"></div>
                            <div className="schedule-day">Sábado</div>
                            <div className="schedule-time">5:00 PM - 7:00 PM</div>
                            <div className="schedule-name">Culto de Jóvenes</div>
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
