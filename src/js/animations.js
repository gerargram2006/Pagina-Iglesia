/**
 * ==========================================================================
 * ASAMBLEA DE DIOS - ANIMACIONES Y INTERACTIVIDAD
 * ==========================================================================
 *
 * Este archivo maneja toda la interactividad de la pagina:
 *
 * 1. SCROLL ANIMATIONS (IntersectionObserver)
 *    - Observa elementos con atributo data-animate="tipo"
 *    - Cuando entran en viewport, agrega la clase CSS 'animate' + el tipo
 *    - Esto activa la keyframe correspondiente definida en styles.css
 *    - Cada elemento solo se anima una vez (unobserve despues)
 *
 * 2. HERO / HEADER ENTRANCE
 *    - En index.html: animacion escalonada h1 -> p -> botones
 *    - En subpaginas: titulo desliza desde arriba, subtitulo desde abajo
 *    - Se activa con delay de 100ms para esperar el render
 *
 * 3. NAVBAR SCROLL EFFECT
 *    - Agrega clase .navbar-scrolled al hacer scroll > 50px
 *    - Cambia fondo a semi-transparente con blur (glassmorphism)
 *    - Se remueve al volver al tope
 *
 * 4. MOBILE NAV AUTO-CLOSE
 *    - En mobile, al tocar un enlace del menu, se cierra automaticamente
 *    - Usa la API de Bootstrap Collapse para hide()
 *
 * 5. ACTIVE NAV LINK HIGHLIGHT
 *    - Detecta la pagina actual via window.location.pathname
 *    - Limpia hash y query params para evitar falsos negativos
 *    - Agrega clase 'active' al enlace correspondiente
 *
 * 6. FORM SUBMISSION HANDLER
 *    - Intercepta el submit del form #contactForm
 *    - Muestra estado "Enviando..." con boton deshabilitado
 *    - Simula envio con timeout de 1.2s
 *    - Muestra mensaje de exito por 4 segundos
 *    - Resetea el form y restaura el boton
 *
 * Dependencias:
 *    - Bootstrap 5.3.3 JS (para Collapse en mobile nav)
 *    - IntersectionObserver API (navegadores modernos)
 *
 * Requisitos HTML:
 *    - Elementos animados deben tener: data-animate="fade-in-up|fade-in-down|..."
 *    - Formulario debe tener: id="contactForm"
 *    - Los inputs del form deben tener atributo 'name'
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', function () {

    /* ======================================================================
       1. SCROLL ANIMATIONS - IntersectionObserver
       ======================================================================
       Configuracion:
         threshold: 0.15  -> Se activa cuando el 15% del elemento es visible
         rootMargin: -50px bottom -> Se adelanta 50px antes de llegar al fondo
       ====================================================================== */

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                // data-animate define el tipo de animacion (ej: "fade-in-up")
                // Si no tiene data-animate, usa 'fade-in-up' por defecto
                const anim = el.dataset.animate || 'fade-in-up';
                el.classList.add('animate', anim);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observar todos los elementos que tengan el atributo data-animate
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));


    /* ======================================================================
       2. HERO / HEADER ENTRANCE ANIMATION
       ======================================================================
       Se ejecuta una vez al cargar la pagina.
       Se usa setTimeout(100ms) para asegurar que el DOM ya renderizo.
       ====================================================================== */

    // Hero (solo en index.html tiene .hero-content)
    const hero = document.querySelector('.hero-content');
    if (hero) {
        setTimeout(() => hero.classList.add('animate-hero'), 100);
    }

    // Page header (en subpaginas como horarios.html, contacto.html, etc)
    const header = document.querySelector('.page-header');
    if (header) {
        setTimeout(() => header.classList.add('animate-header'), 100);
    }


    /* ======================================================================
       3. NAVBAR SCROLL EFFECT
       ======================================================================
       Cuando el usuario hace scroll mas de 50px, la navbar cambia a:
         - Fondo semi-transparente oscuro
         - Backdrop-filter blur (efecto cristal)
         - Sombra sutil

       Se usa { passive: true } para mejorar rendimiento en scroll.
       Se llama handleScroll() una vez al inicio para manejar el caso
       de que la pagina se recargue con scroll previo (back/forward).
       ====================================================================== */

    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }


    /* ======================================================================
       4. MOBILE NAV AUTO-CLOSE
       ======================================================================
       En mobile, el menu se expande/colapsa via Bootstrap Collapse.
       Al tocar un enlace, se cierra automaticamente el menu.

       Nota: bootstrap.Collapse.getInstance() retorna la instancia
       existente del collapse. Si no existe (desktop), retorna null.
       Se verifica que 'bootstrap' este definido antes de usarlo,
       por si el CDN de Bootstrap JS falla al cargar.
       ====================================================================== */

    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse) {
        navCollapse.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                // Verificar que Bootstrap JS este disponible
                if (typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            });
        });
    }


    /* ======================================================================
       5. ACTIVE NAV LINK HIGHLIGHT
       ======================================================================
       Detecta la pagina actual comparando con el href de cada enlace.
       Se limpia hash (#) y query params (?) para evitar falsos negativos.
       Ejemplo: "horarios.html#seccion" -> "horarios.html"

       Si pathname esta vacio (archivo://), usa 'index.html' como fallback.
       ====================================================================== */

    const currentPage = (window.location.pathname.split('/').pop() || 'index.html')
        .split('?')[0]
        .split('#')[0];

    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });


    /* ======================================================================
       6. FORM SUBMISSION HANDLER
       ======================================================================
       Maneja el envio del formulario de contacto (#contactForm).

       Flujo:
         1. Previene el envio real (e.preventDefault)
         2. Deshabilita el boton y muestra "Enviando..."
         3. Espera 1.2s (simulando envio al servidor)
         4. Resetea el form
         5. Muestra mensaje de exito por 4 segundos
         6. Oculta el mensaje y restaura todo

       Para integrar con un backend real, reemplazar el setTimeout
       con una llamada fetch() al endpoint de envio.

       Requisitos HTML:
         - form#contactForm con campos que tengan atributo 'name'
         - div.form-feedback (oculto por defecto con 'hidden')
       ====================================================================== */

    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const btn = form.querySelector('button[type="submit"]');
            const feedback = form.querySelector('.form-feedback');

            // Estado: enviando
            btn.disabled = true;
            btn.textContent = 'Enviando...';

            // Simular envio (reemplazar con fetch() para backend real)
            setTimeout(() => {
                // Restaurar boton
                btn.textContent = 'Enviar Mensaje';
                btn.disabled = false;

                // Resetear campos del form
                form.reset();

                // Mostrar mensaje de exito
                if (feedback) {
                    feedback.hidden = false;
                    feedback.classList.add('show');

                    // Ocultar mensaje despues de 4 segundos
                    setTimeout(() => {
                        feedback.hidden = true;
                        feedback.classList.remove('show');
                    }, 4000);
                }
            }, 1200);
        });
    }

});
