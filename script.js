/**
 * CONCERTO AUDIO Malang - Studio Engine
 * Refined for Oaksun Aesthetic
 */

// 1. THIRD-PARTY INITIALIZATION
const initThirdParty = () => {
    // AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1200,
            easing: 'cubic-bezier(0.16, 1, 0.3, 1)', // Smooth ease-out
            delay: 100
        });
    }

    // SWIPER (Testimonials/Products)
    if (typeof Swiper !== 'undefined') {
        new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 40,
            speed: 800,
            grabCursor: true,
            loop: true,
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initThirdParty();

    // 2. CORE DOM ELEMENTS
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const themeToggles = document.querySelectorAll('#theme-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    // 3. THEME ENGINE (Invisible Persistence)
    const updateTheme = (isDark) => {
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };

    // Init Theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        updateTheme(true);
    }

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => updateTheme(!html.classList.contains('dark')));
    });

    // 4. SMART NAVBAR LOGIC (Hide on Scroll, Reveal with Class)
    let lastScrollY = window.scrollY;
    
    const handleNavbar = () => {
        const currentScrollY = window.scrollY;
        
        // Background appearance
        if (currentScrollY > 50) {
            navbar.classList.add('navbar-active'); // Use class for all styling in CSS
        } else {
            navbar.classList.remove('navbar-active');
        }

        // Hide/Show on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Scroll to Top visibility
        if (scrollToTopBtn) {
            if (currentScrollY > 600) {
                scrollToTopBtn.classList.add('active');
            } else {
                scrollToTopBtn.classList.remove('active');
            }
        }

        lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleNavbar, { passive: true });

    // 5. MINIMALIST FAQ ACCORDION
    document.querySelectorAll('.faq-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close other items (Studio standard: only one open)
            document.querySelectorAll('.faq-item').forEach(el => {
                el.classList.remove('active');
                el.querySelector('.faq-content').style.maxHeight = null;
            });

            if (!isActive) {
                item.classList.add('active');
                const content = item.querySelector('.faq-content');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 6. MOBILE MENU TRANSITION
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            if (isOpen) {
                mobileMenu.classList.add('hidden');
            } else {
                mobileMenu.classList.remove('hidden');
            }
        });
    }

    // 7. SCROLL TO TOP ACTION
    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// 8. GLOBAL GALLERY ZOOM (Cinematic Approach)
function zoomImage(imgElement) {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImg = document.getElementById('zoom-modal-image');
    
    if (!modal || !modalImg) return;

    modalImg.src = imgElement.src;
    modal.classList.add('active'); // CSS should handle opacity & visibility
    document.body.style.overflow = 'hidden';
}

function closeZoomModal() {
    const modal = document.getElementById('simple-zoom-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Global listeners for zoom
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZoomModal();
});
