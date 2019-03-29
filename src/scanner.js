let pause = false;
let data = [];

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {console.error(e);});

let scanner = new Instascan.Scanner({
    video: document.getElementById('preview')
});

scanner.addListener('scan', function (e) {
    let result = e.content;
    let match = ['']
    let x = 0;
    console.log(result);
    for(let i in result){
        if(i != ','){
            data[x] += result[i];
        }
        else{
            x++;
            data[x].push('');
        }
    }
    console.log(match)
    data.push(match)
    let tr = $('<tr></tr>');
    for(let i in match){
        let td = $('<td>'+match[i]+'</td>')
    }
    console.log($.csv.fromArrays(match));
});

function toggleScanner(btn){
    pause = !pause;
    if(pause){
        scanner.stop();
        $(btn).text("Start Scanner");
    }
    else{
        scanner.start();
        $(btn).text("Stop Scanner");
    }
}