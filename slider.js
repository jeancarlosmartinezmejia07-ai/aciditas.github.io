document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.getElementById("slides");
  const total = slides.length;

  let sliderInterval;

  function showSlide() {
    index++;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
  }

  function startSlider() {
    sliderInterval = setInterval(showSlide, 4000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // Iniciar el slider automáticamente
  startSlider();

  // Detectar si hay un video dentro del slider
  const video = document.querySelector(".slide video");

  if (video) {
    // Cuando el video se reproduce, detenemos el slider
    video.addEventListener("play", stopSlider);

    // Cuando el video se pausa o termina, reanudamos el slider
    video.addEventListener("pause", startSlider);
    video.addEventListener("ended", startSlider);
  }
});
