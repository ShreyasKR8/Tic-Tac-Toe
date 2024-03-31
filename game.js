const GameBoard = (function() {
    // const gameBoard = [ 'X', 'X', 'X', 'X', 'O', 'O', 'X', 'X', 'X' ]; //private variable
    const gameBoard = [ '', '', '', '', '', '', '', '', '' ]; //private variable
    let i = 1;
    let output = '';
    const getBoardState = () => {
		let currentBoardState = [...gameBoard]; //shallow copy(one level) to avoid manipulation of private variable from outside.
		return currentBoardState;
    };
    const markToken = (index, token) => {
        gameBoard[index] = token;
    };

    const clearBoard = () => {
        for(let i = 0; i < 9; i++) {
            gameBoard[i] = '';
        }
    }
    return {getBoardState, markToken, clearBoard};
}) ();

const Player = function () {
    let currentPlayerIndex = 0;
    const players = [];

    const createPlayer = (playerName, playerToken) => {
        const player = { name: playerName, token : playerToken}
        players.push(player);
        return player; //object
    };

    const switchPlayer = function () {
        currentPlayerIndex = (currentPlayerIndex == 0) ? 1 : 0; //change player
    };

    const getCurrentPlayer = function() {
        return players[currentPlayerIndex];
    }

    return {createPlayer, switchPlayer, getCurrentPlayer};
} ();

Player.createPlayer('SKR', 'X');
Player.createPlayer('MG', 'O');

const GameController = (function() {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 7]             //diagonals 
    ];
	const checkForWin = (currentPlayer) => {
		let currentBoardState = GameBoard.getBoardState();
		for(let combo of winCombos) {
            if(combo.every((index) => currentBoardState[index] == currentPlayer.token)) {
                return true;
            }
        }
        return false;
	};

    const play = (boardIndex) => {
        const currentPlayer = Player.getCurrentPlayer();
        GameBoard.markToken(boardIndex, currentPlayer.token);
		if(checkForWin(currentPlayer)) {
            console.log(currentPlayer.name, "won");
            return;
        }
        Player.switchPlayer();
    };
    
    return {play};
}) ();

const cells = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart-btn");

cells.forEach(cell => {
    cell.addEventListener("click", () => {
        const currentPlayerToken = Player.getCurrentPlayer().token;
        cell.textContent = currentPlayerToken;
        let cellNumber = cell.getAttribute("data-index");
        let outcome = GameController.play(cellNumber);
    });
})

restartBtn.addEventListener("click", () => {
    GameBoard.clearBoard();
    cells.forEach(cell => {
        cell.textContent = "";
    });
});