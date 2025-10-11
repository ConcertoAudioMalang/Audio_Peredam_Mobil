document.addEventListener('DOMContentLoaded', () => {

    /* ========================================= */
    /* 1. CONFIGURATION (PENTING!) */
    /* ========================================= */
    const phoneNumber = '6281234567890'; // GANTI dengan NOMOR WHATSAPP Anda
    const waBaseUrl = `https://wa.me/${phoneNumber}?text=`;

    /* ========================================= */
    /* 2. DARK MODE TOGGLE */
    /* ========================================= */
    
    // Setup fungsi untuk update ikon dan class 'dark' di <html>
    const setupThemeToggle = (buttonId, iconId) => {
        const toggleButton = document.getElementById(buttonId);
        const toggleIcon = document.getElementById(iconId);
        
        if (!toggleButton || !toggleIcon) return;

        const updateIcon = (isDark) => {
            if (isDark) {
                // Tema Gelap: Icon Matahari (untuk mengundang user pindah ke terang)
                toggleIcon.classList.remove('fa-moon');
                toggleIcon.classList.add('fa-sun'); 
            } else {
                // Tema Terang: Icon Bulan (untuk mengundang user pindah ke gelap)
                toggleIcon.classList.remove('fa-sun');
                toggleIcon.classList.add('fa-moon');
            }
        };

        // Memuat tema saat loading
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        let initialIsDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
        
        if (initialIsDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateIcon(document.documentElement.classList.contains('dark'));

        // Event listener saat tombol diklik
        toggleButton.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateIcon(isDark);
        });
    };

    // Terapkan toggle ke tombol desktop dan mobile
    setupThemeToggle('theme-toggle', 'theme-icon'); 
    setupThemeToggle('theme-toggle-mobile', 'theme-icon-mobile'); 

    /* ========================================= */
    /* 3. HAMBURGER MENU LOGIC */
    /* ========================================= */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (menuToggle && mobileMenu && menuIcon) {
        menuToggle.addEventListener('click', () => {
            // Mengganti posisi menu
            const isClosing = mobileMenu.classList.toggle('-translate-y-full'); 
            mobileMenu.classList.toggle('translate-y-0');
            
            // Logika Perbaikan: Jika menu TERBUKA (translate-y-0 ada), tampilkan ikon 'X'
            if (mobileMenu.classList.contains('translate-y-0')) { 
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                // Jika menu TERTUTUP (-translate-y-full), tampilkan ikon 'Bars'
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Tutup menu saat link diklik (di mobile)
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                // Tutup menu
                mobileMenu.classList.remove('translate-y-0');
                mobileMenu.classList.add('-translate-y-full');
                // Kembalikan ikon
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    /* ========================================= */
    /* 4. SMOOTH SCROLL FOR NAV LINKS */
    /* ========================================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            // Pastikan elemen target ada sebelum melakukan scroll
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ========================================= */
    /* 5. NAVBAR SCROLL (SLIGHTLY HIDE/SHOW) */
    /* ========================================= */
    const navbar = document.getElementById('navbar');
    const scrollThreshold = 100; // Mulai menghilang setelah 100px

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Logika: Menyembunyikan navbar setelah scroll melebihi ambang batas
            if (window.scrollY > scrollThreshold) {
                navbar.classList.add('opacity-0', 'invisible'); 
            } else {
                navbar.classList.remove('opacity-0', 'invisible');
            }
        });
    }
    
    /* ========================================= */
    /* 6. CTA WHATSAPP HANDLER */
    /* ========================================= */
    document.querySelectorAll('.cta-whatsapp-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const product = link.getAttribute('data-product') || 'Informasi umum';
            const message = `Halo Concerto Audio Malang, saya tertarik dengan: *${product}*. Mohon informasinya lebih lanjut. Terima kasih!`;
            window.open(waBaseUrl + encodeURIComponent(message), '_blank');
        });
    });

    /* ========================================= */
    /* 7. FAQ ACCORDION LOGIC */
    /* ========================================= */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggleButton = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.fa-plus'); // Asumsi ikon adalah 'fa-plus'
        
        if (toggleButton && content && icon) {
            toggleButton.addEventListener('click', () => {
                const isHidden = content.classList.contains('hidden');

                // Tutup semua item FAQ yang terbuka (untuk efek accordion)
                faqItems.forEach(i => {
                    const c = i.querySelector('.faq-content');
                    const ic = i.querySelector('.fa-plus');
                    if (c && ic && c !== content && !c.classList.contains('hidden')) {
                        c.classList.add('hidden');
                        ic.classList.remove('rotate-45');
                    }
                });

                // Buka/Tutup item yang diklik
                if (isHidden) {
                    content.classList.remove('hidden');
                    icon.classList.add('rotate-45'); 
                } else {
                    content.classList.add('hidden');
                    icon.classList.remove('rotate-45');
                }
            });
        }
    });

    /* ========================================= */
    /* 8. AOS (Animate On Scroll) INITIALIZATION */
    /* ========================================= */
    // Pastikan Anda telah menyertakan library AOS.js
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-in-out'
        });
    }
});
