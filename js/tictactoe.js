var isWinner = false;
var player = 'X';
var board = [];
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
    var boardTable = document.getElementById("board");
    boardTable.innerHTML = "";
    for (var row = 0; row < board.length; row++) {
        var tableRow = document.createElement("tr");
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
        }
        boardTable.appendChild(tableRow);
    }
};

var updateStatusDisplay = function() {
    console.log('updateStatusDisplay')
    var statusDiv = document.getElementById("status");
    var winner = checkForWinner();
    console.log('test ')
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
    console.log('drawLines')
    for(i=0;i<8;i++){
        if(
        [
        board[0][0] === board[0][1] && board[0][0] === board[0][2] && board[0][0] !== " " ,
        board[1][0] === board[1][1] && board[1][0] === board[1][2] && board[1][0] !== " " ,
        board[2][0] === board[2][1] && board[2][0] === board[2][2] && board[2][0] !== " " ,
        board[0][0] === board[1][0] && board[0][0] === board[2][0] && board[0][0] !== " " ,
        board[0][1] === board[1][1] && board[0][1] === board[2][1] && board[0][1] !== " " ,
        board[0][2] === board[1][2] && board[0][2] === board[2][2] && board[0][2] !== " " ,
        board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] !== " " ,
        board[0][2] === board[1][1] && board[0][2] === board[2][0] && board[0][2] !== " "
        ][i]){
            console.log(i);
            if(i===0){
                lines[0].style.borderBottom = 'solid';
                lines[1].style.borderBottom = 'solid';
                lines[2].style.borderBottom = 'solid';
                lines[3].style.borderBottom = 'solid';
                console.log(lines, lines[0])
            }
            if(i===1){
                lines[4].style.borderBottom = 'solid';
                lines[5].style.borderBottom = 'solid';
                lines[6].style.borderBottom = 'solid';
                lines[7].style.borderBottom = 'solid';
            }
            if(i===2){
                lines[8].style.borderBottom = 'solid';
                lines[9].style.borderBottom = 'solid';
                lines[10].style.borderBottom = 'solid';
                lines[11].style.borderBottom = 'solid';
            }
            if(i===3){
                lines[1].style.borderLeft = 'solid';
                lines[5].style.borderLeft = 'solid';
                lines[9].style.borderLeft = 'solid';
                lines[13].style.borderLeft = 'solid';
            }
            if(i===4){
                lines[2].style.borderLeft = 'solid';
                lines[6].style.borderLeft = 'solid';
                lines[10].style.borderLeft = 'solid';
                lines[14].style.borderLeft = 'solid';
            }
            if(i===5){
                lines[3].style.borderLeft = 'solid';
                lines[7].style.borderLeft = 'solid';
                lines[11].style.borderLeft = 'solid';
                lines[15].style.borderLeft = 'solid';
            }
            if(i===6){
                document.getElementById("diag").style.background = "url('diag1.png')";
            }
            if(i===7){
                document.getElementById("diag").style.background = "url('diag2.png')";
                console.log('test')
            }
        }
    }   
}
setupClickListener();
updateBoardDisplay();
updateStatusDisplay();