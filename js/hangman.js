var divs = [];
var lifeboxes = [$('#a'), $('#b'), $('#c'), $('#d'), $('#e'), $('#f')];

function lose() {
    end();
    console.log('lose function');
    $('#ending').text("HA! You're a terrible human being.")

}

function win() {
    end();
    console.log('win function');
    $('#ending').text('Well, congrats, I guess.')
}

function end() {
    $('span').css('animation-name', 'end');
    console.log('end function');
}

function makeDiv (l) {
    for (i = 0; i < l.length; i++) {
        var $span = $("<span>", {id: i, class: "span hidden"});
        $span.text(l[i]);
        divs.push($span);
        $('#word').append($span)

    }
}

$(document).ready(function () {
    var wordlist = ["hangman", "chairs", "backpack", "bodywash", "clothing", "computer", "python", "program", "glasses", "sweatshirt", "sweatpants", "mattress", "friends", "clocks", "biology","algebra", "suitcase", "knives", "ninjas", "shampoo", "soccer", "chemistry", "exclamation","wave","heaven","hello",  "extravagant",'wish', 'honorable', 'release', 'succinct', 'conscious', 'scatter', 'sincere', 'knotty', 'wander', 'accessible', 'hissing', 'produce', 'harbor', 'fork', 'smell', 'destroy', 'nose', 'straight', 'attempt', 'sparkle', 'doctor', 'zesty', 'remember', 'men', 'awful', 'ice', 'panoramic', 'vest', 'material', 'compare', 'save', 'understood', 'round', 'quaint', 'offend', 'pretend', 'sigh', 'check', 'dress', 'jellyfish', 'annoying', 'overflow', 'anger', 'colorful', 'foot', 'shocking', 'desk', 'story', 'macabre', 'soothe', 'bushes', 'well-made', 'extend', 'clear', 'approval', 'concern', 'join', 'shake', 'clumsy', 'distribution', 'meeting', 'parsimonious', 'recondite', 'drag', 'stiff', 'health', 'private', 'tired', 'pest', 'roll', 'respect', 'loose', 'fade', 'defiant', 'frog', 'sore', 'lush', 'resonant', 'rough', 'place', 'rate', 'therapeutic', 'pigs', 'painstaking', 'remove', 'deer', 'bouncy', 'road', 'simplistic', 'silk', 'label', 'cannon', 'sordid', 'ossified', 'actor', 'tested', 'fluttering', 'miniature', 'wandering', 'lethal', 'horrible', 'helpless', 'royal', 'staking', 'time', 'women', 'toy', 'squalid', 'condition', 'resolute', 'trail', 'capable', 'pushy', 'water', 'cars', 'superficial', 'kind', 'meaty', 'screw', 'x-ray', 'lumber', 'hover', 'light', 'animal', 'trouble', 'can', 'route', 'aboard', 'meat', 'summer', 'afford', 'appliance', 'play', 'spot', 'depend', 'choke', 'stimulating', 'salty', 'bite-sized', 'applaud', 'five', 'laugh', 'corn', 'describe', 'launch', 'gorgeous', 'brake', 'blade', 'society', 'spy', 'spotty', 'tub', 'brass', 'didactic', 'gun', 'frightened', 'defeated', 'snore', 'acoustics', 'roasted', 'rambunctious', 'grotesque', 'dysfunctional', 'voiceless', 'shiny', 'hook', 'consist', 'duck', 'efficacious', 'borrow', 'foregoing', 'cute', 'tight', 'strengthen', 'flowers', 'ruin', 'ray', 'rude', 'trade', 'fat', 'popcorn', 'sloppy', 'fruit', 'daily', 'ahead', 'annoyed', 'boy', 'enchanting', 'imagine', 'gusty', 'protect', 'elderly', 'peck', 'descriptive', 'start', 'box', 'cheer', 'rural', 'aquatic', 'zoom', 'maniacal', 'word', 'brainy', 'boiling', 'nervous', 'throat', 'rest', 'temporary', 'film', 'memory', 'cow', 'tearful', 'slow', 'taboo', 'useless', 'battle', 'spell', 'physical', 'limping', 'ocean', 'collect', 'brash', 'swim', 'cough', 'puzzled', 'quixotic', 'mug', 'damaging', 'pat', 'sticky', 'laugh', 'periodic', 'unwieldy', 'passenger', 'gainful', 'land', 'internal', 'accidental', 'ruthless', 'beds', 'unwritten', 'plastic', 'shade', 'broken', 'hammer', 'stamp', 'satisfy', 'supply', 'deserve', 'utter', 'bite', 'bore', 'previous', 'week', 'skinny', 'need', 'scream', 'protest', 'testy', 'back', 'recognise', 'jewel', 'pleasant', 'pizzas', 'spotted', 'interesting', 'comfortable', 'porter', 'suck', 'equal', 'talk', 'dizzy', 'chicken', 'relax', 'scientific', 'crawl', 'whole', 'fall', 'government', 'honey', 'destruction', 'zephyr', 'whine', 'balance', 'homeless', 'guess', 'tender', 'walk', 'curvy', 'wretched', 'share', 'frame', 'purpose', 'quiet', 'grip', 'ambiguous', 'six', 'mine', 'ball', 'witty', 'post', 'addicted', 'jam', 'scratch', 'push', 'lumpy', 'ambitious', 'scary', 'rain', 'refuse', 'sister', 'reflective', 'spill', 'push', 'achiever', 'head', 'mix', 'remind', 'delightful', 'defective', 'spring', 'momentous', 'erratic', 'infamous', 'apparel', 'expensive', 'unsightly', 'chunky', 'wine', 'notebook', 'natural', 'friction', 'wrap', 'fog', 'rapid', 'early', 'absorbing', 'anxious', 'zonked', 'short', 'tumble', 'bounce', 'school', 'chubby', 'used', 'incompetent', 'steadfast', 'drawer', 'key', 'license', 'demonic', 'cloistered', 'opposite', 'drip', 'plate', 'changeable', 'vacuous', 'thinkable', 'separate', 'scribble', 'dear', 'numberless', 'gold', 'encouraging', 'deliver', 'spray', 'black-and-white', 'wakeful', 'wonderful', 'thirsty', 'peep', 'house', 'phone', 'thunder', 'curved', 'brown', 'vase', 'ask', 'hand', 'hum', 'average', 'report', 'sense', 'rampant', 'judge', 'snow', 'snatch', 'pumped', 'rebel', 'vein', 'nutritious', 'lamentable', 'upbeat', 'orange', 'whip', 'good', 'approve', 'embarrass', 'fence', 'carpenter', 'hanging', 'uptight', 'rhyme', 'small', 'cemetery', 'regret', 'agreeable', 'brake', 'step', 'jobless', 'order', 'arithmetic', 'clear', 'effect', 'stranger', 'wipe', 'teeth', 'ludicrous', 'extra-small', 'robin', 'friend', 'press', 'different', 'power', 'scissors', 'substantial', 'ripe', 'grape', 'general', 'yielding', 'invent', 'park', 'weight', 'near', 'relation', 'groan', 'kiss', 'zoo', 'makeshift', 'depressed', 'woozy', 'rail', 'mitten', 'brawny', 'mellow', 'point', 'guard', 'wriggle', 'prefer', 'team', 'death', 'ignore', 'thoughtful', 'wilderness', 'hurt', 'impossible', 'adjoining', 'battle', 'wealth', 'watch', 'outstanding', 'worry', 'circle', 'zebra', 'hook', 'high', 'box', 'room', 'rule', 'knowledgeable', 'imminent', 'explain', 'clover', 'ground', 'book', 'gigantic', 'low', 'marvelous', 'volcano', 'pump', 'adjustment', 'glib', 'hurry', 'hot', 'eatable', 'spoil', 'office', 'ratty', 'drab', 'eye', 'tough', 'mysterious', 'self', 'unused', 'sound', 'zipper', 'stereotyped', 'worm', 'level', 'cheerful', 'bed', 'torpid', 'dull', 'complete', 'unruly', 'handle', 'oafish', 'mate', 'tangy', 'hour', 'crown', 'realise', 'delirious', 'wide-eyed', 'rush', 'potato', 'nasty', 'income', 'grandfather', 'library', 'gratis', 'second', 'level', 'dirt', 'swing', 'agree', 'stage', 'tart', 'year', 'proud', 'dramatic', 'mature', 'agonizing', 'grease', 'field', 'new', 'mind', 'wax', 'polish', 'coil', 'excited', 'faithful', 'eyes', 'nest', 'zippy', 'tawdry', 'bridge', 'miss', 'decisive', 'dance', 'huge', 'cold', 'nerve', 'greet', 'psychedelic', 'chance', 'vacation', 'end', 'celery', 'belief', 'confess', 'mushy', 'stitch', 'workable', 'kaput', 'suit', 'experience', 'red', 'useful', 'zip', 'smart', 'glue', 'wren', 'waiting', 'stitch', 'whimsical', 'advertisement', 'reminiscent', 'present', 'wrathful', 'deadpan', 'tank', 'surprise', 'club', 'regret', 'obnoxious', 'distance', 'clap', 'guide', 'flippant', 'sun', 'icky', 'beg', 'dapper', 'versed', 'sort', 'maid', 'ancient', 'cherries', 'amusement', 'noxious', 'ear', 'loud', 'male', 'knee', 'fumbling', 'toothpaste', 'middle', 'befitting', 'childlike', 'lacking', 'aggressive', 'rabid', 'crush', 'shut', 'idiotic', 'wrong', 'invention', 'ruddy', 'rescue', 'healthy', 'page', 'horses', 'riddle', 'steep', 'stomach', 'auspicious', 'appear', 'paper', 'scrub', 'towering', 'baseball', 'hilarious', 'unadvised', 'pack', 'grieving', 'strange', 'please', 'lonely', 'eggs', 'sail', 'smile', 'plot', 'cumbersome', 'gate', 'switch', 'crazy', 'repulsive', 'toothbrush', 'veil', 'coach', 'pocket', 'rustic', 'rely', 'request', 'weak', 'dime', 'skillful', 'melodic', 'synonymous', 'committee', 'husky', 'touch', 'discovery', 'bloody', 'action', 'humor', 'kettle', 'long', 'pig', 'nifty', 'religion', 'winter', 'prepare', 'curl', 'knot', 'class', 'jail', 'bucket', 'abiding', 'clam', 'flash', 'acceptable', 'phobic', 'jelly', 'mass', 'icicle', 'rabbit', 'matter', 'incredible', 'cream', 'shelf', 'furtive', 'annoy', 'cat', 'damp', 'tightfisted', 'languid', 'furry', 'chief', 'stroke', 'living', 'friendly', 'first', 'energetic', 'boast', 'knock', 'count', 'agreement', 'temper', 'spiffy', 'earthy', 'selfish', 'reward', 'harass', 'burly', 'sound', 'petite', 'overwrought', 'supreme', 'psychotic', 'fail', 'test', 'detail', 'hushed', 'loutish', 'star', 'tail', 'lunch', 'disagreeable', 'bikes', 'venomous', 'ordinary', 'sea', 'fancy', 'seal', 'obey', 'cycle', 'plug', 'comb', 'silent', 'waste', 'scare', 'last', 'loving', 'full', 'spiders', 'spotless', 'scintillating', 'blue-eyed', 'pale', 'improve', 'aftermath', 'flowery', 'craven', 'abashed', 'plant', 'cultured', 'precede', 'inform', 'scared', 'servant', 'young', 'shivering', 'rain', 'minister', 'alleged', 'adhesive', 'probable', 'north', 'kittens', 'island', 'curious', 'sign', 'disgusted', 'cry', 'sweltering', 'grubby', 'lavish', 'discussion', 'pass', 'late', 'purple', 'murky', 'force', 'use', 'fire', 'laughable', 'beautiful', 'letter', 'dazzling', 'obsequious', 'boil', 'knit', 'poised', 'absorbed', 'chase', 'scold', 'shame', 'untidy', 'lopsided', 'motionless', 'rifle', 'belligerent', 'exercise', 'lace', 'boring', 'silent', 'month', 'live', 'deep', 'serious', 'stem', 'scarf', 'disapprove', 'car', 'pull', 'stupid', 'dreary', 'petite', 'jazzy', 'fool', 'dinosaurs', 'undress', 'rare', 'weather', 'accurate', 'crabby', 'prose', 'open', 'striped', 'stormy', 'tricky', 'dam', 'decay', 'glamorous', 'fertile', 'surprise', 'voice', 'lovely', 'romantic', 'slow', 'excellent', 'land', 'jaded', 'wrestle', 'crate', 'nappy', 'clean', 'snakes', 'jumpy', 'warm', 'develop', 'yard', 'wasteful', 'cobweb', 'drunk', 'trousers', 'available', 'spooky', 'guarantee', 'detect', 'trip', 'melted', 'gaudy', 'dock', 'design', 'disarm', 'long', 'nutty', 'dislike', 'horn', 'fabulous', 'wistful', 'night', 'worthless', 'trouble', 'verse', 'lowly', 'fetch', 'shade', 'holistic', 'load', 'produce', 'mist', 'tow', 'ethereal', 'ship', 'hot', 'steam', 'noiseless', 'drain', 'teeny-tiny', 'grumpy', 'slip', 'guarded', 'birds', 'taste', 'texture', 'tame', 'like', 'funny', 'shop', 'obeisant', 'obese', 'crib', 'thank', 'feeling', 'wonder', 'strip', 'bone', 'flower', 'frequent', 'water', 'cool', 'crime', 'rainy', 'voracious', 'turkey', 'claim', 'record', 'hard-to-find', 'pull', 'lame', 'place', 'grass', 'third', 'chemical', 'nest', 'street', 'structure', 'crash', 'happen', 'rainstorm', 'fry', 'dog', 'mammoth', 'stocking', 'owe', 'wail', 'enthusiastic', 'lyrical', 'baby', 'stew', 'sniff', 'move', 'abortive', 'bright', 'cynical', 'note', 'uncovered', 'smash', 'station', 'faulty', 'slim', 'ready', 'tour', 'cable', 'soup', 'teeny', 'wood', 'sudden', 'obsolete', 'cut', 'subtract', 'mask', 'steady', 'jagged', 'intelligent', 'industrious', 'thaw', 'zany', 'competition', 'overrated', 'bright', 'discover', 'nimble', 'disastrous', 'squirrel', 'flight', 'oatmeal', 'level', 'sophisticated', 'bath', 'cuddly', 'blushing', 'add', 'development', 'toothsome', 'call', 'zealous', 'settle', 'apparatus', 'talk', 'flow', 'evanescent', 'free', 'courageous', 'vulgar', 'gleaming'];
    var word = wordlist[Math.floor(Math.random() * wordlist.length)];
    console.log(word);
    var letters = [];
    var allLetters = [];
    var letter = $('#letter');
    var isletter = false;
    var wrong = [];
    var lives = 6;
    var spans = document.getElementsByClassName('span');
    var wonTest = true;
    for(i=0;i<word.length;i++){
        if(!allLetters.includes(word[i])){
            allLetters.push(word[i])
        }
    }
    for(i=0;i<word.length;i++){
        makeDiv(word);
    }
    $('#ur_input').on('submit', function(e){
        e.preventDefault();
        if((c >= 'a') && (c <= 'z')){
            for(i=0;i<word.length;i++){
                if ($('#letter').val() === word[i]){
                    if(!letters.includes(word[i])){
                        letters.push(word[i])
                    }
                    console.log(letters);
                    divs[i].removeClass('hidden');
                    isletter = true;
                }
            }
            if(isletter){
                isletter = false;
                if(letters.length === allLetters.length){
                    win();
                }
            }
            else{
                if(!wrong.includes($('#letter').val())){
                    $('#guesses').text($('#guesses').text() +  $('#letter').val() + ' ');
                    wrong.push($('#letter').val())
                    lives--;
                    lifeboxes[5-lives].addClass('dead');
                    if(lives === 0){
                        end();
                    }
                }
            }
            $('#letter').val('')
        }
    })
});
