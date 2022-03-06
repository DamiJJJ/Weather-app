const button = document.querySelector('button');
const img = document.querySelector('img');

const URL = 'https://dog.ceo/api/breeds/image/random';

// fetch(URL)
// .then(response => console.log(response.json()))
// .catch(error => console.log(error))

button.addEventListener('click', () => {
    fetch(URL)
    .then(response => response.json())
    .then(data => img.setAttribute('src', data.message))
    .catch(error => console.error(error))
})

// Statusy
// 1xx - kody informacyjne
// 2xx - kody powodzenia
// 3xx - kody przekierowania
// 4xx - kody błędu aplikacji klienta
// 5xx - kody błędu serwera HTTP