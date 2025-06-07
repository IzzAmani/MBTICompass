const circle = document.getElementById("circle");
const SVG    = document.getElementById("lineSVG");
const circleRad = 15;

const usrName = document.getElementById("usr-name");
const usrMBTI = document.getElementById("usr-MBTI");

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
var colorDict;

fetch("color_dictionary.json")
    .then(response => {
        if(!response.ok) {
            console.error(`[${response.status}] something went wrong.`);
        }
        return response.json();
    })
    .then(data => {
        colorDict = data;
    })


// create new nodes ready to be places onto the circle
var x, y, nodeX, nodeY;
function createNode(id, theta) {
    thetaRadian = (theta-90) * (Math.PI / 180);

    // xPos = cos(theta) * border radius
    // get cos() and the increase by one for the
    // radial offset
    // times the outline radius
    x = (Math.cos(thetaRadian) + 1) * circleRad;
    y = (Math.sin(thetaRadian) + 1) * circleRad;
 
    // normalize the xPos and times half the size of the circle
    // then, adjusting for nodes offset
    nodeX = (x / circleRad) * 50 - nodeRad;
    nodeY = (y / circleRad) * 50 - nodeRad;

    // if the node is the newest node
    if (id === nodes.length) {
        var name = usrName.value;
        var mbti = usrMBTI.value.toUpperCase();
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

    newNode.innerHTML = `
        <p style="font-size: ${nameSize/100}rem; font-weight: 900"> ${name} </p>
        <span class="sub-text"> ${mbti} </span>
    `;

    newNode.classList.add("nodes");
 
    document.getElementById("circle").appendChild(newNode);

    // save the newly created node into nodes[]
    nodes[id] = new Node(theta, name, mbti, nodeX, nodeY);
}


// redraw nodes
function drawNodes(dir) {
    document.getElementById("circle").innerHTML = "";

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
        nodeRad += 1;
    }

    // create how many nodes are required
    for (var i=0; i < count; i++) {
        createNode(i, (i / count) * 360 + thetaOffset);
    }
    usrName.value = "";
    usrMBTI.value = "";

    SVG.innerHTML = "";

    drawLine();
    addNameBar(); // in form.js
}

// connect two nodes by a line
const colors = ["red", "orange", "darkgray", "lime", "darkgreen"]
function drawLine() {
    console.log("Drawing Line: ")
    // loop every node and connect them to other nodes
    // BUT: CURRENTLY UNOPTIMISED BECAUSE IT WILL CONNECT ALREADY CONNECTED NODES
    for (var i=0; i < nodes.length; i++) {
        for (var j=0; j < nodes.length-1; j++) {
            // skip if the nodes are the same
            if (i == j) {
                continue;
            }

            // console.log(i, j);

            // get the line color for nodes[i] -> nodes[j] from color dictionary
            console.log(colorDict, "\n", nodes[i].mbti);
 
            // get the column index of the color chart;
            var colIndex = colorDict.column[nodes[j].mbti];
            var colorIndex = colorDict[nodes[i].mbti][colIndex]

            // create a SVG elem in the SVG namespace
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            // var color = colors[Math.round(Math.random() * 3)];
            var color = colors[colorIndex];

            // set line attributes
            line.setAttribute("x1", nodes[i].x + nodeRad + "%");
            line.setAttribute("x2", nodes[j].x + nodeRad + "%");
            line.setAttribute("y1", nodes[i].y + nodeRad + "%");
            line.setAttribute("y2", nodes[j].y + nodeRad + "%");
            line.setAttribute("stroke", color);
            line.setAttribute("stroke-width", "5");

            SVG.appendChild(line);
        }
    }
}
