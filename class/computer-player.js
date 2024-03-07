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
        console.log(validMoves);
        return validMoves;
    }

    /*   static randomMove(grid) {
        // Your code here
    }

    static getWinningMoves(grid, symbol) {
        // Your code here
    }

    static getSmartMove(grid, symbol) {
        // Your code here
    } */
}

module.exports = ComputerPlayer;
