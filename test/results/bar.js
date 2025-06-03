var energyBar = document.getElementById("energy-bar");
var prog = 50;

document.addEventListener("keydown", (evt) => {
    if (evt.key == "ArrowUp") {
        prog = Math.min(prog + 1, 100);
    }
    else if (evt.key == "ArrowDown") {
        prog = Math.max(prog - 1, 0);
    }
 
    energyBar.style.width = prog + "%"; 
})

var j = 1;

setInterval(() => {
    prog += j;

    if (prog >= 100) {
        prog = 100;
        j = -1;
    } else if (prog <= 0) {
        prog = 0;
        j = 1;
    }

    energyBar.style.width = prog + "%";
}, 20); // every 20ms
