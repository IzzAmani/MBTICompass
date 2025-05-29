var qIndex = 0;
var qCurrent = [
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
var checks = [];

var card = document.getElementById("qCards");
var arrowL = document.getElementById("leftArrow");
var arrowR = document.getElementById("rightArrow");

function displayCard() {
    if (qIndex == 0) {
        arrowL.style.pointerEvents = "none";
        arrowL.style.opacity = 0;
    }
    else if (qIndex == 9) {
        arrowR.style.pointerEvents = "none";
        arrowR.style.opacity = 0;
    }
    else {
        arrowL.style.pointerEvents = "auto";
        arrowL.style.opacity = 100;
        arrowR.style.pointerEvents = "auto";
        arrowR.style.opacity = 100;
    }

    card.innerHTML = `
        <section class="question">
            <h2> Q${qIndex + 1}. ${qCurrent[qIndex]} </h2>
        </section>

        <section class="legends">
            <h4 class="labelL"> Strongly Disagree </h4>
            <h4 class="labelR"> Strongly Agree </h4>
        </section>

        <section class="selectors">
            <input type="radio" name="q${qIndex}" value="-3" style="transform: scale(5)">
            <input type="radio" name="q${qIndex}" value="-2" style="transform: scale(4)">
            <input type="radio" name="q${qIndex}" value="-1" style="transform: scale(3)">
            <input type="radio" name="q${qIndex}" value="0"  style="transform: scale(2)" checked>
            <input type="radio" name="q${qIndex}" value="1"  style="transform: scale(3)">
            <input type="radio" name="q${qIndex}" value="2"  style="transform: scale(4)">
            <input type="radio" name="q${qIndex}" value="3"  style="transform: scale(5)">
        </section>
    `;
}

function changeCard(offset) {
    qIndex += offset;
    displayCard();
}

displayCard();

for (var i=0; i < qCurrent.length; i++) {
    document.querySelectorAll(`input[name="q${i}"]`).forEach(radio => {
        console.log(i)
        radio.addEventListener('change', (evt) => {
            console.log("Current question: ", evt.currentTarget.name);
            console.log('Changed to:', evt.target.value);
        });
    });
}
