/**
 * =========================================================
 * CONCERTO AUDIO | CUSTOM JAVASCRIPT (script.js)
 * Struktur: Modular, Efisien, dan Mudah Dipelihara (Maintainable).
 * =========================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----------------------------------------------------
    // 1. KONFIGURASI DAN SELEKSI ELEMEN (DIATAS)
    //    Membuat konstanta global di dalam DOMContentLoaded scope.
    // ----------------------------------------------------

    // # KONFIGURASI
    const PHONE_NUMBER = '6281234567890'; // Ganti dengan nomor WhatsApp Anda!
    const SCROLL_THRESHOLD = 150; // Jarak scroll untuk tombol 'Scroll to Top'
    const HEADER_TRANSITION_POINT = 100; // Jarak scroll untuk efek header hide/show

    // # ELEMEN DOM
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
    const scrollBtn = document.getElementById('scroll-to-top');
    
    // WhatsApp CTA
    const whatsappLinks = document.querySelectorAll('.cta-whatsapp-link');
    
    // Inisialisasi AOS (Animation on Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-in-out',
    });


    // ----------------------------------------------------
    // 2. MODUL: DARK MODE
    // ----------------------------------------------------

    /** Mengubah tampilan ikon (bulan/matahari) */
    function updateIcons(isDark) {
        moonIcons.forEach(icon => {
            // Menggunakan hidden class dari Tailwind
            icon.classList.toggle('hidden', isDark);
        });
        sunIcons.forEach(icon => {
            icon.classList.toggle('hidden', !isDark);
        });
    }

    /** Menangani klik tombol toggle */
    function handleThemeToggle() {
        // Toggle class 'dark' pada elemen <html>
        const isDark = document.documentElement.classList.toggle('dark');
        // Simpan preferensi ke Local Storage
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        // Update ikon
        updateIcons(isDark);
        // Memuat ulang AOS agar animasi menyesuaikan dark/light mode
        AOS.refresh();
    }

    /** Cek preferensi sistem atau local storage saat memuat */
    function loadTheme() {
        const storedTheme = localStorage.getItem('theme');
        // System preference hanya dipertimbangkan jika tidak ada storedTheme
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        const isDark = storedTheme === 'dark' || (!storedTheme && systemPrefersDark);

        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        updateIcons(isDark);
    }

    // Pasang Event Listener
    loadTheme(); // Jalankan saat startup
    [desktopToggle, mobileToggle].forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', handleThemeToggle);
        }
    });


    // ----------------------------------------------------
    // 3. MODUL: MOBILE MENU
    // ----------------------------------------------------

    /** Menangani logika buka/tutup mobile menu */
    function toggleMobileMenu() {
        // Logika sederhana (Toggle 'hidden')
        mobileMenu.classList.toggle('hidden');
        // Tambahkan atribut ARIA untuk accessibility
        mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
    }

    // Pasang Event Listener untuk tombol
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // Tutup menu saat link diklik
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Hapus pemeriksaan 'if (!mobileMenu.classList.contains('hidden'))'
            // Karena toggleMobileMenu sudah mengurus logikanya.
            toggleMobileMenu();
        });
    });


    // ----------------------------------------------------
    // 4. MODUL: SCROLL EFFECTS (Header & Scroll to Top)
    // ----------------------------------------------------

    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // --- SCROLL LOGIC UNTUK HEADER (Header Hide/Show) ---
        if (header) {
            // Menggunakan header.classList.toggle untuk kode yang lebih ringkas dan clean
            const isScrollingDown = currentScrollY > lastScrollY && currentScrollY > HEADER_TRANSITION_POINT;
            const isAtTop = currentScrollY <= HEADER_TRANSITION_POINT;
            
            // Logika untuk menyembunyikan/menampilkan header saat scroll ke bawah/atas
            if (!isAtTop) {
                // Sembunyikan saat scroll ke bawah
                header.classList.toggle('-translate-y-full', isScrollingDown);
                header.classList.toggle('opacity-0', isScrollingDown);
                
                // Tampilkan saat scroll ke atas
                header.classList.toggle('translate-y-0', !isScrollingDown);
                header.classList.toggle('opacity-100', !isScrollingDown);
            } else {
                // Selalu tampilkan saat berada di bagian atas halaman
                header.classList.remove('-translate-y-full', 'opacity-0');
                header.classList.add('translate-y-0', 'opacity-100');
            }

            // Tambahkan class 'scrolled' dari CSS (untuk efek latar belakang/blur/shadow)
            header.classList.toggle('scrolled', currentScrollY > 1);
            // Menambah/menghapus kelas 'dark' pada header saat 'scrolled'
            if (document.documentElement.classList.contains('dark')) {
                 header.classList.toggle('dark', currentScrollY > 1);
            }
        }
        
        // --- SCROLL LOGIC UNTUK SCROLL TO TOP BUTTON ---
        if (scrollBtn) {
            const isPastThreshold = currentScrollY > SCROLL_THRESHOLD;
            
            scrollBtn.classList.toggle('opacity-100', isPastThreshold);
            scrollBtn.classList.toggle('pointer-events-auto', isPastThreshold);
            scrollBtn.classList.toggle('opacity-0', !isPastThreshold);
            scrollBtn.classList.toggle('pointer-events-none', !isPastThreshold);
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
    // 5. MODUL: WHATSAPP LINK GENERATOR
    // ----------------------------------------------------

    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Mengambil data-product dari HTML, fallback ke 'Konsultasi Umum'
            const product = link.getAttribute('data-product') || 'Konsultasi Umum';
            const message = encodeURIComponent(
                `Halo Concerto Audio, saya tertarik dengan layanan "${product}". Bisakah saya mendapatkan konsultasi lebih lanjut?`
            );
            
            const url = `https://wa.me/${PHONE_NUMBER}?text=${message}`;
            
            window.open(url, '_blank');
        });
    });

}); // DOMContentLoaded end
