var board = [];
var table = document.getElementById('board');
var bombs = [];
var dead = false;
var rows = 16;
var cols = 16;

function isWin(){
    for(v=0;v<board.length;v++){
        for(q=0;q<board[v].length;q++){
            var td = board[v][q];
            console.log(td, !testForBomb(parseInt(td.getAttribute('row')), parseInt(td.getAttribute('col'))), !td.getAttribute('tile') !== "none");
            if(!testForBomb(parseInt(td.getAttribute('row')), parseInt(td.getAttribute('col'))) &&
                !td.getAttribute('tile') !== "none"){
                console.log('false');
                return false;
            }
        }
    }
    return true;
}

function click(td){
    var win = !isWin();
    if(!dead && win && td.getAttribute('tile') !== 'flag'){
        var x = parseInt(td.getAttribute('row'));
        var y = parseInt(td.getAttribute('col'));
        var around = getSorounding(td);
        var count = 0;
        if(testForBomb(x, y)){
            dead = true;
            console.log('you died');
            board[x][y].style.backgroundImage = "url('png/bomb.png')";
            for(i=0;i<bombs.length;i++){
                board[bombs[i][0]][bombs[i][1]].style.backgroundImage = "url('png/bomb2.png')"
            }
            board[x][y].style.backgroundImage = "url('png/bomb.png')"
        }
        else{
            td.style.backgroundImage = '';
            td.setAttribute('tile', 'none');
            console.log(getCount(td));
            if(getCount(td)>0){
                td.innerText = getCount(td);
            }
            else{
                for(w=0;w<around.length;w++){
                    around[w].style.backgroundImage = '';
                    around[w].setAttribute('tile', 'none');
                    if(getCount(around[w])>0){
                        around[w].innerText = getCount(around[w]);
                        around[w].style.backgroundImage = '';
                    }
                    else{
                        var around2 = getSorounding(around[w]);
                        for(f=0;f<around2.length;f++){
                            if(!isTD(around2[f], around)){
                                around.push(around2[f]);
                            }
                        }
                    }
                }
            }
        }
    }
    else if(dead){
        console.log('You died')
    }
    else if(win){
        console.log('You Win')
    }
}

function isTD(td, li){
    var x = parseInt(td.getAttribute('row'));
    var y = parseInt(td.getAttribute('col'));
    for(i=0;i<li.length;i++){
        var tx = parseInt(li[i].getAttribute('row'));
        var ty = parseInt(li[i].getAttribute('col'));
        if(x === tx && y === ty){
            return true;
        }
    }
    return false;
}

function getCount(td){
    var li = getSorounding(td);
    var count = 0;
    for(q=0;q<li.length;q++){
        var x = parseInt(li[q].getAttribute('row'));
        var y = parseInt(li[q].getAttribute('col'));
        if(testForBomb(x,y)){
            count ++
        }
    }
    return count;
}

function getSorounding(td){
    var around = [];
    var x = parseInt(td.getAttribute('row'));
    var y = parseInt(td.getAttribute('col'));
    if(x>0){
        around.push(board[x-1][y]);
        if(y>0){
            around.push(board[x-1][y-1])
        }
    }
    if(x<rows){
        around.push(board[x+1][y]);
        if(y<cols){
            around.push(board[x+1][y+1])
        }
    }
    if(y>0){
        around.push(board[x][y-1]);
        if(x<rows){
            around.push(board[x+1][y-1])
        }
    }
    if(y<cols){
        around.push(board[x][y+1]);
        if(x>0){
            around.push(board[x-1][y+1])
        }
    }
    return around;
}

function testBombs (bomb){
    var rep = false;
    for(f=0;f<bombs.length;f++){
        if(bombs[i][0] === bomb[0] && bombs[i][1] === bomb[1]){
            rep = true;
        }
    }
    return rep;
}

function testForBomb(x, y){
    var isBomb = false;
    for(i=0;i<bombs.length;i++){
        if(bombs[i][0] === x && bombs[i][1] === y){
            return true;
        }
    }
    return false;
}

bombs.push([Math.floor(Math.random()*rows), Math.floor(Math.random()*cols)]);
for(i=0;i<40;i++){
    var x = Math.floor(Math.random()*rows);
    var y = Math.floor(Math.random()*cols);
    var bomb = [x,y];
    while(testBombs(bomb)){
        x = Math.floor(Math.random()*rows);
        y = Math.floor(Math.random()*cols);
        bomb = [x,y];
    }
    bombs.push(bomb);
}
for(i=0;i<rows+1;i++){
    var boardRow = [];
    var tr = document.createElement('TR');
    for(f=0;f<cols+1;f++){
        var td = document.createElement('TD');
        boardRow.push(td);
        td.setAttribute('row', i);
        td.setAttribute('col', f);
        td.setAttribute('tile', 'square');
        td.style.backgroundImage = "url('png/square.png')";
        td.addEventListener('click', function(e){
            console.log(e.button);
            click(e.path[0])
        });
        td.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            console.log('flag');
            if(e.path[0].getAttribute('tile') === 'square'){
                console.log(e.path[0].style.backgroundImage);
                e.path[0].style.backgroundImage = "url('png/flag.png')";
                e.path[0].setAttribute('tile', 'flag');
            }
            else if(e.path[0].getAttribute('tile') === 'flag'){
                e.path[0].style.backgroundImage = "url(png/square.png)";
                e.path[0].setAttribute('tile', 'square')
            }
        });
        tr.appendChild(td);
    }
    table.appendChild(tr);
    board.push(boardRow);
}
for(i=0;i<bombs.length;i++){
    board[bombs[i][0]][bombs[i][1]].style.backgroundImage = 'url(png/bomb2.png)'
}

