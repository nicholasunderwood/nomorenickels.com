var img = document.getElementById("image");
var url = document.getElementById("url-in");
var submit = document.getElementById("submit");
var filet = document.getElementById("file");
var reset = document.getElementById("reset");
var contrast = document.getElementById("contrast");
var blur = document.getElementById("blur");
var sepia = document.getElementById("sepia");
var invert = document.getElementById("invert");
var opacity = document.getElementById("opacity");
var huerotate = document.getElementById("hue-rotate");
var greyscale = document.getElementById("greyscale");
var brightness = document.getElementById("brightness");
var dropshadow = document.getElementById("drop-shadow");
var dropshadowblur = document.getElementById("drop-shadow-blur");
var saturate = document.getElementById("saturate");
var input = document.getElementsByClassName("slider");
var sliders = [contrast, blur, sepia, invert, opacity, huerotate, greyscale, brightness, dropshadow, dropshadowblur, saturate];
var number = ["100", "0", "0", "0", "100", "0", "0", "100", "0", "0px 0px 0", "100"];
var prop = ["contrast", "blur", "sepia", "invert", "opacity", "hue-rotate", "greyscale", "brightness", "drop-shadow", "saturate"];
var unit = ["%", "px", "%", "%", "%", "deg", "%", "%", "px", "%"];
var cat = function(){
    img.style.filter = 'contrast('+contrast.value+'%) blur('+blur.value+'px) sepia('+sepia.value+'%) invert('+invert.value+'%) opacity('+opacity.value+'%) hue-rotate('+huerotate.value+'deg) grayscale('+greyscale.value+'%) brightness('+brightness.value+'%) drop-shadow('+dropshadow.value+'px '+dropshadow.value+'px '+dropshadowblur.value+'px) saturate('+saturate.value+'%)';
};
submit.addEventListener("click", function () {
    img.style.backgroundImage = 'url('+url.value+')';
});
filet.addEventListener('change', function (){
    var file = filet.files[0];
    var reader = new FileReader();
    reader.onloadend = function(){
        img.src = reader.result;
    };
    if(file){
        reader.readAsDataURL(file);
    }else{
    }
}, true);

for(i=0;i<sliders.length;i++){
    sliders[i].addEventListener("change", cat)
}
reset.addEventListener("click", function () {
    for(i=0; i<input.length; i++){
        input[i].value = ["100", "0", "0", "0", "100", "0", "0", "100", "0", "100"][i];
        img.style.filter = prop[i] + "(" + number[i] + unit[i] + ")";
        console.log(prop[i] + "(" + number[i] + unit[i] + ")");
        dropshadowblur.value = "0";
    }
})
