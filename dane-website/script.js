let table = $('#content table');
const cols = 9;
const rows = 5;
const cellHeight = 9 / 16;

function loadGrid(){
    table.empty();


    for(let i = 0; i < rows; i++) {
        let row = $('<tr>');
        for(let j = 0; j < cols; j++) {
            let cell = $('<td>');
            row.append(cell);
        }
        table.append(row);
    }
}

function resizeTable() {
        
    $('#content table td').each((i,e) => {
        e = $(e);
        e.height(e.width() * cellHeight);
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
