import { data } from "./data.js";

console.log(data);
const container = document.getElementById("country-cards-container");
const showMoreBtn = document.getElementById("show-more-btn");
const searchInput = document.getElementById("search-country");
const searchPopulation = document.getElementById("search-population");
const regionSelect = document.getElementById("region-select");
const typeError = document.getElementById("type-error");
const populationError = document.getElementById("population-error");
let currentIndex = 0;
let displayCountries = 12;
function populateCountryCards(dataArray) {
  container.innerHTML = "";
  if (dataArray.length == 0) {
    container.innerHTML = "<p>No country match with such criteria.</p>";
    return;
  } else {
    console.log(dataArray.length);
    let loopCounter = Math.min(displayCountries, dataArray.length);
    console.log(`loopCounter: ${loopCounter}`);
    console.log(`displayCountries: ${displayCountries}`);
    if (displayCountries >= dataArray.length) {
      showMoreBtn.style.display = "none";
    } else {
      showMoreBtn.style.display = "block";
    }
    const nextCards = dataArray.slice(0, loopCounter);
    nextCards.forEach(country => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
        <h2>${country.name.official}</h2>
        <p>Capital: ${country.capital}</p>
        <p>Population: ${country.population.toLocaleString()}</p>
        <p>Region: ${country.region}</p>
      `;
      card.addEventListener("click", () => countryCardHandler(country));
      container.appendChild(card);
    })


  }

}

document.addEventListener("DOMContentLoaded", function () {
  populateCountryCards(data);

});

function showMoreHandler() {
  displayCountries += 10;
  filterCards(data);

}
showMoreBtn.addEventListener("click", showMoreHandler);

function filterCards(dataArray) {
  const searchName = searchInput.value.toLowerCase().trim();
  const searchPopulationTerm = parseInt(searchPopulation.value);
  const selectedRegion = regionSelect.value;
  let regex = new RegExp(/^[a-zA-Z -]*$/);
  if (!regex.test(searchName)) {
    typeError.textContent = "Please enter only letters and spaces.";
    return;
  } else {
    typeError.textContent = "";
  }

  if (isNaN(searchPopulationTerm)) {
    populationError.textContent = "Please enter a valid population number.";
    return;
  } else if (searchPopulationTerm < 10000 || searchPopulationTerm > 1400000000) {
    populationError.textContent = "Population must be between 10,000 and 1,400,000,000.";
    return;
  } else {
    populationError.textContent = "";
  }

  const filteredCountries = dataArray.filter(country => {
    const matchesName = country.name.official.toLowerCase().includes(searchName);
    const matchesPopulation = isNaN(searchPopulationTerm) || country.population >= searchPopulationTerm;
    const matchesRegion = selectedRegion === "" || country.region === selectedRegion;
    return matchesName && matchesPopulation && matchesRegion;
  })
  populateCountryCards(filteredCountries);
}
searchInput.addEventListener("input", function () {
  filterCards(data);
});

searchPopulation.addEventListener("input", function () {
  filterCards(data);
});
regionSelect.addEventListener("change", function () {
  filterCards(data);
});

function getFormattedNames(dataArray, key) {
  return dataArray[key].map(item => item.name).join(", ")
}

function countryCardHandler(country) {
  const languages = getFormattedNames(country, 'languages');
  const currencies = getFormattedNames(country, 'currencies');
  console.log(languages);
  let queryString =
    "?name=" +
    encodeURIComponent(country.name.official) +
    "&flag=" + encodeURIComponent(country.flags.svg) + "&population=" + country.population + "&region=" + country.region + "&subregion=" + country.subregion + "&capital=" + country.capital + "&languages=" + encodeURIComponent(languages) + "&currencies=" + encodeURIComponent(currencies);

    window.location.href = `detail.html${queryString}`;

}
// const languages = getFormattedNames(data, 'languages')
// const currencies = getFormattedNames(data, 'currencies')
// console.log(currencies);
// console.log(languages);
