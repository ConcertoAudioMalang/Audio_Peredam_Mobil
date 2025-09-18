// ================== SIDEBAR&HAMBURGER-MENU ==================
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

  // Tutup sidebar saat klik di luar
  window.addEventListener("click", (e) => {
    if (e.target === sidebar) {
      sidebar.style.width = "0";
    }
  });

  // Swipe untuk HP
  let startX = 0;
  sidebar.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sidebar.addEventListener('touchmove', (e) => {
    let touchX = e.touches[0].clientX;
    let diffX = touchX - startX;

    if (diffX < -50) {
      sidebar.style.width = '0';
    }
  });
});

// ================== PRODUK FILTER ==================
const tabs = document.querySelectorAll('.brand-tabs .tab');
const produkLists = document.querySelectorAll('.produk-list');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const target = tab.getAttribute('data-brand');
    produkLists.forEach(list => {
      if(list.getAttribute('data-brand') === target){
        list.classList.add('active');
      } else {
        list.classList.remove('active');
      }
    });
  });
});

// ================== SLIDER GALERI ==================
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slides-wrapper img');
const prev = document.querySelector('.slider .prev');
const next = document.querySelector('.slider .next');
let index = 0;

function showSlide(i){
  if(i < 0) index = slides.length - 1;
  else if(i >= slides.length) index = 0;
  else index = i;
  slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', () => showSlide(index - 1));
next.addEventListener('click', () => showSlide(index + 1));

// ================== DARK MODE ==================
const darkModeBtn = document.getElementById('dark-mode-toggle');
darkModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

// ================== SOSIAL FLOATING ==================
// CSS hover menangani tampilan, JS opsional jika mau toggle click

// ================== Optional: auto slide ==================
// setInterval(() => showSlide(index + 1), 5000);



