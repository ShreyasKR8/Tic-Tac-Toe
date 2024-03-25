const GameBoard = (function() {
    const gameBoard = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ]; //private variable

    const getBoard = () => {
        gameBoard.forEach(element => {
            console.log(element.join(" "));
        });
    };
    const setBoard = (row, col, token) => {
        gameBoard[row][col] = token;
    };
    return {getBoard, setBoard};
}) ();

const Player = function () {
    let name = '';
    let token = '';
    let currentPlayerIndex = 0;
    const players = [];

    const createPlayer = (playerName, playerToken) => {
        const player = { name: playerName, token : playerToken}
        players.push(player);
        return player; //object
    };

    const switchPlayer = function () {
        currentPlayerIndex = (currentPlayerIndex == 0) ? 1 : 0; //change player
        return players[currentPlayerIndex];
    };

    return {createPlayer, switchPlayer};
} ();

Player.createPlayer('SKR', 'X');
Player.createPlayer('MG', 'O');

const GameController = (function() {
    let input = 10;
    let token = '';
    while(input--)
    {
        const player = Player.switchPlayer();
        GameBoard.getBoard(); //display the board;
        let gameInput = window.prompt("Enter the row and column");
        let gameInputArray = gameInput.split(' ');
        GameBoard.setBoard(gameInputArray[0], gameInputArray[1], player.token);
    }
}) ();

//
// player1 = Player.createPlayer('SKR', 'X');
// player2 = Player.createPlayer('MG', 'O');
// console.log(player.token);
// player = Player.switchPlayer();
// console.log(player.token);