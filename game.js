const GameBoard = (function() {
    // const gameBoard = [ 'X', 'X', 'X', 'X', 'O', 'O', 'X', 'X', 'X' ]; //private variable
    const gameBoard = [ "", "", "", "", "", "", "", "", "" ]; //private variable
    let numOfCellsMarked = 0; //private variable
    
    const getBoardState = () => {
		let currentBoardState = [...gameBoard]; //shallow copy(one level) to avoid manipulation of private variable from outside.
		return currentBoardState;
    };
    const markToken = (index, token) => {
        gameBoard[index] = token;
    };

    const isCellEmpty = (index) => {
        return gameBoard[index] === "";
    }

    const clearBoard = () => {
        for(let i = 0; i < gameBoard.length; i++) {
            gameBoard[i] = "";
        }
    }

    const getNumOfCellsMarked = () => numOfCellsMarked;

    const incrementNumOfCellsMarked = () => numOfCellsMarked++;

    const resetNumOfCellsMarked = () => {
        numOfCellsMarked = 0;
    }

    return {getBoardState, markToken, isCellEmpty, clearBoard, getNumOfCellsMarked, incrementNumOfCellsMarked, resetNumOfCellsMarked};
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

    const resetCurrentPlayer = function () {
        currentPlayerIndex = 0;
    }

    const changePlayerNames = function(player1Name, player2Name) {
        players[0].name = player1Name;
        players[1].name = player2Name;
    }

    return {createPlayer, switchPlayer, getCurrentPlayer, resetCurrentPlayer, changePlayerNames};
} ();


const GameController = (function() {
    Player.createPlayer('SKR', 'X');
    Player.createPlayer('MG', 'O');

    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [2, 4, 6]             //diagonals 
    ];

	const checkForWin = (currentPlayer) => {
        let currentBoardState = GameBoard.getBoardState();
		for(let combo of winCombos) {
            if(combo.every((index) => currentBoardState[index] == currentPlayer.token)) {
                console.log("WinCombo = " + combo);
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
            let winner = currentPlayer.name;
            return winner;
        }
        if(GameBoard.getNumOfCellsMarked() == 9) {
            return "Tie";
        }
        Player.switchPlayer();
        return "None";
    };
    
    return {play};
}) ();

const DisplayController = (function() {
    document.addEventListener("DOMContentLoaded", function() {
        const cells = document.querySelectorAll(".cell");
        const resultDiv = document.querySelector(".result");
        const restartBtn = document.querySelector(".restart-btn");
        const changeNameBtn = document.querySelector(".change-name-btn");
        const dialog = document.querySelector(".names-dialog");
        const confirmNamesBtn = document.querySelector(".confirm-names-button") 
        let canMarkToken = true;

        const markTokenInCell = function(cell) {
            if(cell.textContent != "" || !canMarkToken) { //Disallow marking on non-empty cells.
                return;
            }
            GameBoard.incrementNumOfCellsMarked();
            const currentPlayerToken = Player.getCurrentPlayer().token;
            cell.textContent = currentPlayerToken;
            let cellNumber = cell.getAttribute("data-index");
            let result = GameController.play(cellNumber);
            if(result == "Tie") {
                resultDiv.textContent = "It's a tie!";
                canMarkToken = false;
            }
            else if(result !== "None") {
                let winner = result;
                resultDiv.textContent = winner + " " + "won!";
                canMarkToken = false;    
            }
        }

        const onClickedRestart = function() {
            canMarkToken = true;
            GameBoard.clearBoard();
            GameBoard.resetNumOfCellsMarked();
            Player.resetCurrentPlayer();
            cells.forEach(cell => {
                cell.textContent = ""
                resultDiv.textContent = "";
            });
        }

        const displayPlayerNames = function(player1Name, player2Name) {
            const playerName1Div = document.querySelector(".player-name-1-div");
            const playerName2Div = document.querySelector(".player-name-2-div");
            playerName1Div.textContent = player1Name;
            playerName2Div.textContent = player2Name;
        }
    
        cells.forEach(cell => {
            cell.addEventListener("click", () => {
                markTokenInCell(cell);
            });
        });
        
        restartBtn.addEventListener("click", onClickedRestart);

        changeNameBtn.addEventListener("click", () => {
            dialog.showModal();
        });

        confirmNamesBtn.addEventListener("click", (event) => {
            event.preventDefault();

            const player1Name = document.getElementById("player-1-name").value;
            const player2Name = document.getElementById("player-2-name").value;
            Player.changePlayerNames(player1Name, player2Name);
            displayPlayerNames(player1Name, player2Name);
            dialog.close();
        });
    });
}) ();
