interface ScheduleSectionProps {
    title?: string | null;
    subtitle?: string | null;
    id?: string;
}

interface Schedule {
    day: string;
    time: string;
    name: string;
    icon: string;
}

export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }: ScheduleSectionProps) {
    const schedules: Schedule[] = [
        { day: "Domingo", time: "10:00 AM - 12:00 PM", name: "Culto de Alabanza y Adoración", icon: "🙏" },
        { day: "Miércoles", time: "7:00 PM - 8:30 PM", name: "Estudio Bíblico y Oración", icon: "📖" },
        { day: "Sábado", time: "6:00 PM - 8:00 PM", name: "Grupos de Jóvenes", icon: "⭐" },
    ];

    return (
        <section id={id} className="section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
                {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {schedules.map((schedule, index) => (
                        <div key={index}>
                            <div className={`schedule-card delay-${index + 1}`} data-animate="fade-in-up">
                                <span className="schedule-step-number" aria-hidden="true">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="schedule-icon">{schedule.icon}</span>
                                <div className="schedule-divider" aria-hidden="true"></div>
                                <div className="schedule-day">{schedule.day}</div>
                                <div className="schedule-time">{schedule.time}</div>
                                <div className="schedule-name">{schedule.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
