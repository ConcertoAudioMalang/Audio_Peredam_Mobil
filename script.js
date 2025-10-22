document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEKLARASI VARIABEL UTAMA (DIPERBAIKI)
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');

    // LAKUKAN PENGECEKAN KEBERADAAN NAVBAR
    if (!navbar) {
        console.error("Elemen #navbar tidak ditemukan. Pastikan ID sudah benar di index.html.");
        return; 
    }

    // Variabel ini harus dideklarasikan di sini, SETELAH 'navbar' dipastikan ada.
    const allNavbarIconWrappers = navbar.querySelectorAll('#theme-toggle, #mobile-menu-button'); 
    
    // Variabel lain
    const themeToggles = document.querySelectorAll('#theme-toggle');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');

    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;
    
    // Ambil elemen navigasi desktop (Menggunakan selector yang aman)
    const desktopLinks = document.querySelector('.hidden.lg\\:flex');


    // ==========================================
    // 1. DARK MODE TOGGLE & PERSISTENCE
    // ==========================================
    // ... (Logika Dark Mode tetap) ...
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
        handleScroll();
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ... (Logika Mobile Menu tetap) ...
    if (mobileMenuButton && mobileMenu && menuIcon) {
        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.toggle('hidden');
            if (isHidden) {
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            } else {
                menuIcon.classList.replace('fa-bars', 'fa-xmark');
            }
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.replace('fa-xmark', 'fa-bars');
            });
        });
    }

    // ==========================================
    // 3. NAVBAR SCROLL LOGIC
    // ==========================================

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Kelas untuk perubahan visual navbar
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        
        // Kelas untuk teks navigasi desktop
        const desktopActiveTextColorClasses = ['text-gray-700', 'dark:text-gray-300'];
        const desktopTransparentTextColorClasses = ['text-text-light', 'dark:text-text-light'];
        
        // Kelas untuk ikon (Tombol Mode & Mobile Menu)
        const iconActiveTextColorClasses = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        const iconTransparentTextColorClasses = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10']; 

        // --- 3.1 Transparansi dan Perubahan Warna ---
        if (currentScrollY > scrollThreshold) {
            // Navbar muncul latar belakang buram
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // Teks Navigasi dan Ikon menjadi warna gelap/default
            if (desktopLinks) {
                desktopLinks.classList.remove(...desktopTransparentTextColorClasses);
                desktopLinks.classList.add(...desktopActiveTextColorClasses);
            }
            
            // Perlu dicek, karena jika navbar tidak ditemukan, allNavbarIconWrappers juga tidak akan ada
            if (allNavbarIconWrappers) {
                allNavbarIconWrappers.forEach(button => {
                    button.classList.remove(...iconTransparentTextColorClasses);
                    button.classList.add(...iconActiveTextColorClasses);
                });
            }

        } else {
            // Navbar transparan
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // Teks Navigasi dan Ikon menjadi warna terang
            if (desktopLinks) {
                desktopLinks.classList.remove(...desktopActiveTextColorClasses);
                desktopLinks.classList.add(...desktopTransparentTextColorClasses);
            }
            
            if (allNavbarIconWrappers) {
                allNavbarIconWrappers.forEach(button => {
                    button.classList.remove(...iconActiveTextColorClasses);
                    button.classList.add(...iconTransparentTextColorClasses);
                });
            }
        }
        
        // --- 3.2 Sembunyi Saat Scroll ke Bawah ---
        if (currentScrollY > lastScrollY && currentScrollY > 200) { 
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 4. FAQ ACCORDION
    // ... (Logika FAQ tetap) ...

   // ==========================================
    // 5. SCROLL-TO-TOP BUTTON (LOGIKA DIPERBAIKI)
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            // Logika diperbaiki: Tampilkan tombol HANYA jika scroll Y melebihi 300px (scroll ke bawah)
            if (window.scrollY > 300) { 
                // Saat scroll ke bawah, tampilkan tombol
                scrollToTopBtn.classList.remove('invisible', 'opacity-0');
                scrollToTopBtn.classList.add('visible', 'opacity-100');
            } else {
                // Saat kembali ke atas (di dekat bagian atas halaman), sembunyikan tombol
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
    // 6. WHATSAPP DYNAMIC LINK GENERATOR
    // ... (Logika WhatsApp tetap) ...

});

// Inisialisasi AOS (Di luar DOMContentLoaded)
AOS.init({
    once: true,
    duration: 1000,
});

// PASTIKAN ANDA MENGGANTI INI DENGAN KODE INISIALISASI SWIPER YANG SUDAH ADA
var swiper = new Swiper(".mySwiper", {
    // ------------------------------------
    // PENGATURAN TINGGI AGAR SEMUA SAMA
    // ------------------------------------
    
    // Matikan autoHeight agar Swiper tidak menyesuaikan tinggi slide 
    // berdasarkan konten terpendek (ini penyebab utama kolom beda tinggi).
    autoHeight: false, 

    // Opsi ini sangat membantu memastikan tinggi wrapper menyesuaikan slide tertinggi.
    setWrapperSize: true, 

    // ------------------------------------
    // PENGATURAN RESPONSIVE (SLIDES PER VIEW)
    // ------------------------------------
    
    // Default untuk mobile
    slidesPerView: 1, 
    spaceBetween: 24,

    breakpoints: {
        // Tablet (>= 768px)
        768: {
            slidesPerView: 2,
            spaceBetween: 30
        },
        // Desktop (>= 1024px)
        1024: {
            slidesPerView: 3, // Tampilkan 3 kolom untuk tampilan besar
            spaceBetween: 30
        }
    },
    
    // ------------------------------------
    // NAVIGASI DAN PAGINASI
    // ------------------------------------
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    
    // Tambahkan opsi lain jika ada, misalnya loop, effect, dll.
});

