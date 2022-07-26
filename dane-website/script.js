let table = $('#content table');
const cols = 9;
const rows = 5;

for(let i = 0; i < rows; i++) {
    let row = $('<tr>');
    for(let j = 0; j < cols; j++) {
        let cell = $('<td>');
        // cell.text(`${i}${j}`);
        row.append(cell);
    }
    table.append(row);
}

$('#content table td').each((i,e) => {
    e = $(e);
    e.height(e.width());

    if(i%7 === 0 || i%7 === 3 || i%5 === 0) {
        e.addClass('video');
    } else if(i%4 === 0 || i%4 === 2) {
        e.addClass('audio');
    } else {
        e.addClass('episode');
    }

});

$('#filter .btn').click((e) => {
    $(e.target)
        .toggleClass('btn-outline-secondary')
        .toggleClass('btn-secondary')
        .blur();
    if(e.target.id === '1'){
        $('#content table td.video').toggleClass('hidden');
    } else if(e.target.id === '2') {
        $('#content table td.audio').toggleClass('hidden');
    } else if(e.target.id === '3') {
        $('#content table td.episode').toggleClass('hidden');
    }
});
