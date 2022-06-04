
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
const API_URL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='
const API_KEY = '&appid=c58789670bdbb47b3015c68589ed18e3'
const API_UNITS_METRIC = '&units=metric'
const API_UNITS_IMPERIAL = '&units=imperial'
const API_LANG = '&lang=pl'

const sprawdzPogode = () => {
    pogodaBottom.style.display = 'block'
    pogodaGodziny.style.display = 'flex'
    pogodaDni.style.display = 'flex'
    const city = input.value || 'Gdynia'
    const jednostki = unit.id
    if (jednostki == "metric")
    {
        units = API_UNITS_METRIC
        sign = "°C"
    }
    else
    {
        units = API_UNITS_IMPERIAL
        sign = "°F"
    }
    const URL = API_URL + city + API_KEY + units + API_LANG

    axios.get(URL).then(response => {
        console.log(response.data)     
        const lat = response.data.coord.lat
        const lon = response.data.coord.lon
        const temp = response.data.main.temp
        const real_temp = response.data.main.feels_like
        const pressure = response.data.main.pressure
        const hum = response.data.main.humidity
        const cloudiness = response.data.clouds.all
        const temp_min = response.data.main.temp_min
        const temp_max = response.data.main.temp_max
        const status = response.data.weather[0]      

        nazwaMiasta.textContent = response.data.name
        temperatura.textContent = temp.toFixed(1) + sign
        odczuwalna.textContent = real_temp.toFixed(1) + sign
        cisnienie.textContent = `${pressure} hPa`
        wilgotnosc.textContent = `${hum}%`
        clouds.textContent = `${cloudiness}%`
        min_temp.textContent = temp_min.toFixed(1) + sign
        max_temp.textContent = temp_max.toFixed(1) + sign
        pogoda.textContent = status.description
        zdjecie.src = `img/${status.icon}.png`     
        blad.style.display = 'none'

// Hourly & daily weather

        const URL2 = API_URL2 + lat + '&lon=' + lon + '&exclude=current,minutely' + API_KEY + units + API_LANG

        axios.get(URL2).then(response2 => {
            console.log(response2.data)

            // Hourly
            for (let i = 1; i <= 24; i++){
                document.querySelector('#temp-hour'+i).textContent = response2.data.hourly[i].temp.toFixed(1) + sign
                document.querySelector('#realtemp-hour'+i).textContent = response2.data.hourly[i].feels_like.toFixed(1) + sign
                document.querySelector('#picture-hour'+i).src = `img/${response2.data.hourly[i].weather[0].icon}.png`
                document.querySelector('#time-hour'+i).textContent = timeConverter(response2.data.hourly[i].dt, 1)
            }

            // Daily
            for (let i = 1; i <= 7; i++){
                document.querySelector('#temp-day'+i).textContent = response2.data.daily[i].temp.day.toFixed(1) + sign
                document.querySelector('#realtemp-day'+i).textContent = response2.data.daily[i].feels_like.day.toFixed(1) + sign
                document.querySelector('#picture-day'+i).src = `img/${response2.data.daily[i].weather[0].icon}.png`
                document.querySelector('#time-day'+i).textContent = timeConverter(response2.data.daily[i].dt, 2)
            }
        })
    })
    .catch(error => {
        error => console.error(error)
        input.value = ''
        blad.style.display = 'block'
        pogodaBottom.style.display = pogodaGodziny.style.display = pogodaDni.style.display = 'none'
        blad.textContent = "Błędne miasto!"
    })   
}

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