document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");
  const closeBtn = document.getElementById("closeBtn");

  // Hamburger klik -> buka sidebar
  hamburger.addEventListener("click", () => { sidebar.style.width = "250px"; });

  // Close button klik -> tutup sidebar
  closeBtn.addEventListener("click", () => { sidebar.style.width = "0"; });

  // Swipe close untuk HP
  let startX = 0;
  sidebar.addEventListener("touchstart", e => startX = e.touches[0].clientX);
  sidebar.addEventListener("touchmove", e => {
    if(e.touches[0].clientX - startX < -50) sidebar.style.width = "0";
  });

  // Slider galeri
  const slides = document.querySelector(".slides-wrapper");
  const slideImgs = document.querySelectorAll(".slides-wrapper img");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  let index = 0;

  function showSlide(i){
    if(i<0) index = slideImgs.length-1;
    else if(i>=slideImgs.length) index = 0;
    else index = i;
    slides.style.transform = `translateX(-${index*100}%)`;
  }

  prev.addEventListener("click", () => showSlide(index-1));
  next.addEventListener("click", () => showSlide(index+1));

  // Auto slide setiap 4 detik
  setInterval(() => showSlide(index+1), 4000);
});
