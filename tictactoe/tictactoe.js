var isWinner = false;
var player = 'X';
var board = [];
var layout = [];
var winner = 'O';
var restart = document.getElementById('restart');
var lines = document.getElementsByClassName('line');
var spaces = document.getElementsByTagName('');
// Initialize to a 2D array of empty strings, 3x3
for (var row = 0; row < 3; row++) {
    var cols = [];
    for (var col = 0; col < 3; col++) {
        cols.push(" ");
    }
    board.push(cols);
}

restart.addEventListener('click', function () {
    board = [[" ", " ", " "],[" ", " ", " "],[" ", " ", " "]];
    isWinner = false;
    player = 'X';
    winner = 'O';
    for(x=0;x<16;x++){
        lines[x].style.border = 'none';
        console.log(x)
    }
    document.getElementById("diag").style.background = 'transparent';
    drawLines();
    setupClickListener();
    updateBoardDisplay();
    updateStatusDisplay();
})
// Handles click by current player of row and col
var handleClick = function(row, col) {
    console.log('handleClick')
    if(!isWinner){
        if(board[row][col] === ' '){
            board[row][col] = player;
            if(player === 'X'){
                player = 'O';
                winner = 'X'
            }
            else{
                player = 'X';
                winner = 'O'
            }
        }
    }
    updateBoardDisplay();
    updateStatusDisplay();
};

// Returns winning player if found (X or O)
// If no winner, returns empty string
var checkForWinner = function() {
    console.log('checkForWinner')
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
    console.log('setupClickListener')
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
    console.log('updateBoardDisplay')
    layout = [];
    var boardTable = document.getElementById("board");
    boardTable.innerHTML = "";
    for (var row = 0; row < board.length; row++) {
        var tableRow = document.createElement("tr");
        var layoutRow = []
        for (var col = 0; col < board[row].length; col++) {
            var cellTd = document.createElement("td");
            cellTd.innerHTML = board[row][col];
            cellTd.setAttribute("data-row", row);
            cellTd.setAttribute("data-col", col);
            if(col === 1){
                cellTd.style.borderLeft = 'solid';
                cellTd.style.borderRight = 'solid';
            }
            if(row === 1){
                cellTd.style.borderTop = 'solid';
                cellTd.style.borderBottom = 'solid';
            }
            tableRow.appendChild(cellTd);
            layoutRow.push(cellTd)
        }
        boardTable.appendChild(tableRow);
        layout.push(layoutRow);
    }
};

var updateStatusDisplay = function() {
    console.log('updateStatusDisplay');
    var statusDiv = document.getElementById("status");
    var winner = checkForWinner();
    if (winner) {
        console.log('win')
        statusDiv.innerHTML = winner + ' Wins!';
        isWinner = true;
        drawLines();
    }else if(!board[0].includes(' ') && !board[1].includes(' ') && !board[2].includes(' ')){
        statusDiv.innerHTML = 'Tie!'
    }else {
        console.log('turn', player)
        statusDiv.innerHTML = "Current player is " + player;
    }
};

var drawLines = function(){
    console.log('drawLines');
    if(board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== " "){
        layout[0][0].style.animationName = 'pulse';
        layout[0][1].style.animationName = 'pulse';
        layout[0][2].style.animationName = 'pulse';
    }
    else if(board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== " "){
        layout[1][0].style.animationName = 'pulse';
        layout[1][1].style.animationName = 'pulse';
        layout[1][2].style.animationName = 'pulse';
    }
    else if(board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== " "){
        layout[2][0].style.animationName = 'pulse';
        layout[2][1].style.animationName = 'pulse';
        layout[2][2].style.animationName = 'pulse';
    }
    else if(board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== " "){
        layout[0][0].style.animationName = 'pulse';
        layout[1][0].style.animationName = 'pulse';
        layout[2][0].style.animationName = 'pulse';
    }
    else if(board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== " "){
        layout[1][0].style.animationName = 'pulse';
        layout[1][1].style.animationName = 'pulse';
        layout[1][2].style.animationName = 'pulse';
    }
    else if(board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== " "){
        layout[0][2].style.animationName = 'pulse';
        layout[1][2].style.animationName = 'pulse';
        layout[2][2].style.animationName = 'pulse';
    }
    else if(board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== " "){
        layout[0][0].style.animationName = 'pulse';
        layout[1][1].style.animationName = 'pulse';
        layout[2][2].style.animationName = 'pulse';
    }
    else if(board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== " "){
        layout[0][2].style.animationName = 'pulse';
        layout[1][1].style.animationName = 'pulse';
        layout[2][0].style.animationName = 'pulse';
    }

};
setupClickListener();
updateBoardDisplay();
updateStatusDisplay();
