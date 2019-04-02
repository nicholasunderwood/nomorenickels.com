var tod = 'AM';
var x = 1;
getTime();
setInterval(getTime, 1000);
    
function getTime(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = getNumber(date.getMinutes());
    var seconds = getNumber(date.getSeconds());
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.getMonth()];
    var day = date.getDate();
	console.log(date.getDay())
    var week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturady', 'Sunday'][date.getDay()];
    var year = date.getFullYear();
    console.log(month, day, week, year);
    if(hours>12){
        hours-=12;
        tod = 'PM'
    }
    $('#time').text(hours + ':' + minutes + ':' + seconds + ' ' + tod);
    $('#day').text(week + ', ' + month + ' ' + day + ', ' + year)
}

function getNumber(t){
    if(t<10){
        t = '0'+ t
    }
    return t
}
