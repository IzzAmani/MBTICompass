var results = JSON.parse(localStorage.getItem("results"))

txt = "Your MBTI is: ";

if (results.energy > 0) {
    txt += "I";
}
else {
    txt += "E";
}

if (results.info > 0) {
    txt += "S";
}
else {
    txt += "N";
}

if (results.decision > 0) {
    txt += "T";
}
else {
    txt += "F";
}

if (results.lifestyle > 0) {
    txt += "J";
}
else {
    txt += "P";
}

console.log(results); 
txt += "  Total Questions: " + results.questionsCount;

document.getElementById("res").innerHTML = txt;

txt = "";
var qc = results.questionsCount;

txt += "Energy : ";
txt += (( (results.energy + (qc*3)) / (qc*6) ) * 100).toFixed(2) + "%";

txt += "<br>Infomation : ";
txt += (( (results.info + (qc*3)) / (qc*6) ) * 100).toFixed(2) + "%";

txt += "<br>Decision : ";
txt += (( (results.decision + (qc*3)) / (qc*6) ) * 100).toFixed(2) + "%";

txt += "<br>Lifestyle : ";
txt += (( (results.lifestyle + (qc*3)) / (qc*6) ) * 100).toFixed(2) + "%";


document.getElementById("bar").innerHTML = txt;
