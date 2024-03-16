import ComputerPlayer from "./computer-player";
import TTT from "./ttt";
const computerPlayer = new ComputerPlayer();
const board = new TTT();
const gameGridContainer = document.querySelector(".game-grid-container");

gameGridContainer.addEventListener("click", (e) => {
    console.log(e.target);
});
