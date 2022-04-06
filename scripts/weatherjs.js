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


const wilgotnosc = document.querySelector('.wilgotnosc')
const temperatura = document.querySelector('.temperatura')
const pogoda = document.querySelector('.pogoda')
const zdjecie = document.querySelector('.picture')
const blad = document.querySelector('.error')
const button = document.querySelector('.check')
const input = document.querySelector('.city')
const select = document.querySelector('#jednostki')
const nazwaMiasta = document.querySelector('.miasto-nazwa')

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?q='
const API_KEY = '&appid=c58789670bdbb47b3015c68589ed18e3'
const API_UNITS_METRIC = '&units=metric'
const API_UNITS_IMPERIAL = '&units=imperial'

const sprawdzPogode = () => {
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
    const URL = API_URL + city + API_KEY + units

    axios.get(URL).then(response => {
        console.log(response.data)
        const temp = response.data.main.temp
        const hum = response.data.main.humidity
        const status = response.data.weather[0]

        nazwaMiasta.textContent = response.data.name
        temperatura.textContent = Math.round(temp) + sign
        wilgotnosc.textContent = `${hum}%`
        pogoda.textContent = status.main
        zdjecie.src = `img/${status.icon}.png`
        blad.style.display = 'none'
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