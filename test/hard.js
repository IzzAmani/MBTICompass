var questions = [ [], [], [] ];
var qIndex;
var choices = [];
var results = {
    energy:    0,
    info:      0,
    decision:  0,
    lifestyle: 0
};

const cardHolder = document.getElementById("cardHolder");
const arrowL     = document.getElementById("leftArrow");
const arrowR     = document.getElementById("rightArrow");
const submitBtn  = document.getElementById("submit");

// localStorage.clear();
// get past choices
if ( localStorage.getItem("choicesHard") ) {
    choices = JSON.parse(localStorage.getItem("choicesHard"));
}

// console.log("Local Choices: ", choices, choices.length);

// display the cards
function displayCards(currIndex) {
    qIndex = currIndex;

    // remove the arrow if it's at the start
    if (qIndex <= 0) {
        arrowL.style.pointerEvents = "none"; // disallows button to be clicked
        arrowL.style.opacity = 0;
    }
    else {
        arrowL.style.pointerEvents = "auto"; // allows button to be clicked
        arrowL.style.opacity = 1;
    }

    // remove the right arrow if it's on a new question || end of the questionnaire
    if (qIndex >= choices.length || qIndex === questions[1].length - 1) {
        arrowR.style.pointerEvents = "none";
        arrowR.style.opacity = 0;
    }
    else {
        arrowR.style.pointerEvents = "auto";
        arrowR.style.opacity = 1;
    }

    displaySubmit(); 
 
    var txt = radios = "";

    // display at most three cards
    for (var i = 0; i < 3; i++) {
        var curr = currIndex + (i - 1); // displaying current card index = middle question + offset

        // return if the index is out of range
        if (curr < 0 || curr > questions[1].length-1) { continue }

        // append the cards properties and stuff
        txt += `
            <section class= "qCards" id="card${i}"> 
                

                <h1 class="questionNum"> Q${curr + 1} </h1>

                <section class="question">
                    <h2>  ${questions[1][curr]} </h2>
                </section>

                <section class="legends">
                    <h4 class="legendL"> Strongly Disagree </h4>
                    <h4 class="legendR"> Strongly Agree </h4>
                </section>

                <section class="selectors">` 
 
 
        // add the radios
        var val;
        for (var j=-3; j <= 3; j++) {
            // j = j.toFixed(0);
            // if the current question values are reversed
            if (questions[2][curr] == 1) {
                val = -j;
            }
            else {
                val = j;
            }

            txt += `<input type="radio" name="${curr}" value="${val}" style="transform: scale(${ Math.abs(val)*1 + 3})"`;

            // if the current radio is the same as the radio chosen ealier
            if (val === choices[curr]) {
                txt += " checked>";
            } else {
                txt += ">";
            }

            // DEBUG (display each radios values)
            // txt += `<p style="position: relative; right:60px; z-index: 5"> ${val} </p>`;
        }

        txt += "</section>";
 
        // if the middle card, add the reset button
        if (i == 1) {
            txt += `
                <button id="resetBtn" onclick="resetQ()">
                    RESET
                </button>
            `
        }
        txt += "</section>";
    }

    // use DOM to display the cards
    cardHolder.innerHTML = txt;
};


// initialize questions
function initQuestions() {
    // do not initialize new question if the user have answered atleast 1 question
    if (choices.length !== 0) {
        questions = JSON.parse(localStorage.getItem("questionsHard"));

        // initial display of question cards
        // (set the display to the latest question the user have answerd)
        displayCards( Math.min(choices.length, questions[1].length-1) );
        return;
    }

    fetch("questionnaire.json")
        .then(response => {
            if(!response.ok) {
                console.error(`[${response.status}] something went wrong.`);
            }
            return response.json();
        })
        .then(data => {
            data = data.hard;

            var dicho, i=0, q, question, reversed;

            // loop for every dichotomies
            for (dicho in data) {
                // index0: questions index1: if the radio values should be reversed
                question = data[dicho][0];
                reversed = data[dicho][1];
 
                for (q of question) { // loop every question in each dichotomies
                    // index0: dichotomies index1: questions index2: reversed?
                    questions[0][i] = dicho;
                    questions[1][i] = q;
                    questions[2][i] = reversed[i % question.length] // get reverse state of every question
                    i++;
                }
            }

            // randomize the questions using fisher-yates algorithm
            for (i=questions[1].length-1; i > 0; i--) {
                var target = Math.floor(Math.random() * (i+1));

                // swap the dichotomies and the questions too
                [ questions[0][i], questions[0][target] ]  = [ questions[0][target], questions[0][i] ];
                [ questions[1][i], questions[1][target] ]  = [ questions[1][target], questions[1][i] ];
                [ questions[2][i], questions[2][target] ]  = [ questions[2][target], questions[2][i] ];
            }
 
            localStorage.setItem("questionsHard", JSON.stringify(questions));

            // initial display of question cards
            // (set the display to the latest question the user have answerd)
            displayCards(0);
        });
}

// change card to the next (1) or prev (-1)
function changeCard(dir) {
    displayCards(qIndex + dir);
}


function displaySubmit() {
    // submit button only appear if user have answered 
    // all questions and at the end if the questions
    if (choices.length == questions[1].length && qIndex === questions[1].length - 1) {
        submitBtn.style.pointerEvents = "auto";
        submitBtn.style.opacity = 1;
    }
    else {
        submitBtn.style.pointerEvents = "none";
        submitBtn.style.opacity = 0;
    }
}

// submitting the choices
function submit() {
    // loop over every quetions and user choices
    for (var i=0 ; i < questions[1].length; i++) {

        // check the chocies by their dichotomies
        switch (questions[0][i]) {
            case 'energy' :
                results.energy += choices[i];
                break;
 
            case 'info' :
                results.info += choices[i];
                break;
 
            case 'decision' :
                results.decision += choices[i];
                break;
 
            case 'lifestyle' :
                results.lifestyle += choices[i];
                break;
        }
    }

    // save how many each dichotomies have questions
    results.questionsCount = questions[1].length/4;
    localStorage.setItem("results", JSON.stringify(results));
}

function resetQ() {
    if ( confirm("Are you sure you wanna reset the questions?") ) {
        localStorage.removeItem("choicesHard");
        location.reload(); // refresh the pages
    }
}


// add event addEventListener to parent
// listen to when the radio input is checked/change
cardHolder.addEventListener("change", (evt) => {
    // evt.target => where the event is fired;
    // evt.currentTarget => where the event listener is attached to
 
    var choice = parseInt(evt.target.value);
    var questionNum = parseInt(evt.target.name);
    choices[questionNum] = choice;

    localStorage.setItem("choicesHard", JSON.stringify(choices));

    if (qIndex < questions[1].length - 1) {
        changeCard(1);
    }

    console.log(choices);
    displaySubmit();
})

// listen to keypresses for easier question changes
document.addEventListener("keydown", (evt) => {
    // change only if past the 1st question
    if (evt.key === "ArrowLeft" && qIndex > 0) {
        changeCard(-1)
    }
    // change only before the end || not on the newest question
    else if (evt.key === "ArrowRight" && qIndex < questions[1].length - 1 && qIndex < choices.length) {
        changeCard(1);
    }

    displaySubmit();
})


initQuestions();
