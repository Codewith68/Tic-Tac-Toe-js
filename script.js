let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X"; // You = X, AI = O
let gameOver = false;

const boardDiv = document.getElementById("board");
const messageDiv = document.getElementById("message");
const restartBtn = document.getElementById("restart");

function renderBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, index) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.dataset.index = index;
    cellDiv.textContent = cell;
    cellDiv.addEventListener("click", handleCellClick);
    boardDiv.appendChild(cellDiv);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    messageDiv.textContent = "You win!";
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    messageDiv.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  // AI Turn
  currentPlayer = "O";
  setTimeout(aiMove, 500);
}

function aiMove() {
  const emptyCells = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
  const move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = currentPlayer;
  renderBoard();

  if (checkWinner(currentPlayer)) {
    messageDiv.textContent = "AI wins!";
    gameOver = true;
    return;
  }

  if (board.every(cell => cell !== "")) {
    messageDiv.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = "X";
}

function checkWinner(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => pattern.every(index => board[index] === player));
}

restartBtn.addEventListener("click", () => {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameOver = false;
  messageDiv.textContent = "";
  renderBoard();
});

renderBoard();
