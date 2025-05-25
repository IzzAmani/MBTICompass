const xhr = new XMLHttpRequest();
xhr.open("GET", "/header/header.html", true);

xhr.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("headerDiv").innerHTML = this.responseText;
    }
}
xhr.send();
