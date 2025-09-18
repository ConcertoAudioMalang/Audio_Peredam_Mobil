// Hamburger & Sidebar
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const closeBtn = document.getElementById('closeBtn');

hamburger.addEventListener('click', () => sidebar.style.left = '0');
closeBtn.addEventListener('click', () => sidebar.style.left = '-250px');

// Slider
const slides = document.querySelector('.slides');
const slideImages = document.querySelectorAll('.slides img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
let index = 0;

function showSlide(i){
  if(i<0) index = slideImages.length-1;
  else if(i>=slideImages.length) index=0;
  else index=i;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

prev.addEventListener('click', ()=> showSlide(index-1));
next.addEventListener('click', ()=> showSlide(index+1));
