const circle = document.getElementById("circle");
const SVG    = document.getElementById("lineSVG");
const circleRad = 15;

var usrMBTI; // get from form.js using the mbti chocolate

var nodeRad = 14;

// initialize the big circle
circle.style.width = circleRad*2 + "%";
SVG.style.width    = circleRad*2 + "%";


// create Node object that'll eventually stored inside notes[];
function Node(theta, name, mbti, x, y) {
    this.theta = theta;
    this.name  = name;
    this.mbti  = mbti;
    this.x     = x;
    this.y     = y;
};
var nodes = [];


// create new nodes ready to be places onto the circle
var x, y, nodeX, nodeY;
function createNode(id, theta) {
    thetaRadian = (theta-90) * (Math.PI / 180);

    // xPos = cos(theta) * border radius
    // get cos() and the increase by one for the offset
    // times the outline radius
    x = (Math.cos(thetaRadian) + 1) * circleRad;
    y = (Math.sin(thetaRadian) + 1) * circleRad;
 
    // normalize the xPos and times half the size of the circle
    // then, adjusting for nodes offset
    nodeX = (x / circleRad) * 50 - nodeRad;
    nodeY = (y / circleRad) * 50 - nodeRad;

    // if the node is the newest node
    if (id === nodes.length) {
        var name = usrNameInput.value;
        // var mbti = usrMBTI.value.toUpperCase();
        var mbti = usrMBTI;
    }
    else {
        var name = nodes[id].name;
        var mbti = nodes[id].mbti;
    }

    // adding the node
    var newNode = document.createElement("div");

    // style the new node
    newNode.style.left  = nodeX + "%";
    newNode.style.top   = nodeY + "%";
    newNode.style.width = nodeRad*2 + "%";

    // dynamically resize the font size based on name length
    var nameSize = 150 - 5*name.length;

    // insert the text
    newNode.innerHTML = `
        <p style="font-size: ${nameSize/100}rem; font-weight: 900"> ${name} </p>
        <span class="sub-text"> ${mbti} </span>
    `;

    newNode.addEventListener("mouseenter", (evt) => {
        evt.target.style.backgroundColor = "red";
    })

    newNode.classList.add("nodes");
 
    document.getElementById("circle").appendChild(newNode);

    // save the newly created node into nodes[]
    nodes[id] = new Node(theta, name, mbti, nodeX, nodeY);
}


// redraw nodes
function drawNodes(dir) {
    document.getElementById("circle").innerHTML = "";

    // combine the arrar of mbti letters into string
    usrMBTI = mbtiChoco.join("");

    // random offset to make the nodes a little nicer
    var thetaOffset = Math.round(Math.random() * 360);
 
    var count = nodes.length + dir;

    if (dir === -1) {
        nodes.pop();
    }
 
    // resizing based on how many nodes there are
    if (count !== 0 && count % 4 == 0 && dir == 1) {
        // shrink every 4th elements going forward
        nodeRad += -1;
    }
    else if (count % 4 === 3 && dir == -1) { 
        // expand every 3rd elements going backwards
        nodeRad += 1;b
    }

    // create how many nodes are required
    for (var i=0; i < count; i++) {
        createNode(i, (i / count) * 360 + thetaOffset);
    }
    usrNameInput.value = "";

    SVG.innerHTML = "";

    drawLine();
    addNameBar(); // in form.js
}
