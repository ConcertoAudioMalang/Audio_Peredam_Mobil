// script galeri
<script>
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  let currentIndex = 0;

  function showSlide(index) {
    // Batasi index agar looping terus
    if (index >= totalSlides) currentIndex = 0;
    else if (index < 0) currentIndex = totalSlides - 1;
    else currentIndex = index;

    // Geser slides dengan transform translateX
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function plusSlides(n) {
    showSlide(currentIndex + n);
  }

  // Initialize slider
  showSlide(currentIndex);
</script>

// script testimoni
document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimoni-track');
  const slides = document.querySelectorAll('.testimoni-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  let currentIndex = 0;
  const totalSlides = slides.length;

  function updateSlidePosition() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
  });

  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  });

  // Optional: auto slide every 7 seconds
  /*
  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlidePosition();
  }, 7000);
  */
});

// script faq&blog-mini
document.querySelectorAll('.faq-item').forEach(item => {
  const question = item.querySelector('.faq-question');
  question.addEventListener('click', () => {
    // Tutup semua FAQ kecuali yang diklik
    document.querySelectorAll('.faq-item').forEach(i => {
      if(i !== item) i.classList.remove('active');
    });
    // Toggle FAQ yang diklik
    item.classList.toggle('active');
  });
});

// script sosial-media-mengambang
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('social-toggle');
  const socialLinks = document.querySelector('.social-links');

  toggleBtn.addEventListener('click', () => {
    socialLinks.classList.toggle('active');
  });
});

// Ambil elemen
const menuToggle = document.getElementById('menu-toggle');
const menuClose = document.getElementById('menu-close');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

// Fungsi buka sidebar
function openSidebar() {
  sidebar.classList.add('active');
  overlay.classList.add('active');
}

// Fungsi tutup sidebar
function closeSidebar() {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
}

// Event listener tombol hamburger buka sidebar
menuToggle.addEventListener('click', openSidebar);

// Event listener tombol close sidebar
menuClose.addEventListener('click', closeSidebar);

// Event listener klik overlay tutup sidebar
overlay.addEventListener('click', closeSidebar);













