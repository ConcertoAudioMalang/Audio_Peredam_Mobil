document.addEventListener("DOMContentLoaded", () => {
  // ================== SIDEBAR ==================
  const details = document.querySelector("details");
  const closeBtn = document.querySelector(".close-btn");

  if (closeBtn && details) {
    closeBtn.addEventListener("click", () => {
      details.removeAttribute("open"); // tutup sidebar
    });
  }

  // Klik link sidebar juga tutup sidebar
  document.querySelectorAll(".sidebar ul li a").forEach(link => {
    link.addEventListener("click", () => {
      if (details) details.removeAttribute("open");
    });
  });

  // ================== PRODUK FILTER ==================
  const tabs = document.querySelectorAll(".brand-tabs .tab");
  const produkLists = document.querySelectorAll(".produk-list");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.brand; // sesuaikan dengan HTML
      produkLists.forEach(list => {
        if(list.classList.contains(target)) {
          list.classList.add("active");
        } else {
          list.classList.remove("active");
        }
      });
    });
  });

  // ================== GALERI SLIDER ==================
  const slidesWrapper = document.querySelector(".slides-wrapper");
  const slides = document.querySelectorAll(".slides-wrapper img");
  const prev = document.querySelector(".slider .prev");
  const next = document.querySelector(".slider .next");
  let index = 0;

  function showSlide(i) {
    if (i < 0) index = slides.length - 1;
    else if (i >= slides.length) index = 0;
    else index = i;
    slidesWrapper.style.transform = `translateX(-${index * 100}%)`;
  }

  if (prev && next && slidesWrapper) {
    prev.addEventListener("click", () => showSlide(index - 1));
    next.addEventListener("click", () => showSlide(index + 1));

    // auto slide setiap 5 detik
    setInterval(() => {
      showSlide(index + 1);
    }, 5000);
  }

  showSlide(index);

  // ================== DARK MODE ==================
  const darkToggle = document.getElementById("dark-mode-toggle");
  if (darkToggle) {
    darkToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
});
