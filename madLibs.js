var words = [];
var types = ["adjective", 'plural noun', 'noun', 'adverb', 'number', 'past tense verb', '-est adjective' ,'past tense verb', 'adverb', 'adjective'];
var type = $('#type');
$(document).ready(function () {
    console.log($('#letter').attr('type'));
    var x = 0;
    type.text('please enter a ' + types[x]);
    $('#form').on('submit', function (e) {
        var word = $('#input').val();
        console.log(word);
        e.preventDefault();
        words.push(word);
        $('#input').val('');
        x += 1;
        type.text('please enter a ' + types[x]);
        if(x===9){
            var storyString =  "Today, my fabulous camp group went to a(n) " + words[0] + " amusement park. It was a fun park with lots of cool "+ words[1] + " and enjoyable play structures." +
                " When we got there, my kind counselor shouted loudly, 'Everybody off the "+ words[2]+ "'." +
                " We all pushed out in a terrible hurry." +
                " My counselor handed out yellow tickets, and we scurried in." +
                " I was so excited! I couldn't figure out what exciting thing to do first." +
                " I saw a scary roller coaster I really liked so, I "+ words[3]+ " ran over to get in the long line that had about "+ words[4]+ " people in it." +
                " When I finally got on the roller coaster I was "+ words[5]+ "." +
                " In fact I was so nervous my two knees were knocking together." +
                " This was the "+ words[6]+" ride I had ever been on! In about two minutes I heard the crank and grinding of the gears." +
                " That’s when the ride began! When I got to the bottom, I was a little "+ words[7] +" but I was proud of myself." +
                " The rest of the day went " + words[8] + ". It was a(n) "+ words[9]+ " day at the fun park.";
            $('#storyDiv').text(storyString);
            $('#input').attr('disabled', true);
            console.log(words);
        }
    })
})