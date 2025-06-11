var colorDict;
var lines = []; // 1st index stores the line, the 2nd index stores the labels

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
const lineTexts = ["Raging War", "Nemesis", "Meh", "Buddies", "Inseperable"]

function drawLine() {
    lines = []; // 1st index stores the line, the 2nd index stores the labels

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


            // create a SVG elem in the SVG NameSpace
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");

            var color = colors[colorIndex];

            var x1 = nodes[i].x + nodeRad;
            var x2 = nodes[j].x + nodeRad;
            var y1 = nodes[i].y + nodeRad;
            var y2 = nodes[j].y + nodeRad;

            // set line attributes
            line.setAttribute("x1", x1 + "%");
            line.setAttribute("x2", x2 + "%");
            line.setAttribute("y1", y1 + "%");
            line.setAttribute("y2", y2 + "%");

            // set default colors (non-hover)
            line.setAttribute("stroke", "gray");
            line.setAttribute("opacity", 0.25)
            line.setAttribute("stroke-width", "5");

            // Save the node id as the lines' class name
            // for easy access, for coloring when hovering over nodes
            line.classList.add(i); // start node
            line.classList.add(j); // end node

            line.classList.add(color); // add the preference color to the class for easy access


            // add the line into the svg canva
            SVG.appendChild(line);
 

            // --- Add the label for each line --- //
            const lineLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");

            // get the midpoint of the line
            var lineLabelX = ( x1 + x2 ) / 2;
            var lineLabelY = ( y1 + y2 ) / 2;
 
            // set attr for the svg text
            lineLabel.setAttribute("x", lineLabelX + "%");
            lineLabel.setAttribute("y", lineLabelY + "%"); 
            lineLabel.setAttribute("fill", color);
            lineLabel.setAttribute("font-size", "2em");
            lineLabel.setAttribute("stroke", color);
            lineLabel.setAttribute("stroke-width", "1.5")
            // set them to invisible by default
            lineLabel.setAttribute("opacity", 0);

            lineLabel.textContent = lineTexts[colorIndex]; // inner text

            //   get the line's angle
            var angleRad = Math.atan( (y2-y1)/(x2-x1) );
 
            // set the text rotation according to the line angle
            lineLabel.style.transform = `rotate(${angleRad * (180/Math.PI)}deg)`;
            lineLabel.style.transformOrigin = `${lineLabelX}% ${lineLabelY}%`;

            lineLabel.style.textAnchor = "middle"; // center text horizontally
            lineLabel.setAttribute("dy", "-0.75em") // offset the text slightly
 
            // add the line and the line label to the array of lines 
            // (used in changing line colors)
            lines.push([line, lineLabel]);
 
            // add the new line text onto the svg canvas
            SVG.appendChild(lineLabel);
        }
    }
}
