// ================= SIDEBAR =================
const sidebar = document.querySelector(".sidebar");
const closeBtn = document.querySelector(".close-btn");
const summary = document.querySelector("summary");

closeBtn.addEventListener("click", () => {
  summary.removeAttribute("open");
});

// ================= DARK MODE =================
const darkToggle = document.getElementById("dark-mode-toggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// ================= PRODUK TABS =================
const tabs = document.querySelectorAll(".brand-tabs .tab");
const lists = document.querySelectorAll(".produk-list");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const brand = tab.dataset.brand;
    lists.forEach(list => list.classList.remove("active"));
    document.querySelector(`.produk-list.${brand}`).classList.add("active");
  });
});

// ================= GALERI SLIDER =================
let slideIndex = 0;
const slidesWrapper = document.querySelector(".slides-wrapper");
const slides = slidesWrapper.querySelectorAll("img");

function showSlides(n) {
  if (n >= slides.length) slideIndex = 0;
  if (n < 0) slideIndex = slides.length - 1;
  slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

// ================= FLOATING SOSMED =================
const mainIcon = document.querySelector(".social-floating .main-icon");
const socialIcons = document.querySelector(".social-floating .social-icons");

mainIcon.addEventListener("click", () => {
  socialIcons.style.opacity = socialIcons.style.opacity === "1" ? "0" : "1";
  socialIcons.style.pointerEvents = socialIcons.style.pointerEvents === "auto" ? "none" : "auto";
});
