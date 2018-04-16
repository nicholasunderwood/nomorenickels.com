var layout = [];
var table = document.getElementById('board');
var dir = [0,0];
var snake = [[0, 0, [0, 0]]];
var apple = [];
var score = 0;

function moveSnake(x){
    for(i=0;i<snake.length;i++){
        snake[i][0] += snake[i][2][0];
        snake[i][1] += snake[i][2][1];
    }
    for(i=snake.length-1;i>0;i--){
        snake[i][2] = snake[i-1][2];
    }
    if(apple[0] === snake[0][0] && apple[1] === snake[0][1]){
        moveApple();
        score += 1;
        document.getElementById('score').innerHTML = score;
        var lastSnake = snake[snake.length-1];
        snake.push([lastSnake[0]-lastSnake[2][0], lastSnake[1]-lastSnake[2][1], lastSnake[2]]);
    }
    for(i=0;i<layout.length;i++){
        for(x=0;x<layout[i].length;x++){
            layout[i][x].className = '';
        }
    }
    
    for(i=0;i<snake.length;i++){
        layout[snake[i][0]][snake[i][1]].classList.add('snake');
    }
    layout[apple[0]][apple[1]].classList.add('apple');
}

function moveApple(){
    var xPos = Math.floor(Math.random()*17);
    var yPos = Math.floor(Math.random()*17);
    for(i=0;i<snake.length;i++){
        if(snake[i][0] === xPos && snake[i][1] === yPos){
            xPos = Math.floor(Math.random()*17);
            yPos = Math.floor(Math.random()*17);
            i = 0;
        }
    }
    layout[xPos][yPos].classList.add('apple');
    apple = [xPos, yPos];
}

function isDead(){
    var tail = false;
    for (i=1; i<snake.length; i++){
        if(snake[i][0] === snake[0][0] && snake[i][1] === snake[0][1]){
            tail = true
        }
    }
    return((snake[0][0] > 17) || (snake[0][1] < 0) || (snake[0][1] > 17) || (snake[0][1] < 0) || (tail));
}

document.getElementById('score').innerHTML = score;
for(y=0;y<17;y++){
    var tr = document.createElement('TR');
    var layArr = [];
    for(x=0;x<17;x++){
        td = document.createElement('TD');
        td.setAttribute('col', y);
        td.setAttribute('row', x);
        tr.appendChild(td);
        layArr.push(td);
    }
    layout.push(layArr);
    table.appendChild(tr);
}
layout[0][0].classList.add('snake');
moveApple();

window.addEventListener("keydown", function (event) {
    if(event.key === "ArrowUp" && (!(dir[0] === 1 && dir[1] === 0) || snake.length === 1)){
        dir = [-1,0];
    }
    if(event.key === "ArrowDown" && (!(dir[0] === -1 && dir[1] === 0) || snake.length === 1)){
        dir = [1,0];
    }
    if(event.key === "ArrowLeft" && (!(dir[0] === 0 && dir[1] === 1) || snake.length === 1)){
        dir = [0,-1];
        
    }
    if(event.key === "ArrowRight" && (!(dir[0] === 0 && dir[1] === -1) || snake.length === 1)){
        dir = [0,1];
    }
    snake[0][2] = dir;
}, true);

var gameLoop = setInterval(function(){
    if(isDead()){
        clearInterval(gameLoop);
        console.log('you died')
        document.getElementById('deathMessage').innerText = 'You Died'
    }
    moveSnake(dir)
},250);
