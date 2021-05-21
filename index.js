var lastPage = $('#about');
var lastIndex = 0;
var index = 0;
var w = window.innerWidth
var isMoving = false
const numPages = 4;

const animationStates = [
    {heading: 315, pos: 80},
    {heading: 225, pos: 80},
    {heading: 225, pos: 10},
    {heading: 315, pos: 10}
];

var lastState = animationStates[0];

$('.wrapper:not(:first-child)').css({ left: '120%', display: 'none' });
$('#underline').css('left', 10 + (w-20)/25 - (.21*w - (w-20)/5)/2 + 'px')

$('.slide').click((e) => {
    if(isMoving) return;
    isMoving = true;


    let slide = $(e.currentTarget);
    index = $('.slide').index(slide);
    slideToPage(index);
    
    
});

$('.arrow.left-arrow').click(() => {
    if(isMoving) return;
    slideToPage(lastIndex == 0 ? numPages - 1 : lastIndex - 1);
});

$('.arrow.right-arrow').click(() => {
    if(isMoving) return;
    slideToPage(lastIndex == numPages-1 ? 0 : lastIndex + 1);
});

$(window).resize(() => {
    w = window.innerWidth;
    console.log('resize', w)
    $('#underline').css({left: getUnderlineOffset(index) + "px"});
});

function slideToPage(index){
    console.log(index);
    if(index == lastIndex) return;
    
    let currentPage = $($(`.wrapper`)[index]);
    currentPage.css('display', 'flex');
    console.log(currentPage, lastPage);

    lastPage.animate({left: index > lastIndex ? '-120%' : '120%'}, 500);
    currentPage.animate({left: '10%'}, { 
        duration: 500,
        complete: () => { 
            isMoving = false; 
            lastPage.css('display', 'none'); 
            lastPage = currentPage;
            lastIndex = index;
        }
    });

    if(index - lastIndex > 1){
        console.log(1, $('.wrapper').slice(lastIndex+1, index))
        $('.wrapper').slice(lastIndex+1, index).css("left","-120%");
    } else if (lastIndex - index > 1) {
        console.log(1, $('.wrapper').slice(index+1, lastIndex))
        $('.wrapper').slice(index+1, lastIndex).css("left", "120%");
    }

    w = window.innerWidth;

    boxOffset = getUnderlineOffset(index)
    
    $('#underline').animate({left: boxOffset + "px"}, 500);


    animateBackground(index);
    
}

function getUnderlineOffset(index) {
    rect = $('.slide').eq(index).parents('.nav-item')[0].getBoundingClientRect();
    slide = $('#underline')[0].getBoundingClientRect()
    return rect.x - (slide.width - rect.width)/2;
}


function animateBackground(index) {
    let nextState = animationStates[index];
    console.log(nextState.heading - lastState.heading)
    let degPerStep = (nextState.heading - lastState.heading)/50;
    let percentPerStep = (nextState.pos - lastState.pos)/50;

    console.log(nextState, degPerStep, percentPerStep)

    let step = 0;

    let inter = setInterval(() => {
        if(step >= 50){ 
            clearInterval(inter);
            $('#container').css(getLinearGradientStyle(nextState.pos, nextState.heading));
            lastState = nextState
            return;
        }
        
        step += 1;
        let heading = Math.floor(lastState.heading + step*degPerStep);
        let pos =  Math.floor(lastState.pos + step*percentPerStep);
        console.log(heading, pos)
        $('#container').css(getLinearGradientStyle(pos, heading));
    }, 10)


}

function getLinearGradientStyle(pos, heading){
    return {
        background: `linear-gradient(
            ${heading}deg
            ,var(--bg-color-1)
            ,var(--bg-color-1) ${pos}%
            ,#ff8a00 ${pos}%
            ,#e52e71 ${pos+10}%
            ,var(--bg-color-1) ${pos+10}%
            ,var(--bg-color-1)
        )`
    }
}