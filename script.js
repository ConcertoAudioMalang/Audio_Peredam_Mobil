// ===================================
// script.js: Interactivity for CONCERTO
// (Dark Mode, Mobile Menu, Scroll, CTA, Active Nav)
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // Nomor WA Anda
    const WA_NUMBER = "6281217398558"; 
    const BASE_WA_URL = `https://wa.me/${WA_NUMBER}`;

    // --- 1. DARK/LIGHT MODE LOGIC ---
    const htmlElement = document.documentElement;
    const toggleButtons = document.querySelectorAll('#theme-toggle-desktop, #theme-toggle-mobile');
    const icons = document.querySelectorAll('#theme-icon-desktop, #theme-icon-mobile');

    const updateThemeUI = (isDark) => {
        // Ganti ikon pada semua tombol
        icons.forEach(icon => {
            if (isDark) {
                icon.classList.replace('fa-sun', 'fa-moon');
            } else {
                icon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    };

    const loadInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Prioritas: 1. Saved Theme, 2. System Preference, 3. Default to Dark
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            htmlElement.classList.add('dark');
            updateThemeUI(true);
            localStorage.setItem('theme', 'dark'); // Tetapkan dark sebagai default awal jika tidak ada
        } else {
            htmlElement.classList.remove('dark');
            updateThemeUI(false);
            if (!savedTheme) localStorage.setItem('theme', 'light'); // Tetapkan light jika system preference light
        }
    };

    loadInitialTheme();

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
    const menuIcon = mobileMenuButton ? mobileMenuButton.querySelector('i') : null;

    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            
            // Ganti ikon hamburger/x
            if (isHidden) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        });
        
        // Tutup menu mobile saat link diklik
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }


    // --- 3. SCROLL-TO-TOP BUTTON VISIBILITY ---
    const scrollToTopButton = document.getElementById('scroll-to-top');

    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Menggunakan opacity dan visibility
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
    // Logika sudah sangat baik, dipertahankan.
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
                         otherIcon.classList.replace('fa-minus', 'fa-plus');
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
    const defaultText = "Halo Concerto, saya tertarik dengan layanan audio mobil SQ. Bisa dibantu konsultasi?";

    ctaLinks.forEach(link => {
        const product = link.getAttribute('data-product');
        let message = defaultText;

        if (product) {
            // Gunakan pesan spesifik jika ada data-product
            message = `Halo Concerto, saya melihat penawaran Anda dan tertarik dengan: *${product}*. Mohon info lebih lanjut.`;
        }

        const fullURL = `${BASE_WA_URL}?text=${encodeURIComponent(message)}`;
        
        link.setAttribute('href', fullURL);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // --- 6. ACTIVE NAV LINK HIGHLIGHT (Futuristik/Sporty) ---
    const navLinks = document.querySelectorAll('#desktop-menu a:not(.cta-whatsapp-link), #mobile-menu a:not(.cta-whatsapp-link)');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // Section dianggap aktif jika 50% terlihat
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus kelas aktif dari semua link
                navLinks.forEach(link => {
                    link.classList.remove('text-accent-neon', 'border-b-2', 'border-accent-neon', 'dark:border-accent-red');
                    link.classList.add('hover:text-accent-neon'); // Kembalikan efek hover default
                });

                // Tambahkan kelas aktif pada link yang sesuai
                const activeId = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        // Gaya aktif yang sporty dan futuristik
                        link.classList.add('text-accent-neon', 'border-b-2', 'border-accent-neon', 'dark:border-accent-red');
                        link.classList.remove('hover:text-accent-neon');
                    }
                });
            }
        });
    }, observerOptions);

    // Amati setiap section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
    // Tambahkan observasi untuk Hero Section (#hero) jika belum termasuk dalam 'section'
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        sectionObserver.observe(heroSection);
    }
});
