document.addEventListener("DOMContentLoaded", () => {
  let index = 0;
  const slides = document.querySelectorAll(".slide");
  const slidesContainer = document.getElementById("slides");
  const total = slides.length;
  let sliderInterval = null;

  // --- Funciones base ---
  function showSlide() {
    index++;
    if (index >= total) index = 0;
    slidesContainer.style.transform = `translateX(-${index * 100}%)`;
    handleVideo();
  }

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
  function handleVideo() {
    const currentSlide = slides[index];
    const video = currentSlide.querySelector("video");

    if (video) {
      // Detener slider mientras el video está en pantalla
      stopSlider();

      // Intentar reproducir automáticamente
      video.muted = true;
      video.playsInline = true;
      video.currentTime = 0;
      video.play().catch(() => {
        console.log("Autoplay bloqueado, se reproducirá al hacer clic.");
      });

      // Cuando empiece realmente, pausar slider
      video.addEventListener("playing", () => stopSlider());

      // Si se pausa o termina, reanudar slider
      video.addEventListener("pause", () => {
        if (!video.ended) startSlider();
      });
      video.addEventListener("ended", () => startSlider());
    }
  }

  // --- Si un video empieza manualmente ---
  document.querySelectorAll("video").forEach(video => {
    video.addEventListener("play", stopSlider);
    video.addEventListener("pause", () => {
      if (!video.ended) startSlider();
    });
    video.addEventListener("ended", startSlider);
  });

  // --- Iniciar el slider ---
  startSlider();
});
