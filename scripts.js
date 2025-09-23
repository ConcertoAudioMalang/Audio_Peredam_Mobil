// ===== AOS ANIMATION INIT =====
AOS.init({
  duration: 700,
  once: true
});

// ===== MOBILE MENU TOGGLE =====
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if(navToggle && mobileMenu){
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// ===== DARK MODE PERSISTENT =====
const darkToggle = document.getElementById('darkToggle');
const body = document.body;

// Init theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if(savedTheme === 'dark' || (!savedTheme && prefersDark)){
  body.classList.add('dark');
  if(darkToggle) darkToggle.checked = true;
}

if(darkToggle){
  darkToggle.addEventListener('change', () => {
    if(darkToggle.checked){
      body.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      body.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
  });
}

// ===== SCROLL-TO-TOP BUTTON =====
const scrollBtn = document.getElementById('scrollTopBtn');

function toggleScrollBtn(){
  if(window.scrollY > 300){
    scrollBtn.style.display = 'flex';
  } else {
    scrollBtn.style.display = 'none';
  }
}
window.addEventListener('scroll', toggleScrollBtn);
window.addEventListener('load', toggleScrollBtn);

if(scrollBtn){
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({top:0, behavior:'smooth'});
  });
}

// ===== FLOAT BUTTONS ABOVE FOOTER =====
const floatButtons = document.getElementById('floatButtons');
const footer = document.querySelector('footer');

function adjustFloatButtons(){
  if(!footer || !floatButtons) return;
  const footerRect = footer.getBoundingClientRect();
  const gap = 16; // px above footer
  if(footerRect.top < window.innerHeight){
    floatButtons.style.bottom = (window.innerHeight - footerRect.top + gap) + 'px';
  } else {
    floatButtons.style.bottom = '1rem';
  }
}
window.addEventListener('scroll', adjustFloatButtons);
window.addEventListener('resize', adjustFloatButtons);
window.addEventListener('load', adjustFloatButtons);

// ===== COPYRIGHT AUTO YEAR =====
const copyrightEl = document.getElementById('copyright');
if(copyrightEl){
  const year = new Date().getFullYear();
  copyrightEl.textContent = `© ${year} Concerto Audio Malang. All rights reserved.`;
}
