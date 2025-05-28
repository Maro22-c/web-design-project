const header = document.querySelector(".navbar");

function updateNavbarScroll() {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateNavbarScroll);
window.addEventListener("DOMContentLoaded", updateNavbarScroll);
