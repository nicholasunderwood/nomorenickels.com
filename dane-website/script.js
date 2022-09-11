
function optimizeGrid(width, height, numCells){
    console.log(width, height, numCells)
    for(let cols = numCells; cols > 0; cols--){
        let p_rows = Math.ceil(numCells / cols);
        let p_height = width / cols * cellRatio * p_rows
        
        console.log(p_height, height, cols, cellRatio)
        if(p_height > height){
            return cols+1;
        }

    }

    return numCells;
}

function loadGrid(){
    console.log('load grid')
    table.empty();

    const win = $('#content');
    const w = win.width();
    const h = win.height();
    console.log('h: ' + h)
    cols = optimizeGrid(w,h,numCells)-1
    console.log('cols: ' + cols);
    const cellWidth = Math.floor(w / cols)
    const cellHeight = cellWidth * cellRatio
    let img_names = imgs.concat(imgs).sort(() => Math.random() > 0.5 ? 1 : -1)


    for(let i = 0; i < numCells; i++) {
        let src = `./thumbnails/${img_names[i]}.jpg`;
        let cell = $(`<div class='cell'><img src=${src} width='${cellWidth}px' height='${cellHeight}px'></div>`)
            // .css('width', cellHeight + 'px')
            // .css('max-height', Math.floor(w / cols * cellHeight) + 'px');

        cell.on('click', (e) => {
            e.preventDefault();
            modal.modal('show');
        });

        win.append(cell);
    }

    win.css('flex', '0 1 auto')

}

function resizeTable() {
    console.log('resize');
    return;
    const win = $('#content');
    const w = win.width();
    const h = win.height();
    const ratio = w / h;
    const rows = Math.floor(ratio > 1 ? h / cellRatio : w / cellRatio);
    let trs = table.find('tr');

    console.log(trs);
        
    $('#content table td').each((i,e) => {
        if(i % rows == 0) {
            tr = trs.eq(i / rows);
            $('#content table').append(tr);
        }

        tr.append(e);
    });

}

let table = $('#content table');
const numCells = 16;
const cellRatio = 9 / 16;
var cols = 0;
const modal = $('#content-player');
const projects = [];
const imgs = ['IMG_0667', 'IMG_0668', 'IMG_0671', 'IMG_0672', 'IMG_0674', 'IMG_0675', 'IMG_0678', 'IMG_0680']


$('#filter .btn').click((e) => {
    $(e.target).addClass('btn-secondary').removeClass('btn-outline-secondary')
        .siblings().removeClass('btn-secondary').addClass('btn-outline-secondary');

    if(e.target.id === '4') {
        $('#content table td').removeClass('hidden');
        return;    
    };

    $('#content table td').addClass('hidden');
    if(e.target.id === '1'){
        $('#content table td.video').removeClass('hidden');
    } else if(e.target.id === '2') {
        $('#content table td.audio').removeClass('hidden');
    } else if(e.target.id === '3') {
        $('#content table td.episode').removeClass('hidden');
    }
});



$(window).resize(() => {
    // resizeTable();
});

setTimeout(() => {
    loadGrid()

}, 1)
// loadGrid();

$('#content table td').each((i,e) => {

    if(i%7 === 0 || i%7 === 3 || i%5 === 0) {
        e.addClass('video');
    } else if(i%4 === 0 || i%4 === 2) {
        e.addClass('audio');
    } else {
        e.addClass('episode');
    }

});
