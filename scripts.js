// Aksi untuk tombol Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    // Menambahkan/menghapus kelas 'active' untuk menampilkan/menyembunyikan menu
    navLinks.classList.toggle('active');
});

// Aksi untuk Dark/Light Mode Slider
const themeToggleCheckbox = document.getElementById('checkbox');
const body = document.body;

// 1. Periksa preferensi tema dari localStorage saat halaman dimuat
const currentTheme = localStorage.getItem('theme');

// Jika ada preferensi yang tersimpan, terapkan
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggleCheckbox.checked = true;
    }
}

// 2. Tambahkan event listener untuk perubahan pada slider
themeToggleCheckbox.addEventListener('change', () => {
    // Hapus kedua kelas tema untuk menghindari konflik
    body.classList.remove('dark-mode', 'light-mode');

    // Tentukan tema baru dan tambahkan kelas yang benar
    if (themeToggleCheckbox.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
});
