let Rock = document.getElementById("rock");
let Paper = document.getElementById("paper");
let Scissors = document.getElementById("scissors");

let playerScore = document.getElementById("playerScore");
let userScore = 0;

let computerScore = document.getElementById("computerScore");
let botScore = 0;

let winScore = document.getElementById("winRate")
let winPercent = 0;

let resultBtn = document.querySelector(".btn");

let playerChoice = document.getElementById("playerChoice");
let compChoice = document.getElementById("compChoice");

rock.addEventListener("click", function() {
    playGame("Rock");
});
paper.addEventListener("click", function() {
    playGame("Paper");
});
scissors.addEventListener("click", function() {
    playGame("Scissors");
});
        
function playGame(userChoice) {
    
    let choice_list=["Rock", "Paper", "Scissors"];
    let randomIndex = Math.floor(Math.random() * 3);
    let computerChoice = choice_list[randomIndex];

    playerChoice.innerText = `Player : ${userChoice}`;
    compChoice.innerText = `Computer : ${computerChoice}`;

    if (userChoice === computerChoice) {
        resultBtn.innerText = "Its a Draw";
    } else if (
        (userChoice==="Rock" && computerChoice==="Scissors")  || 
        (userChoice==="Paper" && computerChoice==="Rock") || 
        (userChoice==="Scissors" && computerChoice==="Paper")){
        resultBtn.innerText = `You win! ${userChoice} beats ${computerChoice}. `;
        userScore++;
        playerScore.innerText = userScore;
    } else {
        resultBtn.innerText = `You Lose! ${computerChoice} beats ${userChoice}`;
        botScore++;
        computerScore.innerText = botScore;
    }

    if (userScore!=0) {
        winPercent=((userScore*100)/(userScore+botScore)).toFixed(2);
        winScore.innerText=winPercent;
    }
}