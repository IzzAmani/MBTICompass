const xhr = new XMLHttpRequest();
xhr.open("GET", "/header/header.html", true);

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("headerDiv").innerHTML = this.responseText;
    }
}
xhr.send();

var x = 0;

// darkmode icon changing animation
function darkModeAnim() {
    if (x % 2) {
        document.getElementById("test").children[0].src = "/img/moon.png";
    }
    else {
        document.getElementById("test").children[0].src = "/img/sun.png";
    }
    x++;
};
