// const params = new URLSearchParams(window.location.search);
// const countryName = params.get('name');
// console.log(countryName);
const params = new URLSearchParams(window.location.search);
let encodedValue = params.get("name");
let decodedValue = decodeURIComponent(encodedValue);
console.log(decodedValue);
const detailContainer = document.getElementById('country-detail');
const capital = params.get('capital');
const population = params.get('population');
const region = params.get('region');
const languages = params.get('languages');
const currencies = params.get('currencies');


detailContainer.innerHTML = `
  <div class="country-detail-card">
    <img src="${params.get('flag')}" alt="Flag of ${params.get('name')}" class="country-flag">
    <h2>${params.get('name')}</h2>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Region:</strong> ${region}</p>
    <p><strong>Subregion:</strong> ${params.get('subregion')}</p>
     <p><strong>Capital:</strong> ${capital}</p>
     <p><strong>Currencies:</strong> ${currencies}</p>
    <p><strong>Languages:</strong> ${languages}</p>
    
  </div>
`;