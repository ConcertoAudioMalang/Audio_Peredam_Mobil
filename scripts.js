// Aksi untuk tombol Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Aksi untuk Dark/Light Mode Slider
const themeToggleCheckbox = document.getElementById('checkbox');
const body = document.body;

// Periksa preferensi tema dari localStorage
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggleCheckbox.checked = true;
    }
}

themeToggleCheckbox.addEventListener('change', () => {
    // Toggle class 'dark-mode' pada body
    body.classList.toggle('dark-mode');

    // Simpan preferensi tema ke localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', 'light-mode');
    }
});
