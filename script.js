document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // 1. TOGGLE MOBILE MENU & DARK MODE
    // =========================================================

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

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
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });

    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    function toggleTheme() {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);


    // =========================================================
    // 2. FUNGSI WHATSAPP CTA LINK GENERATOR
    // =========================================================

    const whatsappNumber = "6281234567890"; // GANTI DENGAN NOMOR ANDA YANG BENAR!
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');

    ctaLinks.forEach(link => {
        const productInfo = link.getAttribute('data-product') || 'Halaman Utama';

        let message = `Halo Concerto Audio, saya tertarik dengan layanan *${productInfo}*.\n\n`;
        
        if (productInfo.includes('Diagnosa Audio Gratis')) {
            message += "Saya ingin mengklaim Diagnosa Audio Gratis untuk mobil saya. Mohon infonya mengenai jadwal dan persyaratannya. Terima kasih.";
        } else if (productInfo.includes('Base Stage')) {
            message += "Saya ingin bertanya lebih lanjut tentang Paket Instalasi *Base Stage* (SQ.01). Apakah paket ini tersedia untuk mobil [Sebutkan Tipe Mobil]?";
        } else if (productInfo.includes('Premium Stage')) {
            message += "Saya tertarik dengan Paket Instalasi *Premium Stage* (SQ.02). Bisakah Anda mengirimkan daftar komponen dan estimasi biayanya untuk mobil [Sebutkan Tipe Mobil]?";
        } else if (productInfo.includes('Full Treatment')) {
            message += "Saya ingin konsultasi mengenai Paket Instalasi *Full Treatment* (SQ.03). Mohon dibantu detail lengkap paket ini.";
        } else {
             message += "Saya ingin berkonsultasi mengenai upgrade audio mobil. Mohon informasinya lebih lanjut. Terima kasih.";
        }

        const encodedMessage = encodeURIComponent(message);
        link.setAttribute('href', `https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
    });


    // =========================================================
    // 3. LOGIKA UNTUK ACCORDION FAQ
    // =========================================================

    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const button = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = button.querySelector('i');

        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out';
        content.classList.remove('hidden'); 

        button.addEventListener('click', () => {
            const isExpanded = icon.classList.contains('fa-xmark');
            
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherIcon = otherItem.querySelector('.faq-toggle i');
                    
                    otherContent.style.maxHeight = '0';
                    otherContent.style.paddingTop = '0';
                    otherContent.style.paddingBottom = '0';
                    otherIcon.classList.remove('fa-xmark');
                    otherIcon.classList.add('fa-plus');
                }
            });

            if (isExpanded) {
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-plus');
            } else {
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; // + padding
                content.style.paddingTop = '1.25rem'; 
                content.style.paddingBottom = '1.25rem';
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-xmark');
            }
        });
    });


    // =========================================================
    // 4. FUNGSI SCROLL TO TOP (BUTTON UP) - PERBAIKAN
    // =========================================================

    const scrollToTopButton = document.getElementById('scroll-to-top');
    const scrollThreshold = 300; 

    // 4a. Menangani kemunculan/penghilangan tombol saat scrolling
    window.addEventListener('scroll', () => {
        // Menggunakan window.scrollY untuk mendapatkan posisi scroll
        if (window.scrollY > scrollThreshold) {
            // Tampilkan tombol
            scrollToTopButton.classList.remove('invisible', 'opacity-0');
            scrollToTopButton.classList.add('visible', 'opacity-100');
        } else {
            // Sembunyikan tombol
            scrollToTopButton.classList.remove('visible', 'opacity-100');
            scrollToTopButton.classList.add('invisible', 'opacity-0');
        }
    });

    // 4b. Menangani fungsi scroll ke atas saat tombol diklik
    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Gulir halus
        });
    });
});
