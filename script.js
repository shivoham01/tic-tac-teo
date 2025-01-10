let cells = document.querySelectorAll('.cell');
let playerStatus = document.getElementById('status');
let winner = document.getElementById('winner');
let reset = document.getElementById('reset');
const winAudio = new Audio('./win.mp3');
const clickAudio = new Audio('./music.mp3');

let player = "X";
let XBlocks = [];
let OBlocks = [];

const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [1, 4, 7], [3, 5, 7], [2, 5, 8], [3, 6, 9]];

const stopGame = () => {
    cells.forEach(cell => {
        cell.style.pointerEvents = "none";
    });
};

const checkWinner = () => {
    for (let combination of winningCombinations) {
        if (combination.every(combo => XBlocks.includes(combo))) {
            winAudio.play();
            winner.innerHTML = `<span>The winner is <h1>X</h1></span>`;
            stopGame();
            return;
        }
        else if (combination.every(combo => OBlocks.includes(combo))) {
            winAudio.play();
            winner.innerHTML = `<span>The winner is <h1>O</h1></span>`;
            stopGame();
            return;
        }
    }
    if (XBlocks.length + OBlocks.length === 9) {
        winner.innerHTML = `<span>The Match is <h1>Draw</h1></span>`;
        return;
    }
}

const handleClick = (cell) => {
    clickAudio.play();

    if (player === "X") {
        XBlocks.push(parseInt(cell.id));
        cell.innerHTML = "X";
        playerStatus.innerHTML = "Player O's Turn";
    }
    else {
        OBlocks.push(parseInt(cell.id));
        cell.innerHTML = "O";
        playerStatus.innerHTML = "Player X's Turn";
    }
    if (checkWinner()) {
        return;
    }

    player === "X" ? player = "O" : player = "X";
}

reset.addEventListener('click', () => location.reload());


cells.forEach((cell) => {
    cell.addEventListener("click", () => handleClick(cell));
});
