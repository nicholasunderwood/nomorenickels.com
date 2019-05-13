let actors, types, verbs;

function randIndex(list){
    return list[Math.floor(Math.random()*list.length)]
}

function makeRes(){
    actorType = randIndex(['goverment', 'group']);
    let actor = randIndex(targets[actorType]);
    let targetIndex = Math.floor(Math.random()*4)
    let targetType = ['goverment', 'group', 'people', 'policy'][targetIndex];
    let verb = randIndex(verbs[actorType][targetIndex]);
    let target = randIndex(targets[targetType]);
    return [actor, 'should', verb, target];
}

$(window).on('load', (()=>{
    types = ['should', 'ought', 'will'];
    verbs = {
        goverment: [
            ['create and support insurgent groups against', 'launch a coup against', 'invade', 'declare war against', 'give federally owned land to'],
            ['give govermental power to', 'fund', 'ban'],
            ['imprisson', 'assassinate', 'grant legal immunity to', 'give federally owned land to',],
            ['implement', 'enforce', 'repeal']
        ],
        group: [
            ['create and support insurgent groups against', 'lauch a coup against'],
            ['collaborate with', 'fund'],
            ['fund', 'sue'],
            ['advocate for', 'advocate against']
        ]
    };

    targets = {
        goverment:  ['The United States Federal Goverment', 'The Isreali Goverment', 'The British Monarchy', 'The United Nations'],
        group:      ['Third Wave Feminists', 'The GOP', 'The NRA', 'Libertarians', 'Public School teachers'],
        people:     ['Jeff Bezos', 'Donald Trump', 'Jeff Sessions', 'The Crown Prince of Saudi Arabia'],
        policy:     ['universal basic income', 'The Green New Deal', 'communsim', 'facism', 'private prisons', 'Marijhana', 'a border wall'],
    }
    targets.goverment.concat(targets.group).forEach((actor)=>{
        $('#actorSettings ul').append($('<li>' + actor + '</li>'));
    });
    $('#gen').click(()=>{
        let res = makeRes()
        console.log(res);
        for(i in res){
            let span = $('<span></span>')
                .append($('<div>' + res[i] +'</div>'))
                .append($('<div class="underline"></div>'))
                .append($('<div class="type">' + ['actor', 'type', 'verb', 'target'][i] + '</div>'))
                .attr('id',['actor', 'type', 'verb', 'target'][i]);
            $('#res').append(span);
            if(i<3){
                $('#res')[0].innerHTML += ' ';
            }
        }
    })
    $('#gen').click();


    for(i in targets){
        targets[i].forEach((target)=>{
            $('#targetSettings ul').append($('<li>' + target + '</li>'));
        });
    }
    ['goverment', 'group'].forEach((col)=>{
        verbs[col].forEach((tars)=>{
            tars.forEach((verb)=>{
                $('#verbSettings ul').append($('<li>' + verb + '</li>'));
            })
        })
    })
}));


let lastIndex = 0
$('#typeSettings').css('left', '120%');
$('#actionSettings').css('left', '120%');
$('#targetSettings').css('left', '120%');
function render(index){
    console.log('render', index);
    // $('#actorSettings').animate({left: '-120%'}, 500);
    let margin = 25*index + '%';
    $('#underline').animate({marginLeft: margin}, 500)
    let bodies = ['#actorSettings', '#typeSettings', '#programSettings']
    if(index !== lastIndex){
        if(index>lastIndex){
            $(bodies[lastIndex]).animate({left: '-120%'}, 500);
        }
        else{
            $(bodies[lastIndex]).animate({left: '120%'}, 500);
        }
        $(bodies[index]).animate({left: '50%'}, 500);
        lastIndex = index;
    }
}