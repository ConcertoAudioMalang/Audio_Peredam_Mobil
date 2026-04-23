/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * High-Performance & Automotive Grade Logic
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
        
        // Tambahkan feedback visual kecil jika perlu
        console.log(`System: Theme switched to ${newTheme}`);
    };

    // Global selector untuk semua tombol toggle tema
    document.querySelectorAll('[id="theme-toggle"], .theme-toggle').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleTheme();
        });
    });

    updateTheme();

    // --- 3. NAVBAR & SCROLL ENGINE ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (!navbar) return;

        // Efek Visual Navbar (Blur & Border)
        if (currentScrollY > 50) {
            navbar.classList.add('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
            navbar.classList.remove('py-6', 'bg-transparent');
        } else {
            navbar.classList.remove('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
            navbar.classList.add('py-6', 'bg-transparent');
        }

        // Navbar Hide/Show Logic
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        // Scroll To Top Visibility
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

    // --- 4. FAQ ACCORDION ENGINE (Automotive Standard) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.faq-content');
        const vLine = item.querySelector('.accordion-icon-vertical');

        header.addEventListener('click', () => {
            const isOpen = content.style.maxHeight;

            // Close all other items first (Optional: remove this if you want multi-open)
            document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
            document.querySelectorAll('.accordion-icon-vertical').forEach(v => v.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                content.style.maxHeight = content.scrollHeight + "px";
                if (vLine) vLine.style.transform = 'rotate(90deg)'; // Ubah + jadi -
            } else {
                content.style.maxHeight = null;
                if (vLine) vLine.style.transform = 'rotate(0deg)';
            }
        });
    });

    // --- 5. MOBILE MENU LOGIC ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            
            if (menuIcon) {
                if (isHidden) {
                    menuIcon.classList.replace('fa-bars', 'fa-xmark');
                    document.body.style.overflow = 'hidden'; // Lock scroll saat menu buka
                } else {
                    menuIcon.classList.replace('fa-xmark', 'fa-bars');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // --- 6. CUSTOM CURSOR (Desktop Only) ---
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

    // --- 7. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 800,
            offset: 50,
            easing: 'ease-out-quart'
        });
    }
});

// --- 8. GLOBAL UTILITIES (Zoom Image) ---
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
