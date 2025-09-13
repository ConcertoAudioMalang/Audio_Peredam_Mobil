// scripts.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Website loaded successfully");
});
document.querySelectorAll("a[data-link]").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const url = this.getAttribute("href");

    document.body.style.opacity = "0";

    setTimeout(() => {
      fetch(url)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          const newContent = doc.querySelector("div");

          document.querySelector("#content").innerHTML = newContent.innerHTML;
          window.history.pushState({}, "", url);
          document.body.style.opacity = "1";
        });
    }, 300);
  });
});

window.addEventListener("popstate", () => {
  fetch(window.location.pathname)
    .then(res => res.text())
    .then(html => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const newContent = doc.querySelector("div");
      document.querySelector("#content").innerHTML = newContent.innerHTML;
    });
});
