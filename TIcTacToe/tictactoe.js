let boxes = document.querySelectorAll(".box");
let statusText = document.getElementById("status");
let resetBtn = document.getElementById("reset");
let currentPlayer = "X";

boxes.forEach(function(box) {
    box.addEventListener("click", function() {

        if (box.innerText !== "") return;

        box.innerText = currentPlayer;

        let winner = checkWinner();

        if (winner) {
            statusText.innerText = `Player ${winner} Wins!`;
            boxes.forEach(b => b.style.pointerEvents = "none");
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.innerText = `Player ${currentPlayer} Turn`;
    });
});

let winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner() {

    for (let pattern of winPatterns) {

        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 !== "" && val1 === val2 && val2 === val3) {
            return val1;
        }
    }

    return null;
}

resetBtn.addEventListener("click", function() {
    boxes.forEach(box => box.innerText = "");
    currentPlayer = "X";
    statusText.innerText = "Player X Turn";

    boxes.forEach(b => b.style.pointerEvents = "auto");
});


