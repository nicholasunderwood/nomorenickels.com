$(document).ready(()=>{
    console.log('load')
    class Peice{
        constructor(startX, startY, color){
            this.x = startX;
            this.y = startY;
            this.color = color;
            this.options = []
            this.firstMove = true
            this.init()
        }
        getOptions(){}
        init(){}

        testSquare(x,y){
            for(let i in peices){
                if(peices[i].x == x && peices[i].y == y){
                    return peices[i];
                }
            }
            return null
        }
        testEmpty(x,y){
            return this.testSquare(x,y) == null;
        }
        testSame(x,y){
            // console.log(x,y)
            let qpeice = this.testSquare(x,y);
            console.log(this.qpeice)
            return qpeice != undefined && qpeice.color == this.color;
        }
        testDifferent(x,y){
            let qpeice = this.testSquare(x,y);
            console.log(this.qpeice)
            return qpeice != undefined && qpeice.color != this.color;
        }
        move(x,y){
            this.firstMove = false
            getSquare(this.x, this.y).children()[0].style.backgroundImage = ''
            this.x = x
            this.y = y
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
            this.getOptions()
        }
    }

    class Pawn extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_pabl.png)' : 'url(../png/chess_pawh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
            this.dir = (this.color*-2)+1
        }
        getOptions(){
            this.options = []
            if(this.testEmpty(this.x,this.dir)){
                this.options.push([this.x, this.y + this.dir]);
            }
            if(this.testEmpty(this.x,this.dir*2) && this.firstMove){
                this.options.push([this.x, this.y + (this.dir*2)]);
            }
            if(this.testDifferent(this.x+1,this.dir)){
                this.options.push([this.x + 1, this.y + this.dir]);
            }
            if(this.testDifferent(this.x-1,this.der)){
                this.options.push([this.x - 1, this.y + this.der]);
            }
        }
    }

    class Knight extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_knbl.png)' : 'url(../png/chess_knwh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
        }

        getOptions(){
            let pos = [[1,2],[2,1],[-1,2],[-2,1],[-2,-1],[-1,-2],[1,-2],[2,-1]];
            this.options = [];
            let mx,my;
            console.log(this.x,this.y)
            for(let p in pos){
                mx = this.x + pos[p][0];
                my = this.y + pos[p][1];
                if(!this.testSame(my, mx) && mx <= 7 && mx >= 0 && my <= 7 && mx >= 0){
                    this.options.push([mx,my]);
                }
            }
        }
    }

    class Rook extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_robl.png)' : 'url(../png/chess_rowh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
        }

        getOptions(){
            this.options = []
            let pos = [[1,0], [-1,0], [0,-1], [0,1]]
            let mx,my
            for(let p in pos){
                mx = this.x
                my = this.y
                do{
                    mx += pos[p][0]
                    my += pos[p][1]
                    if(this.testSame(mx, my) || mx > 7 || mx < 0 || my > 7 || my < 0) {
                        break;
                    }
                    this.options.push([mx,my])
                }while (!this.testDifferent(mx,my))
            }
        }
    }

    class Bishop extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_bibl.png)' : 'url(../png/chess_biwh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
        }

        getOptions(){
            this.options = []
            let pos = [[1,1], [-1,1], [-1,-1], [1,-1]]
            let mx,my
            for(let p in pos){
                mx = this.x 
                my = this.y
                do{
                    mx += pos[p][0]
                    my += pos[p][1]
                    if(this.testSame(mx, my) || mx > 7 || mx < 0 || my > 7 || mx < 0) {
                        break;
                    }
                    this.options.push([mx,my])
                }while (!this.testDifferent(mx,my))
            }
        }
    }

    class Queen extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_qubl.png)' : 'url(../png/chess_quwh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
        }

        getOptions(){
            this.options = []
            let pos = [[1,1], [-1,1], [-1,-1], [1,-1], [1,0], [-1,0], [0,-1], [0,1]]
            let mx,my
            for(let p in pos){
                mx = this.x
                my = this.y
                do{
                    mx += pos[p][0]
                    my += pos[p][1]
                    console.log(mx,my,this.testSame(mx,my))
                    if(this.testSame(mx, my) || mx > 7 || mx < 0 || my > 7 || my < 0) {
                        console.log('bk')
                        break;
                    }
                    this.options.push([mx,my])
                }while (!this.testDifferent(mx,my))
            }
        }
    }

    class King extends Peice{
        init(){
            this.img = this.color == 0 ? 'url(../png/chess_kibl.png)' : 'url(../png/chess_kiwh.png)'
            getSquare(this.x, this.y).children()[0].style.backgroundImage = this.img
        }

        getOptions(){
            let pos = [[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1]]
            this.options = []
            for(let p in pos){
                let mx = this.x + pos[p][0];
                let my = this.y + pos[p][1];
                console.log(this.testSame(mx,my))
                if(!this.testSame(mx,my) && mx <= 7 && mx >= 0 && my <= 7 && mx >= 0){
                    this.options.push([mx,my])
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
            if(peices[i].x == x && peices[i].y == y){
                return peices[i]
            }
        }
        return null
    }
    
    function getSquare(x,y){
        return board[y][x]
    }

    function clearHighlights(){
        for(a1 in board){
            for(a2 in board[a1]){
                board[a1][a2].removeClass('yellow');
                board[a1][a2].attr('hl','false');
            }
        }
    }

    peices = [];
    peice = null;
    turn = 0
    let board = [];
    for(let y = 0;y<8;y++){
        let tr = $('<tr id=r'+y+'></tr>');
        let trl = [];
        for(let x = 0;x<8;x++){
            let td = $('<td class=r'+y+' c'+x+'><div class="ph"><div class="hl"></div></div></td>').attr('x',x).attr('y',y).attr('hl','false');
            td.click((e)=>{
                tempTD = $(e.currentTarget)
                // if (peice == null){return}
                console.log(e.currentTarget,x,y,peice)
                if(peice != null && tempTD.attr('hl') == 'false'){
                    console.log('clear moves')
                    clearHighlights()
                    peice = null
                }
                if(peice == null){
                    x = parseInt(tempTD.attr('x'))
                    y = parseInt(tempTD.attr('y'))
                    peice = getPeice(x,y);
                    if(peice == null){console.log('no peice');return}
                    peice.getOptions()
                    options = peice.options;
                    console.log('get options',options)
                    if(options == []){peice=null;console.log('no options');return}
                    for(i in options){
                        if(options[i][0] >= 0 && options[i][0] < 8 && options[i][1] >= 0 && options[i][1] < 8){
                            getSquare(options[i][0], options[i][1]).addClass('yellow').attr('hl','true');
                        }
                        else{console.log('fail')}
                    }   
                }
                else{
                    if(tempTD.attr('hl') == 'true'){
                        console.log('move')
                        peice.move(parseInt(tempTD.attr('x')),parseInt(tempTD.attr('y')));
                        $('.yellow').attr('hl', false).removeClass('yellow');
                        peice = null;
                        turn++;
                    }
                }

            })
            trl.push(td);
            tr.append(td);
        }
        board.push(trl)
        $('#board').append(tr)
    }
    peices = [ //0 = black, 1 = white
        new Rook(0,0,0), new Knight(1,0,0), new Bishop(2,0,0), new Queen(3,0,0), new King(4,0,0), new Bishop(5,0,0), new Knight(6,0,0), new Rook(7,0,0),
        new Pawn(0,1,0), new Pawn(1,1,0), new Pawn(2,1,0), new Pawn(3,1,0), new Pawn(4,1,0), new Pawn(5,1,0), new Pawn(6,1,0), new Pawn(7,1,0),
        new Pawn(0,6,1), new Pawn(1,6,1), new Pawn(2,6,1), new Pawn(3,6,1), new Pawn(4,6,1), new Pawn(5,6,1), new Pawn(6,6,1), new Pawn(7,6,1),
        new Rook(0,7,1), new Knight(1,7,1), new Bishop(2,7,1), new Queen(3,7,1), new King(4,7,1), new Bishop(5,7,1), new Knight(6,7,1), new Rook(7,7,1)
    ]
    console.log('loaded')
});
