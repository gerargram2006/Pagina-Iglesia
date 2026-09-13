import PageHeader from '../components/layout/PageHeader';
import PastorsSection from '../components/sections/PastorsSection';

export default function Pastores() {
    return (
        <>
            <PageHeader title="Nuestros Pastores" subtitle="Conoce a nuestros líderes espirituales" />
            <main>
                <PastorsSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
