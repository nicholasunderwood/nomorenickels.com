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
    // while (target != actor){
    //     target = randIndex(targets[targetType]);
    // }
    // return [actor, 'should', verb, target];
    return ['Jeff Bezos', 'should', 'have sexual relations with', 'furries']
}

$(window).on('load', (()=>{

    types = ['should', 'ought', 'will'];
    verbs = {
        goverment: [
            ['create and fund insurgent groups against', 'launch a coup against', 'invade', 'declare war against', 'give federally owned land to'],
            ['give govermental power to', 'give money to', 'ban'],
            ['imprisson', 'assassinate', 'grant legal immunity to', 'give federally owned land to',],
            ['implement', 'repeal', 'mandate', 'add a constituional amendment mandating']
        ],
        group: [
            ['create and fund insurgent groups against', 'lauch a coup against'],
            ['collaborate with', 'fund'],
            ['assassinate', 'sue'],
            ['advocate for', 'advocate against']
        ]
    };

    targets = {
        goverment:  ['The United States Federal Goverment', 'The Isreali Goverment', 'The British Monarchy', 'The '],
        group:      ['Third Wave Feminists', 'The GOP', 'The NRA', 'Libertarians', 'Public School teachers', 'The Black Lives Matter movement'],
        people:     ['Jeff Bezos', 'Donald Trump', 'Jeff Sessions', 'The Crown Prince of Saudi Arabia', 'AP Chemistry teacher Mr. Glimmie', 'Teoman Tezcan'],
        policy:     ['universal basic income', 'The Green New Deal', 'communsim', 'a police state', 'private prisons', 'Marijhana', 'a border wall'],
    }

    let allActors = [];
    let allVerbs = [];
    let allTargets = [];

    targets.goverment.concat(targets.group).forEach((actor)=>{
        $('#0').append($('<li>' + actor + '</li>'));
        allActors.push(actor)
    });
    types.forEach((type)=>{
        $('#1').append($('<li>' + type + '</li>'));

    });

    ['goverment', 'group'].forEach((tars)=>{
        verbs[tars].forEach((tar)=>{
            console.log(tar)
            tar.forEach((verb)=>{
                allVerbs.push(verb);
                $('#2').append($('<li>' + verb + '</li>'));
            })
        });
    });

    ['goverment', 'group', 'people', 'policy'].forEach((tars)=>{
        targets[tars].forEach((tar)=>{
            allTargets.push(tar);
            $('#3').append($('<li>' + tar + '</li>'));
        });
    });
    
    $('#gen').click(()=>{
        $('#res').empty()
        let res = makeRes()
        console.log(res);
        for(i in res){
            let span = $('<span></span>')
                .append($('<div>' + res[i] +'</div>'))
                .append($('<div class="underline"></div>'))
                .append($('<div class="type">' + ['actor', 'type', 'action', 'target'][i] + '</div>'))
                .attr('id',['actor', 'type', 'verb', 'target'][i]);
            $('#res').append(span);
            if(i<3){
                $('#res')[0].innerHTML += ' ';
            }
        }
        $('#actor').click(()=>{
            let oldActor = res[0];
            let actor = randIndex(allActors);
            // while (actor != res[3] && actor != oldActor){
            //     actor = randIndex(allActors);
            // }
            $($('#actor').children()[0]).text(actor);
            res[0] = actor;
        })
        $('#type').click(()=>{
            let oldType = res[1];
            let type = randIndex(types);
            // while (type != oldType){
            //     type = randIndex(types);
            // }
            $($('#type').children()[0]).text(type);
            res[1] = type;
        })
        $('#verb').click(()=>{
            let oldVerb = res[2];
            let verb = randIndex(allVerbs);
            // while (verb != oldVerb){
            //     verb = randIndex(allVerbs);
            // }
            $($('#verb').children()[0]).text(verb);
            res[2] = verb;
        })
        $('#target').click(()=>{
            let oldTarget = res[3];
            let target = randIndex(allTargets);
            // while (target != res[0] && target != oldTarget){
            //     actor = randIndex(allTargets);
            // }
            $($('#target').children()[0]).text(target);
            res[3] = target;
        });
    });
    $('#gen').click();
}));