/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Gabungan Logika Stabil + Support Fitur Baru
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

   // --- 2. THEME ENGINE ---
const toggleTheme = () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    console.log("Theme toggled to:", isDark ? 'dark' : 'light');
};

// Gunakan selektor yang lebih aman (mencakup ID maupun Class)
document.addEventListener('click', (e) => {
    // Jika yang diklik adalah tombol theme-toggle atau elemen di dalamnya (span)
    if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile') || e.target.closest('.theme-toggle')) {
        e.preventDefault();
        toggleTheme();
    }
});

    // --- 3. NAVBAR & SCROLL ENGINE (Termasuk Button Up) ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
                navbar.classList.remove('py-6', 'bg-transparent');
            } else {
                navbar.classList.remove('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
                navbar.classList.add('py-6', 'bg-transparent');
            }

            if (currentScrollY > lastScrollY && currentScrollY > 500) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Button Up Visibility
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

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. SWIPER TESTIMONI (Fitur Baru) ---
    if (typeof Swiper !== 'undefined') {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 5000 },
            navigation: {
                nextEl: '.swiper-next',
                prevEl: '.swiper-prev',
            },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5, spaceBetween: 30 }
            }
        });
    }

    // --- 5. FAQ ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.faq-content');
        const vLine = item.querySelector('.accordion-icon-vertical');

        header.addEventListener('click', () => {
            const isOpen = content.style.maxHeight;
            document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-icon-vertical').forEach(v => v.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (vLine) vLine.style.transform = 'rotate(90deg)';
            }
        });
    });

    // --- 6. MOBILE MENU ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            if (menuIcon) {
                if (isHidden) {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                    document.body.style.overflow = 'hidden';
                } else {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // --- 7. CUSTOM CURSOR ---
    if (cursor && window.innerWidth > 1024) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('scale-[3]', 'bg-accent-red/20'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('scale-[3]', 'bg-accent-red/20'));
        });
    }

    // --- 8. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 800, offset: 50, easing: 'ease-out-quart' });
    }
});

// --- 9. GLOBAL UTILITIES ---
window.zoomImage = (img) => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal || !modalImg) return;
    modalImg.src = img.src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    modalImg.classList.remove('scale-95');
    modalImg.classList.add('scale-100');
    document.body.style.overflow = 'hidden';
};

window.closeZoomModal = () => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    if (modalImg) {
        modalImg.classList.add('scale-95');
        modalImg.classList.remove('scale-100');
    }
    document.body.style.overflow = '';
};
