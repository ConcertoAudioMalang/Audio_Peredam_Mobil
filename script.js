/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Pembaruan: Final Cleanup & Sinkronisasi Fitur
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
    
    let lastScrollY = window.scrollY;

    // --- 2. THEME ENGINE (Dark Mode) ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.classList.toggle('dark', savedTheme === 'dark');
    };

    const toggleTheme = () => {
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    // Handler klik universal untuk semua tombol tema
    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            e.preventDefault();
            toggleTheme();
        }
    });
    applyTheme();

    // --- 3. SMART NAVBAR & SCROLL ENGINE ---
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Efek Scrolled background
            navbar.classList.toggle('nav-scrolled', currentScrollY > 50);

            // Hide/Show Navbar (Smart Hide)
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Scroll to Top Button Visibility
        if (scrollToTopBtn) {
            const isVisible = currentScrollY > 800;
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

    // --- 4. FAQ ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close others (Exclusive Mode)
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

    // --- 5. MOBILE MENU LOGIC (Hanya jika pakai hamburger) ---
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

        // Close menu saat link diklik
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

    // --- 6. CUSTOM CURSOR (Desktop Only) ---
    if (cursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        });

        document.querySelectorAll('a, button, .cursor-pointer, .brand-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // --- 7. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 1000, 
            easing: 'ease-out-expo',
            disable: 'mobile' 
        });
    }

    // --- 8. SWIPER (Hanya jika ada elemennya) ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            autoplay: { delay: 5000 },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 }
            }
        });
    }
});

// --- 9. GLOBAL UTILITIES (Image Zoom) ---
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
