// SIDEBAR CLOSE BUTTON
const closeBtn = document.querySelector('.close-btn');
const details = document.querySelector('details');
closeBtn.addEventListener('click', () => { details.removeAttribute('open'); });

// PRODUK TAB FILTER
const tabs = document.querySelectorAll('.brand-tabs .tab');
const produkLists = document.querySelectorAll('.produk-list');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active tab
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show correct produk list
    const brand = tab.dataset.brand;
    produkLists.forEach(list => {
      if(list.classList.contains(brand)) list.classList.add('active');
      else list.classList.remove('active');
    });
  });
});

// GALERI SLIDER
const slidesWrapper = document.querySelector('.slides-wrapper');
const slides = document.querySelectorAll('.slides-wrapper img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let index = 0;

function showSlide(i) {
  if(i < 0) index = slides.length - 1;
  else if(i >= slides.length) index = 0;
  else index = i;
  slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', () => { showSlide(index-1); });
next.addEventListener('click', () => { showSlide(index+1); });

// DARK MODE TOGGLE
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
