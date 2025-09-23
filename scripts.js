// Aksi untuk tombol "Klik Saya!"
document.getElementById('myButton').addEventListener('click', function() {
    alert('Tombol berhasil diklik! 🎉');
});

// Aksi untuk tombol Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Aksi untuk Dark/Light Mode
const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

// Periksa preferensi tema dari localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggleBtn.textContent = '🌙';
    }
}

themeToggleBtn.addEventListener('click', () => {
    // Toggle class 'dark-mode' pada body
    body.classList.toggle('dark-mode');

    // Ubah ikon tombol
    if (body.classList.contains('dark-mode')) {
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark-mode');
    } else {
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light-mode');
    }
});
