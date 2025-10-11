document.addEventListener('DOMContentLoaded', function() {

    // =========================================================
    // 1. TOGGLE MOBILE MENU & DARK MODE
    // =========================================================

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        // Mengubah ikon hamburger
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });
    
    // Sembunyikan menu mobile saat link di dalamnya diklik (untuk smooth scrolling)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });


    // Inisialisasi Dark Mode
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');

    // Cek preferensi user atau simpanan local storage
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

    // Nomor WhatsApp tujuan
    const whatsappNumber = "6281234567890"; // GANTI DENGAN NOMOR ANDA YANG BENAR!

    // Handler untuk semua elemen dengan class 'cta-whatsapp-link'
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');

    ctaLinks.forEach(link => {
        // Ambil data-product/data-tracking untuk membuat pesan kustom
        const productInfo = link.getAttribute('data-product') || 'Halaman Utama';

        let message = `Halo Concerto Audio, saya tertarik dengan layanan *${productInfo}*.\n\n`;
        
        // Pesan khusus berdasarkan jenis CTA
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

        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(message);

        // Set atribut href
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

        // Mengatur status awal (semua tertutup)
        content.style.maxHeight = '0';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-in-out, padding 0.3s ease-in-out';
        content.classList.remove('hidden'); // Hilangkan hidden untuk mengaktifkan transisi

        button.addEventListener('click', () => {
            const isExpanded = icon.classList.contains('fa-xmark');
            
            // Tutup semua item FAQ lainnya
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

            // Buka atau tutup item yang diklik
            if (isExpanded) {
                // Tutup
                content.style.maxHeight = '0';
                content.style.paddingTop = '0';
                content.style.paddingBottom = '0';
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-plus');
            } else {
                // Buka
                // Atur max-height ke scrollHeight untuk konten + padding (p-5 = 1.25rem * 2 = 2.5rem/40px)
                content.style.maxHeight = content.scrollHeight + 40 + 'px'; 
                content.style.paddingTop = '1.25rem'; // p-5
                content.style.paddingBottom = '1.25rem'; // p-5
                icon.classList.remove('fa-plus');
                icon.classList.add('fa-xmark');

                // Opsional: reset max-height setelah transisi untuk konten yang dinamis
                content.addEventListener('transitionend', function handler() {
                    if (!isExpanded) {
                        content.style.maxHeight = 'none';
                    }
                    content.removeEventListener('transitionend', handler);
                });
            }
        });
    });

});

 // =========================================================
    // 4. FUNGSI SCROLL TO TOP (BUTTON UP)
    // =========================================================

    const scrollToTopButton = document.getElementById('scroll-to-top');
    const scrollThreshold = 300; // Tombol akan muncul setelah scroll 300px

    // Menangani kemunculan/penghilangan tombol
    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            scrollToTopButton.classList.remove('invisible', 'opacity-0');
            scrollToTopButton.classList.add('visible', 'opacity-100');
        } else {
            scrollToTopButton.classList.remove('visible', 'opacity-100');
            scrollToTopButton.classList.add('invisible', 'opacity-0');
        }
    });

    // Fungsi gulir halus (Smooth scroll)
    // Fungsi ini dipanggil melalui atribut onclick="scrollToTop()" di HTML
    window.scrollToTop = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
