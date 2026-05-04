/**
 * CONCERTO MALANG - OFFICIAL SCRIPT 2026
 * Final Update: Premium Transitions & Performance Optimization
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INISIALISASI ELEMEN ---
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const cursor = document.getElementById('custom-cursor');
    const isMobile = window.innerWidth < 1024; // Cek status perangkat sekali di awal
    
    let lastScrollY = window.scrollY;

    // --- 2. THEME ENGINE ---
    const applyTheme = () => {
        const savedTheme = localStorage.getItem('theme') || 'dark'; // Default Dark agar mewah
        html.classList.toggle('dark', savedTheme === 'dark');
    };

    const toggleTheme = (e) => {
        e.preventDefault();
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    };

    document.addEventListener('click', (e) => {
        if (e.target.closest('#theme-toggle') || e.target.closest('#theme-toggle-mobile')) {
            toggleTheme(e);
        }
    });
    applyTheme();

    // --- 3. SMART SCROLL & BUTTON ANIMATIONS ---
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (navbar) {
            // Efek background blur & border saat scroll
            navbar.classList.toggle('nav-scrolled', currentScrollY > 20);

            // Hide/Show Navbar (Logic: Sembunyikan saat scroll ke bawah, Munculkan saat scroll ke atas)
            if (currentScrollY > lastScrollY && currentScrollY > 400) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        }

        // Scroll to Top Button (Smooth Fade)
        if (scrollToTopBtn) {
            const isVisible = currentScrollY > 600;
            scrollToTopBtn.style.opacity = isVisible ? '1' : '0';
            scrollToTopBtn.style.visibility = isVisible ? 'visible' : 'hidden';
            scrollToTopBtn.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
        }
        lastScrollY = currentScrollY;
    };

    // Gunakan throttle atau requestAnimationFrame untuk performa scroll
    window.addEventListener('scroll', handleScroll, { passive: true });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 4. ACCORDION (Enhanced Transitions) ---
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
                    // Memberikan transisi tinggi yang mulus
                    if (content) content.style.maxHeight = content.scrollHeight + "px";
                }
            });
        }
    });

    // --- 5. CUSTOM CURSOR (Desktop Only - Performance Optimized) ---
    if (cursor && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            // Gunakan transform agar lebih enteng bagi GPU
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        // Hover effect untuk elemen interaktif
        const interactives = 'a, button, .cursor-pointer, .brand-card, .faq-item';
        document.querySelectorAll(interactives).forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    } else if (cursor) {
        cursor.style.display = 'none'; // Pastikan benar-benar hilang di mobile
    }

    // --- 6. INITIALIZE AOS (Mobile Optimized) ---
    if (typeof AOS !== 'undefined') {
        AOS.init({ 
            once: true, 
            duration: 900, 
            easing: 'ease-out-quart',
            offset: 40,
            // Animasi tetap jalan di mobile tapi lebih simpel
            disableMutationObserver: false 
        });
    }

    // --- 7. SWIPER (Testimonial & Projects) ---
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimoni-slider')) {
        new Swiper('.testimoni-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            grabCursor: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }
});

// --- 8. GLOBAL UTILITIES (Zoom & Modals) ---
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
