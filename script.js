document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEKLARASI VARIABEL UTAMA (DIPERBAIKI)
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar'); // Harus dideklarasikan duluan

    // LAKUKAN PENGECEKAN KEBERADAAN NAVBAR, KARENA SELEKTOR LAIN MENGGUNAKAN INI
    if (!navbar) {
        console.error("Elemen #navbar tidak ditemukan. Pastikan ID sudah benar di index.html.");
        return; // Hentikan eksekusi jika navbar tidak ada
    }

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
    // Load saved preference (Logika sudah benar)
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

    // Attach event listener
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // ==========================================
    // 2. MOBILE MENU TOGGLE (Logika sudah benar)
    // ==========================================
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
    // 3. NAVBAR SCROLL LOGIC (TRANSPARENT, HIDE, COLOR CHANGE)
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
            
            allNavbarIconWrappers.forEach(button => {
                // Hapus kelas warna transparan pada wrapper tombol
                button.classList.remove(...iconTransparentTextColorClasses);
                // Tambahkan kelas warna aktif pada wrapper tombol
                button.classList.add(...iconActiveTextColorClasses);
            });

        } else {
            // Navbar transparan
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // Teks Navigasi dan Ikon menjadi warna terang
            if (desktopLinks) {
                desktopLinks.classList.remove(...desktopActiveTextColorClasses);
                desktopLinks.classList.add(...desktopTransparentTextColorClasses);
            }
            
            allNavbarIconWrappers.forEach(button => {
                // Hapus kelas warna aktif pada wrapper tombol
                button.classList.remove(...iconActiveTextColorClasses);
                // Tambahkan kelas warna transparan pada wrapper tombol
                button.classList.add(...iconTransparentTextColorClasses);
            });
        }
        
        // --- 3.2 Sembunyi Saat Scroll ke Bawah ---
        if (currentScrollY > lastScrollY && currentScrollY > 200) { 
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY) {
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    // PENTING: Panggil handleScroll di awal untuk menetapkan status transparan
    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 4. FAQ ACCORDION
    // ==========================================
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        // ... (Logika FAQ Anda, tidak perlu diubah) ...
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

    // ... di dalam document.addEventListener('DOMContentLoaded', () => { ...

    // ==========================================
    // 5. SCROLL-TO-TOP BUTTON
    // ==========================================
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    if (scrollToTopBtn) { // Pastikan elemen ada sebelum mencoba menggunakannya
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                // Saat scroll ke bawah, tampilkan tombol
                scrollToTopBtn.classList.remove('invisible', 'opacity-0');
                scrollToTopBtn.classList.add('visible', 'opacity-100');
            } else {
                // Saat kembali ke atas, sembunyikan tombol
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


