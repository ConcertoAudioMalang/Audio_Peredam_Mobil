// Inisialisasi AOS
AOS.init({
    once: true, // Animasi hanya berjalan sekali saat digulir ke bawah
});

// Logika Dark/Light Mode
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Cek preferensi tema dari local storage atau sistem
const storedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});
