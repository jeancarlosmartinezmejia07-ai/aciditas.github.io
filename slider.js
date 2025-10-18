document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.getElementById("slides");
  const total = slides.length;
  let sliderInterval;

  // --- Funciones del slider ---
  function showSlide() {
    index++;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    checkForVideo();
  }

  function startSlider() {
    sliderInterval = setInterval(showSlide, 4000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  // --- Revisión del video dentro del slide visible ---
  function checkForVideo() {
    const currentSlide = slides[index];
    const video = currentSlide.querySelector("video");

    if (video) {
      // Detener slider y reproducir video
      stopSlider();
      video.currentTime = 0;
      video.play();

      // Cuando termine el video, reanudar el slider
      video.onended = () => {
        startSlider();
      };

      // Si el usuario pausa el video, también reanudar el slider
      video.onpause = () => {
        if (!video.ended) startSlider();
      };
    }
  }

  // --- Iniciar slider ---
  startSlider();

  // --- Si el usuario manualmente da play al video ---
  const videos = document.querySelectorAll("video");
  videos.forEach(video => {
    video.addEventListener("play", stopSlider);
    video.addEventListener("pause", () => {
      if (!video.ended) startSlider();
    });
    video.addEventListener("ended", startSlider);
  });
});

