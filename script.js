import {data} from "./data.js";

console.log(data);
const container = document.getElementById("country-cards-container");
function renderCards(dataArray) {
  dataArray.forEach(country => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
    <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
    <h2>${country.name.common}</h2>
    <p>Capital: ${country.capital}</p>
    <p>Population: ${country.population.toLocaleString()}</p>
    <p>Region: ${country.region}</p>
    `;
    container.appendChild(card); 
  });
}
renderCards(data);