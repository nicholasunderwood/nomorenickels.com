function optimizeGrid(width, height, numCells){
    let cols = 0;
    let best_height = Infinity;
    for(let p_cols = 1; p_cols <= numCells; p_cols++){
        let p_rows = Math.ceil(numCells / p_cols);
        let p_height = width / p_cols * cellHeight * p_rows
        
        if(Math.abs(p_height-height) < Math.abs(best_height-height)){
            cols = p_cols;
            best_height = p_height;
        }
    }

    console.log(best_height, height)
    return cols;

}

function loadGrid(){
    console.log('load grid')
    table.empty();

    const win = $('#content');
    const w = win.width();
    const h = win.height();
    console.log(h);
    cols = optimizeGrid(w,h,numCells)

    console.log(cols);


    for(let i = 0; i < Math.ceil(numCells / cols); i++) {
        let row = $('<tr>');
        for(let j = 0; j < cols; j++) {
            let index = i*cols+j;
            if(index >= numCells) break;
            let src = `./thumbnails/${imgs[(i*cols+j)%8]}.jpg`;
            let cell = $(`<td>
                <img src=${src}>
                <span class='title'>
                    ${config.projects[index] && config.projects[index].name || 'Project ' + index}
                </span>
            </td>`);
            cell.on('click', (e) => {
                e.preventDefault();
                modal.modal('show');
            })
            row.append(cell);
        }
        table.append(row);
    }
}

function resizeTable() {
    console.log('resize');

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
const cellHeight = 9 / 16;
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


loadGrid();

$('#content table td').each((i,e) => {
    e = $(e);
    e.height(e.width() * cellHeight);

    if(i%7 === 0 || i%7 === 3 || i%5 === 0) {
        e.addClass('video');
    } else if(i%4 === 0 || i%4 === 2) {
        e.addClass('audio');
    } else {
        e.addClass('episode');
    }

});
