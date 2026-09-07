const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const newGameBtn = document.getElementById("newGame");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click",cellClicked);
});

restartBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);

function cellClicked(){

    const index = this.dataset.index;

    if(board[index]!=="" || !gameActive) return;

    board[index]=currentPlayer;
    this.textContent=currentPlayer;

    checkWinner();
}

function checkWinner(){

    for(let pattern of winPatterns){

        let a=pattern[0];
        let b=pattern[1];
        let c=pattern[2];

        if(
            board[a] &&
            board[a]===board[b] &&
            board[a]===board[c]
        ){

            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            statusText.textContent=`Player ${currentPlayer} Wins!`;

            popup.style.display="flex";
            popupMessage.innerHTML=`🏆 Player <b>${currentPlayer}</b> Wins!`;

            gameActive=false;
            return;
        }
    }

    if(!board.includes("")){
        statusText.textContent="It's a Draw!";
        popup.style.display="flex";
        popupMessage.innerHTML="🤝 It's a Draw!";
        gameActive=false;
        return;
    }

    currentPlayer=currentPlayer==="X"?"O":"X";

    statusText.textContent=`Player ${currentPlayer}'s Turn`;
}

function resetGame(){

    board=["","","","","","","","",""];

    currentPlayer="X";
    gameActive=true;

    statusText.textContent="Player X's Turn";

    popup.style.display="none";

    cells.forEach(cell=>{
        cell.textContent="";
        cell.classList.remove("win");
    });
}