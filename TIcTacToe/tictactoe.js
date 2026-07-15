let tttBoxes = document.querySelectorAll(".gamebox");
let currentPlayer = "X";

let chanceOf = document.getElementById("chanceOf");
let status = document.getElementById("status");

let resetBtn = document.querySelector(".btn");

let gameOver = false;

let player1Score = document.getElementById("player1Score");
let player1 = 0;
let player2Score = document.getElementById("player2Score");
let player2 = 0;
let drawScore = document.getElementById("drawScore");
let draw = 0;


tttBoxes.forEach(function(tttBox) {
    tttBox.addEventListener("click", () => {
        if (gameOver) return;
        if (tttBox.innerText !== "") return ;

        tttBox.innerText = currentPlayer;

        if (currentPlayer === "X") {
            tttBox.classList.add("x");
        } else {
            tttBox.classList.add("o");
        }

        let winner = checkWinner();
        if (winner) {
            resetBtn.innerText = `Player ${winner} wins! Tap to play a new game.`;
            gameOver=true;
            status.innerText = "Game Over";
            if (winner === "X"){
                player1++;
                player1Score.innerText=player1;
            } else {
                player2++;
                player2Score.innerText=player2;
            }
            return;
        }

        if(checkDraw()){
            resetBtn.innerText = "Its a Draw! Tap to play again.";
            gameOver = true;
            status.innerText = "Game Over";
            draw++;
            drawScore.innerText = draw ;
            return;
        }

        currentPlayer = currentPlayer === "X"?"O":"X";
        chanceOf.innerText = currentPlayer;
    })
})

resetBtn.addEventListener("click",() => {
    resetBtn.innerText = "Reset Game";
    gameOver = false;
    
    tttBoxes.forEach(function(tttBox){
        tttBox.innerText = "";
        tttBox.classList.remove("x", "o");
    })
    
    currentPlayer = "X";
    chanceOf.innerText = currentPlayer;
    status.innerText = `Player ${currentPlayer} turn`
})


const winnerPattern = [ 
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]];

function checkWinner() {
    for (let pattern of winnerPattern){
        let [a,b,c] = pattern;

        if (tttBoxes[a].innerText !== "" &&
            tttBoxes[a].innerText === tttBoxes[b].innerText &&
            tttBoxes[a].innerText === tttBoxes[c].innerText
        )
        return tttBoxes[a].innerText;
    }
    return null;
}

function checkDraw() {
    for (let tttBox of tttBoxes) {
        if (tttBox.innerText === "") {
            return false;
        }
    }
    return true;
}