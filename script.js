let cells = document.querySelectorAll('.cell');
let playerStatus = document.getElementById('status');
let winner = document.getElementById('winner');
let reset = document.getElementById('reset');

let player = "X";
let XBlocks = [];
let OBlocks = [];

const winningCombinations = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 5, 9], [3, 5, 7], [2, 5, 8], [2, 5, 8], [3, 6, 9]];

const stopGame = () => {
    cells.forEach(cell => {
        cell.style.pointerEvents = "none";
    });
};

function checkForWinner() {
    for (let combination of winningCombinations) {
        if (combination.every(cell => XBlocks.includes(cell))) {
            winner.innerHTML = `<span>The Winner is <h1>X</h1></span>`;
            stopGame()
            return;
        }
        else if (combination.every(cell => OBlocks.includes(cell))) {
            winner.innerHTML = `<span>The Winner is <h1>O</h1></span>`;
            stopGame()
            return;
        }
    }
    if (XBlocks.length + OBlocks.length === 9) {
        winner.innerHTML = `<span>The Match is <h1>Draw</h1></span>`;
        return;
    }
}

const handleClick = (cell) => {
    cell.style.pointerEvents = "none";
    if (player === "X") {
        cell.innerHTML = player
        player = "O"
        playerStatus.innerHTML = `Player ${player}'s Turn`
        XBlocks.push(parseInt(cell.id))

        if (checkForWinner()) {
            return;
        }
    }
    else {
        cell.innerHTML = player
        player = "X"
        playerStatus.innerHTML = `Player ${player}'s Turn`
        OBlocks.push(parseInt(cell.id))

        if (checkForWinner()) {
            return;
        }
    }
}

reset.addEventListener('click', () => location.reload());


cells.forEach((cell) => {
    cell.addEventListener("click", () => handleClick(cell));
});
