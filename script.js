document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEKLARASI VARIABEL UTAMA (DIRAPIKAN)
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    
    // --- Pengecekan Kritis ---
    if (!navbar) {
        console.error("Elemen #navbar tidak ditemukan. Pastikan ID sudah benar.");
        return; 
    }
    
    // --- Deklarasi Variabel yang Digunakan ---
    const themeToggles = document.querySelectorAll('#theme-toggle'); // Menggunakan querySelectorAll agar berfungsi di desktop/mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const desktopLinks = navbar.querySelector('.hidden.lg\\:flex'); // Mengambil dari dalam navbar
    const allNavbarIconWrappers = navbar.querySelectorAll('#theme-toggle, #mobile-menu-button');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;
    const hideThreshold = 200; // Menggunakan variabel untuk batas sembunyikan/tampilkan navbar

    // ==========================================
    // 1. DARK MODE TOGGLE & PERSISTENCE
    // ==========================================
    
    // Initial check (sudah benar dan rapi)
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    function toggleTheme() {
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
        // Panggil handleScroll agar tampilan navbar/icon segera menyesuaikan tema baru
        handleScroll(); 
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            if (isHidden) {
                // Menu disembunyikan
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                // Menu ditampilkan
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Tutup menu setelah link diklik
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ==========================================
    // 3. NAVBAR SCROLL LOGIC
    // ==========================================

    function updateNavbarAppearance(isScrolled) {
        // Kelas untuk latar belakang dan border
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        
        // Kelas untuk teks navigasi desktop
        const textNormal = ['text-gray-700', 'dark:text-gray-300'];
        const textTransparent = ['text-text-light', 'dark:text-text-light'];
        
        // Kelas untuk ikon (Theme Toggle & Mobile Menu)
        const iconNormal = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        const iconTransparent = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10'];

        if (isScrolled) {
            // Navbar: Aktif (Buram, Warna)
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // Teks Navigasi: Warna Normal
            if (desktopLinks) {
                desktopLinks.classList.remove(...textTransparent);
                desktopLinks.classList.add(...textNormal);
            }
            
            // Ikon: Warna Normal
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconTransparent);
                button.classList.add(...iconNormal);
            });
        } else {
            // Navbar: Transparan
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // Teks Navigasi: Warna Transparan (Terang)
            if (desktopLinks) {
                desktopLinks.classList.remove(...textNormal);
                desktopLinks.classList.add(...textTransparent);
            }
            
            // Ikon: Warna Transparan (Terang)
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconNormal);
                button.classList.add(...iconTransparent);
            });
        }
    }


    function handleScroll() {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > scrollThreshold;
        
        // --- 3.1 Transparansi dan Perubahan Warna ---
        updateNavbarAppearance(isScrolled);
        
        // --- 3.2 Sembunyi Saat Scroll ke Bawah ---
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) { 
            // Scroll ke Bawah, Sembunyikan Navbar
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY || currentScrollY < hideThreshold) {
            // Scroll ke Atas atau Sudah Dekat Puncak, Tampilkan Navbar
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    // Panggil sekali untuk memastikan tampilan navbar sesuai saat halaman dimuat
    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 4. FAQ ACCORDION (Logika tidak ditampilkan, diasumsikan sudah benar)
    // ==========================================

    // ==========================================
    // 5. SCROLL-TO-TOP BUTTON
    // ==========================================
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            const isVisible = window.scrollY > 300;
            scrollToTopBtn.classList.toggle('invisible', !isVisible);
            scrollToTopBtn.classList.toggle('opacity-0', !isVisible);
            scrollToTopBtn.classList.toggle('visible', isVisible);
            scrollToTopBtn.classList.toggle('opacity-100', isVisible);
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 6. WHATSAPP DYNAMIC LINK GENERATOR (Logika tidak ditampilkan, diasumsikan sudah benar)
    // ==========================================

});

// ==========================================
// INISIALISASI DI LUAR DOMContentLoaded
// ==========================================

// Inisialisasi AOS (Sudah benar di luar DOMContentLoaded)
AOS.init({
    once: true,
    duration: 1000,
});

// ==========================================
// INI ADALAH KONFIGURASI SWIPER JS (WAJIB DIBIARKAN DI LUAR DOMContentLoaded JIKA MEMANG BEGITU CARA ANDA MENULISNYA)
// ==========================================
var swiper = new Swiper(".mySwiper", {
    // ------------------------------------
    // PENGATURAN TINGGI AGAR SEMUA SAMA (Sudah benar)
    // ------------------------------------
    autoHeight: false, 
    setWrapperSize: true, 

    // ------------------------------------
    // PENGATURAN RESPONSIVE (Sudah benar)
    // ------------------------------------
    slidesPerView: 1, 
    spaceBetween: 24,

    breakpoints: {
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 3, 
            spaceBetween: 30
        }
    },
    
    // ------------------------------------
    // NAVIGASI DAN PAGINASI (Sudah benar)
    // ------------------------------------
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});
