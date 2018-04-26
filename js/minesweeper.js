var board = [];
var table = document.getElementById('board');
var bombs = []
var dead = false;


function click(td){
    if(!dead){
        var x = parseInt(td.getAttribute('row'));
        var y = parseInt(td.getAttribute('col'));
        var around = getSorounding(td);
        var count = 0;
        if(testForBomb(x, y)){
            dead = true;
            console.log('you died')
            board[x][y].style.backgroundImage = "url('png/bomb.png')"
            for(i=0;i<bombs.length;i++){
                board[bombs[i][0]][bombs[i][1]].style.backgroundImage = "url('png/bomb2.png')"  
            }
            board[x][y].style.backgroundImage = "url('png/bomb.png')"
        }
        else{
            td.style.backgroundImage = '';
            console.log(getCount(td));
            if(getCount(td)>0){
                td.innerText = getCount(td);
            }
            else{
                for(w=0;w<around.length;w++){
                    around[w].style.backgroundImage = ''
                    if(getCount(around[w])>0){
                        console.log(around[w])
                        around[w].innerText = getCount(around[w])
                    }
                    else{
                        var around2 = getSorounding(around[w]);
                        for(f=0;f<around2.length;f++){
                            if(!isTD(around2[f], around) && getCount(around2[f])<1){
                                around.push(around2[f]);
                            }
                        }
                    }
                }
            }
        }
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
    var count = 0
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
        around.push(board[x-1][y])
        if(y>0){
            around.push(board[x-1][y-1])
        }
    }
    if(x<17){
        around.push(board[x+1][y])
        if(y<31){
            around.push(board[x+1][y+1])
        }
    }
    if(y>0){
        around.push(board[x][y-1])
        if(x<17){
            around.push(board[x+1][y-1])
        }
    }
    if(y<31){
        around.push(board[x][y+1])
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
for(i=0;i<40;i++){
    var x = Math.floor(Math.random()*16);
    var y = Math.floor(Math.random()*30);
    var bomb = [x,y];
    while(testBombs(bomb)){
        var x = Math.floor(Math.random()*16);
        var y = Math.floor(Math.random()*30);
        var bomb = [x,y];
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
        td.style.backgroundImage = "url('png/square.png')";
        td.addEventListener('click', function(e){
            click(e.path[0])
        })
        tr.appendChild(td);
    }
    table.appendChild(tr);
    board.push(boardRow);
}
console.log(board);
for(i=0;i<bombs.length;i++){
    board[bombs[i][0]][bombs[i][1]].style.backgroundImage = 'url(png/bomb2.png)'
}