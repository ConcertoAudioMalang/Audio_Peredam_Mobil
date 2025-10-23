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
    // Selector ini menargetkan container desktop links (misalnya: <ul>)
    const desktopLinksContainer = navbar.querySelector('.hidden.lg\\:flex'); 
    const allNavbarIconWrappers = navbar.querySelectorAll('#theme-toggle, #mobile-menu-button');
    const scrollToTopBtn = document.getElementById('scroll-to-top');
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    const whatsappBtn = document.getElementById('whatsapp-button');
    
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
        // Panggil handleScroll setelah ganti tema agar tampilan navbar langsung menyesuaikan
        handleScroll(); 
    }

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', toggleTheme);
    });

    // (Bagian 2. MOBILE MENU TOGGLE tidak berubah)

    // ==========================================
    // 3. NAVBAR SCROLL LOGIC - PERBAIKAN UTAMA DI SINI 🚀
    // ==========================================

    function updateNavbarAppearance(isScrolled) {
        // Cek apakah saat ini mode gelap aktif
        const isDarkMode = html.classList.contains('dark');

        // Kelas untuk latar belakang dan border saat di-scroll
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        
        // Warna Teks saat di-scroll (Normal)
        const textNormal = ['text-gray-700', 'dark:text-gray-300']; 
        // Warna Teks saat di Top & Dark Mode (Transparent/Putih)
        const textTransparent = ['text-text-light', 'dark:text-text-light']; 
        
        // Kelas Icon saat di-scroll
        const iconNormal = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        // Kelas Icon saat di Top (Transparent/Putih)
        const iconTransparent = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10'];

        if (isScrolled) {
            // 1. Navbar Container
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks)
            if (desktopLinksContainer) {
                // Saat di-scroll, selalu gunakan warna normal (gelap di light, terang di dark)
                desktopLinksContainer.classList.remove('invisible', ...textTransparent);
                desktopLinksContainer.classList.add(...textNormal);
            }
            
            // 3. Icons (Toggles, Menu Button)
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconTransparent);
                button.classList.add(...iconNormal);
            });
        } else { // Kondisi di Top (window.scrollY < scrollThreshold)
            // 1. Navbar Container
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks) - LOGIKA PERBAIKAN UTAMA
            if (desktopLinksContainer) {
                if (!isDarkMode) {
                    // LIGHT MODE, DI TOP -> HILANGKAN Teks (Invisible)
                    // Tujuannya: Teks putih tidak terlihat di atas konten putih
                    desktopLinksContainer.classList.remove(...textNormal, ...textTransparent);
                    desktopLinksContainer.classList.add('invisible'); 
                } else {
                    // DARK MODE, DI TOP -> Teks Tetap Terlihat (Putih/Terang)
                    desktopLinksContainer.classList.remove('invisible', ...textNormal);
                    desktopLinksContainer.classList.add(...textTransparent);
                }
            }
            
            // 3. Icons (Toggles, Menu Button)
            allNavbarIconWrappers.forEach(button => {
                // Icons tetap terang (putih) di Top (baik light maupun dark mode)
                button.classList.remove(...iconNormal);
                button.classList.add(...iconTransparent);
            });
        }
    }

    function handleScroll() {
        const currentScrollY = window.scrollY;
        const isScrolled = currentScrollY > scrollThreshold;
        
        updateNavbarAppearance(isScrolled);
        
        // Logic Sembunyikan/Tampilkan Navbar saat Scroll ke Bawah/Atas
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) { 
            // Scrolling ke bawah
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY || currentScrollY < hideThreshold) {
            // Scrolling ke atas atau sudah di atas hideThreshold
            navbar.classList.remove('-translate-y-full'); 
        }
        
        lastScrollY = currentScrollY;
    }

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


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

    // (Bagian 4, 5, dan 6 lainnya tidak berubah)

    // ==========================================
    // 4. FAQ ACCORDION
    // ==========================================
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content && !c.classList.contains('hidden')) {
                    c.classList.add('hidden');
                    const otherIcon = c.previousElementSibling.querySelector('.accordion-icon');
                    otherIcon.classList.remove('rotate-180');
                }
            });

            content.classList.toggle('hidden');
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
    // 6. WHATSAPP DYNAMIC LINK GENERATOR
    // ==========================================
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

// (Kode AOS, Swiper, dan Zoom Image tetap di luar DOMContentLoaded)

// ==========================================
// INISIALISASI DI LUAR DOMContentLoaded
// ==========================================
AOS.init({
    once: true,
    duration: 1000,
});

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

function zoomImage(imageElement) {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImage = document.getElementById('zoom-modal-image');
    
    modalImage.src = imageElement.src;
    modalImage.alt = imageElement.alt + ' - Zoom';

    modal.classList.add('opacity-100', 'pointer-events-auto');
    modal.classList.remove('opacity-0', 'pointer-events-none');

    document.body.style.overflow = 'hidden';
}

function closeZoomModal() {
    const modal = document.getElementById('simple-zoom-modal');
    
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeZoomModal();
    }
});
