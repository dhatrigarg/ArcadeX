const cells = document.querySelectorAll(".cell");

const pairsDisplay = document.getElementById("Pairs");
const movesDisplay = document.getElementById("Moves");
const timeDisplay = document.getElementById("Time");
const startButton = document.querySelector(".btn");

const emojis = ["🍎", "🍕", "🚀", "🐱", "⚽", "🎮", "🌈", "🔥", "🦄", "🍩"];

let cards = [];
let firstCard = null;
let secondCard = null;

let pairs = 0;
let moves = 0;

let lockBoard = false;
let gameStarted = false;

let seconds = 0;
let timer;

startButton.addEventListener("click", startGame);

function startGame() {
  pairs = 0;
  moves = 0;

  pairsDisplay.textContent = pairs;
  movesDisplay.textContent = moves;
  timeDisplay.textContent = "0:00";

  firstCard = null;
  secondCard = null;

  lockBoard = false;
  gameStarted = true;

  clearInterval(timer);

  seconds = 0;

  cards = [...emojis, ...emojis];

  cards.sort(() => Math.random() - 0.5);

  cells.forEach((cell, index) => {
    cell.textContent = "?";

    cell.dataset.emoji = cards[index];

    cell.classList.remove("flipped");
    cell.classList.remove("matched");

    cell.removeEventListener("click", flipCard);

    cell.addEventListener("click", flipCard);
  });

  timer = setInterval(() => {
    seconds++;

    let minutes = Math.floor(seconds / 60);

    let remainingSeconds = seconds % 60;

    remainingSeconds = remainingSeconds.toString().padStart(2, "0");

    timeDisplay.textContent = `${minutes}:${remainingSeconds}`;
  }, 1000);
}

function flipCard() {
  if (!gameStarted) {
    return;
  }

  if (lockBoard) {
    return;
  }

  if (this.classList.contains("flipped")) {
    return;
  }

  if (this.classList.contains("matched")) {
    return;
  }

  this.textContent = this.dataset.emoji;

  this.classList.add("flipped");

  if (firstCard === null) {
    firstCard = this;

    return;
  }

  secondCard = this;

  moves++;

  movesDisplay.textContent = moves;

  checkMatch();
}

function checkMatch() {
  const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;

  if (isMatch) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    pairs++;

    pairsDisplay.textContent = pairs;

    resetCards();

    if (pairs === 10) {
      clearInterval(timer);

      gameStarted = false;

      setTimeout(() => {
        alert(`🎉 You won!\nMoves: ${moves}\nTime: ${timeDisplay.textContent}`);
      }, 300);
    }
  } else {
    lockBoard = true;

    setTimeout(() => {
      firstCard.textContent = "?";
      secondCard.textContent = "?";

      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");

      resetCards();
    }, 800);
  }
}

function resetCards() {
  firstCard = null;
  secondCard = null;

  lockBoard = false;
}
