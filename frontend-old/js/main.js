// assets/js/main.js
// Header Scroll Effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Initialize Swiper
const swiper = new Swiper(".swiper-container", {
  loop: true,
  autoplay: { delay: 5000, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
