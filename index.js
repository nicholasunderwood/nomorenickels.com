let lastPage = $('#about');
let lastIndex = 0;
let w = window.innerWidth

var isMoving = false

const numPages = 4;


console.log($('.wrapper:not(:first-child)'));
$('.wrapper:not(:first-child)').css('left', '120%');
$('#underline').css('left', 10 + (w-20)/25 - (.21*w - (w-20)/5)/2 + 'px')

$('.slide').click((e) => {
    if(isMoving) return;
    isMoving = true;

    console.log("click")

    let slide = $(e.currentTarget);
    let index = $('.slide').index(slide);

    if(index == lastIndex) return;
    
    let currentPage = $(slide.attr('lnk'));
    console.log(slide.attr('lnk'), currentPage)
    lastPage.animate({left: index > lastIndex ? '-120%' : '120%'}, 500);
    currentPage.animate({left: '5%'}, { 
        duration: 500,
        complete: () => { isMoving = false; }
    });

    if(index - lastIndex > 1){
        console.log(1, $('.wrapper').slice(lastIndex+1, index))
        $('.wrapper').slice(lastIndex+1, index).css("left","-120%");
    } else if (lastIndex - index > 1) {
        console.log(1, $('.wrapper').slice(index+1, lastIndex))
        $('.wrapper').slice(index+1, lastIndex).css("left", "120%");
    }

    w = window.innerWidth

    boxOffset = 10 + (w-20)*index/5 + (w-20)*(index+1)/25 - (.21*w - (w-20)/5)/2
    console.log(boxOffset)
    
    $('#underline').animate({left: boxOffset + "px"}, 500);

    lastPage = currentPage;
    lastIndex = currentPage.index();
});

// tilting
// const max = 40;

// $('.card-border').on('mouseover mouseenter mousemove', (e) => {
//     let rect = e.currentTarget.getBoundingClientRect();
//     card = $(e.currentTarget).children()[0];
//     x = (e.clientX - rect.left) / rect.width;
//     y = (e.clientY - rect.top) / rect.height;
    
//     card.style.transform = `perspective(1000px) rotateX(${x*max}) rotateY(${y*max})`;
//     console.log(card, card.style)
// })