var questions = [
    "Why are you gay?", 
    "Guess who just got his power",
    "Are you sure?", 
    "Seasalt, i need you seasalt", 
    "uh",
    "ah",
    "ih",
    "eh",
    "oh",
    "ur",
];

var choices = [];
var qIndex;

const cardHolder = document.getElementById("cardHolder");
const arrowL     = document.getElementById("leftArrow");
const arrowR     = document.getElementById("rightArrow");

var txt;

// display the cards
function displayCards(currIndex) {
    qIndex = currIndex;
 
    // remove the arrow if theyre at either ends
    if (qIndex === 0) {
        arrowL.style.pointerEvents = "none";
        arrowL.style.opacity = 0;
    } 
    else if (qIndex === questions.length-1) {
        arrowR.style.pointerEvents = "none";
        arrowR.style.opacity = 0;
        console.log(choices)
    }
    else {
        arrowL.style.pointerEvents = "auto";
        arrowL.style.opacity = 1;
        arrowR.style.pointerEvents = "auto";
        arrowR.style.opacity = 1;
    }

    txt = "";

    // display at most three cards
    for (var i = 0; i < 3; i++) {
        var curr = currIndex + (i - 1); // current question( mid ) + offset

        // return if the index is out of range
        if (curr < 0 || curr > questions.length-1) { continue }

        // append the cards properties and stuff
        txt += `
            <section class= "qCards" id="card${i}"> 
                <section class="question">
                    <h2> Q${curr + 1}. ${questions[curr]} </h2>
                </section>

                <section class="legends">
                    <h4 class="labelL"> Strongly Disagree </h4>
                    <h4 class="labelR"> Strongly Agree </h4>
                </section>

                <section class="selectors">
                    <input type="radio" name="${curr}" value="-3" style="transform: scale(5)">
                    <input type="radio" name="${curr}" value="-2" style="transform: scale(4)">
                    <input type="radio" name="${curr}" value="-1" style="transform: scale(3)">
                    <input type="radio" name="${curr}" value="0"  style="transform: scale(2)">
                    <input type="radio" name="${curr}" value="1"  style="transform: scale(3)">
                    <input type="radio" name="${curr}" value="2"  style="transform: scale(4)">
                    <input type="radio" name="${curr}" value="3"  style="transform: scale(5)">
                </section>
            </section>
        `
    }

    // use DOM to display the cards
    cardHolder.innerHTML = txt;
};

// change card to the next (1) or prev (-1)
function changeCard(dir) {
    displayCards(qIndex + dir);
}

// initial display of question cards
displayCards(0);


// add event addEventListener to parent
// listen to when the radio input is checked/change
cardHolder.addEventListener("change", (evt) => {
    // evt.target => where the event is fired;
    // evt.currentTarget => where the event listener is attached to
 
    console.log(evt.target);
    console.log(evt.currentTarget);
    console.log("Question number: ", evt.target.name);
    console.log("Choice: ", choice)
    
    var choice = evt.target.value;
    var questionNum = parseInt(evt.target.name);
    choices[questionNum] = choice;

    changeCard(1);
})
