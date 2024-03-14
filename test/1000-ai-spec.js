const { expect } = require("chai");

const ComputerPlayer = require("../class/computer-player");
const TTT = require("../class/ttt");

describe("ComputerPlayer", function () {
    let cpu;
    let grid;

    before(function () {
        cpu = new ComputerPlayer();
    });

    it("can play 1000 games without losing", function () {
        let losses = 0;
        let wins = 0;
        let ties = 0;
        for (let i = 0; i < 1000; i++) {
            grid = [
                [" ", " ", " "],
                [" ", " ", " "],
                [" ", " ", " "],
            ];

            let turn = 0;
            let players = Math.random() > 0.5 ? ["O", "X"] : ["X", "O"];

            let moves = [];
            while (!TTT.checkWin(grid)) {
                let player = players[turn % 2];

                if (player === "X") {
                    let cpuMove = ComputerPlayer.getSmartMove(grid, "X");
                    grid[cpuMove.row][cpuMove.col] = "X";
                    moves.push(`X: [${cpuMove.row}, ${cpuMove.col}]`);
                } else {
                    let randomMove = ComputerPlayer.randomMove(grid);
                    grid[randomMove.row][randomMove.col] = "O";
                    moves.push(`O: [${randomMove.row}, ${randomMove.col}]`);
                }
                turn++;
            }
            if (TTT.checkWin(grid) === "O") {
                losses++;
                /* console.log("LOSS");
                console.log(moves);
                console.log(grid[0]);
                console.log(grid[1]);
                console.log(grid[2]); */
            } else if (TTT.checkWin(grid) === "X") wins++;
            else ties++;
        }
        console.log(`Wins: ${wins} Ties: ${ties} Losses: ${losses}`);
        expect(losses).to.equal(0);
    });
});
