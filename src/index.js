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
    const country = searchInput.value.trim();
    // clearSearch();
    if (!country) {
        return clearSearch();
    }

    fetchCountries()
        .then(countries => {
            clearSearch();
            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
            } else if(countries.length > 2 && countries.length < 10) {
                return renderMarkupOfCountries(countries);
            } else if (countries.length === 1) {
                return renderCountry(countries);
            }
        }).catch(err => {
            // clearSearch()
            return Notiflix.Notify.failure("Oops, there is no country with that name");
    })
}

function renderMarkupOfCountries(array) {
    const markup = array.map(({ flags, name }) => {
        return `
        <li> 
        <img src="${flags.svg}" alt="${name}" />
        <h2>${name}</h2>`
    }).join('');
    countries.innerHTML = markup;
}

function renderCountry(array) {
    const markup = array.map(({ flags, name, capital, population, language }) => {
        `    <div class="country-card">
      <img class="country-card__img" src="${flags.svg}" alt="" />
      <p class="country-card__name">${name}</p>
      <div>
        <p class='text'>Capital:
          <span class='span'>${capital}</span>
        </p>
      </div>
      <div>
        <p class='text'>Population:
          <span class='span'>${population}</span>
        </p>
      </div>
      <div>
        <p class='text'>Languages:
          <span class='span'>${languages}</span>
        </p>
      </div>
    </div>`
    });
    countryInfo.innerHTML = markup;
}
function clearSearch() {
    countriesList.innerHTML = "";
    countryInfo.innerHTML = "";
}