let cells = document.querySelectorAll(".cell");

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