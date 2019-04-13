let codes = ['meth', 'eth', 'prop', 'but', 'pent', 'hex'];
let groups = ['ol', 'one', 'yl carbonate', 'oate', 'oic acid']
let ctx =  $('canvas')[0].getContext('2d');
let fontHeight = 20
ctx.font = fontHeight + 'px Arial'
$('#form').submit((e)=>{
    ctx.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    e.preventDefault()
    let name, tempName = $('#primary').val();
    let chains = [];
    //identify carbon chains
    for(let i in tempName){
        codes.forEach((code) => {
            if(tempName.substring(i, i+code.length) == code){
                chains.push([codes.indexOf(code) + 1, i]);
                tempName.slice(i, code.length);
            }
        });
    }
    console.log(chains[chains.length-1]);
    drawChain(chains[chains.length-1][0])
});

function drawBond(number, x, y){
    for(let i = 1; i < number+1; i++){
        let height = 20/(number+1)*i;
        ctx.moveTo(x, y + height);
        ctx.lineTo(x+25, y + height);
        ctx.stroke();
    }
    console.log('draw bond');
    ctx.stroke()
}

function drawElement(symbol, left, right, top, bottom, x, y){
    let textWidth = ctx.measureText(symbol);
    ctx.moveTo(x, y);
    ctx.fillText(symbol, x, y);
    drawBond(left, x-5, y);
    drawBond(right, x+textWidth+5, y);
    drawBond(top, x+(textWidth/2), y-fontHeight-5);
    drawBond(bottom, x+(textWidth/2), y+5);
}

function drawChain(length) {
    ctx.moveTo(150-(15*length),250);
    console.log(ctx);
    for(let i = 0; i < length; i++){
        let x = 250 - (40 * ((length/2)-i))
        ctx.fillText('C', x, 150);
        if(i<length-1){
            console.log('draw bond');
            ctx.moveTo(x+20, 143);
            ctx.lineTo(x+35, 143);
            ctx.stroke()
        }
    }
    for(let i = 0; i < length-1; i++){
    }
}

//$('#form').submit()
let json = periodic;
for (var element in json['elements']) {
    for (var key in json['elements'][element]) {
        if(key != 'name' && key != 'symbol'){
            delete json['elements'][element][key]
        }
    }
}
$(document).innerHTML = json['elements']
drawElement('C', 1, 1, 1, 1, 50, 50);