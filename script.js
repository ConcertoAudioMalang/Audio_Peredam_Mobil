document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEKLARASI VARIABEL UTAMA
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    
    // --- Pengecekan Kritis ---
    if (!navbar) {
        console.error("Elemen #navbar tidak ditemukan. Pastikan ID sudah benar.");
        return; 
    }
    
    // --- Deklarasi Variabel yang Digunakan ---
    const themeToggles = document.querySelectorAll('#theme-toggle'); 
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const desktopLinks = navbar.querySelector('.hidden.lg\\:flex');
    const allNavbarIconWrappers = navbar.querySelectorAll('#theme-toggle, #mobile-menu-button');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const accordionHeaders = document.querySelectorAll('.accordion-header'); // Selector untuk FAQ
    const whatsappBtn = document.getElementById('whatsapp-button'); // ID untuk Tombol WA
    
    let lastScrollY = window.scrollY;
    const scrollThreshold = 50;
    const hideThreshold = 200; 

    // ==========================================
    // 1. DARK MODE TOGGLE & PERSISTENCE
    // ==========================================
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
    // 3. NAVBAR SCROLL LOGIC
    // ==========================================

    function updateNavbarAppearance(isScrolled) {
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        const textNormal = ['text-gray-700', 'dark:text-gray-300'];
        const textTransparent = ['text-text-light', 'dark:text-text-light'];
        const iconNormal = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        const iconTransparent = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10'];

        if (isScrolled) {
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            if (desktopLinks) {
                desktopLinks.classList.remove(...textTransparent);
                desktopLinks.classList.add(...textNormal);
            }
            
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconTransparent);
                button.classList.add(...iconNormal);
            });
        } else {
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            if (desktopLinks) {
                desktopLinks.classList.remove(...textNormal);
                desktopLinks.classList.add(...textTransparent);
            }
            
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconNormal);
                button.classList.add(...iconTransparent);
            });
        }
    }

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > scrollThreshold;
        
        updateNavbarAppearance(isScrolled);
        
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) { 
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY || currentScrollY < hideThreshold) {
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 4. FAQ ACCORDION (Logika Ditambahkan) ✅
    // ==========================================
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            // Tutup semua accordion yang sedang terbuka kecuali yang sedang diklik
            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content && !c.classList.contains('hidden')) {
                    c.classList.add('hidden');
                    // Reset ikon
                    const otherIcon = c.previousElementSibling.querySelector('.accordion-icon');
                    otherIcon.classList.remove('rotate-180');
                }
            });

            // Toggle konten yang diklik
            content.classList.toggle('hidden');
            // Toggle rotasi ikon
            icon.classList.toggle('rotate-180');
        });
    });


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
    // 6. WHATSAPP DYNAMIC LINK GENERATOR (Ditambahkan Kembali) ✅
    // ==========================================
    // HARAP GANTI NOMOR TELEPON INI DENGAN NOMOR ANDA YANG VALID!
    const phoneNumber = '081217398558'; 
    const defaultMessage = encodeURIComponent("Halo, saya tertarik dengan layanan audio mobil Anda. Bisakah saya mendapatkan informasi lebih lanjut?");

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

}); // Penutup DOMContentLoaded


// ==========================================
// INISIALISASI DI LUAR DOMContentLoaded
// ==========================================

// Inisialisasi AOS 
AOS.init({
    once: true,
    duration: 1000,
});

// KONFIGURASI SWIPER JS (UNTUK MERATAKAN KOLOM TESTIMONI)
var swiper = new Swiper(".mySwiper", {
    autoHeight: false, 
    setWrapperSize: true, 

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
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});

