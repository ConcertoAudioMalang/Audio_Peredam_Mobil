// === Init AOS ===
AOS.init({
  duration: 1000,
  once: true,
});

// === Dark Mode Toggle ===
const toggle = document.getElementById("darkToggle");
const html = document.documentElement;

if (localStorage.theme === "dark") {
  html.classList.add("dark");
  toggle.checked = true;
}

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

// === Mobile Nav ===
const navToggle = document.getElementById("nav-toggle");
const mobileMenu = document.getElementById("mobile-menu");

navToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// === Scroll Up Button ===
const scrollBtn = document.getElementById("scrollTopBtn");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Copyright Year ===
document.getElementById("copyright").textContent =
  `© ${new Date().getFullYear()} Concerto Audio Malang. All rights reserved.`;

// === Lightbox Gallery ===
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".lightbox .close");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const galleryItems = document.querySelectorAll(".masonry-item");

let currentIndex = 0;

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightbox.classList.remove("hidden");
    lightboxImg.src = item.src;
    currentIndex = index;
  });
});

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].src;
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  lightboxImg.src = galleryItems[currentIndex].src;
});

window.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("hidden")) {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
    if (e.key === "Escape") closeBtn.click();
  }
});
