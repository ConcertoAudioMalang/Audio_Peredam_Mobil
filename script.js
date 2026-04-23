/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Fixed: Scroll To Top Logic & Event Binding
 */

document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const scrollToTopBtn = document.getElementById('scroll-to-top'); // Pastikan ID di HTML sama
    const cursor = document.getElementById('custom-cursor');
    
    let lastScrollY = window.scrollY;

    // --- SCROLL ENGINE (NAVBAR & BUTTON UP) ---
    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // 1. Navbar Visuals
        if (navbar) {
            if (currentScrollY > 50) {
                navbar.classList.add('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
                navbar.classList.remove('py-6', 'bg-transparent');
            } else {
                navbar.classList.remove('backdrop-blur-xl', 'bg-white/80', 'dark:bg-[#0A0A0A]/80', 'py-4', 'border-b', 'border-black/5', 'dark:border-white/5');
                navbar.classList.add('py-6', 'bg-transparent');
            }
            // Navbar Hide/Show
            navbar.style.transform = (currentScrollY > lastScrollY && currentScrollY > 500) ? 'translateY(-100%)' : 'translateY(0)';
        }

        // 2. Button Up Visibility (FIXED LOGIC)
        if (scrollToTopBtn) {
            if (currentScrollY > 600) { // Muncul setelah scroll 600px
                scrollToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-10');
                scrollToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0');
            }
        }
        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // --- BUTTON UP CLICK ACTION ---
    if (scrollToTopBtn) {
        scrollToTopBtn.onclick = (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
    }

    // --- THEME ENGINE ---
    const updateTheme = () => {
        const isDark = localStorage.getItem('theme') === 'dark' || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
    };

    document.querySelectorAll('[id="theme-toggle"], .theme-toggle').forEach(btn => {
        btn.onclick = (e) => {
            e.preventDefault();
            const isCurrentlyDark = html.classList.contains('dark');
            html.classList.toggle('dark');
            localStorage.setItem('theme', isCurrentlyDark ? 'light' : 'dark');
        };
    });
    updateTheme();

    // --- SWIPER TESTIMONI ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: { delay: 5000 },
            navigation: { nextEl: '.swiper-next', prevEl: '.swiper-prev' },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5, spaceBetween: 30 }
            }
        });
    }

    // --- FAQ ACCORDION ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (header) {
            header.onclick = () => {
                const content = item.querySelector('.faq-content');
                const vLine = item.querySelector('.accordion-icon-vertical');
                const isOpen = content.style.maxHeight;
                document.querySelectorAll('.faq-content').forEach(c => c.style.maxHeight = null);
                document.querySelectorAll('.accordion-icon-vertical').forEach(v => v.style.transform = 'rotate(0deg)');
                if (!isOpen) {
                    content.style.maxHeight = content.scrollHeight + "px";
                    if (vLine) vLine.style.transform = 'rotate(90deg)';
                }
            };
        }
    });

    // --- MOBILE MENU ---
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.onclick = () => {
            const isOpening = mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            document.body.style.overflow = isOpening ? 'hidden' : '';
            if (menuIcon) {
                menuIcon.classList.toggle('fa-bars', !isOpening);
                menuIcon.classList.toggle('fa-xmark', isOpening);
            }
        };
    }

    // --- CUSTOM CURSOR ---
    if (cursor && window.innerWidth > 1024) {
        let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
        document.addEventListener('mousemove', (e) => { mouseX = e.clientX; mouseY = e.clientY; });
        const animateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            requestAnimationFrame(animateCursor);
        };
        animateCursor();
        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.onmouseenter = () => cursor.classList.add('scale-[3]', 'bg-accent-red/20');
            el.onmouseleave = () => cursor.classList.remove('scale-[3]', 'bg-accent-red/20');
        });
    }

    if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 1000 });
});

// --- GLOBAL ZOOM ENGINE ---
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
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        document.body.style.overflow = '';
    }
};
