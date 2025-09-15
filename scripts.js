// Simple fade-in animation on scroll for sections
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, options);

  sections.forEach(section => {
    section.classList.add('fade-out');
    observer.observe(section);
  });
});
