class Peice{
    constructor(shape, color, stripe1, stripe2){
        this.shape = shape;
        this.color = color;
        this.stripe1 = stripe1;
        this.stripe2 = stripe2;
        this.pos = null
    }
}

$(document).ready(()=>{
    function onPlace(){

    }


    board = []
    tds = []
    for(let x=0;x<4;x++){
        let tr = $('<tr></tr>');
        let row = []
        for(let y=0;y<4;y++){
            let td=$('<td></td>').attr('x',x).attr('y',y).attr('onBoard',false)
            tr.append(td)
            row.push(td)
        }
        $('#board').append(tr);
        board.push(row);
    }
})