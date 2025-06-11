var foxImg = document.getElementById("fox-img");
var foxQuote = document.getElementById("fox-quote");



fetch("https://randomfox.ca/floof/")
    .then(response => {
        if(!response.ok) {
            console.error(`[${response.status}] something went wrong.`);
        }
        return response.json();
    })
    .then(data => {
        foxImg.src = data.image;
    });
