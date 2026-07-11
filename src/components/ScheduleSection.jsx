export default function ScheduleSection({ title = "Horarios de Culto", subtitle = "Te esperamos en nuestras reuniones semanales", id = "horarios" }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {title && <h2 className="section-title" data-animate="fade-in-down">{title}</h2>}
        {subtitle && <p className="section-subtitle" data-animate="fade-in-up">{subtitle}</p>}
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <div className="schedule-card" data-animate="fade-in-up">
              <div className="schedule-day">Domingo</div>
              <div className="schedule-time">10:00 AM - 12:00 PM</div>
              <div className="schedule-name">Culto de Alabanza y Adoración</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="schedule-card" data-animate="fade-in-up">
              <div className="schedule-day">Miércoles</div>
              <div className="schedule-time">7:00 PM - 8:30 PM</div>
              <div className="schedule-name">Estudio Bíblico y Oración</div>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="schedule-card" data-animate="fade-in-up">
              <div className="schedule-day">Sábado</div>
              <div className="schedule-time">6:00 PM - 8:00 PM</div>
              <div className="schedule-name">Grupos de Jóvenes</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
