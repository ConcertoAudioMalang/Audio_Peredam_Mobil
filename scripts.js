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
