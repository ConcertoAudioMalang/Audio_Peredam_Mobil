// Simple fade-in animation on scroll for sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
  });
});
<script>
  const track = document.querySelector('.gallery-track');
  const leftBtn = document.querySelector('.slide-btn.left');
  const rightBtn = document.querySelector('.slide-btn.right');

  let scrollAmount = 0;
  const scrollStep = 320; // Sesuaikan dengan lebar gambar

  rightBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollStep, behavior: 'smooth' });
  });

  leftBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  });
</script>
setInterval(() => {
  track.scrollBy({ left: scrollStep, behavior: 'smooth' });
}, 5000); // tiap 5 detik
<script>
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll("#galeri .products img").forEach(img => {
    img.addEventListener("click", function () {
      lightbox.style.display = "flex";
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
    });
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
  }
</script>



