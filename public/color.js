const orange ="#f25022"
const green = "#71af10"
const blue = "#3985b5"
const red = "#ffb901"
var colors = [orange, green, blue, red]
var i = 0;
$(".bg").css("height", "100vh");
$(".bg").css("background-color", colors[3]);
function changeColor() {
    i++;
    //change colors
    $(".bg").animate({ backgroundColor: colors[i%4] }, 2500);
    console.log("background color = " + colors[i%4])

    //
    setTimeout(changeColor, 2500);
}
changeColor();