document.addEventListener('DOMContentLoaded', function () {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const anim = el.dataset.animate || 'fade-in-up';
                el.classList.add('animate', anim);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    const hero = document.querySelector('.hero-content');
    if (hero) {
        setTimeout(() => hero.classList.add('animate-hero'), 100);
    }

    const header = document.querySelector('.page-header');
    if (header) {
        setTimeout(() => header.classList.add('animate-header'), 100);
    }
});
