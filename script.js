document.addEventListener('DOMContentLoaded', () => {

    /* ========================================= */
    /* 1. SETUP WHATSAPP LINK HANDLER */
    /* ========================================= */
    const waLinks = document.querySelectorAll('.cta-whatsapp-link');
    const phoneNumber = '6281234567890'; // GANTI DENGAN NOMOR WHATSAPP ANDA

    waLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const product = link.getAttribute('data-product') || 'Informasi Umum';
            const message = `Halo Concerto Audio, saya tertarik dengan layanan/paket: *${product}*. Bisakah saya mendapatkan info lebih lanjut? (Ditemukan dari website)`;
            const encodedMessage = encodeURIComponent(message);
            
            // Logika untuk mendeteksi perangkat dan menggunakan link yang tepat
            let waURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                waURL = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
            }

            window.open(waURL, '_blank');
        });
    });


    /* ========================================= */
    /* 2. DARK MODE TOGGLE */
    /* ========================================= */

    const html = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const themeIcons = [document.getElementById('theme-icon'), document.getElementById('theme-icon-mobile')];

    // Fungsi untuk mengatur tema berdasarkan state
    function applyTheme(isDark) {
        if (isDark) {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            themeIcons.forEach(icon => {
                if(icon) {
                    icon.classList.remove('fa-sun');
                    icon.classList.add('fa-moon');
                }
            });
        } else {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            themeIcons.forEach(icon => {
                if(icon) {
                    icon.classList.remove('fa-moon');
                    icon.classList.add('fa-sun');
                }
            });
        }
    }

    // Cek tema saat load: Jika ada di localStorage, gunakan itu. Jika tidak, cek preferensi sistem.
    const storedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (storedTheme) {
        applyTheme(storedTheme === 'dark');
    } else {
        applyTheme(prefersDark); // Gunakan preferensi sistem sebagai default
    }

    // Listener untuk toggle
    const toggleTheme = () => {
        const isDark = html.classList.contains('dark');
        applyTheme(!isDark);
    };

    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);


    /* ========================================= */
    /* 3. HAMBURGER MENU */
    /* ========================================= */
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    if (menuButton) {
        menuButton.addEventListener('click', () => {
            const isMenuOpen = mobileMenu.classList.contains('menu-open');

            if (isMenuOpen) {
                // Tutup Menu
                mobileMenu.classList.remove('menu-open');
                mobileMenu.classList.remove('translate-y-0');
                mobileMenu.classList.add('-translate-y-full', 'hidden'); // Tambah hidden agar tidak menimpa konten
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflowY = 'auto'; // Buka scroll body
            } else {
                // Buka Menu
                mobileMenu.classList.add('menu-open');
                mobileMenu.classList.remove('-translate-y-full', 'hidden');
                mobileMenu.classList.add('translate-y-0');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
                // document.body.style.overflowY = 'hidden'; // Kunci scroll body
            }
        });
    }

    // Tutup menu saat link diklik (agar responsif)
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuButton) menuButton.click();
        });
    });


    /* ========================================= */
    /* 4. SCROLL-TO-TOP BUTTON (UP BUTTON) */
    /* ========================================= */
    const backToTopButton = document.getElementById('back-to-top');

    // Tampilkan/Sembunyikan tombol
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Tampilkan setelah scroll 300px
            backToTopButton.classList.remove('invisible', 'opacity-0');
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.remove('opacity-100');
            backToTopButton.classList.add('invisible', 'opacity-0');
        }
    });

    // Fungsi scroll ke atas
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ========================================= */
    /* 5. NAVBAR SCROLL EFFECT (Optional) */
    /* ========================================= */
    const nav = document.getElementById('navbar');
    const originalHeightClass = 'h-20';
    const scrolledHeightClass = 'h-16';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            nav.classList.remove(originalHeightClass);
            nav.classList.add(scrolledHeightClass);
        } else {
            nav.classList.remove(scrolledHeightClass);
            nav.classList.add(originalHeightClass);
        }
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

                // Tutup semua item FAQ yang terbuka (opsional, tapi disarankan)
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
                    icon.classList.add('rotate-45');
                } else {
                    content.classList.add('hidden');
                    icon.classList.remove('rotate-45');
                }
            });
        }
    });
