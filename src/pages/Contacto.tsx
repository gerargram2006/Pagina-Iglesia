// Contacto.tsx: Página de contacto con formulario e información.
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/sections/ContactSection';

export default function Contacto() {
    return (
        <>
            <PageHeader title="Contacto" subtitle="Estamos para servirte, escríbenos" />
            <main>
                <ContactSection title={null} subtitle={null} id="" />
            </main>
        </>
    );
}
