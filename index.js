function slideToPage(index){
    if(isMoving) return;
    isMoving = true;

    let currentPage = $($(`.wrapper`)[index]);
    currentPage.css('display', 'flex');

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
    let degPerStep = (nextState.heading - lastState.heading)/50;
    let percentPerStep = (nextState.pos - lastState.pos)/50;


    let step = 0;
    let lastPage = lastIndex

    let inter = setInterval(() => {
        if(step >= 50){ 
            clearInterval(inter);
            lastState = nextState
            return;
        }
        
        step += 2;
        let transState = Math.round(step/50*gradLength);
        let heading = Math.floor(lastState.heading + step*degPerStep);
        let pos =  Math.floor(lastState.pos + step*percentPerStep);
        $('#container').css(getLinearGradientStyle(pos, heading, lastPage, index, transState));
    }, 10)


}

function getLinearGradientStyle(pos, heading, lastPage, nextPage, transState){
    return {
        background: `linear-gradient(
            ${heading}deg
            ,var(--bg-color-1)
            ,var(--bg-color-1) ${pos}%
            ${getFlagGradient(pos, prideOrder[lastPage], gradLength-transState)}
            ${getFlagGradient(pos+gradLength-transState, prideOrder[nextPage], transState)}
            ,var(--bg-color-1) ${pos+gradLength}%
            ,var(--bg-color-1)
        )`
    }
}

function getFlagGradient(start, flag, flagWidth){
    let colors = pride[flag];
    let p = flagWidth/colors.length;
    return colors.map((hex,i) => `,${hex} ${start+p*i}% ,${hex} ${Math.round(start+p*(i+1))}% `).reduce((a,b) => a+b, '')
}

var lastPage = $('#about');
var lastIndex = 0;
var index = 0;
var w = window.innerWidth
var isMoving = false
const numPages = 4;
const gradLength = 24;

const prideOrder = ['lgbt', 'bi', 'ace', 'trans']

const animationStates = [
    {heading: 315, pos: 90-gradLength},
    {heading: 225, pos: 90-gradLength},
    {heading: 225, pos: 20},
    {heading: 315, pos: 20}
];

const pride = {
    'bi': ['#D00070', '#8C4799', '#0032A0'],
    'lgbt': ['#FF0018', '#FFA52C', '#FFFF41', '#008018', '#0000F9', '#86007D'],
    'ace': ['#000000', '#A4A4A4', '#FFFFFF', '#810081'],
    'trans': ['#55CDFC', '#F7A8B8', '#FFFFFF', '#F7A8B8', '#55CDFC']
}

var lastState = animationStates[0];

$('.wrapper:not(:first-child)').css({ left: '120%', display: 'none' });
$('#underline').css('left', 10 + (w-20)/25 - (.21*w - (w-20)/5)/2 + 'px')

$('.slide').click((e) => {
    let slide = $(e.currentTarget);
    index = $('.slide').index(slide);
    if(index == lastIndex) return;

    console.log('click')


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

$('#container').css(getLinearGradientStyle(lastState.pos, lastState.heading, lastIndex, index, gradLength));