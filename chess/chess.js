console.log('load')

peices = [];

class Peice{
    
    constructor(startX, startY, color){
        this.x = startX;
        this.y = startY;
        this.color = color;
        this.options = []
    }
    getOptions(){}

    testSquare(x,y){
        for(i in peices){
            if(peices[i].x == x + this.x && peices[i].y == y + this.y){
                return peices[i]
            }
            return null
        }
    }
    testOnBoard(x,y){
        return this.x + x < 7 && this.x + x < 0 && this.y + y < 7 && this.y + y > 0
    }
    testEmpty(x,y){
        return this.testOnBoard && this.testSquare(x,y) == null
    }
    testSame(x,y){
        return this.testOnBoard && !this.testEmpty(x,y) && this.testSquare(x,y).color == this.color
    }
    testDifferent(x,y){
        return this.testOnBoard && !this.testEmpty(x,y) && this.testSquare(x,y).color != this.color
    }
    
    move(x,y){
        this.x = x
        this.y = y
        this.getOptions()
    }
}

class WPawn extends Peice{
    getOptions(){
        this.options = []
        if(this.testEmpty(0,-1)){
            this.options.push([0,-1]);
        }
        if(this.testDifferent(1,-1)){
            this.options.push([1,-1]);
        }
        if(this.testDifferent(-1,-1)){
            this.options.push([1,-1]);
        }
    }
}

class BPawn extends Peice{
    getOptions(){
        this.options = []
        if(this.testEmpty(0,1)){
            this.options.push([0,1]);
        }
        if(this.testDifferent(1,1)){
            this.options.push([1,1]);
        }
        if(this.testDifferent(-1,1)){
            this.options.push([1,1]);
        }
    }
}

class Knight extends Peice{
    getOptions(){
        let pos = [[1,2],[2,1],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]]
        this.options = []
        for(i in pos){
            if(!testSame(pos[i][0], pos[i][1])){
                this.options.push(pos[i])
            }
        }
    }
}

class Rook extends Peice{
    getOptions(){
        this.options = []
        pos = [[1,0], [-1,0], [0,-1], [0,1]]
        for(i in pos){
            mx = this.x
            my = this.y
            while (!this.testDifferent(mx,my)){
                mx + pos[i][0]
                my + pos[i][0]
                if(!this.testSame(mx, my)) {
                    break;
                }
                this.options.push([mx,my])
            }
        }
    }
}

class Bishop extends Peice{
    getOptions(){
        this.options = []
        pos = [[1,1], [-1,1], [-1,-1], [-1,1]]
        for(i in pos){
            mx = this.x
            my = this.y
            while (!this.testDifferent(mx,my)){
                mx + pos[i][0]
                my + pos[i][0]
                if(!this.testSame(mx, my)) {
                    break;
                }
                this.options.push([mx,my])
            }
        }
    }
}

class Queen extends Peice{
    getOptions(){
        this.options = []
        pos = [[1,1], [-1,1], [-1,-1], [-1,1], [1,0], [-1,0], [0,-1], [0,1]]
        for(i in pos){
            mx = this.x
            my = this.y
            while (!this.testDifferent(mx,my)){
                mx + pos[i][0]
                my + pos[i][0]
                if(!this.testSame(mx, my)) {
                    break;
                }
                this.options.push([mx,my])
            }
        }
    }
}

class King extends Peice{
    getOptions(){
        let pos = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]]
        this.options = []
        for(i in pos){
            if(!testSame(pos[i][0], pos[i][1]) && !this.isCheck(pos[i][0], pos[i][0])){
                this.options.push(pos[i])
            }
        }
    }
    isCheck(x,y){
        for(i in peices){
            if([x,y] in peices[i].options){
                return true
            }
        }
        return false
    }
    isCheckMate(){
        this.getOptions()
        return this.options == []
    }
}

function getPeice(x,y){
    for(i in peices){
        if(peices[i].x = x && peices[i].y == y){
            return peices[i]
        }
    }
    return null
}

function getSquare(x,y){
    return board[y][x]
}

$(document).ready(()=>{
    let board = []
    for(let y = 0;y<=8;y++){
        let tr = $('<tr id=r'+y+'></tr>')
        let trl = []
        for(let x = 0;x<=8;x++){
            let td = $('<td class=r'+y+' c'+x+'></td>').attr('x',x).attr('y',y);
            td.onclick(()=>{
                let peice = getPeice(parseInt(this[0].x),parseInt(this[0].x))
                if(mode == 0 && peice != null){
                    mode = 1
                }
                else{
                    
                }

            })
            trl.append(td)
            tr.append(td)
        }
        board.append(trl)
        $('#board').append(tr)
    }
    turn = 0
    mode = 0
})