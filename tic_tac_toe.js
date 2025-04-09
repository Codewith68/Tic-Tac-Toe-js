// // Initialize the game board as an array
// let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

// // Function to display the board in the console
// function displayBoard() {
//     console.log(`
//       ${board[0]} | ${board[1]} | ${board[2]}
//      -----------
//       ${board[3]} | ${board[4]} | ${board[5]}
//      -----------
//       ${board[6]} | ${board[7]} | ${board[8]}
//     `);
// }

// // Check for a winner or if the game is a draw
// function checkWinner() {
//     const winningCombinations = [
//         [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
//         [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
//         [0, 4, 8], [2, 4, 6]             // Diagonals
//     ];

//     for (const combo of winningCombinations) {
//         const [a, b, c] = combo;
//         if (board[a] !== " " && board[a] === board[b] && board[a] === board[c]) {
//             return board[a];
//         }
//     }

//     if (!board.includes(" ")) return "draw"; // If no empty spots and no winner, it's a draw
//     return null;
// }

// // Make a move and update the board
// function makeMove(position, player) {
//     if (board[position] === " ") {
//         board[position] = player;
//         return true;
//     }
//     return false;
// }

// // Main game loop
// function playGame() {
//     let currentPlayer = "X";
//     let winner = null;

//     while (!winner) {
//         displayBoard();
//         const position = prompt(`Player ${currentPlayer}, enter your move (0-8):`);

//         // Check if the input is valid
//         if (position < 0 || position > 8 || isNaN(position) || !makeMove(position, currentPlayer)) {
//             console.log("Invalid move. Try again.");
//             continue;
//         }

//         // Check for a winner or a draw after the move
//         winner = checkWinner();

//         if (winner) {
//             displayBoard();
//             if (winner === "draw") {
//                 console.log("It's a draw!");
//             } else {
//                 console.log(`Player ${winner} wins!`);
//             }
//         } else {
//             currentPlayer = currentPlayer === "X" ? "O" : "X";
//         }
//     }
// }

// // Start the game
// playGame();






























// Import the readline module to enable user input in Node.js
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

class TicTacToe {
    constructor() {
        this.board = Array(9).fill(" ");
        this.currentPlayer = "X";
        this.winner = null;
    }

    // Display the board in the console
    displayBoard() {
        console.log(`
          ${this.board[0]} | ${this.board[1]} | ${this.board[2]}
         -----------
          ${this.board[3]} | ${this.board[4]} | ${this.board[5]}
         -----------
          ${this.board[6]} | ${this.board[7]} | ${this.board[8]}
        `);
    }

    // Check if there's a winner or a draw
    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (this.board[a] !== " " && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a];
                return true;
            }
        }

        if (!this.board.includes(" ")) {
            this.winner = "draw";
            return true;
        }
        return false;
    }

    // Make a move on the board
    makeMove(position) {
        if (position < 0 || position > 8 || this.board[position] !== " " || this.winner) {
            console.log("Invalid move. Try again.");
            return false;
        }
        this.board[position] = this.currentPlayer;
        return true;
    }

    // Switch the player
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    }

    // Main game loop
    playGame() {
        this.displayBoard();
        readline.question(`Player ${this.currentPlayer}, enter your move (0-8): `, (input) => {
            const position = parseInt(input);

            // Try to make the move
            if (this.makeMove(position)) {
                // Check if there's a winner or if it's a draw
                if (this.checkWinner()) {
                    this.displayBoard();
                    if (this.winner === "draw") {
                        console.log("It's a draw!");
                    } else {
                        console.log(`Player ${this.winner} wins!`);
                    }
                    readline.close(); // End the input
                } else {
                    this.switchPlayer();
                    this.playGame(); // Continue the game
                }
            } else {
                this.playGame(); // Retry if the move was invalid
            }
        });
    }
}

// Start the game
const game = new TicTacToe();
game.playGame();






