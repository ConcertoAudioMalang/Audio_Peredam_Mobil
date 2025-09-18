// ================== SIDEBAR ==================
const details = document.querySelector("details");
const closeBtn = document.querySelector(".close-btn");

if(details && closeBtn){
  closeBtn.addEventListener("click", () => {
    details.removeAttribute("open");
  });
}

// ================== PRODUK FILTER ==================
const tabs = document.querySelectorAll(".brand-tabs .tab");
const lists = document.querySelectorAll(".produk-list");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.brand;

    lists.forEach(list => {
      if(list.dataset.brand === target){
        list.classList.add("active");
      } else {
        list.classList.remove("active");
      }
    });
  });
});

// ================== SLIDER GALERI ==================
const prev = document.querySelector(".slider .prev");
const next = document.querySelector(".slider .next");
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slides-wrapper img");
let index = 0;

function showSlide(i){
  if(i < 0) index = slides.length - 1;
  else if(i >= slides.length) index = 0;
  else index = i;

  slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
}

if(prev && next){
  prev.addEventListener("click", () => showSlide(index - 1));
  next.addEventListener("click", () => showSlide(index + 1));
}

// ================== DARK MODE ==================
const darkModeBtn = document.getElementById("dark-mode-toggle");
if(darkModeBtn){
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}
