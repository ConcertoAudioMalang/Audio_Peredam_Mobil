// ===================================
// script.js: Interactivity for CONCERTO
// ===================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Ganti icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            }
        });
        
        // Tutup menu mobile saat link diklik (untuk navigasi)
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
                mobileMenuButton.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 2. Scroll-to-Top Button Visibility
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


    // 3. FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');

        toggle.addEventListener('click', () => {
            // Tutup semua item FAQ yang sedang terbuka, kecuali yang sedang diklik
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

            // Buka/tutup item yang sedang diklik
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true' || false;
            
            content.classList.toggle('hidden');
            toggle.setAttribute('aria-expanded', !isExpanded);
            
            icon.classList.toggle('fa-plus');
            icon.classList.toggle('fa-minus');
        });
    });

    // 4. WhatsApp CTA Link Handler (Penting untuk Tracking Produk/Layanan)
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');
    const baseWAURL = "https://wa.me/6281217398558"; 
    const defaultText = "Halo Concerto, saya tertarik dengan layanan audio mobil SQ. Bisa dibantu konsultasi?";

    ctaLinks.forEach(link => {
        const product = link.getAttribute('data-product');
        let message = defaultText;

        if (product) {
            // Encode message sesuai data-product
            message = `Halo Concerto, saya melihat penawaran Anda dan tertarik dengan: *${product}*. Mohon info lebih lanjut.`;
        }

        // Encode URI Component untuk URL
        const fullURL = `${baseWAURL}?text=${encodeURIComponent(message)}`;
        
        // Set href untuk link yang sesuai
        link.setAttribute('href', fullURL);
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

});
