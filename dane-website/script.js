let table = $('#content table');
const cols = 3;
const rows = 4;
const cellHeight = 9 / 16;
const modal = $('#content-player');
const projects = [];
const imgs = ['IMG_0667', 'IMG_0668', 'IMG_0671', 'IMG_0672', 'IMG_0674', 'IMG_0675', 'IMG_0678', 'IMG_0680']

function loadGrid(){
    table.empty();
    // template = $('<button class=\'w-100 h-100\' data-bs-toggle="modal" data-bs-target="#staticBackdrop></button>');


    for(let i = 0; i < rows; i++) {
        let row = $('<tr>');
        for(let j = 0; j < cols; j++) {
            let index = i*cols+j;
            if(index >= imgs.length) break;
            let src = `./thumbnails/${imgs[i*cols+j]}.jpg`;
            let cell = $(`<td><img src=${src}></td>`);
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
    const win = $('#content');
    const w = win.width();
    const h = win.height();
    const ratio = w / h;
    const rows = Math.floor(ratio > 1 ? h / cellHeight : w / cellHeight);
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
    console.log('resize');
    resizeTable();
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
