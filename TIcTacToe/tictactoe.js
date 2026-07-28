let tttBoxes = document.querySelectorAll(".gamebox");
let currentPlayer = "X";

let chanceOf = document.getElementById("chanceOf");
let status = document.getElementById("status");

let resetBtn = document.querySelector(".btn");
let modeButtons = document.querySelectorAll(".playerNumber button");

let player1Score = document.getElementById("player1Score");
let player1 = 0;
let player2Score = document.getElementById("player2Score");
let player2 = 0;
let drawScore = document.getElementById("drawScore");
let draw = 0;

let gameOver = false;
let isComputerMode = false;
let isComputerThinking = false;

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    modeButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (btn.innerText.includes("Computer")) {
      isComputerMode = true;
    } else {
      isComputerMode = false;
    }
  });
});

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

function isDraw() {
    resetBtn.innerText = "Its a Draw! Tap to play again.";
    gameOver = true;
    isComputerThinking = false;
    status.innerText = "Game Over";
    draw++;
    drawScore.innerText = draw ;
    return;
}

function isWinner(winner) {
    resetBtn.innerText = `Player ${winner} wins! Tap to play a new game.`;
    gameOver=true;
    isComputerThinking = false;
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

tttBoxes.forEach(function(tttBox) {
    tttBox.addEventListener("click", () => {
        if (gameOver) return;
        if (tttBox.innerText !== "") return;
        if (isComputerThinking) return;
        if (isComputerMode && currentPlayer === "O") return;

        tttBox.innerText = currentPlayer;
        tttBox.classList.add(currentPlayer === "X" ? "x" : "o");
        

        let winner = checkWinner();
        if (winner) {
            isWinner(winner)
            return;
        }

        if(checkDraw()){
            isDraw()
            return;
        }

        currentPlayer = currentPlayer === "X"?"O":"X";
        chanceOf.innerText = currentPlayer;

        if (isComputerMode && currentPlayer === "O") {
            isComputerThinking = true;
            setTimeout(computerMove, 400);
        }
    })
})

function computerMove() {
    if (!isComputerThinking) return;

    try {
        const board = getBoardState();
        if (!board.includes("")) return;

        let bestMove = minimax(board, "O").index;
        let box = tttBoxes[bestMove];
        box.innerText = "O";
        box.classList.add("o");

        let winner = checkWinner();
        if (winner) {
            isWinner(winner);
            return;
        }

        if (checkDraw()) {
            isDraw();
            return;
        }

        currentPlayer = "X";
        chanceOf.innerText = currentPlayer;
    } finally {
        isComputerThinking = false;
    }
}

function getBoardState() {
    return Array.from(tttBoxes).map(box => box.innerText);
}

function minimax(board, player) {
    let emptySpots = board
        .map((val, i) => val === "" ? i : null)
        .filter(v => v !== null);

    if (checkWinnerForBoard(board, "X")) return { score: -10 };
    if (checkWinnerForBoard(board, "O")) return { score: 10 };
    if (emptySpots.length === 0) return { score: 0 };

    let moves = [];

    for (let i = 0; i < emptySpots.length; i++) {
        let move = {};
        move.index = emptySpots[i];

        board[emptySpots[i]] = player;

        if (player === "O") {
            let result = minimax(board, "X");
            move.score = result.score;
        } else {
            let result = minimax(board, "O");
            move.score = result.score;
        }

        board[emptySpots[i]] = "";
        moves.push(move);
    }

    let bestMove;

    if (player === "O") {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}

function checkWinnerForBoard(board, player) {
    return winnerPattern.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}

resetBtn.addEventListener("click",() => {
    resetBtn.innerText = "Reset Game";
    gameOver = false;
    isComputerThinking = false;
    
    tttBoxes.forEach(function(tttBox){
        tttBox.innerText = "";
        tttBox.classList.remove("x", "o");
    })
    
    currentPlayer = "X";
    chanceOf.innerText = currentPlayer;
    status.innerText = `Player ${currentPlayer} turn`
})
