// Smooth scroll untuk link navigasi
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    window.scrollTo({
      top: target.offsetTop - 60,
      behavior: 'smooth'
    });
  });
});

// Highlight menu aktif saat scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Animasi fade-in untuk produk
const produkCards = document.querySelectorAll(".produk-card");

function fadeInOnScroll() {
  const triggerBottom = window.innerHeight * 0.85;

  produkCards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;

    if (cardTop < triggerBottom) {
      card.classList.add("show");
    }
  });
}

window.addEventListener("scroll", fadeInOnScroll);
window.addEventListener("load", fadeInOnScroll);
