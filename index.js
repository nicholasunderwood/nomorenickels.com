let lastIndex = 0
$('#programs').css('left', '150%');
$('#about').css('left', '300%');
function render(index){
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
