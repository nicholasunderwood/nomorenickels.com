const boardSize = 3;

function getPlayerString(player){
    return player == 1 ? 'X' : player == -1 ? 'O' : '';
}

function initiateBoard() {
    var table = $('#board');
    for(let i = 0; i < boardSize * boardSize; i++){
        if(i % boardSize == 0) table.append($('<tr></tr>'));

        table.children().last().append(
            $('<td></td>').attr('x', i%boardSize).attr('y', Math.floor(i/boardSize))
        )
    };
    return table   
}

function setStatus(status){
    $('#status').text(status);
}

function checkForWinner(board) {
    let isDraw = true;
    for(let a = 0; a < 3; a++){
        let rowWin = board[a][0];
        let colWin = board[0][a];
        isDraw = isDraw && board[a][0] != 0;
        for(let b = 1; b < 3; b++){
            rowWin = (rowWin == board[a][b] ? rowWin : 0)
            colWin = (colWin == board[b][a] ? colWin : 0)
            isDraw = isDraw && board[a][b] != 0;
        }
        if(rowWin != 0) return rowWin;
        if(colWin != 0) return colWin;
    }
    if(isDraw) return 2;
    if(board[0][0] == board[1][1] && board[0][0] == board[2][2]) return board[0][0];
    if(board[0][2] == board[1][1] && board[0][2] == board[2][0]) return board[0][2];
    return 0
}

$(document).ready(() => {

    function restart() {
        isFinished = false;
        currentPlayer = 1;
        for(let i = 0; i < boardSize; i++){
            board[i] = [...Array(boardSize)].map(_ => 0);
        }
        $('#board td').text(() => "");
        setStatus(`X to play`);

    }

    function move(x, y) {
        if(isFinished) restart();

        if(board[x][y] != 0) return;
        board[x][y] = currentPlayer
        $(`td:eq(${y*boardSize+x})`).text(getPlayerString(currentPlayer));
        currentPlayer = -currentPlayer;
        
        let gameState = evaluateBoard(board);

        if(gameState != null){
            setStatus(`${getPlayerString(currentPlayer)} to play`);
            return;
        } else {
            ifFinished = true;
        }
        
        if(Math.abs(gameState) == 1) {
            setStatus(`${getPlayerString(gameState)} Wins!`);
            return;
        }

        if(gameState == 0){
            setStatus('Tie!');
            return;
        }        
    }

    function handleClick(){
        if(isFinished) return;

        console.log('click');
        let x = +$(this).attr('x');
        let y = +$(this).attr('y');
        move(x, y);

        // botMove();
    }

    function botMove(){
        let m = bestMove(board, currentPlayer);
        move(m.i, m.j);
    }

    const board = [...Array(boardSize)].map(_ => [...Array(boardSize)].map(_ => 0));
    var currentPlayer = 1;
    isFinished = false;
    const table = initiateBoard(board)
    $('#board td').click(handleClick);
    $('#restart').click(restart);
    $('#bot').click(botMove)
    setStatus(`${getPlayerString(currentPlayer)} to play`);

    // setTimeout(botMove, 0)
});

