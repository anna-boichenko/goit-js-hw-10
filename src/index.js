import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countriesList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(evt) {
  evt.preventDefault();
    const countryInp = evt.target.value.trim().toLowerCase();
    // clearSearch();
    if (countryInp.length === 0) {
        return clearSearch();
    };

    fetchCountries(countryInp)
        .then(country => {
          clearSearch()
          if (country.length === 1) {
              return renderCountry(country);
            } else if(country.length >= 2 && country.length <= 10) {
                return renderMarkupOfCountries(country);
            } else if (country.length > 10) {
                return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            }
        }).catch(err => {
          // clearSearch();
            return Notiflix.Notify.failure("Oops, there is no country with that name");
    })
}

function renderMarkupOfCountries(country) {
  console.log(country);
  const markup = country
    .map(
      ({ flags, name }) =>
      `<li class="country-list__item">
      <img class="country-list__img" src="${flags.svg}" alt="flags" width="30" height="26">
      <h2 class="country-list__name">${name.official}</h2>
      </li>`
    )
    .join('');
  countriesList.innerHTML = markup;
}

function renderCountry([{ name, capital, population, flags, languages }]) {
  const markup =  `<div class="country-card">
      <img class="country-card__img" width="30" height="26" src="${flags.svg}" alt="" />
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
      </div>`;
  countryInfo.innerHTML = markup;
}

function clearSearch() {
    countriesList.innerHTML = "";
    countryInfo.innerHTML = "";
}