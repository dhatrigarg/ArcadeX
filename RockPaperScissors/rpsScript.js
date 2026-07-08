
let Rock = document.getElementById("rock");
let Paper = document.getElementById("paper");
let Scissors = document.getElementById("scissors");
let resultBtn = document.querySelector(".btn");
let playerScore = document.getElementById("playerScore");
let computerScore = document.getElementById("computerScore");
let winScore = document.getElementById("winRate")
let userScore = 0;
let botScore = 0;
let winPercent = 0;

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