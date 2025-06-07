const cir = document.getElementById("i3");
const cirRad = 5;
const borderRad = 20;

var xOffset, yOffset;

xOffset = 0;
yOffset = 50;

cir.style.top = yOffset - cirRad + "%";
// cir.style.left = x - cirSize/2 + "%"

var xIter = 1, yIter = 1;

// setInterval( () => {
//     xPos = xOffset - cirSize/2;
//
//     if ( xOffset > 100 ) {
//         xIter = -1;
//     }
//     else if ( xOffset < 0) {
//         xIter = 1;
//     }
//
//     xOffset += xIter;
//     cir.style.left = xPos + "%";
//
//     yPos = yOffset - cirSize/2;
//
//     if ( yOffset > 100 ) {
//         yIter = -1;
//     }
//     else if ( yOffset < 0) {
//         yIter = 1;
//     }
//
//     yOffset += yIter;
//     cir.style.top = yPos + "%";
//
// }, 10)

var theta = 0;
var x, y;
var i = 0;

console.log(Math.sin(180 / 2 * Math.PI).toFixed(3));

setInterval( () => {
    thetaRadian = theta / (2*Math.PI);

    // xPos = cos(theta) * border radius
    // get cos() and the increas by one for the
    // radial offset
    // times the outline radius
    x = (Math.cos(thetaRadian) + 1) * borderRad;
    y = (Math.sin(thetaRadian) + 1) * borderRad;
 
    // normalize the xPos and times half the size of the border
    // then, adjusting for circle offset
    x = (x / borderRad) * 50 - cirRad;
    y = (y / borderRad) * 50 - cirRad;

    cir.style.left = x + "%";
    cir.style.top = y + "%";

    if ( i % 100 == 0) {
        console.log(x, y);
    }
    i++;
    theta += 0.25;
}, 10);
