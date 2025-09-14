// Konten halaman
const pages = {
  home: `
    <h1>Selamat Datang di Bengkel Audio 🎶</h1>
    <p>Kami spesialis audio mobil dengan pengalaman bertahun-tahun.</p>
    <p>Temukan produk berkualitas & layanan terbaik untuk kenyamanan Anda.</p>
  `,
  produk: `
    <h1>Produk Unggulan</h1>
    <div class="grid">
      <div class="card">
        <img src="https://via.placeholder.com/200x150?text=Speaker" alt="Speaker">
        <h3>Speaker Mobil</h3>
        <p>Suara jernih & bass mantap untuk pengalaman berkendara.</p>
      </div>
      <div class="card">
        <img src="https://via.placeholder.com/200x150?text=Amplifier" alt="Amplifier">
        <h3>Amplifier</h3>
        <p>Tenaga kuat dengan kualitas audio premium.</p>
      </div>
      <div class="card">
        <img src="https://via.placeholder.com/200x150?text=Subwoofer" alt="Subwoofer">
        <h3>Subwoofer</h3>
        <p>Bass menggelegar untuk hiburan maksimal.</p>
      </div>
    </div>
  `,
  layanan: `
    <h1>Layanan Kami</h1>
    <div class="grid">
      <div class="card">
        <h3>Instalasi Audio</h3>
        <p>Pemasangan profesional untuk semua jenis mobil.</p>
      </div>
      <div class="card">
        <h3>Tuning & Setting</h3>
        <p>Optimalisasi suara sesuai preferensi Anda.</p>
      </div>
      <div class="card">
        <h3>Perawatan Audio</h3>
        <p>Periksa & rawat sistem audio agar awet dan prima.</p>
      </div>
    </div>
  `,
  contact: `
    <h1>Hubungi Kami</h1>
    <p>Email: <a href="mailto:bengkel.audio@email.com">bengkel.audio@email.com</a></p>
    <p>WhatsApp: <a href="https://wa.me/6281234567890" target="_blank">0812-3456-7890</a></p>
    <p>Alamat: Jl. Otomotif No. 123, Jakarta</p>
    <h2>Ikuti Kami di Sosial Media</h2>
    <p>
      <a href="https://facebook.com/bengkel.audio" target="_blank">📘 Facebook</a> |
      <a href="https://instagram.com/bengkel.audio" target="_blank">📸 Instagram</a> |
      <a href="https://tiktok.com/@bengkel.audio" target="_blank">🎵 TikTok</a> |
      <a href="https://youtube.com/@bengkel.audio" target="_blank">▶️ YouTube</a>
    </p>
  `
};

// Fungsi ganti halaman
function loadPage(page) {
  const content = document.getElementById("content");
  content.classList.add("fade-out");
  setTimeout(() => {
    content.innerHTML = pages[page];
    content.classList.remove("fade-out");
    content.classList.add("fade-in");
  }, 300);
}
