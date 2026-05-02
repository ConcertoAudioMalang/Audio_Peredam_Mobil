/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Perbaikan: Efisiensi Event Listener & Pencegahan Layout Shift
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INISIALISASI ELEMEN ---
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const cursor = document.getElementById('custom-cursor');
    
    let lastScrollY = window.scrollY;
    let ticking = false; // Untuk throttle scroll

    // --- 2. THEME ENGINE ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.classList.toggle('dark', savedTheme === 'dark');
    };

    const toggleTheme = () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            e.preventDefault();
            toggleTheme();
        }
    });

    applyTheme();

    // --- 3. NAVBAR & SCROLL ENGINE (Throttled) ---
    const updateScrollLogic = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // State: Ter-scroll
            navbar.classList.toggle('nav-scrolled', currentScrollY > 50);

            // Smart Navbar (Hide on Scroll Down, Show on Scroll Up)
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Back to Top Button
        if (scrollToTopBtn) {
            if (currentScrollY > 800) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateScrollLogic);
            ticking = true;
        }
    }, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. SWIPER TESTIMONI ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5, spaceBetween: 32 }
            }
        });
    }

    // --- 5. FAQ ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        header?.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tutup yang lain
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
    });

    // --- 6. MOBILE MENU ---
    if (mobileMenuBtn && mobileMenu) {
        const toggleMenu = (open) => {
            mobileMenu.classList.toggle('hidden', !open);
            document.body.style.overflow = open ? 'hidden' : '';
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !open);
                menuIcon.classList.toggle('fa-xmark', open);
            }
        };

        mobileMenuBtn.addEventListener('click', () => {
            const isClosing = !mobileMenu.classList.contains('hidden');
            toggleMenu(!isClosing);
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // --- 7. CUSTOM CURSOR (Smoother) ---
    if (cursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            });
        });

        document.querySelectorAll('a, button, .cursor-pointer, .swiper-button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // --- 8. AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 1000, offset: 100, easing: 'ease-out-expo' });
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
