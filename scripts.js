document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("tl-hamburger");
  const sidebar = document.getElementById("tl-sidebar");
  const closeBtn = document.getElementById("tl-closeBtn");

  // Buka sidebar
  hamburger.addEventListener("click", () => {
    sidebar.style.width = "250px";
  });

  // Tutup sidebar
  closeBtn.addEventListener("click", () => {
    sidebar.style.width = "0";
  });

  // Swipe HP
  let startX = 0;
  sidebar.addEventListener('touchstart', (e) => startX = e.touches[0].clientX );
  sidebar.addEventListener('touchmove', (e) => {
    if(e.touches[0].clientX - startX < -50) sidebar.style.width = '0';
  });
});
