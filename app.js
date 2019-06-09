const apiKey = "tab56IaMhPImtBnIFAUcsXwHV8CPVlWPBgWR5glb";
const endPoint = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}`;


const domObjects = {};


/*DOM objects*/

function fetchParksData(params) {
    const url = `${endPoint}&${params}`
    fetch(url)
        .then(resp => resp.json())
        .then(resp => appendResults(resp.data))
        .catch(err => {
            console.error(err);
        });
}

function appendResults(parks) {
    parks.forEach(park => {
        domObjects.resultsContainer.innerHTML += `
        <p class="park-p">
        <h2><a target="_blank" href="${park.url}">${park.name}</a></h2>
        <p>${park.description}</p>
        </p>
        `
        console.log(park);
    });
}

function removeResults() {
    domObjects.resultsContainer.innerHTML = "";
}

function addEventListeners() {
    domObjects.searchForm.addEventListener("submit", e => {
        e.preventDefault();
        removeResults();
        const params = getSearchParams();
        const formattedParams = formatParams(params);
        fetchParksData(formattedParams)
    })
}

function getSearchParams() {
    const params = {
        stateCode: "",
        q: domObjects.searchTermInput.value,
        limit: domObjects.maxResults.value
    };
    for (let i = 0; i < domObjects.stateInput.selectedOptions.length; i++) {
        params.stateCode += domObjects.stateInput.selectedOptions[i].value + ",";

    };

    return params;
}

function formatParams(params) {
    formattedParams = ""
    Object.keys(params).forEach(param => {
        formattedParams += `${param}=${params[param]}&`
    });
    return formattedParams;
}

function getDomObjects() {
    domObjects.searchForm = document.getElementsByClassName("search-parks-form")[0];
    domObjects.searchTermInput = document.getElementById("search-term-input");
    domObjects.stateInput = document.getElementById("states-select");
    domObjects.resultsContainer = document.getElementById("results-container");
    domObjects.maxResults = document.getElementById("max-results-input");
}

function startProgram() {
    getDomObjects();
    addEventListeners();
}

startProgram();