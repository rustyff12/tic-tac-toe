const Screen = require("./screen");
const Cursor = require("./cursor");
const ComputerPlayer = require("./computer-player");

class TTT {
    constructor() {
        // players

        this.currentPlayerIndex = Math.floor(Math.random() * 2);

        this.playerTurn = 0;
        this.computerTurn = 1;
        // Colors and symbols
        this.playerSymbol = "X";
        this.computerSymbol = "O";

        // Set up of initial grid
        this.grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];

        this.cursor = new Cursor(3, 3);

        // Initialize a 3x3 tic-tac-toe grid
        Screen.initialize(3, 3);
        Screen.setGridlines(true);

        // Screen commands for movement and placement
        Screen.addCommand("up", "move cursor up", this.cursor.up);
        Screen.addCommand("down", "move cursor down", this.cursor.down);
        Screen.addCommand("left", "move cursor left", this.cursor.left);
        Screen.addCommand("right", "move cursor right", this.cursor.right);
        Screen.addCommand(
            "return",
            "place move at cursor position",
            this.placeMove
        );
        Screen.render();

        // If computer is the first randomly selected player
        if (this.currentPlayerIndex === this.computerTurn) {
            this.placeComputerMove();
            // Switch player
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        }
    }

    // Check win
    static checkWin(grid) {
        const winConditions = [
            // Rows
            [grid[0][0], grid[0][1], grid[0][2]],
            [grid[1][0], grid[1][1], grid[1][2]],
            [grid[2][0], grid[2][1], grid[2][2]],
            // Columns
            [grid[0][0], grid[1][0], grid[2][0]],
            [grid[0][1], grid[1][1], grid[2][1]],
            [grid[0][2], grid[1][2], grid[2][2]],
            // Diagonals
            [grid[0][0], grid[1][1], grid[2][2]],
            [grid[0][2], grid[1][1], grid[2][0]],
        ];
        // Check for win
        for (const condition of winConditions) {
            if (condition.every((cell) => cell === "X")) {
                return "X";
            } else if (condition.every((cell) => cell === "O")) {
                return "O";
            }
        }

        // check for empty cells
        for (const row of grid) {
            if (row.includes(" ")) {
                return false; // Game is ongoing
            }
        }

        return "T"; // Tie, no empty cells and no winner
    }

    // Places move/ cursor
    placeMove = () => {
        // Check for player or computer
        if (this.currentPlayerIndex === this.playerTurn) {
            // players turn
            if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
                Screen.setTextColor(this.cursor.row, this.cursor.col, "red");
                Screen.setGrid(
                    this.cursor.row,
                    this.cursor.col,
                    this.playerSymbol
                );
                Screen.render();

                if (TTT.checkWin(Screen.grid)) {
                    TTT.endGame(TTT.checkWin(Screen.grid));
                } else {
                    // Switch player
                    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
                }
            }
        } else if (this.currentPlayerIndex === this.computerTurn) {
            this.placeComputerMove();
            // Switch player
            this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
        }
    };

    // Make computer move
    makeComputerMove = () => {
        let smartMove = ComputerPlayer.getSmartMove(
            Screen.grid,
            this.computerSymbol
        );

        return smartMove;
    };

    // Place computer move on the screen
    placeComputerMove = () => {
        const computerMove = this.makeComputerMove();

        Screen.setTextColor(computerMove.row, computerMove.col, "blue");
        Screen.setGrid(computerMove.row, computerMove.col, this.computerSymbol);
        Screen.render();

        // Check for winner
        if (TTT.checkWin(Screen.grid)) {
            TTT.endGame(TTT.checkWin(Screen.grid));
        }
    };

    static endGame(winner) {
        if (winner === "O" || winner === "X") {
            Screen.setMessage(`Player ${winner} wins!`);
        } else if (winner === "T") {
            Screen.setMessage(`Tie game!`);
        } else {
            Screen.setMessage(`Game Over`);
        }
        Screen.render();
        Screen.quit();
    }
}

module.exports = TTT;
