import PageHeader from '../components/PageHeader';
import AboutSection from '../components/AboutSection';

export default function QuienesSomos() {
  return (
    <>
      <PageHeader 
        title="Quiénes Somos" 
        subtitle="Conoce nuestra historia y misión" 
      />

      <main>
        <AboutSection title={null} subtitle={null} id="" />
      </main>
    </>
  );
}
