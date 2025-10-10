document.addEventListener('DOMContentLoaded', () => {
    // ===============================================
    // 1. LOGIKA DARK/LIGHT MODE
    // ===============================================

    const body = document.body;
    const toggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-mobile');
    const toggleIcons = document.querySelectorAll('#theme-icon, #theme-icon-mobile');

    // Cek preferensi user atau simpanan local
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

    // Fungsi untuk menerapkan tema
    function applyTheme(theme) {
        // Dalam konteks tailwind.config, 'dark' berarti mode GELAP
        // Jika savedTheme == 'dark', kita TIDAK menambah class 'dark' ke body
        if (theme === 'dark') {
            body.classList.remove('dark'); 
            // Ikon harusnya bulan saat mode gelap aktif (class 'dark' tidak ada)
            toggleIcons.forEach(icon => {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            });
        } else {
            // Jika savedTheme == 'light', kita menambah class 'dark' ke body
            // ini adalah kebalikan dari setting Tailwind default yang sedikit membingungkan, tapi ini cara kerjanya.
            body.classList.add('dark'); 
            // Ikon harusnya matahari saat mode terang aktif (class 'dark' ada)
            toggleIcons.forEach(icon => {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            });
        }
    }

    // Terapkan tema saat halaman dimuat
    applyTheme(savedTheme);

    // Event listener untuk tombol toggle
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isDarkMode = !body.classList.contains('dark');
            const newTheme = isDarkMode ? 'light' : 'dark';

            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    });


    // ===============================================
    // 2. LOGIKA HAMBURGER MENU (MOBILE)
    // ===============================================

    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    menuButton.addEventListener('click', () => {
        const isMenuOpen = mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('-translate-y-full');
        
        // Ganti ikon hamburger menjadi X
        if (!isMenuOpen) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Tutup menu setelah klik link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden', '-translate-y-full');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });


    // ===============================================
    // 3. LOGIKA BACK TO TOP BUTTON
    // ===============================================
    
    const backToTopButton = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
         // Tampilkan tombol setelah user scroll 300px
         if (window.scrollY > 300) {
             backToTopButton.classList.remove('opacity-0', 'invisible');
             backToTopButton.classList.add('opacity-100', 'visible');
         } else {
             backToTopButton.classList.remove('opacity-100', 'visible');
             backToTopButton.classList.add('opacity-0', 'invisible');
         }
    });

    backToTopButton.addEventListener('click', () => {
         window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ===============================================
    // 4. LOGIKA CUSTOM WHATSAPP CTA LINK
    // ===============================================
    
    const ctaLinks = document.querySelectorAll('.cta-whatsapp-link');
    const whatsappNumber = '6281217398558'; // Ganti dengan nomor WhatsApp Anda

    ctaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ambil data-product dari elemen yang diklik
            const product = link.getAttribute('data-product') || 'Informasi Umum';
            
            // Buat pesan template
            const message = `Halo Concerto Audio, saya tertarik dengan "${product}". Mohon informasi lebih lanjut. Terima kasih!`;
            
            // Encode pesan untuk URL
            const encodedMessage = encodeURIComponent(message);
            
            // Buat URL WhatsApp
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            // Buka di tab baru
            window.open(whatsappUrl, '_blank');
        });
    });
    
});
