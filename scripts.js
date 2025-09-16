document.querySelectorAll(".slides img")
  
<script>
let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let slides = document.querySelectorAll(".slides img");
  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }

  slides.forEach(slide => slide.classList.remove("active"));
  slides[slideIndex].classList.add("active");
}







