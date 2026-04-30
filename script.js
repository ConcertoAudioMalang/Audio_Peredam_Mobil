/**
 * CONCERTO MALANG - OPTIMIZED SCRIPT 2026
 * Sinkronisasi penuh dengan CSS & Responsivitas Mobile
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

    // --- 2. THEME ENGINE (Stabilizer) ---
    const updateTheme = () => {
        const isDark = localStorage.getItem('theme') === 'dark' || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
    };

    const toggleTheme = () => {
        const isCurrentlyDark = html.classList.contains('dark');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';
        html.classList.toggle('dark');
        localStorage.setItem('theme', newTheme);
    };

    document.querySelectorAll('#theme-toggle, .theme-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    });

    updateTheme();

    // --- 3. NAVBAR & SCROLL LOGIC ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Toggle Glassmorphism via CSS Class
            if (currentScrollY > 20) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }

            // Hide Navbar on Scroll Down, Show on Scroll Up
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Back to Top Visibility
        if (scrollToTopBtn) {
            if (currentScrollY > 600) {
                scrollToTopBtn.style.opacity = "1";
                scrollToTopBtn.style.visibility = "visible";
                scrollToTopBtn.style.transform = "translateY(0)";
            } else {
                scrollToTopBtn.style.opacity = "0";
                scrollToTopBtn.style.visibility = "hidden";
                scrollToTopBtn.style.transform = "translateY(20px)";
            }
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. MOBILE MENU (Enhanced for Touch) ---
    if (mobileMenuBtn && mobileMenu) {
        const toggleMenu = () => {
            const isOpen = !mobileMenu.classList.contains('translate-x-full');
            
            if (!isOpen) {
                // Open Menu
                mobileMenu.classList.remove('translate-x-full');
                mobileMenu.classList.add('translate-x-0');
                if (menuIcon) menuIcon.classList.replace('fa-bars', 'fa-xmark');
                document.body.style.overflow = 'hidden';
            } else {
                // Close Menu
                mobileMenu.classList.add('translate-x-full');
                mobileMenu.classList.remove('translate-x-0');
                if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
                document.body.style.overflow = '';
            }
        };

        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking links
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('translate-x-full');
                document.body.style.overflow = '';
                if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // --- 5. FAQ ACCORDION (Sync with style.css) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // --- 6. SWIPER TESTIMONI ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            breakpoints: {
                640: { slidesPerView: 1.5 },
                1024: { slidesPerView: 2.5 }
            }
        });
    }

    // --- 7. CUSTOM CURSOR (Safe for Mobile) ---
    if (cursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // --- 8. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 1000, 
            easing: 'ease-in-out',
            disable: 'mobile' // Opsional: matikan AOS di HP jika ingin performa maksimal
        });
    }
});

// --- 9. GLOBAL ZOOM ENGINE ---
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
