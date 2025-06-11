function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab-content');

    tabs.forEach(tab=> {
        tab.classList.remove('active');
    });

     const selectedTab = document.getElementById(tabId);
     if (selectedTab){
        selectedTab.classList.add('active');
     }
}

function scrollTest(id) {
    const elem = document.getElementById(id);
    elem.scrollIntoView();
    console.log(elem)
}