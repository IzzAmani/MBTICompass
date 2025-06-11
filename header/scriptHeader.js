// default font size
var globalFontSize = 16;


// create a new xhr to copy the html code from header html to wherever the code is run in
// this way, we only need to change one file to use the header multiple time, minimalize bugs and mismatch
const xhr = new XMLHttpRequest();
xhr.open("GET", "/header/header.html", true); // open the html file

xhr.onreadystatechange = function() {
    // when everything is ready and no bug, copy everything in the file
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("headerDiv").innerHTML = this.responseText;

        // toggle the darkmode incase the user already have a theme preference
        // no need to toggle everytime
        darkMode();

        // hide the access panel at first load
        toggleAccessPanel("invisible");

        // set default font size
        document.documentElement.style.fontSize = globalFontSize + "px";
    }
}
xhr.send();

// dark mode theme toggle
function darkMode() {
    var currentMode = localStorage.getItem("darkMode");
 
    // if user preference is dark
    if (currentMode === "dark") {
        // set the icon to the sun
        document.getElementById("dark-mode-btn").children[0].src = "/img/sun.png";

        // set the theme to dark by adding the dark mode class
        document.documentElement.classList.toggle("dark-mode", true);
    }
    else {
        // if the user preference is not dark

        // set icon to moon icon
        document.getElementById("dark-mode-btn").children[0].src = "/img/moon.png";

        // set the theme to light by removing the dark mode class
        document.documentElement.classList.toggle("dark-mode", false);

    }
};

function darkModeToggle() {
    var currentMode = localStorage.getItem("darkMode");
 
    // toggle the theme
    if (currentMode == "dark") {
        localStorage.setItem("darkMode", "light");
        darkMode();
    } else {
        localStorage.setItem("darkMode", "dark");
        darkMode();
    }
}


function toggleAccessPanel(preferState=null) {
    var accessPanel = document.getElementById("access-panel");

    if (accessPanel.style.opacity === "1" || preferState === "invisible") {
        accessPanel.style.opacity = "0";
    }
    else if (accessPanel.style.opacity === "0" || preferState === "visible") {
        accessPanel.style.opacity = "1";
    }
}

// change global font size
function changeTextSize(size) {
    // increase/decrease global font size
    globalFontSize += size;
    document.documentElement.style.fontSize = globalFontSize + "px";

    // update the text label
    var textScale = document.getElementById("text-scale");
    var textScaleValue = (globalFontSize / 16) * 100;

    textScale.innerHTML = textScaleValue + "%";
}

function toggleBlueLight() {
    var blueLight = document.getElementById("blue-light-screen");

    if (blueLight.style.opacity == 0.4) {
        blueLight.style.opacity = 0;
    }
    else {
        blueLight.style.opacity = 0.4;
    }
}
