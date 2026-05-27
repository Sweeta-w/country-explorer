import { data } from "./data.js";

console.log(data);
const container = document.getElementById("country-cards-container");
const showMoreBtn = document.getElementById("show-more-btn");
const searchInput = document.getElementById("search-country");
const searchPopulation = document.getElementById("search-population");
const regionSelect = document.getElementById("region-select");

let currentIndex = 0;
function renderCards(dataArray, count = 12) {
  const nextCards = dataArray.slice(currentIndex, currentIndex + count);
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
  currentIndex += count;
  if (currentIndex >= dataArray.length) {
    showMoreBtn.style.display = "none";
  }
}
renderCards(data);

showMoreBtn.addEventListener("click", () => {
  renderCards(data, 10)
})

function rendFilterCards(dataArray) {
  container.innerHTML = ""; // clear old cards
  dataArray.forEach(country => {
    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <img src="${country.flags.png}" alt="flag" width="100">
            <h2>${country.name.common}</h2>
            <p><b>Capital:</b> ${country.capital}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
        `;
    container.appendChild(card);
  });
}

// function filterCards(dataArray) {
//   let search = searchInput.value.toLowerCase();
//   let filteredData = dataArray.filter(country => country.name.common.toLowerCase().includes(search));
//   rendFilterCards(filteredData);

// }
searchInput.addEventListener("input", () => {
  container.innerHTML = "";
  filterCards(data);
});
function filterData() {
  const nameValue = searchInput.value.toLowerCase().trim();
  const regionValue = regionSelect.value;
  const populationValue = parseInt(searchPopulation.value) || 0; // Agar khali ho toh 0

  // .filter() method pure array ko check karke sirf match hone wale items return karega
  const filteredResult = data.filter((country) => {
    
    // Filter A: Name Check (Agar input khali hai toh auto true, warna name match karein)
    const matchesName = country.name.common.toLowerCase().includes(nameValue);

    // Filter B: Region Check (Agar "All Regions" select hai toh auto true, warna region match karein)
    const matchesRegion = regionValue === "" || country.region === regionValue;

    // Filter C: Population Check (Country ki population user ki di hui value se bari ya barabar ho)
    const matchesPopulation = country.population >= populationValue;

    // IMPORTANT: Jab yeh TEENON conditions true hongi, tabhi country select hoga
    return matchesName && matchesRegion && matchesPopulation;
  });

  // 3. Purane cards ko clear karein aur naye filtered cards dikhane ke liye function call karein
  container.innerHTML = ""; 
  
  // Yahan aap apna purana renderCards function use karein (Pehle 12 dikhane ke liye)
  // Note: Agar aap pagination use kar rahi hain, toh filteredResult ko renderCards mein pass karein
  rendFilterCards(filteredResult); 
}

// 4. Event Listeners: Jab bhi koi filter change ho, filterData() chal pare
searchInput.addEventListener("input", filterData);   // Har type karne par chalega
regionSelect.addEventListener("change", filterData);       // Region badalne par chalega
searchPopulation.addEventListener("input", filterData);







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
