// Deklaracja zmiennych DOM na poziomie globalnym
const nazwaMiasta = document.querySelector('.miasto-nazwa');
const temperatura = document.querySelector('#temperatura');
const odczuwalna = document.querySelector('#odczuwalna');
const cisnienie = document.querySelector('#cisnienie');
const wilgotnosc = document.querySelector('#wilgotnosc');
const clouds = document.querySelector('#clouds');
const min_temp = document.querySelector('#min-temp');
const max_temp = document.querySelector('#max-temp');
const pogoda = document.querySelector('#pogoda');
const zdjecie = document.querySelector('.picture');
const input = document.querySelector('.city');
const btn = document.querySelector('.check');
const blad = document.querySelector('.error');
const pogodaBottom = document.querySelector('#pogoda-bottom');
const pogodaGodzinySection = document.querySelector('#pogoda-godziny-section');
const pogodaDniSection = document.querySelector('#pogoda-dni-section');
const pogodaGodzinyContainer = document.querySelector('#pogoda-godziny');
const pogodaDniContainer = document.querySelector('#pogoda-dni');
const unit = document.querySelector('.unit');

// Deklaracja stałych API
const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const API_KEY = '&appid=c58789670bdbb47b3015c68589ed18e3';
const API_UNITS_METRIC = '&units=metric';
const API_UNITS_IMPERIAL = '&units=imperial';
const API_LANG = '&lang=pl';

/*
const timeConverter = (UNIX_timestamp, type) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
    const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

    if (type === 1) { // Godzina
        const hour = a.getHours();
        const min = a.getMinutes();
        return `${hour}:${min < 10 ? '0' + min : min}`;
    } else if (type === 2) { // Dzień
        const year = a.getFullYear();
        const month = months[a.getMonth()];
        const date = a.getDate();
        const dayName = days[a.getDay()];
        return `${dayName}, ${date} ${month}`;
    }
    return '';
};
*/

// Główna funkcja pobierająca i wyświetlająca pogodę
const sprawdzPogode = () => {

    pogodaBottom.style.display = 'block';
    pogodaGodzinySection.style.display = 'block';
    pogodaDniSection.style.display = 'block';

    const city = input.value || 'Gdynia';
    const jednostki = unit.id;
    let units;
    let sign;

    if (jednostki === "metric") {
        units = API_UNITS_METRIC;
        sign = "°C";
    } else {
        units = API_UNITS_IMPERIAL;
        sign = "°F";
    }

    // --- Pobieranie aktualnej pogody ---
    const currentWeatherURL = API_URL + city + API_KEY + units + API_LANG;

    axios.get(currentWeatherURL)
        .then(response => {
            console.log('Aktualna pogoda:', response.data);
            const temp = response.data.main.temp;
            const real_temp = response.data.main.feels_like;
            const pressure = response.data.main.pressure;
            const hum = response.data.main.humidity;
            const cloudiness = response.data.clouds.all;
            const temp_min = response.data.main.temp_min;
            const temp_max = response.data.main.temp_max;
            const status = response.data.weather[0];

            nazwaMiasta.textContent = response.data.name;
            temperatura.textContent = temp.toFixed(1) + sign;
            odczuwalna.textContent = real_temp.toFixed(1) + sign;
            cisnienie.textContent = `${pressure}`;
            wilgotnosc.textContent = `${hum}`;
            clouds.textContent = `${cloudiness}`;
            min_temp.textContent = temp_min.toFixed(1) + sign;
            max_temp.textContent = temp_max.toFixed(1) + sign;
            pogoda.textContent = status.description;
            zdjecie.src = `img/${status.icon}.png`;
            blad.style.display = 'none';

            // --- Pobieranie prognozy godzinowej/dziennej ---
            const forecastURL = API_FORECAST_URL + city + API_KEY + units + API_LANG;

            return axios.get(forecastURL);
        })
        .then(response2 => {
            console.log('Prognoza 5 dni / 3 godziny:', response2.data);

            pogodaGodzinyContainer.innerHTML = '';
            pogodaDniContainer.innerHTML = '';


            // --- Prognoza godzinowa (następne 24 godziny) ---
            const hourlyForecasts = response2.data.list.slice(0, 8);

            hourlyForecasts.forEach((item) => {
                const hourTag = document.createElement('div');
                hourTag.classList.add('forecast-item', 'text-center');
                hourTag.innerHTML = `
                    <img src="img/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="img-fluid">
                    <span class="time-temp-display">${item.main.temp.toFixed(1)}${sign}</span>
                    <span class="time-realtemp-display">${item.main.feels_like.toFixed(1)}${sign}</span>
                    <span class="time-display">${timeConverter(item.dt, 1)}</span>
                `;
                pogodaGodzinyContainer.appendChild(hourTag);
            });


            // --- Prognoza dzienna (następne 5 dni) ---
            const dailyForecasts = [];
            const processedDates = new Set();

            response2.data.list.forEach(item => {
                const date = timeConverter(item.dt, 2);
                const hour = new Date(item.dt * 1000).getHours();

                if (!processedDates.has(date) && hour >= 11 && hour <= 15) {
                    dailyForecasts.push(item);
                    processedDates.add(date);
                }
            });

            const uniqueDailyForecasts = dailyForecasts.slice(0, 5);

            uniqueDailyForecasts.forEach((item) => {
                const dayTag = document.createElement('div');
                dayTag.classList.add('forecast-item', 'text-center');
                dayTag.innerHTML = `
                    <img src="img/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="img-fluid">
                    <span class="time-temp-display">${item.main.temp.toFixed(1)}${sign}</span>
                    <span class="time-realtemp-display">${item.main.feels_like.toFixed(1)}${sign}</span>
                    <span class="time-display">${timeConverter(item.dt, 2)}</span>
                `;
                pogodaDniContainer.appendChild(dayTag);
            });

        })
        .catch(error => {
            console.error('Błąd podczas pobierania pogody:', error);
            input.value = '';
            blad.style.display = 'block';

            pogodaBottom.style.display = pogodaGodzinySection.style.display = pogodaDniSection.style.display = 'none';
        });
};

// Listenery Zdarzeń
btn.addEventListener('click', sprawdzPogode);

input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sprawdzPogode();
    }
});

unit.addEventListener('click', () => {
    if (unit.id === 'metric') {
        unit.id = 'imperial';
        unit.textContent = '°F';
    } else {
        unit.id = 'metric';
        unit.textContent = '°C';
    }
    sprawdzPogode();
});

// sprawdzPogode();