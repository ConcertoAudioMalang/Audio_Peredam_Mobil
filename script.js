document.addEventListener('DOMContentLoaded', () => {
   // ------------------------------------------
// 1. DARK MODE TOGGLE & PERSISTENCE
// ------------------------------------------
// Menggunakan querySelectorAll karena sekarang ada dua tombol dengan ID 'theme-toggle'
const themeToggles = document.querySelectorAll('#theme-toggle');
const html = document.documentElement;

// Load saved preference
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
} else {
    html.classList.remove('dark');
}

// Toggle logic function
function toggleTheme() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Attach event listener to all toggle buttons
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
});

    // ------------------------------------------
    // 2. MOBILE MENU TOGGLE
    // ------------------------------------------
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        // Close menu on link click (for smooth navigation)
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // ------------------------------------------
    // 3. FAQ ACCORDION
    // ------------------------------------------
    const faqToggles = document.querySelectorAll('.faq-toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            // Close all other open FAQs
            document.querySelectorAll('.faq-toggle[aria-expanded="true"]').forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.classList.add('hidden');
                    otherToggle.querySelector('i').classList.remove('rotate-45');
                }
            });

            // Toggle current FAQ
            if (isExpanded) {
                content.classList.add('hidden');
                icon.classList.remove('rotate-45');
                toggle.setAttribute('aria-expanded', 'false');
            } else {
                content.classList.remove('hidden');
                icon.classList.add('rotate-45');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });
    });

    // ------------------------------------------
    // 4. SCROLL-TO-TOP BUTTON
    // ------------------------------------------
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.remove('invisible', 'opacity-0');
            scrollToTopBtn.classList.add('visible', 'opacity-100');
        } else {
            scrollToTopBtn.classList.remove('visible', 'opacity-100');
            scrollToTopBtn.classList.add('invisible', 'opacity-0');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });


    // ------------------------------------------
    // 5. WHATSAPP DYNAMIC LINK GENERATOR
    // ------------------------------------------
    const whatsappLinks = document.querySelectorAll('.cta-whatsapp-link');
    const whatsappNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda

    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const product = link.getAttribute('data-product') || 'Konsultasi Umum';
            
            // Pesan yang sudah diformat
            const message = `Halo Concerto Audio Malang! Saya tertarik dengan layanan Anda. Saya ingin konsultasi/bertanya tentang: *${product}*. Mohon informasinya. Terima kasih.`;
            
            // Encode pesan untuk URL
            const encodedMessage = encodeURIComponent(message);
            
            // Generate link
            const finalLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Redirect
            window.open(finalLink, '_blank');
        });
    });

});

// Inisialisasi AOS (Animate On Scroll)
AOS.init({
    once: true, // Animasi hanya berjalan sekali
    duration: 1000,
});

