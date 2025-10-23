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
    // Selector ini menargetkan container desktop links
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
    // Inisialisasi tema saat load
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
        handleScroll(); // Panggil agar tampilan navbar langsung menyesuaikan tema baru
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
    // 3. NAVBAR SCROLL LOGIC - PERBAIKAN RESPONSIVITAS WARNA
    // ==========================================

    /**
     * Mengubah tampilan visual navbar (background, warna teks/ikon)
     * berdasarkan posisi scroll (di Top atau sudah di-scroll)
     */
    function updateNavbarAppearance(isScrolled) {
        // Kelas untuk latar belakang dan border saat di-scroll
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        
        // WARNA DEFAULT (White/Light Mode)
        // Kita berasumsi warna default link di HTML Anda adalah warna terang (putih)
        // Jika Anda menggunakan Tailwind untuk warna teks default, ganti 'text-white' jika itu yang menyebabkan masalah.
        const textDefaultLight = ['text-white', 'text-text-light']; // Gunakan kelas-kelas yang menyebabkan teks menjadi putih saat di top
        
        // Warna Teks saat di-scroll (Normal: gelap di light, terang di dark)
        const textScrolled = ['text-gray-700', 'dark:text-gray-300']; 
        
        // Kelas Icon saat di-scroll
        const iconScrolled = ['text-text-dark', 'dark:text-text-light', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];
        // Kelas Icon saat di Top
        const iconDefaultLight = ['text-text-light', 'dark:text-text-light', 'hover:bg-white/10'];

        if (isScrolled) {
            // KONDISI Di-scroll (background solid/blur, teks kontras)
            
            // 1. Navbar Container
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks)
            if (desktopLinksContainer) {
                // HAPUS SEMUA KELAS WARNA TERANG DEFAULT
                desktopLinksContainer.classList.remove(...textDefaultLight);
                // Tambahkan kelas warna scroll (gelap di Light, terang di Dark)
                desktopLinksContainer.classList.add(...textScrolled);
            }
            
            // 3. Icons
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconDefaultLight);
                button.classList.add(...iconScrolled);
            });

        } else { 
            // KONDISI Di Top (background transparan, teks terang/putih)
            
            // 1. Navbar Container
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks)
            if (desktopLinksContainer) {
                // HAPUS SEMUA KELAS WARNA SCROLLED
                desktopLinksContainer.classList.remove(...textScrolled);
                // Tambahkan kelas warna default terang
                desktopLinksContainer.classList.add(...textDefaultLight);
            }
            
            // 3. Icons
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconScrolled);
                button.classList.add(...iconDefaultLight);
            });
        }
    }

    /**
     * Menangani logika sembunyikan/tampilkan dan penampilan (warna/background) navbar saat scroll
     */
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Logika Sembunyikan/Tampilkan Navbar saat Scroll
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) { 
            // 2. Scrolling ke bawah (melewati 200px) -> Sembunyi
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY && currentScrollY > scrollThreshold) {
            // 3. Scrolling ke atas (di zona scroll, belum mencapai Top) -> Muncul (dengan background solid)
            navbar.classList.remove('-translate-y-full');
            updateNavbarAppearance(true); 
        } else if (currentScrollY <= scrollThreshold) {
            // 1 & 4. Di posisi Top (atau kembali ke Top) -> Muncul (dengan background transparan)
            navbar.classList.remove('-translate-y-full');
            updateNavbarAppearance(false); 
        }
        
        lastScrollY = currentScrollY;
    }

    // Inisialisasi
    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // ==========================================
    // 4. FAQ ACCORDION
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector('.accordion-icon');

            document.querySelectorAll('.accordion-content').forEach(c => {
                if (c !== content && !c.classList.contains('hidden')) {
                    c.classList.add('hidden');
                    const otherIcon = c.previousElementSibling.querySelector('.accordion-icon');
                    if (otherIcon) {
                         otherIcon.classList.remove('rotate-180');
                    }
                }
            });

            content.classList.toggle('hidden');
            if (icon) {
                 icon.classList.toggle('rotate-180');
            }
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
    const phoneNumber = '081217398558'; // Ganti dengan nomor Anda!
    const defaultMessage = encodeURIComponent("Halo, saya tertarik dengan layanan Anda.");

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;
            window.open(whatsappUrl, '_blank');
        });
    }

}); // Penutup DOMContentLoaded

// ==========================================
// INISIALISASI DI LUAR DOMContentLoaded (AOS, SWIPER, ZOOM)
// ==========================================

try {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            duration: 1000,
        });
    }
} catch (e) {
    console.warn("AOS library not loaded. Skip initialization.");
}

try {
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper(".mySwiper", {
            autoHeight: false, 
            setWrapperSize: true, 
            slidesPerView: 1, 
            spaceBetween: 24,
            breakpoints: {
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 }
            },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
} catch (e) {
    console.warn("Swiper library not loaded. Skip initialization.");
}

// FUNGSI ZOOM IMAGE
function zoomImage(imageElement) {
    const modal = document.getElementById('simple-zoom-modal');
    const modalImage = document.getElementById('zoom-modal-image');
    if (!modal || !modalImage) return;
    
    modalImage.src = imageElement.src;
    modalImage.alt = imageElement.alt + ' - Zoom';
    modal.classList.add('opacity-100', 'pointer-events-auto');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    document.body.style.overflow = 'hidden';
}

function closeZoomModal() {
    const modal = document.getElementById('simple-zoom-modal');
    if (!modal) return;
    
    modal.classList.remove('opacity-100', 'pointer-events-auto');
    modal.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeZoomModal();
    }
});
