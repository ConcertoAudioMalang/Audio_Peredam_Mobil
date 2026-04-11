/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Ultra-Minimalist & High-Performance (McLaren F1 Inspired)
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

    // --- 1. THEME ENGINE ---
    const updateTheme = () => {
        const isDark = localStorage.getItem('theme') === 'dark' || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
    };

    window.toggleTheme = () => {
        const isCurrentlyDark = html.classList.contains('dark');
        const newTheme = isCurrentlyDark ? 'light' : 'dark';
        html.classList.toggle('dark');
        localStorage.setItem('theme', newTheme);
        handleNavbarScroll(); // Update visual navbar saat ganti tema
    };

    document.querySelectorAll('#theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    updateTheme();

   // --- 2. NAVBAR SCROLL ENGINE (MCLAREN STYLE) ---
const handleNavbarScroll = () => {
    const currentScrollY = window.scrollY;
    
    // Efek transisi Floating (Melayang) ke Solid (Penuh)
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
        // PENTING: Hapus padding samping agar bar bisa melebar penuh (Full Width)
        navbar.classList.remove('py-4', 'px-4', 'lg:px-8');
        navbar.classList.add('py-0', 'px-0');
    } else {
        navbar.classList.remove('scrolled');
        // PENTING: Kembalikan padding agar bar terlihat melayang (Floating) lagi
        navbar.classList.remove('py-0', 'px-0');
        navbar.classList.add('py-4', 'px-4', 'lg:px-8');
    }

    // Auto Hide saat scroll ke bawah (Fokus ke konten)
    if (currentScrollY > lastScrollY && currentScrollY > 500) {
        navbar.classList.add('-translate-y-full');
    } else {
        navbar.classList.remove('-translate-y-full');
    }

    // Tombol Scroll To Top
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
            if(menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isOpen);
                menuIcon.classList.toggle('fa-xmark', isOpen);
            }
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                if(menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // --- 4. FAQ ACCORDION ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const isOpen = this.classList.contains('active');

            // Tutup semua yang lain
            document.querySelectorAll('.accordion-header').forEach(other => {
                other.classList.remove('active');
                if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = null;
                const otherIcon = other.querySelector('.accordion-icon');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });

            // Buka yang diklik
            if (!isOpen) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
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

// --- 6. GLOBAL ZOOM IMAGE ---
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZoomModal();
});
