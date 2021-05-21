var hasStarted = false;
const difficulties = {'easy': [10,10,10], 'medium': [16,16,40], 'hard': [30,16,99]};
var diff = difficulties.medium;

const board = [];


const uncoverQueue = [];
const uncovered = [];

var mines = [];
var numMines;

class Square{
    constructor(x, y, td){
        this.x = x;
        this.y = y;
        this.td = td;
        this.state = 'unknown';
        this.hasMine = false;
    }

    addMine() {
        this.hasMine = true;
    }

    setState(newState){
        this.state = newState;
        this.td.attr('state', newState);
    }
}

function makeBoard(width, height) {
    const table = $('#board').empty();
    board.length = 0; board.push(...([...Array(width)].map(_ => [])));
    console.log(board)


    for(let i = 0; i < height; i++){
        const tr = $('<tr>');
        for(let j = 0; j < width; j++){
            let td = $(`<td x=${i} y=${j} state='unknown'>`)
            tr.append(td);
            board[i].push(new Square(i,j,td));
        }
        table.append(tr);
    }

    $('td').on('click contextmenu',onClick)
}

function getSquare(x,y){
    return board[x][y];
}

function start(numMines,x,y) {
    hasStarted = true;
    $('.dif').prop('disabled', true);

    const squares = [...new Array(diff[0]*diff[1])].map((_,i) => i);
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            squares.splice((x+i)*diff[0]+y+i,1);
        }
    }
    while(numMines--){
        let index = squares[Math.floor(Math.random() * squares.length)];
        let pos = squares.splice(index, 1)
        mines = mines.concat(pos);
    }

    // console.log(mines.join(' '));
    mines.forEach(pos => {
        board[Math.floor(pos/diff[0])][pos % diff[1]].addMine();
    });

}

function end() {
    $('.dif').prop('disabled', false);
}

function checkForMine(x, y){
    return board[x][y].hasMine;
}

function countSouroundingMines(x, y){
    let mines = 0;
    for(let i = -1; i <= 1; i++){
        for(let j = -1; j <= 1; j++){
            if(i == 0 && j == 0) continue;
            if(x+i >= diff[0] || x+i < 0 || y+j >= diff[1] || y+j < 0) continue;
            if(checkForMine(x+i, y+j)) mines++;
        }
    }
    return mines;
}

function uncoverSquare(square){
    console.log(uncoverQueue.length)
    
    square.setState('known');
    const [x,y] = [square.x, square.y];
    const souroudingMines = countSouroundingMines(x,y);
    
    if(souroudingMines > 0){
        square.td.text(souroudingMines);
    } else {
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                if(i == 0 && j == 0) continue;
                if(x+i >= diff[0] || x+i < 0 || y+j >= diff[1] || y+j < 0) continue;
                let square = board[x+i][y+j];
                if(uncoverQueue.some(queued => queued == square)) continue;
                if(square.state != 'unknown') continue;
                uncoverQueue.push(square);
            }
        }
    }




    if(uncoverQueue.length > 0) {
        uncoverSquare(uncoverQueue.splice(0,1)[0]);
    }

}

function onClick(e) {

    const td = $(this);
    const [x,y] = [+td.attr('x'), +td.attr('y')];
    let square = board[x][y];

    if(!hasStarted) { start(diff[2],x,y) }
    e.preventDefault();

    if(e.type == 'contextmenu' || e.ctrlKey || e.altKey){
        if(square.state == 'unknown'){
            square.setState('flag');
        } else if(td.state == 'flag'){
            square.setState('unknown');
        }
        return;
    }

    if(checkForMine(x,y)){
        square.setState('mine');
        end();
        return;
    }

    if(square.state == 'unknown'){
        uncoverSquare(square);
    } 
}

$(document).ready(() => {
    makeBoard(...diff);

    $('.dif').click(function () {
        $('.dif').prop('disabled', false);
        $(this).prop('disabled', true);

        diff = Object.values(difficulties)[$(this).index()]
        makeBoard(...diff);
    });
})