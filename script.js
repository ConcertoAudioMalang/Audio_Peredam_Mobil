/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Clean, Optimized, and High-Performance
 */

// 1. INISIALISASI LIBRARY (AOS & SWIPER)
const initLibraries = () => {
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 1000,
            easing: 'ease-in-out'
        });
    }

    if (typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 24,
            loop: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initLibraries();

    // --- DEKLARASI ELEMEN ---
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    let lastScrollY = window.scrollY;

    // --- 1. THEME ENGINE (DARK/LIGHT) ---
    const updateTheme = () => {
        const isDark = localStorage.getItem('theme') === 'dark' || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
    };

    window.toggleTheme = () => { // Fungsi ini bisa dipanggil dari HTML onclick="toggleTheme()"
        const isCurrentlyDark = html.classList.contains('dark');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';
        html.classList.toggle('dark');
        localStorage.setItem('theme', newTheme);
        // Refresh appearance navbar jika diperlukan
        handleNavbarScroll();
    };

    document.querySelectorAll('#theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    updateTheme();

    // --- 2. NAVBAR SCROLL ENGINE ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        // Efek Glassmorphism saat scroll
        if (currentScrollY > 50) {
            navbar.classList.add('bg-white/80', 'dark:bg-black/80', 'backdrop-blur-xl', 'shadow-lg', 'py-4');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('bg-white/80', 'dark:bg-black/80', 'backdrop-blur-xl', 'shadow-lg', 'py-4');
            navbar.classList.add('py-6', 'bg-transparent');
        }

        // Auto Hide/Show Navbar on Scroll Down/Up
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.classList.add('-translate-y-full'); // Sembunyi
        } else {
            navbar.classList.remove('-translate-y-full'); // Muncul
        }

        // Show/Hide Scroll To Top Button
        if (scrollToTopBtn) {
            if (currentScrollY > 600) {
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

    // --- 3. MOBILE MENU ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            menuIcon.classList.toggle('fa-bars', !isOpen);
            menuIcon.classList.toggle('fa-xmark', isOpen);
        });

        // Tutup menu jika link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // --- 4. ACCORDION FAQ (OPTIMIZED) ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');
            const isActive = header.classList.contains('active');

            // Tutup akordeon lain yang sedang terbuka
            document.querySelectorAll('.accordion-header').forEach(otherHeader => {
                if (otherHeader !== header) {
                    otherHeader.classList.remove('active');
                    otherHeader.nextElementSibling.style.maxHeight = null;
                    const otherIcon = otherHeader.querySelector('.accordion-icon');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            // Toggle Akordeon Klik
            header.classList.toggle('active');
            if (!isActive) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
            } else {
                content.style.maxHeight = null;
                if (icon) icon.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- 5. SCROLL TO TOP CLICK ---
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// --- 6. GLOBAL ZOOM IMAGE (DI LUAR DOMContentLoaded AGAR BISA DIPANGGIL ONCLICK) ---
window.zoomImage = (img) => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal || !modalImg) return;

    modalImg.src = img.src;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
};

window.closeZoomModal = () => {
    const modal = document.getElementById('simple-zoom-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    document.body.style.overflow = '';
};

// Tutup Modal dengan ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZoomModal();
});
