const GameBoard = (function() {
    const gameBoard = [
        ['X', 'O', 'X'],
        ['X', 'X', 'O'],
        ['O', 'O', 'X']
    ];
    const getBoard = () => gameBoard;
    return {getBoard};
}) ();

let board = GameBoard.getBoard();
board.forEach(element => {
    console.log(element);
});