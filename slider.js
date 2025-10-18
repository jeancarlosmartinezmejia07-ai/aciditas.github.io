document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.getElementById("slides");
  const total = slides.length;
  let sliderInterval = null;

  // --- Función que cambia de slide ---
  function showSlide() {
    index++;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    checkForVideo();
  }

  // --- Iniciar y detener el slider ---
  function startSlider() {
    if (!sliderInterval) {
      sliderInterval = setInterval(showSlide, 4000);
    }
  }

  function stopSlider() {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  }

  // --- Revisar si el slide visible tiene un video ---
  function checkForVideo() {
    const currentSlide = slides[index];
    const video = currentSlide.querySelector("video");

    if (video) {
      // Detener el slider
      stopSlider();

      // Reiniciar el video y reproducirlo
      video.currentTime = 0;
      video.play();

      // Cuando termina el video, reanudar el slider
      video.onended = () => {
        startSlider();
      };

      // Si el usuario pausa manualmente, reanudar slider
      video.onpause = () => {
        if (!video.ended) startSlider();
      };
    }
  }

  // --- Detectar si un video empieza a reproducirse manualmente ---
  const allVideos = document.querySelectorAll("video");
  allVideos.forEach(video => {
    video.addEventListener("play", () => {
      stopSlider();
    });
    video.addEventListener("pause", () => {
      if (!video.ended) startSlider();
    });
    video.addEventListener("ended", () => {
      startSlider();
    });
  });

  // --- Iniciar slider ---
  startSlider();
});
