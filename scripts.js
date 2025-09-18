document.addEventListener("DOMContentLoaded", () => {
  // Sidebar Hamburger
  const hamburger = document.getElementById("tl-hamburger");
  const sidebar = document.getElementById("tl-sidebar");
  const closeBtn = document.getElementById("tl-closeBtn");

  hamburger.addEventListener("click", () => { sidebar.style.width = "250px"; });
  closeBtn.addEventListener("click", () => { sidebar.style.width = "0"; });

  // Produk filter
  const tabs = document.querySelectorAll(".brand-tabs .tab");
  const lists = document.querySelectorAll(".produk-list");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const brand = tab.dataset.brand;
      lists.forEach(list => list.classList.toggle("active", list.dataset.brand === brand));
    });
  });

  // Galeri slider
  const slidesWrapper = document.querySelector(".slides-wrapper");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");
  const slides = document.querySelectorAll(".slides-wrapper img");
  let index = 0;

  function showSlide(i) {
    if(i < 0) index = slides.length-1;
    else if(i >= slides.length) index = 0;
    else index = i;
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  prev.addEventListener("click", () => showSlide(index-1));
  next.addEventListener("click", () => showSlide(index+1));
});
