import PageHeader from '../components/layout/PageHeader';
import Events from '../components/sections/Events';
import ScheduleSection from '../components/sections/ScheduleSection';

export default function Horarios() {
    return (
        <>
            <PageHeader title="Horarios" subtitle="Conoce nuestros horarios de reuniÃ³n" />
            <main>
                <Events />
                <ScheduleSection title={null} subtitle={null} id="anexos-horarios" showCentral={false} />
            </main>
        </>
    );
}
