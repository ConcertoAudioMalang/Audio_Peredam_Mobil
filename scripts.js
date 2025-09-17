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



