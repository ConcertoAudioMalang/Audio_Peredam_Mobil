document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("tl-hamburger");
  const sidebar = document.getElementById("tl-sidebar");
  const closeBtn = document.getElementById("tl-closeBtn");

  hamburger.addEventListener("click", () => sidebar.style.width="250px");
  closeBtn.addEventListener("click", () => sidebar.style.width="0");
});
