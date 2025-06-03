// getting the result and erasing the saved choices
var results = JSON.parse( localStorage.getItem("results") )
// localStorage.removeItem("results");
// console.log("Results: ", results);


// color theme depends of the MBTI groups
const GROUPS = {
    // key: [main color, secondary, trinary, dark]
    "Analysts" : ["#aa00aa", "#a600ff", "#d500ff", "#39003B"],
    "Diplomats": ["#10BA00",       "yellowgreen", "lime",    "#177500"],
    "Explorers": ["goldenrod",     "gold",        "yellow",  "#BA8E23"],
    "Sentinals": ["steelblue",     "dodgerblue",  "skyblue", "darkblue"]
}
var mbti, group;

function getMBTI() {
    // simple tie-breaker cuz im lazy to think of smth smarter
    // sorry not sorry
    for (var key in results) {
        if (results[key] === 0 ) {
            results[key] += 0.1;
        }
    }

    var e = results.energy    < 0 ? "E" : "I";
    var i = results.info      < 0 ? "S" : "N";
    var d = results.decision  < 0 ? "F" : "T";
    var l = results.lifestyle < 0 ? "J" : "P";

    mbti = e+i+d+l;
 
    if (i === "N" && d === "T") {
        group = "Analysts";
    }
    else if (i === "N" && d === "F") {
        group = "Diplomats";
    }
    else if (i === "S" && l === "P") {
        group = "Explorers";
    }
    else if (i === "S" && l === "J") {
        group = "Sentinals";
    }
    else {
        group = "none"
    }

    document.getElementsByTagName("body")[0].style.background = `linear-gradient( ${GROUPS[group][0]}, ${GROUPS[group][3]})`;
    document.getElementById("MBTI").innerHTML = `Your MBTI is <b>${mbti}</b> <br> Your group: ${group}`;

    localStorage.setItem("MBTI", mbti); // save mbti for future use ig, idk if this will be used
}


function initBars() {
    var infoBoard = document.getElementById("info-board");

    const LEGENDS = {
        // key: [title, left lable, right lable]
        "energy":    ["Energy",       "Extroverted", "Introverted"],
        "info":      ["Informations", "Sensing",     "Intuition"],
        "decision":  ["Decisions",    "Feelings",    "Thinking"],
        "lifestyle": ["Lifestyles",   "Judging",     "Perceiving"],
    };

    var key;
    var txt = "";
    var qc = results.questionsCount;
 
    // loop through every dichotomies
    for (key in results) {
        //return if not a dichotomies
        if (key === "questionsCount") { break; }
 
        var res        = results[key];  // result for each dichotomies
        var perc       = ( ((res + (qc*3)) / (qc*6)) * 100).toFixed(2); // percentage of the result
        var innerLabel = results[key] < 0 ? LEGENDS[key][1] : LEGENDS[key][2]; // label inside the value bar
        var color      = GROUPS[group][2]; // color theme

        txt += `
            <section style="background-color: ${GROUPS[group][1]}">
                <p class="dichotomies"> ${LEGENDS[key][0]} </p> 

                <section class="bar-info">
                    <p class="legendL"> ${LEGENDS[key][1]} </p>

                    <div class="progress-bar">
                        <div class="value-bar" style="width: ${perc}%; background-color: ${color}"> 
                            <div style="transform: skewX(45deg)"> ${perc > 50 ? perc : (100-perc).toFixed(2) }%  ${innerLabel} </div>
                        </div>
                    </div>

                    <p class="legendR"> ${LEGENDS[key][2]} </p>
                </section>
            </section>
        `;
    }

    infoBoard.innerHTML = txt;
}


getMBTI();
initBars();
