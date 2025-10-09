document.addEventListener('DOMContentLoaded', function () {
    // ----------------------------------------------------
    // 1. Mobile Menu Toggle
    // ----------------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', function () {
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

    // Close mobile menu when a link is clicked
    const mobileLinks = mobileMenu.querySelectorAll('a[href^="#"]');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });


    // ----------------------------------------------------
    // 2. Dark Mode Toggle
    // ----------------------------------------------------
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    const html = document.documentElement;
    const modeIcon = document.getElementById('mode-icon');

    // Function to set the mode
    function setDarkMode(isDark) {
        if (isDark) {
            html.classList.add('dark');
            if (modeIcon) {
                 modeIcon.classList.remove('fa-moon');
                 modeIcon.classList.add('fa-sun');
            }
        } else {
            html.classList.remove('dark');
            if (modeIcon) {
                modeIcon.classList.remove('fa-sun');
                modeIcon.classList.add('fa-moon');
            }
        }
    }

    // Check saved preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    // Toggle event listener
    function toggleDarkMode() {
        if (html.classList.contains('dark')) {
            localStorage.theme = 'light';
            setDarkMode(false);
        } else {
            localStorage.theme = 'dark';
            setDarkMode(true);
        }
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
    if (darkModeToggleMobile) {
        darkModeToggleMobile.addEventListener('click', toggleDarkMode);
    }

    // ----------------------------------------------------
    // 3. Scroll-to-Top Button Visibility
    // ----------------------------------------------------
    const scrollToTopButton = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            scrollToTopButton.classList.remove('opacity-0', 'pointer-events-none');
        } else {
            scrollToTopButton.classList.add('opacity-0', 'pointer-events-none');
        }
    });

    if (scrollToTopButton) {
        scrollToTopButton.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // 4. FAQ Accordion Logic
    // ----------------------------------------------------
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
            
            // Close all other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherToggle = otherItem.querySelector('.faq-toggle');
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-icon');
                    
                    if (otherToggle.getAttribute('aria-expanded') === 'true') {
                        otherToggle.setAttribute('aria-expanded', 'false');
                        otherContent.classList.add('hidden');
                        otherIcon.classList.remove('fa-minus');
                        otherIcon.classList.add('fa-plus');
                    }
                }
            });

            // Toggle current item
            toggle.setAttribute('aria-expanded', !isExpanded);
            content.classList.toggle('hidden');
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });

    // ----------------------------------------------------
    // 5. Dynamic WhatsApp CTA Link
    // ----------------------------------------------------
    const whatsappLinks = document.querySelectorAll('.cta-whatsapp-link');
    const phoneNumber = '6281217398558'; // Ganti dengan nomor WhatsApp Anda

    whatsappLinks.forEach(link => {
        const product = link.getAttribute('data-product') || 'Informasi Umum';
        const message = encodeURIComponent(`Halo Concerto Audio Malang, saya tertarik dengan layanan/produk Anda (${product}). Bisa bantu saya mendapatkan informasi lebih lanjut?`);
        link.href = `https://wa.me/${phoneNumber}?text=${message}`;
    });

});
