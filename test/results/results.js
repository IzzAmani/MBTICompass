// getting the result and erasing the saved choices
var results = JSON.parse( localStorage.getItem("results") );

console.log(results);
// localStorage.removeItem("results");
// console.log("Results: ", results);


// color theme depends of the MBTI groups
const groupColors = {
    // Group   : [main color, secondary, trinary, dark]
    "Analysts" : ["#AA00AA", "#a600ff", "#d500ff", "#700070"],
    "Diplomats": ["#10BA00",   "yellowgreen", "lime",    "#177500"],
    "Explorers": ["goldenrod", "gold",        "yellow",  "#BA8E23"],
    "Sentinals": ["steelblue",   "dodgerblue",  "skyblue", "darkblue"]
}
var mbti, group;

function getMBTI() {
    // simple tie-breaker cuz im lazy to think of smth smarter
    // sorry not sorry
    for (var dicho in results) {
        if (results[dicho] === 0 ) {
            results[dicho] += 0.1;
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

    document.getElementById("background-fade").style.background 
        = `linear-gradient(to bottom, ${ groupColors[group][0] },  var(--background)`;
    
    document.getElementById("MBTI").innerHTML = `
        Your MBTI is <b>${mbti}</b>. <br> 
        You are part of the <b>${group}</b>! <br>
        <span style="font-size: 1.75rem; margin: 0;">
            Click <a href=""> here</a> to find out more about <b>${mbti}</b>!
        </span>
    `;

    localStorage.setItem("MBTI", mbti); // save mbti for future use ig, idk if this will be used
}


function initBars() {
    var infoBoard = document.getElementById("info-board");

    const LEGENDS = {
        // dicho: [title, left lable, right lable]
        "energy"    : ["Energy",       "Extroverted", "Introverted"],
        "info"      : ["Informations", "Sensing",     "Intuition"],
        "decision"  : ["Decisions",    "Feelings",    "Thinking"],
        "lifestyle" : ["Lifestyles",   "Judging",     "Perceiving"],
    };

    // simple explaination
    const explain = {
        "energy": [
            "energized by people; talks things out to think",
            "energized by alone time; prefers thinking quietly"
        ],
        "info": [
            "focuses on facts, details, and what’s real",
            "focuses on ideas, patterns, and future possibilities"
        ],
        "decision": [
            "makes decisions based on values and people’s emotions",
            "makes decisions with logic and objective reasoning"
        ],
        "lifestyle": [
            "likes plans, structure, and early decisions",
            "prefers spontaneity, flexibility, and keeping options open"
        ]
    }

    var dicho;
    var txt = "";
    var qc = results.questionsCount;
 
    // loop through every dichotomies
    for (dicho in results) {
        //return if not a dichotomies
        if (dicho === "questionsCount") { break; }
 
        var dichoTitle = LEGENDS[dicho][0];
        var labelL     = LEGENDS[dicho][1];
        var labelR     = LEGENDS[dicho][2];

        var result     = results[dicho];  // result for each dichotomies
        var perc       = ( ((result + (qc*3)) / (qc*6)) * 100).toFixed(2); // percentage of the result
        var innerLabel = result < 0 ? labelL : labelR; // label inside the value bar
        var color      = groupColors[group][2]; // color theme

        txt += `
            <section style="background-color: ${groupColors[group][1]}">
                <p class="dichotomies"> ${dichoTitle} </p> 

                <section class="bar-info">
                    <p class="legendL"> ${labelL} </p>

                    <div class="progress-bar">
                        <div class="value-bar" style="width: ${perc}%; background-color: ${color}">  
                            <div style="transform: skewX(45deg); color: #000"> ${perc > 50 ? perc : (100-perc).toFixed(2) }% ${innerLabel} </div>
                        </div>
                    </div>

                    <p class="legendR"> ${labelR} </p>
                </section>
                <p class="explaination"> You ${explain[dicho][result < 0 ? 0 : 1]}</p>
            </section>
        `;
    }

    infoBoard.innerHTML = txt;
}


getMBTI();
initBars();
