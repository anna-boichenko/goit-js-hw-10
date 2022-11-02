import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('input#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
  evt.preventDefault();
    const countryInp = searchInput.value.trim();
    // clearSearch();
    if (!countryInp) {
        return clearSearch();
    };

    fetchCountries(countryInp)
        .then(country => {
          clearSearch();
            if (country.length > 10) {
              return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if(country.length > 2 && country.length < 10) {
                return renderMarkupOfCountries(country);
            } else if (country.length === 1) {
                return renderCountry(country);
            }
        }).catch(err => {
          // clearSearch();
            return Notiflix.Notify.failure("Oops, there is no country with that name");
    })
}

function renderMarkupOfCountries(country) {
  console.log(country);
  const markup = country
    .map(({ flags, name }) => 
      `<li> 
        <img src="${flags.svg}" alt="${name}" />
        <h2>${name.official}</h2>
        </li>`).join('');
    countriesList.innerHTML = markup;
}


console.log(renderMarkupOfCountries());

function renderCountry(array) {
    const markup = array.map(({ flags, name, capital, population, languages }) => {
      `<div class="country-card">
      <img class="country-card__img" src="${flags.svg}" alt="" />
      <p class="country-card__name">${name.official}</p>
      </div>
      <div>
        <p class="text">Capital:
          <span class="span">${capital}</span>
        </p>
      </div>
      <div>
        <p class="text">Population:
          <span class="span">${population}</span>
        </p>
      </div>
      <div>
        <p class="text">Languages:
          <span class="span">${Object.values(languages)}</span>
        </p>
      </div>`
    }).join("");
    countryInfo.innerHTML = markup;
}

function clearSearch() {
    countriesList.innerHTML = "";
    countryInfo.innerHTML = "";
}