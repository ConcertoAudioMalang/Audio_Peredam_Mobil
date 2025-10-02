/* =========================
   SCRIPT.JS
========================= */

// === Dark Mode Toggle ===
const darkToggle = document.getElementById("darkModeToggle");
const html = document.documentElement;

// cek preferensi awal
if (localStorage.getItem("theme") === "dark" || 
    (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

// toggle dark mode
darkToggle?.addEventListener("click", () => {
  html.classList.toggle("dark");
  if (html.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// === Mobile Menu Toggle ===
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Tutup menu saat klik link
document.querySelectorAll("#mobileMenu a").forEach(link => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// === Scroll To Top Button ===
const scrollBtn = document.getElementById("scroll-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// === Navbar Sticky Effect ===
const header = document.getElementById("main-header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// === FAQ Accordion ===
document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", () => {
    item.classList.toggle("active");
    const answer = item.querySelector(".faq-answer");
    if (answer) {
      answer.classList.toggle("hidden");
    }
  });
});

// === AOS Init ===
AOS.init({
  duration: 800,
  once: true,
  offset: 100
});
