const TTT = require("./ttt");
class ComputerPlayer {
    static getValidMoves(grid) {
        let validMoves = [];

        for (let i = 0; i < grid.length; i++) {
            const row = i;
            for (let j = 0; j < grid[i].length; j++) {
                const col = j;
                if (grid[row][col] === " ") {
                    validMoves.push({ row, col });
                }
            }
        }
        // console.log(validMoves.length);
        return validMoves;
    }

    static randomMove(grid) {
        let availableMoves = this.getValidMoves(grid);

        if (availableMoves.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableMoves.length);
            return availableMoves[randomIndex];
        } else {
            return null;
        }
    }

    static getWinningMoves(grid, symbol) {
        let winningMove = null;
        // check for available moves
        let availableMoves = this.getValidMoves(grid);

        for (const move of availableMoves) {
            let testGrid = grid.map((row) => row.slice());
            testGrid[move.row][move.col] = symbol;
            if (TTT.checkWin(testGrid) === symbol) {
                winningMove = move;
                break;
            }
        }

        return winningMove;
    }

    static getSmartMove(grid, symbol) {
        let opponent;
        if (symbol === "X") {
            opponent = "O";
        } else if (symbol === "O") {
            opponent = "X";
        }

        // check for win / block
        if (this.getWinningMoves(grid, symbol) !== null) {
            return this.getWinningMoves(grid, symbol);
        } else if (this.getWinningMoves(grid, opponent) !== null) {
            return this.getWinningMoves(grid, opponent);
        }

        // check for traps
    }
}

module.exports = ComputerPlayer;
