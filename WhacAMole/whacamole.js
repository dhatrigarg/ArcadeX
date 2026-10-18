const cells = document.querySelectorAll(".cell");

const scoreDisplay = document.getElementById("Score");
const timeDisplay = document.getElementById("Time");
const hitsDisplay = document.getElementById("Moves");

const startButton = document.querySelector(".btn");

let score = 0;
let successfulHits = 0;
let timeLeft = 30;

let gameRunning = false;

let timerInterval;
let moleInterval;

const moleImage = "mole_arcadeX.png";

function showMole(cell) {
  cell.innerHTML = "";

  const img = document.createElement("img");

  img.src = moleImage;
  img.alt = "Mole";

  img.style.width = "85%";
  img.style.height = "85%";
  img.style.objectFit = "contain";
  img.style.pointerEvents = "none";

  cell.appendChild(img);

  cell.classList.add("mole");
}

function hideMole(cell) {
  cell.innerHTML = "";
  cell.classList.remove("mole");
}

function spawnMoles() {
  if (!gameRunning) return;

  cells.forEach((cell) => hideMole(cell));

  const numberOfMoles = Math.floor(Math.random() * 4) + 1;

  const positions = Array.from(
    { length: cells.length },
    (_, index) => index
  );

  positions.sort(() => Math.random() - 0.5);

  for (let i = 0; i < numberOfMoles; i++) {
    showMole(cells[positions[i]]);
  }
}

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (!gameRunning) return;

    if (cell.classList.contains("mole")) {
      hideMole(cell);

      score = score + 10;
      successfulHits++;

      scoreDisplay.textContent = score;
      hitsDisplay.textContent = successfulHits;
    }
  });
});

function updateTimer() {
  timeLeft--;

  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    endGame();
  }
}

function startGame() {
  clearInterval(timerInterval);
  clearInterval(moleInterval);

  score = 0;
  successfulHits = 0;
  timeLeft = 30;

  scoreDisplay.textContent = score;
  hitsDisplay.textContent = successfulHits;
  timeDisplay.textContent = timeLeft;

  gameRunning = true;

  startButton.textContent = "Restart Game";

  spawnMoles();

  moleInterval = setInterval(spawnMoles, 800);

  timerInterval = setInterval(updateTimer, 1000);
}

function endGame() {
  gameRunning = false;

  clearInterval(timerInterval);
  clearInterval(moleInterval);

  cells.forEach((cell) => hideMole(cell));

  startButton.textContent = "Play Again";

  alert(
    `Game Over!\n\nFinal Score: ${score}\nSuccessful Hits: ${successfulHits}`
  );

  
timeDisplay.textContent = "30";
scoreDisplay.textContent = "0";
hitsDisplay.textContent = "0";
}

startButton.addEventListener("click", startGame);

timeDisplay.textContent = "30";
scoreDisplay.textContent = "0";
hitsDisplay.textContent = "0";