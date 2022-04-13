const scrollContainer1 = document.querySelector('#pogoda-godziny');
const scrollContainer2 = document.querySelector('#pogoda-dni');

scrollContainer1.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer1.scrollLeft += evt.deltaY;
});

scrollContainer2.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer2.scrollLeft += evt.deltaY;
  });