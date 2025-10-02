document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. VARIABLE DAN ELEMENT SELECTION
    // ----------------------------------------------------
    
    // Dark Mode
    const desktopToggle = document.getElementById('theme-toggle');
    const mobileToggle = document.getElementById('theme-toggle-mobile');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const sunIcons = document.querySelectorAll('.sun-icon');

    // Mobile Menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Scroll Effects
    const header = document.getElementById('main-header');
    const scrollBtn = document.getElementById('scroll-to-top'); // Pastikan ini ada di HTML Body!
    const SCROLL_THRESHOLD = 150; // Jarak scroll sebelum header bersembunyi/tombol muncul
    
    // WhatsApp CTA
    const whatsappLinks = document.querySelectorAll('.cta-whatsapp-link');
    const phoneNumber = '6281234567890'; // Ganti dengan nomor WhatsApp Anda!

    // Inisialisasi AOS (Animation on Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-in-out',
    });


    // ----------------------------------------------------
    // 2. FUNGSI DARK MODE
    // ----------------------------------------------------
    
    // Cek preferensi sistem atau local storage saat memuat
    function loadTheme() {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
            document.documentElement.classList.add('dark');
            updateIcons(true);
        } else {
            document.documentElement.classList.remove('dark');
            updateIcons(false);
        }
    }

    // Mengubah tampilan ikon (bulan/matahari)
    function updateIcons(isDark) {
        moonIcons.forEach(icon => {
            icon.classList.toggle('hidden', isDark);
        });
        sunIcons.forEach(icon => {
            icon.classList.toggle('hidden', !isDark);
        });
    }

    // Menangani klik tombol toggle
    function handleThemeToggle() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateIcons(isDark);
    }

    loadTheme(); // Jalankan saat startup

    // Pasang Event Listener
    if (desktopToggle) {
        desktopToggle.addEventListener('click', handleThemeToggle);
    }
    if (mobileToggle) {
        mobileToggle.addEventListener('click', handleThemeToggle);
    }


    // ----------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ----------------------------------------------------
    
    function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
        // Optional: Tambahkan class untuk animasi jika diperlukan
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Tutup menu saat link diklik (agar navigasi berjalan)
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        });
    });


    // ----------------------------------------------------
    // 4. SCROLL EFFECTS (Header & Scroll to Top)
    // ----------------------------------------------------

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // LOGIC HEADER HIDE/SHOW
        if (header) {
            // Scroll ke bawah (sembunyikan header)
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.remove('translate-y-0', 'opacity-100');
                header.classList.add('-translate-y-full', 'opacity-0');
            } 
            // Scroll ke atas (tampilkan header, hanya jika sudah melewati batas)
            else if (currentScrollY < lastScrollY && currentScrollY > 100) {
                header.classList.remove('-translate-y-full', 'opacity-0');
                header.classList.add('translate-y-0', 'opacity-100');
            }
            // Di bagian atas halaman (selalu tampilkan header)
            else if (currentScrollY <= 100) {
                header.classList.remove('-translate-y-full', 'opacity-0');
                header.classList.add('translate-y-0', 'opacity-100');
            }
        }

        // LOGIC SCROLL TO TOP BUTTON
        if (scrollBtn) {
            if (currentScrollY > SCROLL_THRESHOLD) {
                scrollBtn.classList.remove('opacity-0', 'pointer-events-none');
                scrollBtn.classList.add('opacity-100', 'pointer-events-auto');
            } else {
                scrollBtn.classList.remove('opacity-100', 'pointer-events-auto');
                scrollBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        }
        
        lastScrollY = currentScrollY; // Update posisi scroll terakhir
    });

    // Event Listener untuk tombol Scroll To Top
    if (scrollBtn) {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // 5. WHATSAPP LINK GENERATOR
    // ----------------------------------------------------
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const product = link.getAttribute('data-product') || 'Konsultasi Umum';
            const message = encodeURIComponent(
                `Halo Concerto Audio, saya tertarik dengan layanan "${product}". Bisakah saya mendapatkan konsultasi lebih lanjut?`
            );
            const url = `https://wa.me/${phoneNumber}?text=${message}`;
            
            window.open(url, '_blank');
        });
    });

}); // DOMContentLoaded end
