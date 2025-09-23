// AOS init
AOS.init({ once:true, duration:700 });

// Mobile menu toggle
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
navToggle?.addEventListener('click', ()=> mobileMenu.classList.toggle('hidden'));

// Dark mode persistent
const darkToggle = document.getElementById('darkToggle');
if(localStorage.getItem('theme')==='dark') document.body.classList.add('dark'), darkToggle.checked=true;
darkToggle?.addEventListener('change',()=>{
  if(darkToggle.checked) document.body.classList.add('dark'), localStorage.setItem('theme','dark');
  else document.body.classList.remove('dark'), localStorage.setItem('theme','light');
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll',()=>{ scrollTopBtn.style.display = window.scrollY>300?'flex':'none'; });
scrollTopBtn?.addEventListener('click',()=> window.scrollTo({top:0,behavior:'smooth'}));

// Auto copyright year
const year = new Date().getFullYear();
document.getElementById('copyright').textContent=`© ${year} Concerto Audio Malang. All rights reserved.`;
