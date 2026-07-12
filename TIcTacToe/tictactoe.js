let tttBoxes = document.querySelectorAll(".gamebox");
let currentPlayer = "X";
let chanceOf = document.getElementById("chanceOf");
let resetBtn = document.querySelector(".btn");

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
        chanceOf.innerText = currentPlayer;
    })
})

resetBtn.addEventListener("click",() => {
    tttBoxes.forEach(function(tttBox){
        tttBox.innerText = "";
        tttBox.classList.remove("x", "o");

        currentPlayer = "X";
        chanceOf.innerText = currentPlayer;
    })
})
