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
    
    $('#underline').animate({marginLeft: index*100/numPages + "%"}, 500);

    lastPage = currentPage;
    lastIndex = currentPage.index();
});
