// obiekty

// const dog = {
//     name : 'Max',
//     age : 5,
//     'eye color' : 'black'
// }

// console.log(dog);
// console.log(typeof(dog));


// JSON

// {
//     "lokalizacja" : "Polska",
//     "stolica" : "Warszawa",
//     "populacja" : 32000000
// }

const pogoda_bottom = document.querySelector('.pogoda-bottom')
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
const select = document.querySelector('#jednostki')
const nazwaMiasta = document.querySelector('.miasto-nazwa')

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_URL2 = 'https://api.openweathermap.org/data/2.5/onecall?lat='
const API_KEY = '&appid=c58789670bdbb47b3015c68589ed18e3'
const API_UNITS_METRIC = '&units=metric'
const API_UNITS_IMPERIAL = '&units=imperial'
const API_LANG = '&lang=pl'

const sprawdzPogode = () => {
    pogoda_bottom.style.display = 'block'
    const city = input.value || 'Barcelona'
    const jednostki = select.value
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

        const URL2 = API_URL2 + lat + '&lon=' + lon + '&exclude=current,minutely' + API_KEY + units + API_LANG
        axios.get(URL2).then(response2 => {
            console.log(response2.data)
        })
    })
    .catch(error => {
        error => console.error(error)
        input.value = ''
        blad.style.display = 'block'
        blad.textContent = "Błędne miasto!"
    })   
}


button.addEventListener('click', sprawdzPogode)
input.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
      event.preventDefault()
      button.click()
    }
  });