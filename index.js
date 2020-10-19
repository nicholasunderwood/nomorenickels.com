let lastPage = $('#about');
let lastIndex = 0;

const numPages = 4;


console.log($('.wrapper:not(:first-child)'));
$('.wrapper:not(:first-child)').css('left', '120%');

$('.slide').click((e) => {
    console.log("click")

    let slide = $(e.currentTarget);
    let index = $('.slide').index(slide);

    if(index == lastIndex) return;
    
    let currentPage = $(slide.attr('lnk'));
    console.log(slide.attr('lnk'), currentPage)
    lastPage.animate({left: index > lastIndex ? '-120%' : '120%'}, 500);
    currentPage.animate({left: '5%'}, 500);

    let w = window.innerWidth

    boxOffset = 10 + 380*index + 76*(index+1) - (.21*w-380)/2
    console.log(index, w, boxOffset, (w-20)*(index+1)/25)
    
    $('#underline').animate({left: boxOffset + "px"}, 500);

    lastPage = currentPage;
    lastIndex = currentPage.index();
});

$('#roboticsBtn').click()

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