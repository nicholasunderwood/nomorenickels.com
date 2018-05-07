var board = [];
var table = document.getElementById('board');
var bombs = [];
var dead = false;


function isWin(){
    for(i=0;i<board.length;i++){ 
        for(q=0;q<board[i].length;q++){
            console.log(board[i]);
            var td = board[i][q];
            if(!testForBomb(parseInt(td.getAttribute('row')), parseInt(td.getAttribute('col'))) &&
            !td.getAttribute('tile') !== "none"){
                console.log('false');
                //return false;
            }
        }
    }
    return true;
}

function click(td){
    var win = isWin();
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
    console.log(x, y);
    if(x>0){
        around.push(board[x-1][y]);
        if(y>0){
            around.push(board[x-1][y-1])
        }
    }
    if(x<16){
        around.push(board[x+1][y]);
        if(y<30){
            around.push(board[x+1][y+1])
        }
    }
    if(y>0){
        around.push(board[x][y-1]);
        if(x<16){
            around.push(board[x+1][y-1])
        }
    }
    if(y<30){
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

bombs.push([Math.floor(Math.random()*16), Math.floor(Math.random()*30)]);
for(i=0;i<100;i++){
    var x = Math.floor(Math.random()*16);
    var y = Math.floor(Math.random()*30);
    var bomb = [x,y];
    while(testBombs(bomb)){
        x = Math.floor(Math.random()*16);
        y = Math.floor(Math.random()*30);
        bomb = [x,y];
    }
    bombs.push(bomb);
}
for(i=0;i<17;i++){
    var boardRow = [];
    var tr = document.createElement('TR');
    for(f=0;f<31;f++){
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
