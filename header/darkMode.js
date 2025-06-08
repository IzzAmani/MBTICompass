// dark mode theme toggle
function darkMode() {
    var currentMode = localStorage.getItem("darkMode");
 
    console.log(currentMode);

    if (currentMode === "light") {
        // set the theme to dark
 
        // set the icon to the sun
        document.getElementById("dark-mode-btn").children[0].src = "/img/sun.png";

        // set the theme to dark
        document.documentElement.classList.toggle("dark-mode", true);

        // save preference
        localStorage.setItem("darkMode", "dark");

        console.log("its now dark");

    }
    else {
        // set the theme to light
        // this includes if the localStorage("darkMode") is null
        // basically default to light theme

        // set icon to moon icon
        document.getElementById("dark-mode-btn").children[0].src = "/img/moon.png";

        // set the theme to light
        document.documentElement.classList.toggle("dark-mode", false);

        // save preference
        localStorage.setItem("darkMode", "light");

        console.log("its now light");
    }
};

// first run when the page is loaded in case the user pref is darkmode
darkMode();
console.log("nigga");
