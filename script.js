const squares = document.querySelectorAll("[data-square]");
const text = document.querySelector("[data-current-player-text]")
const button = document.querySelector("[data-restart-button]");

let player = "X"

// creating the board
let board = ["", "", "",
    "", "", "",
    "", "", ""]

// all the possible ways of winning the game
const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


let gameOver = false;

// will execute function handleclick when page is loaded.
document.addEventListener("DOMContentLoaded", handleClick);


function handleClick() {
    //if game is not over
    if (gameOver === false) {
        //text will show current player
        text.textContent = `Player  ${player === "X" ? "O" : "X"} turn.`

        /* if a square is clicked, it will execute a function.
         if it was already clicked will not execute*/
        squares.forEach(square => {
            square.addEventListener("click", placeMark, { once: true })
        });
        squares.forEach(square => {
            square.addEventListener("click", gamePlay, { once: true })
        });
    }
}
// click on button call restart function
button.onclick = () => restartGame();

// function to place X or O, change player text and add a css class to a square
function placeMark(e) {
    if (gameOver === false) {
        clickedSquare = e.target;

        player = player === "X" ? "O" : "X";
        text.textContent = `Player  ${player  === "X" ? "O" : "X"}  turn`;

        if (clickedSquare.textContent === "") {
            clickedSquare.textContent = player;
            clickedSquare.classList.add("clicked");
        }
    }
}

/* in this function we use the square id as the index / position of board
   and put the mark in that position */
function gamePlay(e) {
    let squaredId = e.target.id
    board[squaredId] = player;
    checkWin(winningCondition)
}

function checkWin(winningCondition) {
    gameOver = false;
    // if all squares were clicked and nobody wins, the game is over
    if (board.every(square => square !== "")) {
        text.textContent = "There is no winner. Play again";
        gameOver = true
    }

    //for loop to check all arrays inside winning condition array.
    for (let i = 0; i < winningCondition.length; i++) {
        //selecting the three positions 
        let pos = winningCondition[i];
        let a = pos[0];
        let b = pos[1];
        let c = pos[2];

        // if all the positions are not empty and has the same mark
        if (board[a] !== "" &&
            board[b] !== "" &&
            board[c] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]) {
                // the game is over
            gameOver = true
            if (gameOver === true) {
            // if the game is over, after a delay, show that current player won the game
                setTimeout(() => {
                    text.textContent = `${player}  Wins!`
                }, 10);
            }
        }
    }
}
// clean the board, text, class and set game over to false
function restartGame() {
    board = ["", "", "",
        "", "", "",
        "", "", ""];

    squares.forEach(square => {
        square.classList.remove("clicked");
        square.textContent = ""
    });

    text.textContent = "";
    gameOver = false;
    handleClick();
    return checkWin(winningCondition);
}