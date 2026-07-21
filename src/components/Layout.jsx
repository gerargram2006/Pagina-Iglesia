import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from './Footer';
import useScrollAnimations from '../hooks/useScrollAnimations';

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);

    useScrollAnimations();

    return (
        <>
            <Outlet />
            <Footer />
        </>
    );
}
