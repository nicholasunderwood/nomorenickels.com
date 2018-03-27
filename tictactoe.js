var player = "X";
var board = [];
var winner = 'Y';
var restart = document.getElementById('restart');
restart.addEventListener('click', function () {
    board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    updateBoardDisplay();
})
var spaces = document.getElementsByTagName('');
// Initialize to a 2D array of empty strings, 3x3
for (var row = 0; row < 3; row++) {
    var cols = [];
    for (var col = 0; col < 3; col++) {
        cols.push(" ");
    }
    board.push(cols);
}
// Handles click by current player of row and col
var handleClick = function(row, col) {
    if(board[row][col] === ' '){
        board[row][col] = player;
        if(player === 'X'){
            player = 'Y';
            winner = 'X'
        }
        else{
            player = 'X';
            winner = 'Y'
        }
    }
    updateBoardDisplay();
    updateStatusDisplay();
};

// Returns winning player if found (X or O)
// If no winner, returns empty string
var checkForWinner = function() {
    if(
        board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== " " ||
        board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== " " ||
        board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== " " ||
        board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== " " ||
        board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== " " ||
        board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== " " ||
        board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== " " ||
        board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== " "
    ){
        console.log('WON');
        return winner;
    }

};

var setupClickListener = function() {
    var boardTable = document.getElementById("board");
    boardTable.addEventListener("click", function(event) {
        if (event.target.nodeName !== "TD") {
            return;
        }
        var cell = event.target;
        var row = Number.parseInt(cell.getAttribute("data-row"), 10);
        var col = Number.parseInt(cell.getAttribute("data-col"), 10);
        handleClick(row, col);
    });
};

var updateBoardDisplay = function() {
    var boardTable = document.getElementById("board");
    boardTable.innerHTML = "";
    for (var row = 0; row < board.length; row++) {
        var tableRow = document.createElement("tr");
        for (var col = 0; col < board[row].length; col++) {
            var cellTd = document.createElement("td");
            cellTd.innerHTML = board[row][col];
            cellTd.setAttribute("data-row", row);
            cellTd.setAttribute("data-col", col);
            tableRow.appendChild(cellTd);
        }
        boardTable.appendChild(tableRow);
    }
};

var updateStatusDisplay = function() {
    var statusDiv = document.getElementById("status");
    var winner = checkForWinner();
    if (winner) {
        statusDiv.innerHTML = "Winner is " + winner;
    }else {
        statusDiv.innerHTML = "Current player is " + player;
    }
};

setupClickListener();
updateBoardDisplay();
updateStatusDisplay();
