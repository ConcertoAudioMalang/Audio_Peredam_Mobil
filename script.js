/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Updated: Swiper Support & Performance Optimization
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
        console.log(`System: Theme switched to ${newTheme}`);
    };

    document.querySelectorAll('[id="theme-toggle"], .theme-toggle').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            toggleTheme();
        };
    });

    updateTheme();

    // --- 3. NAVBAR & SCROLL ENGINE ---
    const handleNavbarScroll = () => {
        const currentScrollY = window.scrollY;
        if (!navbar) return;

        // Navbar Appearance
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
                scrollToTopBtn.classList.replace('opacity-0', 'opacity-100');
                scrollToTopBtn.classList.replace('invisible', 'visible');
                scrollToTopBtn.style.transform = 'translateY(0)';
            } else {
                scrollToTopBtn.classList.replace('opacity-100', 'opacity-0');
                scrollToTopBtn.classList.replace('visible', 'invisible');
                scrollToTopBtn.style.transform = 'translateY(20px)';
            }
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // --- 4. SWIPER TESTIMONI (Safe Init) ---
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
        header.addEventListener('click', () => {
            const content = item.querySelector('.faq-content');
            const vLine = item.querySelector('.accordion-icon-vertical');
            const isOpen = content.style.maxHeight;

            // Close Others
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
        mobileMenuBtn.onclick = () => {
            const isOpening = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = isOpening ? 'hidden' : '';
            if (menuIcon) menuIcon.classList.toggle('fa-bars');
            if (menuIcon) menuIcon.classList.toggle('fa-xmark');
        };
    }

    // --- 7. OPTIMIZED CUSTOM CURSOR ---
    if (cursor && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Loop untuk pergerakan halus (lerp)
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.querySelectorAll('a, button, .cursor-pointer, .swiper-button').forEach(el => {
            el.onmouseenter = () => cursor.classList.add('scale-[3]', 'bg-accent-red/20', 'border', 'border-accent-red');
            el.onmouseleave = () => cursor.classList.remove('scale-[3]', 'bg-accent-red/20', 'border', 'border-accent-red');
        });
    }

    // --- 8. INITIALIZE AOS ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ once: true, duration: 1000, easing: 'ease-out-quart' });
    }
});

// --- 9. GLOBAL MODAL ENGINE ---
window.zoomImage = (img) => {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    if (!modal || !modalImg) return;
    modalImg.src = img.src;
    modal.classList.replace('opacity-0', 'opacity-100');
    modal.classList.replace('pointer-events-none', 'pointer-events-auto');
    document.body.style.overflow = 'hidden';
};

window.closeZoomModal = () => {
    const modal = document.getElementById('simple-zoom-modal');
    if (!modal) return;
    modal.classList.replace('opacity-100', 'opacity-0');
    modal.classList.replace('pointer-events-auto', 'pointer-events-none');
    document.body.style.overflow = '';
};
