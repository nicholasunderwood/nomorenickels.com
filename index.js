var lastPage = $('#about');
var lastIndex = 0;
var index = 0;
var w = window.innerWidth

var isMoving = false

const numPages = 4;


console.log($('.wrapper:not(:first-child)'));
$('.wrapper:not(:first-child)').css({ left: '120%', display: 'none' });
$('#underline').css('left', 10 + (w-20)/25 - (.21*w - (w-20)/5)/2 + 'px')

$('.slide').click((e) => {
    if(isMoving) return;
    isMoving = true;

    console.log("click")

    let slide = $(e.currentTarget);
    index = $('.slide').index(slide);

    if(index == lastIndex) return;
    
    let currentPage = $(slide.attr('lnk'));
    currentPage.css('display', index == 0 ? 'flex' : 'block');
    console.log(currentPage);

    lastPage.animate({left: index > lastIndex ? '-120%' : '120%'}, 500);
    currentPage.animate({left: '5%'}, { 
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
    console.log(boxOffset)
    
    $('#underline').animate({left: boxOffset + "px"}, 500);
});

$(window).resize(() => {
    w = window.innerWidth;
    console.log('resize', w)
    $('#underline').css({left: getUnderlineOffset(index) + "px"});
})

function getUnderlineOffset(index) {
    rect = $('.slide').eq(index)[0].getBoundingClientRect();
    return rect.x - (.21*w - rect.width)/2;
}