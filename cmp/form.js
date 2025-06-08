const dragBar = document.getElementById("drag-bar");
const form    = document.getElementById("form");
const usrNameInput = document.getElementById("usr-name");
const usrMBTIInput = document.getElementById("usr-mbti");

var dragging = false;
var mbtiChoco = [];

// ---------  for dragging the form --------- //

// when user click on the drag bar
dragBar.addEventListener("mousedown", (evt) => {
    dragging = true;
    document.body.style.cursor = "grabbing";

    evt.preventDefault(); // make sure that user cannot select text when cllick-dragging
})

document.addEventListener("mousemove", (evt) => {
    if (dragging) {
        // + offset so that it's centered
        form.style.left = (evt.clientX/window.innerWidth)*100 - 10 + "%";
        form.style.top  = (evt.clientY/window.innerHeight)*100 - 1 + "%";
        evt.style.cursor = "pointer";
    }
})

document.addEventListener("mouseup", () => {
    dragging = false;
    document.body.style.cursor = "default";
})


// --------- for easy inputs navigations --------- //

// empty the inputs
usrNameInput.value = "";

// focus on the first input bar on first load
usrNameInput.focus();



// check if the inputs are empty and display proper error
function isInputEmpty() {
    if (usrNameInput.value == ""){
        usrNameInput.style.border = "3px solid red";
        usrNameInput.focus(); // if the usrname input is empty
    }
    if (mbtiChoco.length < 4) {
        usrMBTIInput.style.border = "3px solid red"; // if the mbti chocolate input is empty
    }
 
    return (usrNameInput.value == "" || mbtiChoco.length < 4);
}

// check if user pressed the enter key, on <input> and the inputs aren't empty
form.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter" && evt.target.tagName === "INPUT" && !isInputEmpty()) {
        // get all of the <input> inside the form

        // focus on the name input
        usrNameInput.focus();

        drawNodes(1); // add one new node (file in node.js)
    }
});


// add two event listener for Enter button and mouse click
const submit = document.getElementById("submit-btn");

// // this is for someone that uses tabs to navigate ig, idk, its 5am i can't think
// submit.addEventListener("keydown", (evt) => {
//     if (evt.key === "Enter" && !inputEmpty()) {
//         // focus on thee name input 
//         form.querySelectorAll("input")[0].focus();
//     }
// });
//
// when user click the button instead of pressing Enter
submit.addEventListener("mouseup", () => {
    if (!isInputEmpty()) {
        drawNodes(1); // add one new node (file in node.js)

        // focus on thee name input
        usrNameInput.focus();
        usrNameInput.style.borderColor = "#ccc";
    }

});


// --------- Chocolate mbti thingy  --------- //
function mbtiChoose(dicho, letter) {
    switch (dicho) {
        case "energy" :
            if (letter ===  'I' || letter === 'E') {
                mbtiChoco[0] = letter;
                // document.getElementById(dicho + letter).style.backgroundColor = "red";
            }
            break;

        case "info" :
            if (letter == 'N' || letter == 'S') {
                mbtiChoco[1] = letter;
            }
            break;

        case "decision" :
            if (letter == 'T' || letter == 'F') {
                mbtiChoco[2] = letter;
            }
            break;

        case "lifestyle" :
            if (letter == 'P' || letter == 'J') {
                mbtiChoco[3] = letter;
            }
            break;
    }
}

// get the mbti from the chocolate input
const chocolate = document.getElementById("chocolate");

chocolate.addEventListener("mousedown", (evt) => {
    // get the buttons of the chocolate
    var buttons = chocolate.querySelectorAll(".sectionChoco > button");

    // loop over all of the buttons
    for (var i of buttons) {
        // revert all of the buttons that have the same class as the one thats clicked to gray
        if (i.classList[0] === evt.target.classList[0]) {
            i.style.backgroundColor = "#ccc";
        }
    }

    // change the clicked button into a selected color
    if (evt.target.tagName == "BUTTON") {
        evt.target.style.backgroundColor = "var(--primary)";
    }
})

function displayChoco() {
    usrMBTIInput.style.borderColor = "revert";

    if (chocolate.style.opacity === "1") {
        chocolate.style.opacity = 0;
        chocolate.style.pointerEvents = "none";
    } else {
        chocolate.style.opacity = 1;
        chocolate.style.pointerEvents = "auto";
    }

    console.log(chocolate.style.opacity);
}


// --------- For adding new entry to the namelist --------- //
function addNameBar() {
    var nodesText = "";

    for (var n in nodes) {
        node = nodes[n];

        nodesText += `  
            <section class="names">
                <div class="name"> (${node.mbti}) ${node.name} </div>
                <img alt="del" onclick="removeNode(${n})" src="/img/delete.png">
            </section>
        `;
    }

    document.getElementById("name-list").innerHTML = nodesText;
}

// remove node based on id
function removeNode(id) {
    nodes.splice(id, 1);
    drawNodes(0);
}
