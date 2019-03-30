let matches = [];
let matchNums = [];
let file;
let url;
let inputs = document.getElementsByTagName('input');
let link = document.getElementById('download');
let QRindex = -1;
//$(window).resizeTo(607.7, 1080);

function exportToCSV(filename) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < matches.length; i++) {
        csvFile += processRow(matches[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

$('form').submit((e)=>{ 
    e.preventDefault();
    if(confirm("are you sure you want to submit?")){
        let match = [];
        let tr = $('<tr></tr>');
        matchNums.push(inputs[2].value);
        for(let i in [...Array(20)]){
            match.push(inputs[i].value);
            tr.append($('<td></td>').text(inputs[i].value).addClass('dataCell'));
            $('#data tbody').append(tr);
            if(i == 0){
                inputs[i].value++;
            }
            if(i>3 && i<20){
                inputs[i].value = '0';
            }
        }
        match.push($('#comments').val())
        $('#comments').val('')
        matches.push(match);
        QRindex = matches.length-1;
        $('.dataCell').click((e)=>{
            $('#dataSave').attr('disabled', false);
            let newValue = prompt("new value");
            if(e.currentTarget.cellIndex != 0){
                let max = parseInt(inputs[e.currentTarget.cellIndex].max);
                let min = parseInt(inputs[e.currentTarget.cellIndex].min);
                if(isNaN(newValue)){
                    alert("Please enter an integer between " + min + " and " + max)
                }
                else if(parseInt(newValue) >= min && parseInt(newValue) <= max){
                    $(e.currentTarget).text(newValue);       
                }
                else {
                    alert("Please enter an integer between " + min + " and " + max)
                }
            } else{
                $(e.currentTarget).text(newValue);
            }
        });
    }
    console.log('submit');
    $('#QRbutton').click();
});

function changeQR(btn, dir){
    if(QRindex+dir <= matches.length-1 && QRindex+dir >= 0){
        QRindex += dir
        generateQR();
    }
}

function generateQR(index){
    let str = '';
    let matchNum = matches[QRindex][0]
    $('#matchName').text('Match ' + matchNum);
    $('#qrcode').empty();
    for(let i in matches[QRindex]){
        str += matches[QRindex][i] + ';';
    }
    var qrcode = new QRCode(document.getElementById('qrcode'), {
        text: str,
        width: $(window).width()/4,
        height: $(window).width()/4,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
}

$('.plus').click((e)=>{
    let input = $($($($($(e.currentTarget).parent()).parent()).children()[1]).children()[0]);
    if(input.val()<parseInt(input.attr('max'))){
        input.val(parseInt(input.val())+1);
    }
});

$('.minus').click((e)=>{
    let input = $($($($($(e.currentTarget).parent()).parent()).children()[1]).children()[0]);
    if(input.val()>parseInt(input.attr('min'))){
        input.val(parseInt(input.val())-1);
    }
})

function save(){
    $('#dataSave').attr('disabled', true);
    for(let i in matches){
        for(let f in matches){
            matches[i][f] = ($('#data td')[i])
        }
    }
}

$('#data thead').append($('<tr id="headRow"></tr>'))
for(let i in [...Array(23)]){
    let th = $('<th></th>');
    th.text($($('label')[i]).text());
    $('#headRow').append(th);
}