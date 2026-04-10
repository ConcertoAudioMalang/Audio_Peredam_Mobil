// ====================================================================
// INISIALISASI DI LUAR DOMContentLoaded (AOS, SWIPER)
// ====================================================================
try { if (typeof AOS !== 'undefined') { AOS.init({ once: true, duration: 1000 }); } } catch (e) { console.warn("AOS library not loaded. Skip initialization."); }
try { 
    if (typeof Swiper !== 'undefined') {
        var swiper = new Swiper(".mySwiper", {
            autoHeight: false, setWrapperSize: true, slidesPerView: 1, spaceBetween: 24,
            breakpoints: { 768: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 3, spaceBetween: 30 } },
            pagination: { el: ".swiper-pagination", clickable: true },
            navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        });
    }
} catch (e) { console.warn("Swiper library not loaded. Skip initialization."); }


document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // DEKLARASI VARIABEL UTAMA
    // ==========================================
    const html = document.documentElement;
    const navbar = document.getElementById('navbar');
    
    if (!navbar) {
        console.error("Elemen #navbar tidak ditemukan. Pastikan ID sudah benar.");
        return; 
    }
    
    const themeToggles = document.querySelectorAll('#theme-toggle'); 
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
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
        // Kelas untuk background solid/blur saat di-scroll
        const activeClasses = ['bg-secondary-light/95', 'dark:bg-secondary-dark/95', 'backdrop-blur-md', 'border-b', 'border-gray-200', 'dark:border-gray-800'];
        
        // WARNA DI TOP (Putih/Terang)
        const textTop = ['text-white', 'dark:text-gray-100']; 
        
        // Warna Teks saat di-scroll (Gelap di Light, Terang di Dark)
        const textScrolled = ['text-gray-700', 'dark:text-gray-300']; 
        
        // Kelas Icon saat di Top (Putih/Terang)
        const iconTop = ['text-white', 'dark:text-gray-100', 'hover:bg-white/10'];
        // Kelas Icon saat di-scroll (Kontras)
        const iconScrolled = ['text-gray-700', 'dark:text-gray-300', 'hover:bg-gray-200', 'dark:hover:bg-gray-700'];

        if (isScrolled) {
            // KONDISI Di-scroll (Background Solid/Blur)
            
            // 1. Navbar Container
            navbar.classList.add(...activeClasses);
            navbar.classList.remove('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks)
            if (desktopLinksContainer) {
                desktopLinksContainer.classList.remove(...textTop);
                desktopLinksContainer.classList.add(...textScrolled);
            }
            
            // 3. Icons
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconTop);
                button.classList.add(...iconScrolled);
            });

        } else { 
            // KONDISI Di Top (Background Transparan)
            
            // 1. Navbar Container
            navbar.classList.remove(...activeClasses);
            navbar.classList.add('bg-transparent', 'border-transparent');
            
            // 2. Desktop Links (Teks)
            if (desktopLinksContainer) {
                desktopLinksContainer.classList.remove(...textScrolled);
                desktopLinksContainer.classList.add(...textTop);
            }
            
            // 3. Icons
            allNavbarIconWrappers.forEach(button => {
                button.classList.remove(...iconScrolled);
                button.classList.add(...iconTop);
            });
        }
    }

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > hideThreshold) { 
            // 1. Scroll Down (Sembunyi)
            navbar.classList.add('-translate-y-full'); 
        } else if (currentScrollY < lastScrollY && currentScrollY > scrollThreshold) {
            // 2. Scroll Up (Muncul Solid)
            navbar.classList.remove('-translate-y-full');
            updateNavbarAppearance(true); 
        } else if (currentScrollY <= scrollThreshold) {
            // 3. Kembali ke Top (Muncul Transparan)
            navbar.classList.remove('-translate-y-full');
            updateNavbarAppearance(false); 
        }
        
        lastScrollY = currentScrollY;
    }

    handleScroll(); 
    window.addEventListener('scroll', handleScroll);


    // (Bagian 4, 5, 6, dan fungsi zoom image di bawah ini tetap berfungsi)

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
                    if (otherIcon) { otherIcon.classList.remove('rotate-180'); }
                }
            });
            content.classList.toggle('hidden');
            if (icon) { icon.classList.toggle('rotate-180'); }
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
            window.scrollTo({ top: 0, behavior: 'smooth' });
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
// FUNGSI GLOBAL ZOOM IMAGE
// ==========================================
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

document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const icon = header.querySelector('.accordion-icon');

        // Toggle Content
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
            icon.style.transform = 'rotate(45deg)';
        }
    });
});
