/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Final Update: Premium Transitions & Performance Optimization
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INISIALISASI ELEMEN ---
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const cursor = document.getElementById('custom-cursor');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const isMobile = window.innerWidth < 1024; 
    
    let lastScrollY = window.scrollY;

    // --- 2. THEME ENGINE ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark'; 
        html.classList.toggle('dark', savedTheme === 'dark');
    };

    const toggleTheme = (e) => {
        e.preventDefault();
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            toggleTheme(e);
        }
    });
    applyTheme();

    // --- 3. SMART SCROLL & NAVBAR ---
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            navbar.classList.toggle('nav-scrolled', currentScrollY > 20);

            if (currentScrollY > lastScrollY && currentScrollY > 400) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        if (scrollToTopBtn) {
            const isVisible = currentScrollY > 600;
            scrollToTopBtn.style.opacity = isVisible ? '1' : '0';
            scrollToTopBtn.style.visibility = isVisible ? 'visible' : 'hidden';
            scrollToTopBtn.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. MOBILE MENU LOGIC ---
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

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                if (menuIcon) {
                    menuIcon.classList.add('fa-bars');
                    menuIcon.classList.remove('fa-xmark');
                }
            });
        });
    }

    // --- 5. ACCORDION ---
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

    // --- 6. CUSTOM CURSOR ---
    if (cursor && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactives = 'a, button, .cursor-pointer, .brand-card, .faq-item';
        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // --- 7. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 900, 
            easing: 'ease-out-quart',
            offset: 40
        });
    }

    // --- 8. SWIPER (FINAL - NO BUTTONS) ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 }
            }
        });
    }
});

// --- 9. GLOBAL UTILITIES ---
window.zoomImage = (img) => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal || !modalImg) return;
    modalImg.src = img.src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
};

window.closeZoomModal = () => {
    const modal = document.getElementById('simple-zoom-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};
