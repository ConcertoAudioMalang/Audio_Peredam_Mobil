// Toggle Sidebar
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');

hamburger.addEventListener('click', () => {
  sidebar.style.left = sidebar.style.left === '0px' ? '-250px' : '0px';
});

// Slider Functionality
const slides = document.querySelector('.slides');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let currentIndex = 0;

function updateSlidePosition() {
  const slideWidth = slides.children[0].clientWidth;
  slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? slides.children.length - 1 : currentIndex - 1;
  updateSlidePosition();
});

nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex === slides.children.length - 1) ? 0 : currentIndex
::contentReference[oaicite:0]{index=0}
 
