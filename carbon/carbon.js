let codes = ['meth', 'eth', 'prop', 'but', 'pent', 'hex'];
let groups = ['ol', 'one', 'al', 'yl carbonate', 'oate', 'oic acid'];
let ctx =  $('canvas')[0].getContext('2d');
let fontHeight = 20;
ctx.font = fontHeight + 'px Arial';
$('#form').submit((e)=>{
    e.preventDefault();
    ctx.clearRect(0, 0, $('canvas').width(), $('canvas').height());
    let name, tempName = $('#primary').val();
    let chains = [];
    let formula = {'C':0,'H':0,'O':0};
    let formulaStr = ''
    //identify carbon chains
    for(let i in tempName){
        codes.forEach((code) => {
            if(tempName.substring(i, i+code.length) == code){
                let carbon = codes.indexOf(code) + 1
                chains.push([carbon, i]);
                tempName.slice(i, code.length);
                formula['C'] = carbon;
                formula['H'] = carbon*2+2;
            }
        });
    }
    for(let i in formula){
        if(formula[i] != 0){
            formulaStr += i + '<sub>' + formula[i] + '</sub>';
        }
    }
    groups.forEach((group) => {
        console.log(tempName.substring(tempName.length-group.length, tempName.length), group);
        console.log(tempName.substring(tempName.length-group.length, tempName.length) == group)
        // if(tempName.length < group.length){break;}
        if(tempName.substring(tempName.length-group.length, tempName.length) == group){
            switch (group){
                case 'ol':
                    formulaStr += 'OH';
                    formula['C']++;formula['H']++;
                    break;
                case 'al':
                    formulaStr += 'C0H'
                    formula['C']++;formula['H']++;formula['O']++
                    break;
                case 'oate':
                    formulaStr += 'COO<sup>-</sup>'
                    formula['C']++;formula['O']+2;
                    break;
                case 'oic acid':
                    formulaStr += 'COOH'
                    formula['C']++;formula['H']++;formula['O']+2;
            }
            formula['H'] -= 1;
            formula['R'] = 1;
        }
    })

    console.log(formula);
    $('#formula')[0].innerHTML += 'Formula: ' + formulaStr;
    drawChain(chains[chains.length-1][0]);
});

function drawBond(number, x, y){
    for(let i = 1; i < number+1; i++){
        let height = 20/(number+1)*i;
        ctx.moveTo(x, y + height);
        ctx.lineTo(x+25, y + height);
        ctx.stroke();
    }
    console.log('draw bond');
    ctx.stroke(); 
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

$('#form').submit()
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