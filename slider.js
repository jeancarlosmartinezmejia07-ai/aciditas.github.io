document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.getElementById("slides");
  const total = slides.length;

  function showSlide() {
    index++;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  setInterval(showSlide, 4000); // Cambia cada 4 segundos
});