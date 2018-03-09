var usertext = document.getElementById("text");
var ani = document.getElementById("ani2");
var cat = document.getElementById("submit");
var isItalics = document.getElementById("italic");
var isUnderline = document.getElementById("underline");
var isBold = document.getElementById("bold");
var textColor = document.getElementById("color");
var fontSize = document.getElementById("fontSize");
var font = document.getElementById("font");
var highlight = document.getElementById("highlight");
var opacity = document.getElementById("opacity");
var isTextShadow = document.getElementById("isTextShadow");
var shadowRs = document.getElementsByClassName("ts");
var textShadowC = document.getElementById("textShadow");
var textShadowP = document.getElementById("placement");
var slide = document.getElementById("blur");
var isAnimation = document.getElementById("isAnimation");
var animationRs = document.getElementsByClassName("a");
var animation = document.getElementById("animation");
var dur = document.getElementById("duration");
isAnimation.addEventListener("click", function () {
    if(isAnimation.checked == true){
        for(i=0; i<animationRs.length; i++){
            $('#')
            animationRs[i].style.display = "table-cell";
        }}
    else {
        for(i=0; i<animationRs.length; i++){
            animationRs[i].style.display = "none";}}
});
isTextShadow.addEventListener("click", function(){
    if(isTextShadow.checked == true){
        for(i=0; i<shadowRs.length; i++){
            shadowRs[i].style.display = "table-cell";}}
    else {
        for(i=0; i<shadowRs.length; i++){
            shadowRs[i].style.display = "none";}}
});
cat.addEventListener("click", function(){
    usertext.innerHTML = document.getElementById("input").value;
    if(isItalics.checked == true){
        usertext.style.fontStyle = "italic";}
    else{
        usertext.style.fontStyle = "normal";}
    if(isUnderline.checked == true){
        usertext.style.textDecoration = "underline";}
    else{
        usertext.style.textDecoration = "none";}
    if(isBold.checked == true){
        usertext.style.fontWeight = "bold";}
    else{
        usertext.style.fontWeight = "normal";}
    usertext.style.color = textColor.value;
    usertext.style.backgroundColor = highlight.value;
    usertext.style.fontFamily = font.value;
    usertext.style.fontSize = fontSize.value + "px";
    usertext.style.opacity = ((parseInt(opacity.value))/10).toString();
    if(isTextShadow.checked == true){
        var textShadowS = 1;
        if (!fontSize.value == ""){
            textShadowS = (parseInt(fontSize.value))/16;}
        var shadowX = textShadowS;
        var shadowY = textShadowS;
        if (textShadowP.value == "Top Left"){
            shadowX = shadowX * -1;
            shadowY = shadowY * -1;}
        if (textShadowP.value == "Top Right"){
            shadowY = shadowY * -1;}
        if (textShadowP.value == "Bottom Left"){
            shadowX = shadowX * -1;}
        shadowX = shadowX.toString();
        shadowY = shadowY.toString();
        usertext.style.textShadow = shadowY + "px " + shadowX + "px " + slide.value + "px " + textShadowC.value;
    }
    else{
        usertext.style.textShadow = "";
    }
    if(isAnimation.checked == true){
        usertext.style.animationName = animation.value;
        usertext.style.animationDuration = ((parseInt(dur.value))/10).toString() + "s";
    }
    else{
        usertext.style.animation = "";
    }
});
