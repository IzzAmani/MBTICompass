var colorDict;
var lines = [];

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

// connect two nodes by a line
const colors = ["red", "orange", "yellow", "lime", "darkgreen"]
function drawLine() {
    lines = [];
    // loop every node and connect them to other nodes
    for (var i=0; i < nodes.length; i++) {

        // j = i+1 so that we dont repeat connected nodes
        // (nodes that are of lesser index are always the connected ones)
        // ((this is because we start at the lowest index nodes))
        // (((hence the lowest index are connect to all already)))
        for (var j=i+1; j < nodes.length; j++) {
            // skip if the nodes are the same
            if (i == j) {
                continue;
            }

 
            // get the column index of the color chart;
            var columnIndex = colorDict.column[nodes[j].mbti];
            var colorIndex = colorDict[nodes[i].mbti][columnIndex];


            // create a SVG elem in the SVG namespace
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            // var color = colors[Math.round(Math.random() * 3)];
            var color = colors[colorIndex];

            // set line attributes
            line.setAttribute("x1", nodes[i].x + nodeRad + "%");
            line.setAttribute("x2", nodes[j].x + nodeRad + "%");
            line.setAttribute("y1", nodes[i].y + nodeRad + "%");
            line.setAttribute("y2", nodes[j].y + nodeRad + "%");
            line.setAttribute("stroke", "gray");
            line.setAttribute("opacity", 0.5)
            line.setAttribute("stroke-width", "5");

            // Save the node id as the lines' class name
            line.classList.add(i); // start node
            line.classList.add(j); // end node

            line.classList.add(color); // add the preference color to the class for easy access

            lines.push(line);

            SVG.appendChild(line);
        }
    }
}
