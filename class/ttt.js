const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
    constructor() {
        // this.playerTurn = "O";
        // player set up for two player
        this.players = ["X", "O"];
        this.currentPlayerIndex = 0;

        // Plyer Colors
        this.playerColors = {
            X: "red",
            O: "blue",
        };

        this.grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];

        this.cursor = new Cursor(3, 3);
        // this.placeMove = this.placeMove.bind(this);
        // Initialize a 3x3 tic-tac-toe grid
        Screen.initialize(3, 3);
        Screen.setGridlines(true);

        // Replace this with real commands
        Screen.addCommand("up", "move cursor up", this.cursor.up);
        Screen.addCommand("down", "move cursor down", this.cursor.down);
        Screen.addCommand("left", "move cursor left", this.cursor.left);
        Screen.addCommand("right", "move cursor right", this.cursor.right);
        Screen.addCommand(
            "return",
            "place move at cursor's position",
            this.placeMove
        );

        Screen.render();
    }

    // check win
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

        for (const condition of winConditions) {
            if (condition.every((cell) => cell === "X")) {
                return "X";
            } else if (condition.every((cell) => cell === "O")) {
                return "O";
            }
        }

        // Check for empty cells
        for (const row of grid) {
            if (row.includes(" ")) {
                return false; // Game is ongoing
            }
        }

        return "T"; // Tie, no empty cells and no winner
    }

    // place cursor
    placeMove = () => {
        // Getting the player symbol from array and color from object
        const currentPlayerSymbol = this.players[this.currentPlayerIndex];
        const currentPlayerColor = this.playerColors[currentPlayerSymbol];

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
            console.log("Ivalid move, this space is occupied");
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
