const dragBar = document.getElementById("drag-bar");
const form    = document.getElementById("form");
var dragging = false;

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

// get the inputs for first init
const inputs = form.querySelectorAll("input");

// empty the inputs
inputs[0].value = "";
inputs[1].value = "";

// focus on the first input bar on first load
inputs[0].focus();



function inputEmpty() {
    // check if the inputs are empty

    for (var i=0; i < inputs.length; i++) {
        if (inputs[i].value === "") {
            inputs[i].focus();
            return true;
        }
    }
    return false;
}

// check if user pressed the enter key, on <input> and the inputs aren't empty
form.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter" && evt.target.tagName === "INPUT" && !inputEmpty()) {
        // get all of the <input> inside the form

        // focus on the first input 
        inputs[0].focus();

        drawNodes(1); // add one new node (file in node.js)
    }
});


// add two event listener for Enter button and mouse click
const submit = document.getElementById("submit-btn");

// this is for someone that uses tabs to navigate ig, idk, its 5am i can't think
submit.addEventListener("keydown", (evt) => {
    if (evt.key === "Enter" && !inputEmpty()) {
        // focus on thee name input 
        form.querySelectorAll("input")[0].focus();
    }
});

// when user click the button instead of pressing Enter
submit.addEventListener("mouseup", () => {
    if (!inputEmpty()) {
        drawNodes(1); // add one new node (file in node.js)
 
        // focus on thee name input 
        form.querySelectorAll("input")[0].focus();
    }
});


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
