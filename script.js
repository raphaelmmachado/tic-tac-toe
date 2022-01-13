const squares = document.querySelectorAll("[data-square]");

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

squares.forEach(square => {
    square.addEventListener("click", placeMark)
});
squares.forEach(square => {
    square.addEventListener("click", gamePlay)
});

function placeMark(e) {
    clickedSquare = e.target;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (clickedSquare.textContent === "") {

        clickedSquare.textContent = currentPlayer
    }
}
function gamePlay(e) {
    let position = e.target.id

    board[position] = currentPlayer

    checkWin(winningCondition)
}

function checkWin(winningCondition) {
    for (let i = 0; i < winningCondition.length; i++) {
        let pos = winningCondition[i];
        let pos0 = pos[0];
        let pos1 = pos[1];
        let pos2 = pos[2];
        if (board[pos0] !== "" &&
            board[pos1] !== "" &&
            board[pos2] !== "") {

            if (board[pos0] === board[pos1] &&
                board[pos0] === board[pos2]) {
                
                alert(`Symbol:  ${currentPlayer} Wins`);
                return resetGame();
            }
        }
    }
}
function resetGame() {
    return squares.forEach(square => {
        square.removeEventListener("click", placeMark);
    });
}