let lastPage = $('#about');
let lastIndex = 0;


console.log($('.wrapper:not(:first-child)'));
$('.wrapper:not(:first-child)').css('left', '120%');

$('.slide').click((e) => {
    console.log("click")

    let slide = $(e.currentTarget);
    console.log(slide, slide.index())
    if(slide.index() == lastIndex) return;
    
    let currentPage = $(slide.attr('page'));
    console.log(currentPage)
    lastPage.animate({left: slide.index() > lastIndex ? '-120%' : '120%'}, 500);
    currentPage.animate({left: '10%'}, 500);

    lastPage = currentPage;
    lastIndex = currentPage.index();
});

// $('#programs').css('left', '120%');
// $('#about').css('left', '240%');
// function render(index){
//     let margin = 33*index + '%';
//     $('#underline').animate({marginLeft: margin}, 500)
//     let bodies = ['#games', '#programs', '#about']
//     if(index !== lastIndex){
//         if(index>lastIndex){
//             $(bodies[lastIndex]).animate({left: '-120%'}, 500);
//         }
//         else{
//             $(bodies[lastIndex]).animate({left: '120%'}, 500);
//         }
//         $(bodies[index]).animate({left: '10%'}, 500);

//         lastIndex = index;
//     }
// }

$('.box').on('transitionend', (e)=>{
    console.log(e.currentTarget)
    $($(e.currentTarget).children()).children()[2].style.opactiy = '100%'
})
