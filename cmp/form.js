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

// When user moves the mouse, move the form along with it
document.addEventListener("mousemove", (evt) => {
    if (dragging) {
        // + offset so that it's centered
        form.style.left = (evt.clientX/window.innerWidth)*100 - 10 + "%";
        form.style.top  = (evt.clientY/window.innerHeight)*100 - 1 + "%";
        evt.target.style.cursor = "pointer";
    }
})

// When user dropped the form
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
        // if the usrname input is empty
        usrNameInput.style.border = "3px solid red";
        usrNameInput.focus();
    } else {
        usrNameInput.style.borderColor = "#ccc";
    }

    // filter the empty array item
    if (mbtiChoco.filter((e) => e != '').length < 4) {
        // if the mbti chocolate input is empty
        usrMBTIInput.style.border = "3px solid red"; 
 
        // open the chocolate menu if not already open
        chocolate.style.opacity = 1;
        chocolate.style.pointerEvents = "auto";

    } else {
        usrMBTIInput.style.borderColor = "#ccc"; 
    }


    // return true if one of the criterea aren't met
    // return false if both inputs are filled
    return (usrNameInput.value == "" || mbtiChoco.filter((e) => e != '').length < 4)
}

// check if user pressed the enter key, on name input and the inputs aren't empty
form.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter" && evt.target.tagName === "INPUT" && !isInputEmpty()) {
        // focus on the name input
        usrNameInput.focus();

        drawNodes(1); // add one new node (file in node.js)
    }
});


// for checking inputs and submitting usr infos to node.js if the inputs are not empty
function submitUsrInfos() {
    if (!isInputEmpty()) {
        drawNodes(1); // add one new node (file in node.js)

        // focus on thee name input
        usrNameInput.focus();
    }
}


// --------- Chocolate mbti thingy  --------- //
function mbtiChoose(dicho, letter) {
    switch (dicho) {
        case "energy" :
            if (letter ===  'I' || letter === 'E') {
                mbtiChoco[0] = letter;
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

    console.log("Chosen Choco: ", mbtiChoco);
}

// get the mbti from the chocolate input
const chocolate = document.getElementById("chocolate");

// change the colors of selected choco, by mouse or by enterkey
chocolate.addEventListener("mousedown", (evt) => colorChoco(evt));
chocolate.addEventListener("keyup", (evt) => { if (evt.key == "Enter") colorChoco(evt) });

// color the chocolate buttons
function colorChoco(evt) {
    // get the buttons of the chocolate
    var buttons = chocolate.querySelectorAll(".sectionChoco > button");

    // loop over all of the buttons
    for (var button of buttons) {
        // revert all of the buttons that have the same class as the one thats clicked, to gray
        if (button.classList[0] === evt.target.classList[0]) {
            button.style.backgroundColor = "#ccc";
        }

    }

    // change the clicked button into a selected color
    if (evt.target.tagName == "BUTTON") {
        evt.target.style.backgroundColor = "var(--primary)";
 
        // select the mbti choco
        var dicho = evt.target.classList[0];
        var letter = evt.target.innerText;

        // yes ik the mbtiChoose is already called on onclick=; but this is like a fail safe because this choco thing LOVES to break
        mbtiChoose(dicho, letter);
    }
}

function displayChoco() {
    usrMBTIInput.style.borderColor = "revert";

    if (chocolate.style.opacity === "1") {
        chocolate.style.opacity = 0;
        chocolate.style.pointerEvents = "none";
    } else {
        chocolate.style.opacity = 1;
        chocolate.style.pointerEvents = "auto";
    }
}

document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
        chocolate.style.opacity = 0;
        chocolate.style.pointerEvents = "none";
    }
})


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
