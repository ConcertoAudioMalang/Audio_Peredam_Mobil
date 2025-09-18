// ================== SIDEBAR AUTO-CLOSE ==================
document.addEventListener("DOMContentLoaded", () => {
  const details = document.querySelector("details");
  const closeBtn = document.querySelector(".close-btn");
  const menuLinks = document.querySelectorAll(".sidebar ul li a");

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      details.removeAttribute("open");
    });
  }

  // Tutup sidebar setelah klik link
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      details.removeAttribute("open");
    });
  });
});

// ================== PRODUK FILTER ==================
const tabs = document.querySelectorAll(".brand-tabs .tab");
const produkLists = document.querySelectorAll(".produk-list");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    produkLists.forEach(list => list.classList.remove("active"));

    tab.classList.add("active");
    produkLists[index].classList.add("active");
  });
});

// ================== GALERI SLIDER ==================
let slideIndex = 0;

function showSlides(index) {
  const slidesWrapper = document.querySelector(".slides-wrapper");
  const slides = document.querySelectorAll(".slides-wrapper img");
  if (!slidesWrapper || slides.length === 0) return;

  if (index >= slides.length) slideIndex = 0;
  if (index < 0) slideIndex = slides.length - 1;

  slidesWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
}

function plusSlides(n) {
  slideIndex += n;
  showSlides(slideIndex);
}

// Init galeri pertama kali
document.addEventListener("DOMContentLoaded", () => {
  showSlides(slideIndex);
});

// ================== TESTIMONI SLIDER ==================
let testiIndex = 0;

function showTestimoni(index) {
  const track = document.querySelector(".testimoni-track");
  const slides = document.querySelectorAll(".testimoni-slide");
  if (!track || slides.length === 0) return;

  if (index >= slides.length) testiIndex = 0;
  if (index < 0) testiIndex = slides.length - 1;

  track.style.transform = `translateX(-${testiIndex * 100}%)`;
}

function plusTestimoni(n) {
  testiIndex += n;
  showTestimoni(testiIndex);
}

// Auto-slide setiap 6 detik
setInterval(() => {
  testiIndex++;
  showTestimoni(testiIndex);
}, 6000);

// Init testimoni pertama kali
document.addEventListener("DOMContentLoaded", () => {
  showTestimoni(testiIndex);
});

// ================== FAQ (toggle jawaban) ==================
const faqItems = document.querySelectorAll(".faq-item");
faqItems.forEach(item => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// ================== tombol (Dark Mode) ==================
document.addEventListener("DOMContentLoaded", function() {
  const toggle = document.getElementById("dark-mode-toggle");

  if(localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggle.textContent = "☀️";
  }

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      toggle.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      toggle.textContent = "🌙";
    }
  });
});



