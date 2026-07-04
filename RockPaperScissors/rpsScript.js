let rock = document.getElementById("rock");
let paper = document.getElementById("paper");
let scissors = document.getElementById("scissors");
let userScore = 0;
let botScore = 0;

rock.addEventListener("click", function() {
    playGame("rock");
});

paper.addEventListener("click", function() {
    playGame("paper");
});

scissors.addEventListener("click", function() {
    playGame("scissors");
});

function playGame(userChoice) {

    let choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    let computerChoice = choices[randomIndex];

    if (userChoice === computerChoice) {
        resultBtn.innerText = "It's a Draw!";
    }
    else if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "paper" && computerChoice === "rock") ||
        (userChoice === "scissors" && computerChoice === "paper")
    ) {
        userScore++;
        userScorePara.innerText = userScore;
        resultBtn.innerText = `You Win! ${userChoice} beats ${computerChoice}`;
    }
    else {
        botScore++;
        botScorePara.innerText = botScore;
        resultBtn.innerText = `You Lose! ${computerChoice} beats ${userChoice}`;
    }
}
let resultBtn = document.querySelector(".result button");

let userScorePara = document.getElementById("userScore");
let botScorePara = document.getElementById("botScore");