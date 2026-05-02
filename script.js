document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const cursor = document.getElementById('custom-cursor');
    
    // --- 1. THEME ENGINE ---
    window.toggleTheme = () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // --- 2. NAVBAR SCROLL EFFECT ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // --- 3. CUSTOM CURSOR (DESKTOP ONLY) ---
    if (cursor && window.innerWidth > 1024) {
        window.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
            });
        });

        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(2.5)');
            el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
        });
    }

    // --- 4. AOS & OTHER LIBS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 800,
            disable: 'mobile'
        });
    }
});
