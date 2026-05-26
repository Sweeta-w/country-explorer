import { data } from "./data.js";

console.log(data);
const container = document.getElementById("country-cards-container");
const showMoreBtn = document.getElementById("show-more-btn");

let correntIndex = 0;
function renderCards(dataArray, count){
  const nextCards = dataArray.slice(correntIndex, correntIndex + count);
  nextCards.forEach(country => {
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
  correntIndex += count;
  if(correntIndex >= dataArray.length){
    showMoreBtn.style.display = "none";
    alert(`No more countries to display. ${dataArray.length} countries have been displayed.`);
  }
}
renderCards(data, 12);

showMoreBtn.addEventListener("click", () => {
  renderCards(data, 10)
})












// let displayedCountries = 12;
// const totalCards = data.length;

// showMoreBtn.addEventListener("click", () => {
//   renderCards(data, displayedCountries, 10);
//   if (displayedCountries >= totalCards) {
//     showMoreBtn.style.display = "none";
//     alert(`No more countries to display. ${totalCards} countries have been displayed.`);
//   }
// });



// function renderCards(dataArray, startIndex = 0, addLimit = 12) {
//   dataArray.forEach((country, index) => {
//     if (index >= startIndex && index < startIndex + addLimit && startIndex < totalCards) {
//       if (index >= displayedCountries) {
//         displayedCountries++;
//       }
//       const card = document.createElement("div");
//       card.classList.add("card");
//       card.innerHTML = `
//     <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
//     <h2>${country.name.common}</h2>
//     <p>Capital: ${country.capital}</p>
//     <p>Population: ${country.population.toLocaleString()}</p>
//     <p>Region: ${country.region}</p>
//     `;
//       container.appendChild(card);
//     } else {
//       return;
//     }

//   });
// }
// renderCards(data);
