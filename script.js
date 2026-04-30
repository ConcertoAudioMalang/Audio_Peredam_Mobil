/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Pembaruan: Sinkronisasi CSS Global + Efisiensi Performa
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

    // --- 2. THEME ENGINE (Dark Mode) ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    };

    const toggleTheme = () => {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Handler klik universal untuk toggle theme
    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            e.preventDefault();
            toggleTheme();
        }
    });

    applyTheme(); // Jalankan saat load

    // --- 3. NAVBAR & SCROLL ENGINE ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Efek Scrolled (Sinkron dengan style_3.css)
            if (currentScrollY > 50) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }

            // Hide/Show Navbar saat Scroll (Smart Navbar)
            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Button Scroll Up Visibility
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
    };

    // Gunakan throttle/passive untuk performa scroll yang lebih ringan
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

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
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5, spaceBetween: 32 }
            }
        });
    }

    // --- 5. FAQ ACCORDION (Sinkron dengan FAQ Item Class) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Tutup semua FAQ lainnya (Mode Exclusive)
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                const content = otherItem.querySelector('.faq-content');
                if (content) content.style.maxHeight = null;
            });

            // Toggle item yang diklik
            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                if (content) content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // --- 6. MOBILE MENU (Enhanced) ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = isOpen ? '' : 'hidden'; // Lock scroll saat menu buka

            if (menuIcon) {
                if (isOpen) {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                } else {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                }
            }
        });

        // Tutup menu otomatis saat link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                document.body.style.overflow = '';
                if (menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // --- 7. CUSTOM CURSOR (Desktop Only) ---
    if (cursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            // Menggunakan requestAnimationFrame untuk pergerakan lebih halus
            requestAnimationFrame(() => {
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            });
        });

        document.querySelectorAll('a, button, .cursor-pointer, .swiper-button').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    }

    // --- 8. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 1000, 
            offset: 100, 
            easing: 'ease-out-expo',
            disable: 'mobile' // Opsional: matikan AOS di HP untuk hemat baterai
        });
    }
});

// --- 9. GLOBAL UTILITIES (Image Zoom) ---
window.zoomImage = (img) => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal || !modalImg) return;

    modalImg.src = img.src;
    modal.classList.add('active'); // Menggunakan class 'active' dari style_3.css
    document.body.style.overflow = 'hidden';
};

window.closeZoomModal = () => {
    const modal = document.getElementById('simple-zoom-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};
