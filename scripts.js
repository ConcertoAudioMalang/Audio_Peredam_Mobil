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
<script>
  let currentSlide = 0;
  const track = document.querySelector('.testimoni-track');
  const totalSlides = document.querySelectorAll('.testimoni-slide').length;

  function moveSlide(step) {
    currentSlide = (currentSlide + step + totalSlides) % totalSlides;
    updateSlider();
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }

  // Auto-slide setiap 5 detik
  setInterval(() => {
    moveSlide(1);
  }, 5000);

  // Inisialisasi
  updateSlider();
</script>

