const scrollContainer1 = document.querySelector('#pogoda-godziny')
const scrollContainer2 = document.querySelector('#pogoda-dni')

scrollContainer1.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer1.scrollLeft += evt.deltaY
});

scrollContainer2.addEventListener("wheel", (evt) => {
  evt.preventDefault()
  scrollContainer2.scrollLeft += evt.deltaY
  });

for (let i = 0; i < 24; i++){
  var tag = document.createElement('p')
  tag.innerHTML = '<img src="" alt="" class="picture-hour' + i + '"><span id="temp-hour' + i + '" class="weather-display"></span>/<span id="realtemp-hour' + i + '" class="weather-display"></span>'
  scrollContainer1.appendChild(tag)
}

for (let i = 0; i < 7; i++){
  var tag = document.createElement('p')
  tag.innerHTML = '<img src="" alt="" class="picture-day' + i + '"><span id="temp-day' + i + '" class="weather-display"></span>/<span id="realtemp-day' + i + '" class="weather-display"></span>'
  scrollContainer2.appendChild(tag)
}