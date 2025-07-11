
const pogodaBottom = document.querySelector('.pogoda-bottom')
const wilgotnosc = document.querySelector('#wilgotnosc')
const temperatura = document.querySelector('#temperatura')
const odczuwalna = document.querySelector('#odczuwalna')
const cisnienie = document.querySelector('#cisnienie')
const clouds = document.querySelector('#clouds')
const min_temp = document.querySelector('#min-temp')
const max_temp = document.querySelector('#max-temp')
const pogoda = document.querySelector('#pogoda')
const zdjecie = document.querySelector('.picture')
const blad = document.querySelector('.error')
const button = document.querySelector('.check')
const input = document.querySelector('.city')
const unit = document.querySelector('.unit')
const nazwaMiasta = document.querySelector('.miasto-nazwa')
const pogodaGodziny = document.querySelector('#pogoda-godziny')
const pogodaDni = document.querySelector('#pogoda-dni')

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q='
const API_KEY = '&appid=c58789670bdbb47b3015c68589ed18e3'
const API_UNITS_METRIC = '&units=metric'
const API_UNITS_IMPERIAL = '&units=imperial'
const API_LANG = '&lang=pl'

const sprawdzPogode = () => {
    pogodaBottom.style.display = 'block';
    pogodaGodziny.style.display = 'flex';
    pogodaDni.style.display = 'flex';
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
            cisnienie.textContent = `${pressure} hPa`;
            wilgotnosc.textContent = `${hum}%`;
            clouds.textContent = `${cloudiness}%`;
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

            pogodaGodziny.innerHTML = '';
            pogodaDni.innerHTML = '';

            // --- Prognoza godzinowa (następne 24 godziny) ---
            const hourlyForecasts = response2.data.list.slice(0, 8);
            hourlyForecasts.forEach((item, index) => {
                const hourTag = document.createElement('div');
                hourTag.classList.add('forecast-item');
                hourTag.innerHTML = `
                    <img src="img/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="picture-hour">
                    <span class="time-temp-display">${item.main.temp.toFixed(1)}${sign}</span>
                    <span class="time-realtemp-display">${item.main.feels_like.toFixed(1)}${sign}</span>
                    <span class="time-display">${timeConverter(item.dt, 1)}</span>
                `;
                pogodaGodziny.appendChild(hourTag);
            });

            // --- Prognoza dzienna (następne 5 dni) ---

            const dailyForecasts = [];
            const processedDates = new Set();

            response2.data.list.forEach(item => {
                const date = timeConverter(item.dt, 2);
                if (!processedDates.has(date)) {

                    const hour = new Date(item.dt * 1000).getHours();
                    if (hour >= 11 && hour <= 15) {
                        dailyForecasts.push(item);
                        processedDates.add(date);
                    }
                }
            });

            const uniqueDailyForecasts = dailyForecasts.slice(0, 5);

            uniqueDailyForecasts.forEach((item, index) => {
                const dayTag = document.createElement('div');
                dayTag.classList.add('forecast-item');
                dayTag.innerHTML = `
                    <img src="img/${item.weather[0].icon}.png" alt="${item.weather[0].description}" class="picture-day">
                    <span class="time-temp-display">${item.main.temp.toFixed(1)}${sign}</span>
                    <span class="time-realtemp-display">${item.main.feels_like.toFixed(1)}${sign}</span>
                    <span class="time-display">${timeConverter(item.dt, 2)}</span>
                `;
                pogodaDni.appendChild(dayTag);
            });

        })
        .catch(error => {
            console.error('Błąd podczas pobierania pogody:', error);
            input.value = '';
            blad.style.display = 'block';
            pogodaBottom.style.display = pogodaGodziny.style.display = pogodaDni.style.display = 'none';
            blad.textContent = "Błędne miasto lub problem z API!";
        });
};

const zmienJednostke = () => {
    if(unit.id != 'imperial'){
        unit.id = 'imperial'
        unit.innerHTML = '°F'
    }
    else{
        unit.id = 'metric'
        unit.innerHTML = '°C'
    }      
    button.click()
}

unit.addEventListener('click', zmienJednostke)
button.addEventListener('click', sprawdzPogode)
input.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
      event.preventDefault()
      button.click()
    }
  });