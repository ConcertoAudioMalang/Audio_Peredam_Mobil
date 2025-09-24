// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  darkToggle.textContent = document.documentElement.classList.contains("dark") ? "☀️" : "🌙";
});

// Slider logic
function setupSlider(containerId, prevId, nextId) {
  const slider = document.getElementById(containerId);
  const prevBtn = document.getElementById(prevId);
  const nextBtn = document.getElementById(nextId);
  let index = 0;

  const updateSlide = () => {
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  nextBtn.addEventListener("click", () => {
    if (index < slider.children.length - 1) index++;
    else index = 0;
    updateSlide();
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) index--;
    else index = slider.children.length - 1;
    updateSlide();
  });
}

// Init sliders
setupSlider("produkSlider", "produkPrev", "produkNext");
setupSlider("galeriSlider", "galeriPrev", "galeriNext");
