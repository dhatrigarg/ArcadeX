let resumeBtn = document.querySelector(".btn");
let isPaused = true;

resumeBtn.addEventListener("click", () => {
  if (isPaused) {
    resumeBtn.innerHTML = '<i class="fa-solid fa-pause"></i> Resume Game';
  } else {
    resumeBtn.innerHTML = '<i class="fa-solid fa-play"></i> Start Game';
  }
  isPaused = !isPaused;
});
