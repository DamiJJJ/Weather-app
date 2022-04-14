const scrollContainer1 = document.querySelector('#pogoda-godziny')
const scrollContainer2 = document.querySelector('#pogoda-dni')

function timeConverter(UNIX_timestamp, option){
  var a = new Date(UNIX_timestamp * 1000)
  var months = ['01','02','03','04','05','06','07','08','09','10','11','12']
  var year = a.getFullYear()
  var month = months[a.getMonth()]
  var date = a.getDate()
  var hour = a.getHours()
  var min = a.getMinutes()

  if (option == 1){
    var time = hour + ':' + (min < 10 ? '0' : '') + min
  }
  else {
    var time = date + '.' + month + '.' + year
  }
  return time
}

scrollContainer1.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer1.scrollLeft += evt.deltaY
});

scrollContainer2.addEventListener("wheel", (evt) => {
  evt.preventDefault()
  scrollContainer2.scrollLeft += evt.deltaY
  });

function drawWeather(){
  for (let i = 1; i <= 24; i++){
    var tag = document.createElement('p')
    tag.innerHTML = '<img src="" alt="" class="picture-hour" id="picture-hour' + i + '"><span id="temp-hour' + i + '" class="weather-display"></span> / <span id="realtemp-hour' + i + '" class="weather-display"></span><span id="time-hour' + i + '" class="time-display"></span>'
    scrollContainer1.appendChild(tag)
  }
  
  for (let i = 1; i <= 7; i++){
    var tag = document.createElement('p')
    tag.innerHTML = '<img src="" alt="" class="picture-day" id="picture-day' + i + '"><span id="temp-day' + i + '" class="weather-display"></span> / <span id="realtemp-day' + i + '" class="weather-display"></span><span id="time-day' + i + '" class="time-display"></span>'
    scrollContainer2.appendChild(tag)
  }
}
