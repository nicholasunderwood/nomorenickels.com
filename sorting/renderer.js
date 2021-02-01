var values, interval, canvas, ctx, al;
var staticAl = BubbleSort;
var isPaused = true;
var hasStarted = false;
const staticAls = [BubbleSort, SelectionSort, BogoSort, StalinSort];
const setSize = 1000;

const colors = [...Array(setSize)].map(_ => 'black')

function randomizeArray(){
    var ordered = [...Array(setSize)].map((_,i) => i+1);
    // return ordered;
    var randomized = [];
    for(
        let i = Math.floor(Math.random() * 100);
        ordered.length > 0;
        i = Math.floor(Math.random() * ordered.length)
    ){
        randomized.push(ordered.splice(i, 1)[0]);
    }

    console.log(randomized)
    return randomized;
}

function start() {
    isPaused = false;
    hasStarted = true;

    let boundingBox = canvas.getBoundingClientRect();

    canvas.width = boundingBox.width;
    canvas.height = boundingBox.height;

    
    al = new staticAl(values); 
    al.start(values);
    interval = setInterval(sort, al.stepRate, al);
    $('#play').text('Pause').unbind('click').on('click', pause);
}


function pause() {
    isPaused = !isPaused;
    $('#start').text(isPaused ? 'Resume' : 'Pause ');
}


function renderValues () {
    let width = canvas.width;
    let height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    
    
    values.forEach((x,i) => {
        ctx.fillStyle = colors[i];
        ctx.fillRect(i*width/values.length-1, height - (x)*height/setSize, width/values.length + 1.5, height*(x)/setSize + 1.5);
    });

}

function sort(al, override){
    if(isPaused && !override) return;
    al.step(values);

    renderValues();

    if(al.isFinished){
        clearInterval(interval);
        renderValues();
    }
}

$(document).ready(() => {
    canvas = $('canvas')[0];
    ctx = canvas.getContext('2d');
    $('#play').on('click', start);
    $('#algorithm').on('change', function () {
        staticAl = staticAls[+$(this).val()];
    })

    $('#next').on('click', () => { sort(al, true) });
    $('#restart').on('click', () => {
        clearInterval(interval);
        values = randomizeArray();
        colors.map(_ => 'black');
        renderValues();
        $('#play').on('click', start).text('Start');
        hasStarted = false;

    });

    values = randomizeArray();

    $(window).on('resize', () => {
        let boundingBox = canvas.getBoundingClientRect();
        canvas.width = boundingBox.width;
        canvas.height = boundingBox.height;
        renderValues(); 
    }).resize();
    
});
