const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {
    constructor() {
        this.playerTurn = "O";

        this.grid = [
            [" ", " ", " "],
            [" ", " ", " "],
            [" ", " ", " "],
        ];

        this.cursor = new Cursor(3, 3);

        // Initialize a 3x3 tic-tac-toe grid
        Screen.initialize(3, 3);
        Screen.setGridlines(true);

        // Replace this with real commands
        Screen.addCommand("w", "move cursor up", this.cursorUp);
        Screen.addCommand("s", "move cursor down", this.cursorDown);
        Screen.addCommand("a", "move cursor left", this.cursorLeft);
        Screen.addCommand("d", "move cursor right", this.cursorRight);
        Screen.addCommand(
            "p",
            "place move at cursor's position",
            this.placeMove
        );

        Screen.render();
    }

    // cursor movement
    cursorUp() {
        this.cursor.up();
        console.log("Cursor Up");
    }
    cursorDown() {
        this.cursor.down();
        console.log("Cursor Down");
    }
    cursorLeft() {
        this.cursor.left();
        console.log("Cursor Left");
    }
    cursorRight() {
        this.cursor.right();
        console.log("Cursor Right");
    }

    // place cursor
    placeMove() {
        const { row, col } = this.cursor;
        console.log(this.cursor);
        if (this.grid[row][col] === " ") {
            this.grid[row][col] = this.playerTurn;
            // Check for win after placing move
            const winnerCheck = checkWin(this.grid);
            if (winnerCheck) {
                this.endGame(winnerCheck);
            } else {
                // which turn it is
                this.playerTurn = this.playerTurn === "X" ? "O" : "X";
            }
        } else {
            console.log("Invalid move. This cell is already occupied");
        }
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
