import PageHeader from '../components/PageHeader';
import Events from '../components/Events';
import ScheduleSection from '../components/ScheduleSection';

export default function Horarios() {
    return (
        <>
            <PageHeader title="Horarios" subtitle="Conoce nuestros horarios de reunión" />
            <main>
                <Events />
                <ScheduleSection title={null} subtitle={null} id="anexos-horarios" showCentral={false} />
            </main>
        </>
    );
}
