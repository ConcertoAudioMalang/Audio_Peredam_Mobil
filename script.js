document.addEventListener('DOMContentLoaded', () => {
const allNavbarIconWrappers = navbar.querySelectorAll('#theme-toggle, #mobile-menu-button');    
    
    // ==========================================
    // DEKLARASI VARIABEL UTAMA
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    const themeToggles = document.querySelectorAll('#theme-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon'); // Tambahkan ID ini di HTML mobile button
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50; // Jarak scroll untuk ganti warna navbar
    
    // Ambil elemen navigasi desktop dan ikon untuk manipulasi warna dinamis
    const desktopLinks = document.querySelector('.hidden.lg\\:flex');
    const allNavbarIcons = navbar.querySelectorAll('button i');


    // ==========================================
    // 1. DARK MODE TOGGLE & PERSISTENCE
    // ==========================================
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
        // PENTING: Panggil handleScroll setelah mode berubah agar warna navbar diperbarui
        handleScroll();
    }

    // Attach event listener to all toggle buttons
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            // Mengganti ikon
            if (isHidden) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        });

        // Close menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ==========================================
    // 3. NAVBAR SCROLL LOGIC (TRANSPARENT, HIDE, COLOR CHANGE)
    // ==========================================

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // ... (kelas activeClasses dan TextColorClasses tetap) ...
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        const desktopActiveTextColorClasses = ['text-gray-700', 'dark:text-gray-300'];
        const desktopTransparentTextColorClasses = ['text-text-light', 'dark:text-text-light'];
        
        // Kelas untuk warna ikon saat navbar aktif/buram
        const iconActiveTextColorClasses = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        // Kelas untuk warna ikon saat navbar transparan
        const iconTransparentTextColorClasses = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10']; 

        // --- 3.1 Transparansi dan Perubahan Warna ---
        if (currentScrollY > scrollThreshold) {
            // Navbar muncul latar belakang buram
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // Teks Navigasi menjadi gelap
            if (desktopLinks) {
                desktopLinks.classList.remove(...desktopTransparentTextColorClasses);
                desktopLinks.classList.add(...desktopActiveTextColorClasses);
            }
            
            // Ikon menjadi warna gelap (dan ubah hover background)
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconTransparentTextColorClasses);
                button.classList.add(...iconActiveTextColorClasses);
            });


        } else {
            // Navbar transparan
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // Teks Navigasi menjadi terang
            if (desktopLinks) {
                desktopLinks.classList.remove(...desktopActiveTextColorClasses);
                desktopLinks.classList.add(...desktopTransparentTextColorClasses);
            }
            
            // Ikon menjadi warna terang (dan ubah hover background)
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconActiveTextColorClasses);
                button.classList.add(...iconTransparentTextColorClasses);
            });
        }
        
        // ... (Logika Sembunyi Saat Scroll ke Bawah tetap) ...

        if (currentScrollY > lastScrollY && currentScrollY > 200) { 
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    // Setel status awal dan tambahkan listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // ==========================================
    // 4. FAQ ACCORDION (Logika Dibiarkan Sama)
    // ==========================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    // ... (Logika FAQ Anda tetap di sini) ...
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const content = toggle.nextElementSibling;
            const icon = toggle.querySelector('i');
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

            document.querySelectorAll('.faq-toggle[aria-expanded="true"]').forEach(otherToggle => {
                if (otherToggle !== toggle) {
                    otherToggle.setAttribute('aria-expanded', 'false');
                    otherToggle.nextElementSibling.classList.add('hidden');
                    otherToggle.querySelector('i').classList.remove('rotate-45');
                }
            });

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

    // ==========================================
    // 5. SCROLL-TO-TOP BUTTON (Logika Dibiarkan Sama)
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
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
    }


    // ==========================================
    // 6. WHATSAPP DYNAMIC LINK GENERATOR (Logika Dibiarkan Sama)
    // ==========================================
    const whatsappLinks = document.querySelectorAll('.cta-whatsapp-link');
    const whatsappNumber = '6281234567890'; 

    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const product = link.getAttribute('data-product') || 'Konsultasi Umum';
            const message = `Halo Concerto Audio Malang! Saya tertarik dengan layanan Anda. Saya ingin konsultasi/bertanya tentang: *${product}*. Mohon informasinya. Terima kasih.`;
            const encodedMessage = encodeURIComponent(message);
            const finalLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            window.open(finalLink, '_blank');
        });
    });

});

// Inisialisasi AOS (Di luar DOMContentLoaded)
AOS.init({
    once: true,
    duration: 1000,
});

