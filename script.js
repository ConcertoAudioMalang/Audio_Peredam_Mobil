/* =========================================================
   CONCERTO AUDIO | SCRIPT.JS
   Fungsi: Navigasi, Dark Mode, AOS, dan CTA WhatsApp Dinamis.
========================================================= */

document.addEventListener('DOMContentLoaded', () => {
    // Inisialisasi AOS (Animasi Scroll)
    AOS.init({
        duration: 900, // Durasi sedikit lebih lama untuk kesan elegan
        once: true,    // Hanya animasikan saat pertama masuk viewport
        offset: 120,   // Mulai animasi lebih awal
    });

    // Ambil elemen HTML root
    const html = document.documentElement;

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
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
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
       3. SCROLL TO TOP & NAVBAR SCROLL
    ------------------------------------------- */
    const scrollBtn = document.getElementById("scroll-to-top");
    // const header = document.getElementById("main-header"); // Navbar sticky tidak butuh class 'scrolled' lagi
    
    window.addEventListener("scroll", () => {
        // Tampilkan tombol Scroll To Top
        if (window.scrollY > 500) {
            scrollBtn?.classList.remove("opacity-0");
        } else {
            scrollBtn?.classList.add("opacity-0");
        }
        
        // Catatan: Navbar fixed/shadow effect sudah dihandle oleh Tailwind di index.html
    });

    scrollBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* -------------------------------------------
       4. WHATSAPP CTA DINAMIS (PENTING untuk Bisnis)
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
       5. FAQ ACCORDION (Menggunakan markup <details>)
    ------------------------------------------- */
    // Tidak perlu JavaScript berlebihan karena kita menggunakan elemen <details> di HTML
    // Tambahkan event listener untuk mencegah penutupan semua detail saat satu terbuka (opsional)
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("toggle", (e) => {
            if (item.open) {
                // Tutup semua item lain saat item ini dibuka
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.open) {
                        otherItem.open = false;
                    }
                });
            }
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
