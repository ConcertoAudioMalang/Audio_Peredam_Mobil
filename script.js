/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Ultra-Minimalist & High-Performance (McLaren F1 Inspired)
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

    // --- 2. THEME ENGINE (Dark/Light Mode) ---
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

    // Support untuk banyak tombol theme-toggle (desktop & mobile)
    document.querySelectorAll('#theme-toggle, .theme-toggle').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    updateTheme();

    // --- 3. NAVBAR SCROLL ENGINE (McLaren Style) ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (!navbar) return;

        // Efek Transisi Navbar saat Scroll
        if (currentScrollY > 50) {
            navbar.classList.add('backdrop-blur-xl', 'bg-white/70', 'dark:bg-dark-studio/70', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('backdrop-blur-xl', 'bg-white/70', 'dark:bg-dark-studio/70', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
            navbar.classList.add('py-6', 'bg-transparent');
        }

        // Auto Hide Navbar saat scroll ke bawah, Show saat scroll ke atas
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Tombol Scroll To Top Visibility
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

    // --- 4. SMOOTH INTERNAL NAVIGATION ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Tutup mobile menu jika sedang terbuka
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    if(menuIcon) menuIcon.classList.replace('fa-xmark', 'fa-bars');
                }
            }
        });
    });

    // --- 5. CUSTOM CURSOR & HOVER EFFECTS ---
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(${e.clientX - 8}px, ${e.clientY - 8}px, 0)`;
        });

        document.querySelectorAll('a, button, .zoom-trigger').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('scale-[4]', 'bg-white');
                cursor.style.mixBlendMode = 'difference';
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('scale-[4]', 'bg-white');
                cursor.style.mixBlendMode = 'normal';
            });
        });
    }

    // --- 6. MOBILE MENU LOGIC ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            if(menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isHidden);
                menuIcon.classList.toggle('fa-xmark', isHidden);
            }
        });
    }

    // --- 7. FAQ ACCORDION ---
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            const isOpen = this.classList.contains('active');

            // Close all other accordions
            document.querySelectorAll('.accordion-header').forEach(other => {
                other.classList.remove('active');
                if (other.nextElementSibling) other.nextElementSibling.style.maxHeight = null;
                const otherIcon = other.querySelector('.accordion-icon');
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
            });

            // Open clicked accordion
            if (!isOpen) {
                this.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
                if (icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- 8. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 1000,
            offset: 100
        });
    }
});

// --- 9. GLOBAL UTILITIES (Zoom Image) ---
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
