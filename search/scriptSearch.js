const personality = [
const personality = [
    {mbti: "INTJ", group: "Analysts", link: "/mbti/purple%20mbti/intj.html"},
    {mbti: "INTP", group: "Analysts", link: "/mbti/purple%20mbti/intp.html"},
    {mbti: "ENTJ", group: "Analysts", link: "/mbti/purple%20mbti/entj.html"},
    {mbti: "ENTP", group: "Analysts", link: "/mbti/purple%20mbti/entp.html"},
    {mbti: "INFJ", group: "Diplomats", link: "/mbti/green%20mbti/infj.html"},
    {mbti: "INFP", group: "Diplomats", link: "/mbti/green%20mbti/intp.html"},
    {mbti: "ENFJ", group: "Diplomats", link: "/mbti/green%20mbti/enfj.html"},
    {mbti: "ENFP", group: "Diplomats", link: "/mbti/green%20mbti/enfp.html"},
    {mbti: "ISTJ", group: "Sentinels", link: "/mbti/blue%20mbti/istj.html"},
    {mbti: "ISFJ", group: "Sentinels", link: "/mbti/blue%20mbti/isfj.html"},
    {mbti: "ESTJ", group: "Sentinels", link: "/mbti/blue%20mbti/estj.html"},
    {mbti: "ESFJ", group: "Sentinels", link: "/mbti/blue%20mbti/esfj.html"},
    {mbti: "ISTP", group: "Explorers", link: "/mbti/yellow%20mbti/istp.html"},
    {mbti: "ISFP", group: "Explorers", link: "/mbti/yellow%20mbti/isfp.html"},
    {mbti: "ESTP", group: "Explorers", link: "/mbti/yellow%20mbti/estp.html"},
    {mbti: "ESFP", group: "Explorers", link: "/mbti/yellow%20mbti/esfp.html"}
];

const search = document.getElementById("key");
const filter = document.getElementById("filter");
const sort = document.getElementById("sort");
const contents = document.getElementById("contents");

search.addEventListener("input", filterSearch);
filter.addEventListener("change", filterSearch);
sort.addEventListener("change", filterSearch);

function filterSearch() {
    let searchValue = search.value.trim().toUpperCase();
    let filterValue = filter.value;
    let sortValue = sort.value;

    // Step 1: Filter
    let filtered = personality.filter(personality => {
        const matchSearch = personality.mbti.includes(searchValue);
        const matchGroup = filterValue === "All" || personality.group === filterValue;
        return matchSearch && matchGroup;
    });

    // Step 2: Sort
    if (sortValue === "Alphabetically") {
        filtered.sort((a, b) => a.mbti.localeCompare(b.mbti));
    } else if (sortValue === "Relevance" || sortValue === "three") {
        filtered.sort((a, b) => b.mbti.localeCompare(a.mbti)); // You can customize this
    }

    // Step 3: Display
    contents.innerHTML = "";
    filtered.forEach(personality => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<p><a href=${personality.link}>${personality.mbti}</a></p>`;
        card.style.cssText = 'width: 97.5%; height: 500px; background-color: white; border-radius: 20px; text-align: center; text-decoration: none;';
        contents.appendChild(card);
    });
}
