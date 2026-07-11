import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function Layout() {
  const { pathname } = useLocation();

  /* Scroll al tope cuando cambiamos de página */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  /* Activar animaciones de scroll en cada navegación */
  useScrollAnimations();

  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}
