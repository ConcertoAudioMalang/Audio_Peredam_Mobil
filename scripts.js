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
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.querySelectorAll(".slides img");
  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}
</script>





