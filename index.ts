const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';


type City = {
    "city": string, 
    "growth_from_2000_to_2013": string, 
    "latitude": number, 
    "longitude": number, 
    "population": string, 
    "rank": string, 
    "state": string
}
const cities: City[] = [];

fetch(endpoint)
    .then(response => response.json())
    .then(data => cities.push(...data))

function findMatches(wordToMatch: string, cities: City[]) {
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, "gi");
        return place.city.match(regex) || place.state.match(regex)

    });
}

function numberWithCommas(x: string) {
    return x.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    const matchArray = findMatches(this.value, cities);
    const html = matchArray.map(place => {
        const regex = new RegExp(this.value, "gi");
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span calss="population">${numberWithCommas(place.population)}</span>
        </li>
        `;
    }).join("");

    if (suggestions === null) return 
    suggestions.innerHTML = html;
}

const searchInput = document.querySelector<HTMLInputElement>(".search")
const suggestions = document.querySelector(".suggestions")

searchInput?.addEventListener("change", displayMatches);
searchInput?.addEventListener("keyup", displayMatches);

