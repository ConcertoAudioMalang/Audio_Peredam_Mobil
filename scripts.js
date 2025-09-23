/* =======================================
   AOS INIT
======================================= */
AOS.init({ once: true, duration: 700 });

/* =======================================
   MOBILE NAV TOGGLE
======================================= */
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

if (navToggle && mobileMenu) {
  navToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

/* =======================================
   DARK MODE TOGGLE & PERSISTENT
======================================= */
const darkToggle = document.getElementById('darkToggle');
const htmlEl = document.documentElement;

// Set initial state from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
  htmlEl.classList.add('dark');
  if (darkToggle) darkToggle.checked = true;
  const dot = document.querySelector('label.relative.inline-block .dot');
  if (dot) dot.style.transform = 'translateX(24px)';
}

if (darkToggle) {
  darkToggle.addEventListener('change', () => {
    const dot = document.querySelector('label.relative.inline-block .dot');
    if (darkToggle.checked) {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      if (dot) dot.style.transform = 'translateX(24px)';
    } else {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      if (dot) dot.style.transform = 'translateX(0)';
    }
  });
}

/* =======================================
   SCROLL TO TOP BUTTON
======================================= */
const scrollTopBtn = document.getElementById('scrollTopBtn');

function toggleScrollBtn() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 300) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
}

window.addEventListener('scroll', toggleScrollBtn);
window.addEventListener('load', toggleScrollBtn);

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =======================================
   FLOATING BUTTONS ABOVE FOOTER
======================================= */
const floatButtons = document.getElementById('floatButtons');
const footer = document.querySelector('footer');

function adjustFloatButtons() {
  if (!footer || !floatButtons) return;
  const footerRect = footer.getBoundingClientRect();
  const gap = 16; // px gap above footer
  if (footerRect.top < window.innerHeight) {
    const overlap = window.innerHeight - footerRect.top;
    floatButtons.style.bottom = (overlap + gap) + 'px';
  } else {
    floatButtons.style.bottom = '1rem';
  }
}

window.addEventListener('scroll', adjustFloatButtons);
window.addEventListener('resize', adjustFloatButtons);
window.addEventListener('load', adjustFloatButtons);

/* =======================================
   COPYRIGHT YEAR AUTO-UPDATE
======================================= */
const copyrightEl = document.getElementById('copyright');
if (copyrightEl) {
  const year = new Date().getFullYear();
  copyrightEl.textContent = `© ${year} Concerto Audio Malang. All rights reserved.`;
}

/* =======================================
   SMALL ACCESSIBILITY FOCUS
======================================= */
(function() {
  let mouseDown = false;
  window.addEventListener('mousedown', () => mouseDown = true);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
    }
  });
})();
