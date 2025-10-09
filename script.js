// ===================================
// script.js: Interactivity for CONCERTO
// (Dark Mode, Mobile Menu, Scroll, CTA)
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. DARK/LIGHT MODE LOGIC ---
    const htmlElement = document.documentElement;
    const toggleButtons = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
    const icons = document.querySelectorAll('#theme-icon-desktop, #theme-icon-mobile');

    const updateThemeUI = (isDark) => {
        // Ganti ikon pada semua tombol
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.remove('fa-sun'); // Icon Light: Sun
                icon.classList.add('fa-moon');  // Icon Dark: Moon
            } else {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        });
    };

    // Load tema saat halaman dimuat
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        htmlElement.classList.add('dark');
        updateThemeUI(true);
    } else if (savedTheme === 'light') {
        htmlElement.classList.remove('dark');
        updateThemeUI(false);
    } else {
        // Default ke Dark Mode jika tidak ada preferensi
        htmlElement.classList.add('dark');
        updateThemeUI(true);
    }

    // Event listener untuk toggle mode
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


    // --- 2. MOBILE MENU TOGGLE ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = mobileMenuButton.querySelector('i');
            // Ganti ikon hamburger/x
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
                // Kembalikan ikon ke hamburger
                mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }


    // --- 3. SCROLL-TO-TOP BUTTON VISIBILITY ---
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            // Tampilkan setelah 300px scroll
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


    // --- 4. FAQ ACCORDION FUNCTIONALITY ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        toggle.addEventListener('click', () => {
            // Tutup semua item FAQ lain yang terbuka
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

            // Toggle item yang sedang diklik
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
            content.classList.toggle('hidden');
            toggle.setAttribute('aria-expanded', !isExpanded);
            
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });


    // --- 5. WHATSAPP CTA LINK HANDLER ---
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');
    // GANTI dengan nomor WA Anda jika berbeda
    const baseWAURL = "https://wa.me/6281217398558"; 
    const defaultText = "Halo Concerto, saya tertarik dengan layanan audio mobil SQ. Bisa dibantu konsultasi?";

    ctaLinks.forEach(link => {
        const product = link.getAttribute('data-product');
        let message = defaultText;

        if (product) {
            // Gunakan pesan spesifik jika ada data-product
            message = `Halo Concerto, saya melihat penawaran Anda dan tertarik dengan: *${product}*. Mohon info lebih lanjut.`;
        }

        const fullURL = `${baseWAURL}?text=${encodeURIComponent(message)}`;
        
        link.setAttribute('href', fullURL);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

});
