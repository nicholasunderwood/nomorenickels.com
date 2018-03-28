var tod = 'AM'
var x = 1
getTime()
setInterval(getTime, 1000)
    
function getTime(){
    var date = new Date();
    var hours = date.getHours()
    var minutes = getNumber(date.getMinutes())
    var seconds = getNumber(date.getSeconds())
    console.log(hours, hours>12)
    if(hours>12){
        hours-=12
        tod = 'PM'
    }
    $('#div').text(hours + ':' + minutes + ':' + seconds + ' ' + tod)
    console.log(hours + ':' + minutes + ':' + seconds + ' ' + tod)
}

function getNumber(t){
    if(t<10){
        t = '0'+ t
    }
    return t
}
