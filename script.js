// ===================================
// script.js: Interactivity for CONCERTO
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- DARK/LIGHT MODE LOGIC ---
    const htmlElement = document.documentElement;
    const toggleButtons = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
    const icons = document.querySelectorAll('#theme-icon-desktop, #theme-icon-mobile');

    // Cek preferensi pengguna/status tersimpan
    const currentTheme = localStorage.getItem('theme');
    
    // Fungsi untuk memperbarui UI sesuai mode
    const updateThemeUI = (isDark) => {
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    };

    // Aplikasikan tema saat load
    if (currentTheme === 'dark' || (!currentTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        htmlElement.classList.add('dark');
        updateThemeUI(true);
    } else if (currentTheme === 'light') {
        htmlElement.classList.remove('dark');
        updateThemeUI(false);
    } else {
         // Default ke Dark Mode jika tidak ada preferensi (seperti desain awal)
         htmlElement.classList.add('dark');
         updateThemeUI(true);
    }

    // Event listener untuk toggle
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isCurrentlyDark = htmlElement.classList.contains('dark');
            
            if (isCurrentlyDark) {
                htmlElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                updateThemeUI(false);
            } else {
                htmlElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                updateThemeUI(true);
            }
        });
    });
    // --- END DARK/LIGHT MODE LOGIC ---


    // 1. Mobile Menu Toggle (Dipertahankan)
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
        
        // Tutup menu mobile saat link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. Scroll-to-Top Button Visibility (Dipertahankan)
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
                scrollToTopButton.classList.add('opacity-100');
            } else {
                scrollToTopButton.classList.remove('opacity-100');
                scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
            }
        });

        scrollToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // 3. FAQ Accordion Functionality (Dipertahankan)
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        toggle.addEventListener('click', () => {
            // ... (logika accordion yang sama)
             faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    if (!otherContent.classList.contains('hidden')) {
                        otherContent.classList.add('hidden');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                        otherItem.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
                    }
                }
            });

            const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
            
            content.classList.toggle('hidden');
            toggle.setAttribute('aria-expanded', !isExpanded);
            
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });

    // 4. WhatsApp CTA Link Handler (Dipertahankan)
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');
    const baseWAURL = "https://wa.me/6281217398558"; 
    const defaultText = "Halo Concerto, saya tertarik dengan layanan audio mobil SQ. Bisa dibantu konsultasi?";

    ctaLinks.forEach(link => {
        const product = link.getAttribute('data-product');
        let message = defaultText;

        if (product) {
            message = `Halo Concerto, saya melihat penawaran Anda dan tertarik dengan: *${product}*. Mohon info lebih lanjut.`;
        }

        const fullURL = `${baseWAURL}?text=${encodeURIComponent(message)}`;
        
        link.setAttribute('href', fullURL);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

});
