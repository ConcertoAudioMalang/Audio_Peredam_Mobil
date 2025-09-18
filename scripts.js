document.addEventListener("DOMContentLoaded", () => {

  /* ===== SIDEBAR ===== */
  const hamburger = document.getElementById("tl-hamburger");
  const sidebar = document.getElementById("tl-sidebar");
  const closeBtn = document.getElementById("tl-closeBtn");

  hamburger.addEventListener("click", () => { sidebar.style.width="250px"; });
  closeBtn.addEventListener("click", () => { sidebar.style.width="0"; });

  let startX = 0;
  sidebar.addEventListener('touchstart', (e) => startX = e.touches[0].clientX );
  sidebar.addEventListener('touchmove', (e) => { if(e.touches[0].clientX-startX<-50) sidebar.style.width="0"; });

  /* ===== SLIDER GALERI ===== */
  const slides = document.querySelectorAll('.slides-wrapper img');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  let currentIndex = 0;

  function showSlide(index){
    if(index<0) index = slides.length-1;
    if(index>=slides.length) index =0;
    document.querySelector('.slides-wrapper').style.transform=`translateX(-${index*100}%)`;
    currentIndex=index;
  }

  prev.addEventListener('click', ()=>showSlide(currentIndex-1));
  next.addEventListener('click', ()=>showSlide(currentIndex+1));

  /* ===== SOSIAL FLOATING ICONS ===== */
  const mainIcon = document.querySelector('.main-icon');
  const socialIcons = document.querySelector('.social-icons');
  mainIcon.addEventListener('click', ()=>{ 
    if(socialIcons.style.opacity=="1"){ socialIcons.style.opacity="0"; socialIcons.style.pointerEvents="none"; }
    else { socialIcons.style.opacity="1"; socialIcons.style.pointerEvents="auto"; }
  });

});
