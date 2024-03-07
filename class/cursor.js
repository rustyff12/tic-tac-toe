const Screen = require("./screen");

class Cursor {
    constructor(numRows, numCols) {
        this.numRows = numRows;
        this.numCols = numCols;

        this.row = 0;
        this.col = 0;

        this.gridColor = "black";
        this.cursorColor = "yellow";
    }

    resetBackgroundColor() {
        Screen.setBackgroundColor(this.row, this.col, this.gridColor);
    }

    setBackgroundColor() {
        Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
    }

    up = () => {
        // reset current position background color
        this.resetBackgroundColor();
        if (this.row !== 0) {
            this.row--;
        }
        // set the new position background color
        this.setBackgroundColor();
        Screen.render();
    };

    down = () => {
        // Move cursor down
        this.resetBackgroundColor();
        if (this.row < this.numRows - 1) {
            this.row++;
        }
        this.setBackgroundColor();
        Screen.render();
    };

    left = () => {
        // Move cursor left
        this.resetBackgroundColor();
        if (this.col !== 0) {
            this.col--;
        }
        this.setBackgroundColor();
        Screen.render();
    };

    right = () => {
        // Move cursor right
        this.resetBackgroundColor();
        if (this.col < this.numCols - 1) {
            this.col++;
        }
        this.setBackgroundColor();
        Screen.render();
    };
}

module.exports = Cursor;
