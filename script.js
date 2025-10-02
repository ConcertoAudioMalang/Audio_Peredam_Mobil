/* =========================================================
    CONCERTO AUDIO | SCRIPT.JS
    Fungsi: Navigasi, Dark Mode, AOS, FAQ Accordion, dan CTA WhatsApp Dinamis.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    // Ambil elemen HTML root
    const html = document.documentElement;

    /* -------------------------------------------
        0. INITIAL SETUP & AOS
    ------------------------------------------- */

    // Inisialisasi AOS (Animasi Scroll)
    AOS.init({
        duration: 900,  // Durasi sedikit lebih lama untuk kesan elegan
        once: true,     // Hanya animasikan saat pertama masuk viewport
        offset: 120,    // Mulai animasi lebih awal
    });

    /* -------------------------------------------
        1. DARK MODE TOGGLE (Gabungan Desktop & Mobile)
    ------------------------------------------- */
    const desktopToggle = document.getElementById("theme-toggle");
    const mobileToggle = document.getElementById("theme-toggle-mobile");
    const moonIcons = document.querySelectorAll('.fa-moon');
    const sunIcons = document.querySelectorAll('.fa-sun');
    
    /** Fungsi untuk menerapkan/menyimpan tema */
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            html.classList.add("dark");
            localStorage.setItem("theme", "dark");
            // Tampilkan ikon matahari (sun) dan sembunyikan bulan (moon)
            moonIcons.forEach(i => i.classList.add('hidden'));
            sunIcons.forEach(i => i.classList.remove('hidden'));
        } else {
            html.classList.remove("dark");
            localStorage.setItem("theme", "light");
            // Tampilkan ikon bulan (moon) dan sembunyikan matahari (sun)
            moonIcons.forEach(i => i.classList.remove('hidden'));
            sunIcons.forEach(i => i.classList.add('hidden'));
        }
    }

    /** Cek preferensi awal: localStorage atau OS */
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
        applyTheme('dark');
    } else {
        applyTheme('light');
    }

    /** Event listener untuk toggle */
    const handleToggleClick = () => {
        const currentTheme = html.classList.contains('dark') ? 'dark' : 'light';
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
    };

    desktopToggle?.addEventListener("click", handleToggleClick);
    mobileToggle?.addEventListener("click", handleToggleClick);


    /* -------------------------------------------
        2. MOBILE MENU & NAVIGASI
    ------------------------------------------- */
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileNavLinks = document.querySelectorAll("#mobile-menu a");
    
    // Toggle menu
    mobileMenuButton?.addEventListener("click", () => {
        mobileMenu?.classList.toggle("hidden");
        // Mengubah ikon hamburger menjadi close (X)
        const icon = mobileMenuButton.querySelector('i');
        if (mobileMenu?.classList.contains('hidden')) {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        }
    });

    // Tutup menu saat klik link
    mobileNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu?.classList.add("hidden");
            // Reset ikon ke hamburger
            mobileMenuButton.querySelector('i').classList.remove('fa-xmark');
            mobileMenuButton.querySelector('i').classList.add('fa-bars');
        });
    });
    

  /* -------------------------------------------
    3. SCROLL EFFECTS (Header & Scroll to Top) - VERSI TRANSISI HALUS
------------------------------------------- */
const scrollBtn = document.getElementById("scroll-to-top");
const header = document.getElementById("main-header"); 
const mobileMenu = document.getElementById("mobile-menu"); 

const SCROLL_THRESHOLD = 200; 

// Pastikan header memiliki class transisi di HTML: transition-all duration-300
// dan class transform: translate-y-0

window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > SCROLL_THRESHOLD;

    // A. Logic Menyembunyikan Navbar dengan Transisi
    if (scrolled) {
        // 1. Sembunyikan Header Utama (meluncur ke atas)
        // Geser ke atas (di luar viewport) dan buat transparan
        header?.classList.add("-translate-y-full", "opacity-0"); 
        header?.classList.remove("translate-y-0", "opacity-100");
        
        // Opsional: Tutup menu mobile jika sedang terbuka saat scroll
        mobileMenu?.classList.add("hidden");
        
        // 2. Tampilkan Tombol Scroll To Top
        scrollBtn?.classList.remove("opacity-0", "pointer-events-none");
    } else {
        // Saat kembali ke atas (di bawah threshold)
        // 1. Tampilkan kembali Header Utama (meluncur kembali)
        header?.classList.remove("-translate-y-full", "opacity-0");
        header?.classList.add("translate-y-0", "opacity-100");
        
        // 2. Sembunyikan Tombol Scroll To Top
        scrollBtn?.classList.add("opacity-0", "pointer-events-none");
    }
});

scrollBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

    /* -------------------------------------------
        4. WHATSAPP CTA DINAMIS
    ------------------------------------------- */
    const whatsappLinks = document.querySelectorAll(".cta-whatsapp-link");
    const whatsappNumber = "628123456789"; // Ganti dengan nomor WhatsApp Bisnis Anda (tanpa +)
    const defaultMessage = "Halo Concerto Audio Malang, saya tertarik dengan layanan Anda. Bisakah saya berkonsultasi lebih lanjut?";

    whatsappLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Ambil nama produk dari data-attribute
            const productName = link.getAttribute('data-product');
            
            let message = defaultMessage;
            if (productName) {
                message = `Halo Concerto Audio, saya tertarik dengan layanan/produk *${productName}*. Mohon informasinya lebih lanjut.`;
            }

            // Encode pesan untuk URL
            const encodedMessage = encodeURIComponent(message);
            
            // Buat URL WhatsApp
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappURL, '_blank');
        });
    });
    
    
    /* -------------------------------------------
        5. FAQ ACCORDION LOGIC (Pengganti Details/Summary)
    ------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const content = item.querySelector('.faq-content');
        
        // Pastikan konten tersembunyi secara default
        content.classList.add('hidden');

        toggle.addEventListener('click', () => {
            // Tutup semua item FAQ yang sedang terbuka (Single-open mode)
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-content').classList.add('hidden');
                }
            });

            // Buka atau tutup item yang diklik
            item.classList.toggle('active');
            content.classList.toggle('hidden');
        });
    });

    /* -------------------------------------------
        6. COPYRIGHT YEAR
    ------------------------------------------- */
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }
});


