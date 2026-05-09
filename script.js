/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Final Update: Smart Scroll & Footer Protection
 */

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const footer = document.querySelector('footer');
    const cursor = document.getElementById('custom-cursor');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const isMobile = window.innerWidth < 1024;
    
    let lastScrollY = window.scrollY;

    // --- 1. THEME ENGINE ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.classList.toggle('dark', savedTheme === 'dark');
    };

    const toggleTheme = (e) => {
        if(e) e.preventDefault();
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            toggleTheme(e);
        }
    });
    applyTheme();

    // --- 2. SMART NAVBAR & FOOTER AVOIDANCE LOGIC ---
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Navbar Logic
        if (navbar) {
            navbar.classList.toggle('nav-scrolled', currentScrollY > 50);
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Scroll to Top Logic
        if (scrollToTopBtn && footer) {
            const isVisible = currentScrollY > 800;
            
            const scrollHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const footerHeight = footer.offsetHeight;
            const scrollBottom = currentScrollY + windowHeight;

            // Logika berhenti di atas footer
            if (scrollBottom > (scrollHeight - footerHeight + 40)) {
                scrollToTopBtn.style.position = 'absolute';
                scrollToTopBtn.style.bottom = (footerHeight + 40) + 'px';
            } else {
                scrollToTopBtn.style.position = 'fixed';
                scrollToTopBtn.style.bottom = '32px';
            }

            scrollToTopBtn.classList.toggle('opacity-100', isVisible);
            scrollToTopBtn.classList.toggle('visible', isVisible);
            scrollToTopBtn.classList.toggle('translate-y-0', isVisible);
            scrollToTopBtn.classList.toggle('opacity-0', !isVisible);
            scrollToTopBtn.classList.toggle('invisible', !isVisible);
            scrollToTopBtn.classList.toggle('translate-y-10', !isVisible);
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 3. MOBILE MENU ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = isOpen ? '' : 'hidden';
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', isOpen);
                menuIcon.classList.toggle('fa-xmark', !isOpen);
            }
        });
    }

    // --- 4. ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(other => {
                    other.classList.remove('active');
                    const content = other.querySelector('.faq-content');
                    if (content) content.style.maxHeight = null;
                });
                if (!isActive) {
                    item.classList.add('active');
                    const content = item.querySelector('.faq-content');
                    if (content) content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    // --- 5. CUSTOM CURSOR ---
    if (cursor && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });
        document.querySelectorAll('a, button, .brand-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // --- 6. SWIPER ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: { delay: 4000 },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 }
            }
        });
    }
});
