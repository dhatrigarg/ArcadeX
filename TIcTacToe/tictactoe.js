let tttBoxes = document.querySelectorAll(".gamebox");
let currentPlayer = "X"

tttBoxes.forEach(function(tttBox) {
    tttBox.addEventListener("click", () => {
        if (tttBox.innerText !== "") return ;

        tttBox.innerText = currentPlayer;

        if (currentPlayer === "X") {
            tttBox.classList.add("x");
        } else {
            tttBox.classList.add("o");
        }

        currentPlayer = currentPlayer === "X"?"O":"X";
    })
})