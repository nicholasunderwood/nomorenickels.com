let lastIndex = 0
$('#programs').css('left', '150%');
$('#about').css('left', '300%');
function render(index){
    let margin = 33*index + '%';
    $('#underline').animate({marginLeft: margin}, 500)
    let bodies = ['#games', '#programs', '#about']
    if(index !== lastIndex){
        if(index>lastIndex){
            $(bodies[lastIndex]).animate({left: '-150%'}, 500);
            $(bodies[index]).animate({left: '50%'}, 500);
        }
        else{
            $(bodies[lastIndex]).animate({left: '150%'}, 500);
            $(bodies[index]).animate({left: '50%'}, 500);

        }
        lastIndex = index;
    }
}

$('.box').on('transitionend', (e)=>{
    console.log(e.currentTarget)
    $($(e.currentTarget).children()).children()[2].style.opactiy = '100%'
})
