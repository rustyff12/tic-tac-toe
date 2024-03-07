const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
    constructor() {
        // players
        this.players = ["X", "O"];
        this.currentPlayerIndex = 0;
        // this.playerTurn = 0;
        // this.computerTurn = 1;
        // Possible if statement

        // Player Colors and symbols
        this.playerColors = {
            X: "red",
            O: "blue",
        };

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
        // Getting the player symbol from array and color from object
        const currentPlayerSymbol = this.players[this.currentPlayerIndex];
        const currentPlayerColor = this.playerColors[currentPlayerSymbol];

        // Move to available grid space if possible
        if (Screen.grid[this.cursor.row][this.cursor.col] === " ") {
            Screen.setTextColor(
                this.cursor.row,
                this.cursor.col,
                currentPlayerColor
            );
            Screen.setGrid(
                this.cursor.row,
                this.cursor.col,
                currentPlayerSymbol
            );
            Screen.render();

            // Check for winner
            if (TTT.checkWin(Screen.grid)) {
                TTT.endGame(TTT.checkWin(Screen.grid));
            } else {
                // Switch player
                this.currentPlayerIndex =
                    (this.currentPlayerIndex + 1) % this.players.length;
            }
        } else {
            console.log("Invalid move, this space is occupied");
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
