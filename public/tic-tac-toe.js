const gameGridContainer = document.querySelector(".game-grid-container");
const xChoice = document.querySelector(".x-choice");
const oChoice = document.querySelector(".o-choice");
const playerWins = document.querySelector(".player-wins");
const computerWins = document.querySelector(".computer-wins");
const startGame = document.querySelector(".start-game");
const restartGame = document.querySelector(".restart-game");
const winner = document.querySelector(".winner");

// Initial grid
let gameGrid = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];
let currentPlayerIndex;
let player1;
let player2;

// Player X Choice theme
xChoice.addEventListener("click", () => {
    const root = document.documentElement;
    root.style.setProperty(
        "--clr-main",
        "linear-gradient(155deg,rgba(223, 25, 12, 1) 0%,rgba(250, 18, 171, 1) 100%)"
        // "radial-gradient(circle, rgba(247,0,0,1) 0%, rgba(230,216,10,1) 100%)"
    );
    root.style.setProperty(
        "--clr-secondary",
        "linear-gradient(155deg,rgba(12, 223, 121, 1) 0%,rgba(64, 18, 250, 1) 100%)"
    );
    xChoice.classList.add("hidden");
    oChoice.classList.add("hidden");
    playerWins.classList.remove("hidden");
    computerWins.classList.remove("hidden");
    startGame.classList.remove("hidden");
    restartGame.classList.remove("hidden");
    winner.classList.add("hidden");
    player1 = "X";
    player2 = "O";
    /* console.log(player1);
    console.log(player2); */
});

// Player O Choice theme
oChoice.addEventListener("click", () => {
    const root = document.documentElement;
    root.style.setProperty(
        "--clr-main",
        "linear-gradient(155deg,rgba(12, 223, 121, 1) 0%,rgba(64, 18, 250, 1) 100%)"
    );
    root.style.setProperty(
        "--clr-secondary",
        "linear-gradient(155deg,rgba(223, 25, 12, 1) 0%,rgba(250, 18, 171, 1) 100%)"
    );
    xChoice.classList.add("hidden");
    oChoice.classList.add("hidden");
    playerWins.classList.remove("hidden");
    computerWins.classList.remove("hidden");
    startGame.classList.remove("hidden");
    restartGame.classList.remove("hidden");
    winner.classList.add("hidden");
    player1 = "O";
    player2 = "X";
    /* console.log(player1);
    console.log(player2); */
});

// Restart Game - reset hidden/visible attributes
restartGame.addEventListener("click", () => {
    xChoice.classList.remove("hidden");
    oChoice.classList.remove("hidden");
    playerWins.classList.add("hidden");
    computerWins.classList.add("hidden");
    startGame.classList.add("hidden");
    restartGame.classList.add("hidden");
    winner.classList.remove("hidden");
});

// player place move
// May be change
gameGridContainer.addEventListener("click", (e) => {
    const row = e.target.getAttribute("data-row");
    const col = e.target.getAttribute("data-col");
    console.log("row is: ", row, "col is: ", col);
});
