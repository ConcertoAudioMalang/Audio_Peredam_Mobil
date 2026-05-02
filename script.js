document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');

    // 1. Theme Toggle
    window.toggleTheme = () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // 2. Navbar Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('nav-scrolled');
        } else {
            navbar.classList.remove('nav-scrolled');
        }
    });

    // 3. AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 800 });
    }
});
