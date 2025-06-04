const personality = [
    {mbti: "INTJ", group: "Analysts"},
    {mbti: "INTP", group: "Analysts"},
    {mbti: "ENTJ", group: "Analysts"},
    {mbti: "ENTP", group: "Analysts"},
    {mbti: "INFJ", group: "Diplomats"},
    {mbti: "INFP", group: "Diplomats"},
    {mbti: "ENFJ", group: "Diplomats"},
    {mbti: "ENFP", group: "Diplomats"},
    {mbti: "ISTJ", group: "Sentinels"},
    {mbti: "ISFJ", group: "Sentinels"},
    {mbti: "ESTJ", group: "Sentinels"},
    {mbti: "ESFJ", group: "Sentinels"},
    {mbti: "ISTP", group: "Explorers"},
    {mbti: "ISFP", group: "Explorers"},
    {mbti: "ESTP", group: "Explorers"},
    {mbti: "ESFP", group: "Explorers"}
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
        card.innerHTML = `<p>${personality.mbti}</p>`;
        card.style.cssText = 'width: 97.5%; height: 500px; background-color: white; border-radius: 20px; text-align: center; text-decoration: none;';
        contents.appendChild(card);
    });
}
