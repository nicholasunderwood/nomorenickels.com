var values, canvas, ctx, al;
var staticAl = BubbleSort;
var isPaused = true;
var hasStarted = false;
const staticAls = [BubbleSort, SelectionSort, StalinSort];
const setSize = 1000;
this.threadIDs = []

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
    threadIDs.push(window.requestAnimationFrame(thread));
    $('#play').text('Pause').unbind('click').on('click', pause);
    $('#speed').attr('disabled', true);
    $('#slow').attr('disabled', true);
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

function thread() {
    sort();

    window.requestAnimationFrame(thread);
}

function sort(override){
    if(isPaused && !override) return;
    console.log()
    al.step(values);

    renderValues();

    if(al.isFinished){
        threadIDs.forEach(id => window.cancelAnimationFrame(id));
        renderValues();
    }

    window.requestAnimationFrame(sort);
}

$(document).ready(() => {
    canvas = $('canvas')[0];
    ctx = canvas.getContext('2d');
    $('#play').on('click', start);
    $('#algorithm').on('change', function () {
        staticAl = staticAls[+$(this).val()];
    })

    $('#speed').on('click', function () { 
        threadIDs.push(window.requestAnimationFrame(thread));
        $('#slow').attr('disabled', false)
        if(threadIDs.length == 10) this.attr('disabled', true)  
    });

    $('#slow').on('click', function () { 
        window.cancelAnimationFrame(threadIDs.pop());
        $('#speed').attr('disabled', false)
        if(threadIDs.length == 1) this.attr('disabled', true)  
    });


    $('#restart').on('click', () => {
        threadIDs.forEach(id => window.cancelAnimationFrame(id));
        values = randomizeArray();
        colors.forEach((_,i) => colors[i] = 'black');
        renderValues();
        $('#play').on('click', start).text('Start');
        $('#speed').attr('disabled', true);
        $('#slow').attr('disabled', true);
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
