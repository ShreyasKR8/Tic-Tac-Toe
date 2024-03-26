const GameBoard = (function() {
    // const gameBoard = [ 'X', 'X', 'X', 'X', 'O', 'O', 'X', 'X', 'X' ]; //private variable
    const gameBoard = [ '-', '-', '-', '-', '-', '-', '-', '-', '-' ]; //private variable
    let i = 1;
    let output = '';
    const getBoard = () => {
        gameBoard.forEach(element => {
            output += element; // concatenate the element to the output string
            if (i % 3 === 0) { // if it's the third element, add a new line
                output += '\n';
            } else {
                output += ' '; // add a space between elements
            }
            i++; // increment i
        });
        console.log(output);
        output = '';
    };
    const markToken = (index, token) => {
        gameBoard[index] = token;
    };

    const clearBoard = () => {
        for(let i = 0; i < 9; i++)
        {
            gameBoard[i] = '-';
        }
    }
    return {getBoard, markToken, clearBoard};
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
        return players[currentPlayerIndex];
    };

    return {createPlayer, switchPlayer};
} ();

Player.createPlayer('SKR', 'X');
Player.createPlayer('MG', 'O');

const GameController = (function() {
    const play = (boardIndex) => {
        const player = Player.switchPlayer();
        GameBoard.markToken(boardIndex, player.token);
        GameBoard.getBoard(); //display the board;
    }
    
    return {play};
}) ();


const cells = document.querySelectorAll(".cell");
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        let cellNumber = cell.getAttribute("data-index")
        GameController.play(cellNumber);
    })
})