let cells = document.querySelectorAll(".cell");

let maxTile = 0;
let maxTileShow = document.getElementById("maxTile")

let score = 0;
let scoreShow = document.getElementById("Score");

let moves = 0;
let movesShow = document.getElementById("Moves");

let btn = document.querySelector(".btn");

hasWon=false;

const board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];

startGame();

function startGame(){
    generateTiles();
    generateTiles();

    updateUI();
};

function generateTiles(){

    let emptyTiles=[];

    for (let i=0 ; i<4 ; i++){
        for (let j=0 ; j<4 ; j++){
            if (board[i][j]===0){
                emptyTiles.push({i,j});
            }
        }
    }

    if (emptyTiles.length === 0) return ;

    let randomCell = emptyTiles[Math.floor(Math.random()*emptyTiles.length)];
    board[randomCell.i][randomCell.j] = Math.random() < 0.9 ? 2 : 4 ;

    if (board[randomCell.i][randomCell.j] > maxTile){
        maxTile = board[randomCell.i][randomCell.j];
        maxTileShow.innerText = maxTile;
    }
}

function updateUI(){
    for (let i = 0 ; i < 4 ; i++){
        for (let j = 0 ; j < 4 ; j++){

            let index = i*4+j;
            let value = board[i][j];

            cells[index].innerText = value === 0 ? "" : value ;
        }
    }   
}

document.addEventListener("keydown", (e) => {
    if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key)){
        e.preventDefault();
        handleKey(e);
    }
});

function handleKey(e){

    let oldBoard = JSON.stringify(board);

    if (e.key === "ArrowLeft") moveLeft();
    else if (e.key === "ArrowRight") moveRight();
    else if (e.key === "ArrowUp") moveUp();
    else if (e.key === "ArrowDown") moveDown();

    if (JSON.stringify(board) !== oldBoard){
        moves++;
        movesShow.innerText = moves;
        generateTiles();
    }
    updateUI();
    
    checkGameOver();
}

function move(){
    for( let i=0 ; i < 4 ; i++){
        let row = board[i].filter(val => val!==0);

        for (let j = 0 ; j< row.length -1 ; j++){
            if (row[j]===row[j+1]){
                row[j] *= 2;

                score+= row[j];
                scoreShow.innerText = score;
                
                if (row[j] > maxTile){
                    maxTile = row[j];
                    maxTileShow.innerText = maxTile;
                }

                if (row[j] === 2048){
                    hasWon = true;
                    btn.innerText = "You Win! Tap to play again."
                    return;
                }

                row[j+1] = 0;
            }
        }

        row = row.filter(val => val !== 0);

        while (row.length < 4){
            row.push(0);
        }

        board[i] = row ;
    }
}

function moveLeft(){
    move();
}

function moveRight(){

    for (let i = 0; i < 4; i++){
        board[i].reverse();
    }

    move();

    for (let i = 0; i < 4; i++){
        board[i].reverse();
    }
}

function transpose(){
    for (let i = 0; i < 4; i++){
        for (let j = i + 1; j < 4; j++){

            let temp = board[i][j];
            board[i][j] = board[j][i];
            board[j][i] = temp;
        }
    }
}

function moveUp(){
    transpose();
    move();
    transpose();
}

function moveDown() {
    transpose();
    moveRight();
    transpose();   
}

function isBoardFull(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(board[i][j] === 0){
                return false;
            }
        }
    }
    return true;
}

function canMove(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){

            if(j < 3 && board[i][j] === board[i][j+1]){
                return true;
            }

            if(i < 3 && board[i][j] === board[i+1][j]){
                return true;
            }
        }
    }
    return false;
}

function checkGameOver(){
    if(isBoardFull() && !canMove()){
        btn.innerText = "Game Over! Tap to play again.";
        return;
    }
}

btn.addEventListener("click",resetGame);

function resetGame(){

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            board[i][j] = 0;
        }
    }

    btn.innerText = "Reset game";

    score = 0;
    scoreShow.innerText = score;
    moves = 0;
    movesShow.innerText = moves;
    maxTile = 0;
    maxTileShow.innerText = maxTile;
    hasWon = false;

    generateTiles();
    generateTiles();

    updateUI();
}

// Touch screen logic added

let startX = 0, startY = 0;

document.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener("touchend", function (e) {
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;

    let dx = endX - startX;
    let dy = endY - startY;

    if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

    if (Math.abs(dx) > Math.abs(dy)) {
        dx > 0 ? moveRight() : moveLeft();
    } else {
        dy > 0 ? moveDown() : moveUp();
    }
});