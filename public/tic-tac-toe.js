const gameGridContainer = document.querySelector(".game-grid-container");
const xChoice = document.querySelector(".x-choice");
const oChoice = document.querySelector(".o-choice");
const playerWins = document.querySelector(".player-wins");
const computerWins = document.querySelector(".computer-wins");
// const startGame = document.querySelector(".start-game");
const restartGame = document.querySelector(".restart-game");
const playerChoice = document.querySelector(".player-choice");

// Initial grid
let gameGrid = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
];

let currentPlayerIndex;
let player1;
let player2;
let playerSelection = false;
let playerTurn = 0;
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
    // playerWins.classList.remove("hidden");
    // computerWins.classList.remove("hidden");
    // startGame.classList.remove("hidden");
    restartGame.classList.remove("hidden");
    // playerChoice.classList.add("hidden");
    player1 = "X";
    player2 = "O";
    playerSelection = true;
    playerChoice.innerText = `Player ${player1}'s Turn`;
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
    // playerWins.classList.remove("hidden");
    // computerWins.classList.remove("hidden");
    // startGame.classList.remove("hidden");
    restartGame.classList.remove("hidden");
    // playerChoice.classList.add("hidden");
    player1 = "O";
    player2 = "X";
    playerSelection = true;
    playerChoice.innerText = `Player ${player1}'s Turn`;
});

// Restart Game - reset hidden/visible attributes
restartGame.addEventListener("click", () => {
    const boardSymbols = document.querySelectorAll("p");
    boardSymbols.forEach((pElement) => {
        pElement.remove();
    });
    const gridSections = document.querySelectorAll(".grid-section");
    gridSections.forEach((section) => {
        section.classList.remove("disabled");
    });
    playerChoice.innerText = `Please Choose X or O`;
    xChoice.classList.remove("hidden");
    oChoice.classList.remove("hidden");
    // playerWins.classList.add("hidden");
    // computerWins.classList.add("hidden");
    // startGame.classList.add("hidden");
    restartGame.classList.add("hidden");
    playerChoice.classList.remove("hidden");
    playerSelection = false;
    gameGrid = [
        [" ", " ", " "],
        [" ", " ", " "],
        [" ", " ", " "],
    ];
});

// player place move
gameGridContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("grid-section")) {
        const row = e.target.getAttribute("data-row");
        const col = e.target.getAttribute("data-col");
        const classes = e.target.classList.value;
        let isDisabled = false;
        if (classes.includes("disabled")) {
            isDisabled = true;
        }

        if (
            playerSelection === true &&
            playerTurn === 0 &&
            isDisabled !== true
        ) {
            const p = document.createElement("p");
            p.innerText = `${player1}`;
            p.classList.add(`player-1-symbol`);
            e.target.appendChild(p);

            placeMove(player1, row, col);
            disableCell(row, col);

            console.log(checkWin(gameGrid));
            console.log(player1);
            if (checkWin(gameGrid) === false) {
                playerChoice.innerText = `Player ${player2}'s Turn`;
                setTimeout(() => {
                    playerTurn = 1;
                    placeMove(player2);
                }, 1500);
            } else if (checkWin(gameGrid) === player1) {
                console.log("here");
                gameStateWin(player1);
            } else if (checkWin(gameGrid) === "T") {
                gameStateWin("T");
            }
        }

        console.log(gameGrid);
    }
});

const getValidMoves = (grid) => {
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
    return validMoves;
};

const computerRandomMove = (grid) => {
    let availableMoves = getValidMoves(grid);
    if (playerTurn === 1) {
        if (availableMoves.length > 0) {
            let randomIndex = Math.floor(Math.random() * availableMoves.length);
            return availableMoves[randomIndex];
        } else {
            return null;
        }
    }
};

const placeMove = (player, row, col) => {
    if (player === player1) {
        gameGrid[row][col] = player1;
    } else if (player === player2) {
        let position = computerRandomMove(gameGrid);
        gameGrid[position.row][position.col] = player2;
        const gridSections = document.querySelectorAll(".grid-section");
        for (let i = 0; i < gridSections.length; i++) {
            const gridSection = gridSections[i];

            if (
                gridSection.dataset.row === position.row.toString() &&
                gridSection.dataset.col === position.col.toString()
            ) {
                const p = document.createElement("p");
                p.innerText = `${player2}`;
                p.classList.add(`player-2-symbol`);
                gridSection.appendChild(p);
            }
        }
        disableCell(position.row, position.col);
        console.log(gameGrid);
        if (checkWin(gameGrid) === player2) {
            gameStateWin(player2);
        } else if (checkWin(gameGrid) === "T") {
            gameStateWin("T");
        } else {
            playerChoice.innerText = `Player ${player1}'s Turn`;
            playerTurn = 0;
        }
    }
};

const disableCell = (row, col) => {
    const targetCell = document.querySelector(
        `.grid-section[data-row="${row}"][data-col="${col}"]`
    );
    const p = targetCell.children[0];
    targetCell.classList.add("disabled");
    p.classList.add("disabled");
};

// Win game state
const gameStateWin = (symbol) => {
    playerChoice.classList.remove("hidden");
    if (symbol === player1) {
        playerChoice.innerText = `YOU WON!!!`;
    } else if (symbol === player2) {
        playerChoice.innerText = `sorry, you loose`;
    } else if (symbol === "T") {
        playerChoice.innerText = `TIE GAME`;
    }
};

//Check game state
const checkWin = (grid) => {
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
};
