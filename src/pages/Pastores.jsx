import PageHeader from '../components/PageHeader';
import PastorsSection from '../components/PastorsSection';

export default function Pastores() {
  return (
    <>
      <PageHeader 
        title="Nuestros Pastores" 
        subtitle="Conoce a nuestros líderes espirituales" 
      />

      <main>
        <PastorsSection title={null} subtitle={null} id="" />
      </main>
    </>
  );
}
