// ================== SIDEBAR ==================
const details = document.querySelector("details");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", () => {
  details.removeAttribute("open"); // tutup sidebar
});

// ================== DARK MODE ==================
const darkToggle = document.getElementById("dark-mode-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ================== PRODUK FILTER ==================
const tabs = document.querySelectorAll(".brand-tabs .tab");
const produkLists = document.querySelectorAll(".produk-list");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    // remove active class dari semua tab
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const target = tab.dataset.target; // ambil data-target
    produkLists.forEach(list => {
      if(list.id === target) {
        list.classList.add("active");
      } else {
        list.classList.remove("active");
      }
    });
  });
});

// ================== GALERI SLIDER ==================
const prev = document.querySelector(".slider .prev");
const next = document.querySelector(".slider .next");
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = document.querySelectorAll(".slides-wrapper img");
let index = 0;

function showSlide(i) {
  if(i < 0) index = slides.length - 1;
  else if(i >= slides.length) index = 0;
  else index = i;
  slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener("click", () => showSlide(index - 1));
next.addEventListener("click", () => showSlide(index + 1));

// ================= FLOATING SOSMED =================
const mainIcon = document.querySelector(".social-floating .main-icon");
const socialIcons = document.querySelector(".social-floating .social-icons");

mainIcon.addEventListener("click", () => {
  socialIcons.style.opacity = socialIcons.style.opacity === "1" ? "0" : "1";
  socialIcons.style.pointerEvents = socialIcons.style.pointerEvents === "auto" ? "none" : "auto";
});

