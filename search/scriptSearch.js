const personality = [
    {mbti: "INTJ", group: "Analysts", link: "/advancedinfo/Analysts/INTJ.html"},
    {mbti: "INTP", group: "Analysts", link: "/advancedinfo/Analysts/INTP.html"},
    {mbti: "ENTJ", group: "Analysts", link: "/advancedinfo/Analysts/ENTJ.html"},
    {mbti: "ENTP", group: "Analysts", link: "/advancedinfo/Analysts/ENTP.html"},

    {mbti: "INFJ", group: "Diplomats", link: "/advancedinfo/Diplomats/INFJ.html"},
    {mbti: "INFP", group: "Diplomats", link: "/advancedinfo/Diplomats/INFP.html"},
    {mbti: "ENFJ", group: "Diplomats", link: "/advancedinfo/Diplomats/ENFJ.html"},
    {mbti: "ENFP", group: "Diplomats", link: "/advancedinfo/Diplomats/ENFP.html"},

    {mbti: "ISTJ", group: "Sentinels", link: "/advancedinfo/Sentinals/ISTJ.html"},
    {mbti: "ISFJ", group: "Sentinels", link: "/advancedinfo/Sentinals/ISFJ.html"},
    {mbti: "ESTJ", group: "Sentinels", link: "/advancedinfo/Sentinals/ESTJ.html"},
    {mbti: "ESFJ", group: "Sentinels", link: "/advancedinfo/Sentinals/ESFJ.html"},

    {mbti: "ISTP", group: "Explorers", link: "/advancedinfo/Explorers/ISTP.html"},
    {mbti: "ISFP", group: "Explorers", link: "/advancedinfo/Explorers/ISFP.html"},
    {mbti: "ESTP", group: "Explorers", link: "/advancedinfo/Explorers/ESTP.html"},
    {mbti: "ESFP", group: "Explorers", link: "/advancedinfo/Explorers/ESFP.html"}
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
