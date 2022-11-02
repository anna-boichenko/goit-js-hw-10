export { fetchCountries }

const base_url = "https://restcountries.com/v3.1";
const search = "fields=name,capital,population,flags,languages";
function fetchCountries(name) {
    return fetch(`${base_url}/name/${name}?${search}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}
