document.addEventListener('DOMContentLoaded', () => {
    
    /* ========================================= */
    /* 1. CONFIGURATION (PENTING!) */
    /* ========================================= */
    const phoneNumber = '6281234567890'; // GANTI dengan NOMOR WHATSAPP Anda
    const waBaseUrl = `https://wa.me/${phoneNumber}?text=`;
    
    /* ========================================= */
    /* 2. DARK MODE TOGGLE */
    /* ========================================= */
    const setupThemeToggle = (buttonId, iconId) => {
        const toggleButton = document.getElementById(buttonId);
        const toggleIcon = document.getElementById(iconId);
        
        if (!toggleButton || !toggleIcon) return;

        const updateIcon = (isDark) => {
            if (isDark) {
                toggleIcon.classList.remove('fa-sun');
                toggleIcon.classList.add('fa-moon');
            } else {
                toggleIcon.classList.remove('fa-moon');
                toggleIcon.classList.add('fa-sun');
            }
        };

        // Cek preferensi user saat loading
        const isDarkMode = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateIcon(document.documentElement.classList.contains('dark'));


        toggleButton.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    };

    setupThemeToggle('theme-toggle', 'theme-icon'); // Desktop
    setupThemeToggle('theme-toggle-mobile', 'theme-icon-mobile'); // Mobile

    /* ========================================= */
    /* 3. HAMBURGER MENU & SCROLL BEHAVIOR */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (menuToggle && mobileMenu && menuIcon) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mobileMenu.classList.toggle('-translate-y-full');
            if (isOpen) {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            } else {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            }
        });

        // Tutup menu saat link diklik (di mobile)
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('-translate-y-full');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // Smooth Scroll untuk semua Nav Link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    /* ========================================= */
    /* 4. SCROLL TO TOP BUTTON (OPSIONAL) */
    /* ========================================= */
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ========================================= */
    /* 5. CTA WHATSAPP HANDLER */
    /* ========================================= */
    document.querySelectorAll('.cta-whatsapp-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const product = link.getAttribute('data-product');
            const message = `Halo Concerto Audio Malang, saya tertarik dengan: *${product}*. Mohon informasinya lebih lanjut. Terima kasih!`;
            window.open(waBaseUrl + encodeURIComponent(message), '_blank');
        });
    });


    /* ========================================= */
    /* 6. FAQ ACCORDION LOGIC */
    /* ========================================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggleButton = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.fa-plus');

        if (toggleButton) {
            toggleButton.addEventListener('click', () => {
                const isHidden = content.classList.contains('hidden');

                // Tutup semua item FAQ yang terbuka (untuk efek accordion)
                faqItems.forEach(i => {
                    const c = i.querySelector('.faq-content');
                    const ic = i.querySelector('.fa-plus');
                    if (c !== content && !c.classList.contains('hidden')) {
                        c.classList.add('hidden');
                        ic.classList.remove('rotate-45');
                    }
                });

                // Buka/Tutup item yang diklik
                if (isHidden) {
                    content.classList.remove('hidden');
                    icon.classList.add('rotate-45'); // Memutar ikon + menjadi X
                } else {
                    content.classList.add('hidden');
                    icon.classList.remove('rotate-45');
                }
            });
        }
    });

    /* ========================================= */
    /* 7. AOS (Animate On Scroll) INITIALIZATION */
    /* ========================================= */
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out'
    });

}); // End DOMContentLoaded
