const squares = document.querySelectorAll("[data-square]");
const button = document.querySelector("[data-restart-button]");
let text = document.querySelector("[data-text]");

let currentPlayer = "X"

let board = ["", "", "",
    "", "", "",
    "", "", ""]

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

if (gameOver === false) {
    squares.forEach(square => {
        square.addEventListener("click", placeMark)
    });
    squares.forEach(square => {
        square.addEventListener("click", gamePlay)
    });
}

button.onclick = () => restartGame();

function placeMark(e) {
    if (gameOver === false) {
        clickedSquare = e.target;
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        if (clickedSquare.textContent === "") {
            clickedSquare.textContent = currentPlayer;
            clickedSquare.classList.add("clicked");
        } else if (clickedSquare.textContent !== "") {
            return
        }
    }
}
function gamePlay(e) {
    let position = e.target.id

    board[position] = currentPlayer

    checkWin(winningCondition)
}

function checkWin(winningCondition) {
    gameOver = false;

    for (let i = 0; i < winningCondition.length; i++) {

        let pos = winningCondition[i];
        let pos0 = pos[0];
        let pos1 = pos[1];
        let pos2 = pos[2];


        if (board[pos0] !== "" &&
            board[pos1] !== "" &&
            board[pos2] !== "" &&
            board[pos0] === board[pos1] &&
            board[pos0] === board[pos2]) {

            gameOver = true
            if (gameOver === true) {
                setTimeout(() => {
                  text.textContent = `${currentPlayer === "X" ? "Cross" : "Circle"} Wins!`
                }, 10);
            }
        }
    }
}

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
    return checkWin(winningCondition);
}