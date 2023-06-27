"use strict";
const logWorkout = document.querySelector(".logWorkout");
const durationInput = document.querySelector(".durationInput");
const distanceInput = document.querySelector(".distanceInput");
const elevationGainInput = document.querySelector(".elevationGainInput");
const cadenceInput = document.querySelector(".cadenceInput");
const displayedSummary = document.querySelector(".displayedSummary");
const specificWorkout = document.querySelectorAll(".specificWorkout");

let map, mapEvent;

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    console.log(coordinates);
    map = L.map("map").setView(coordinates, 11);
    L.tileLayer(
      "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    map.on("click", function (mapE) {
      mapEvent = mapE;
      distanceInput.focus();
      logWorkout.style.display = "";
    });
  },
  function () {
    console.log("none");
  }
);

logWorkout.addEventListener("submit", function (e) {
  console.log("yeeet");
  e.preventDefault();

  durationInput.value =
    distanceInput.value =
    elevationGainInput.value =
    cadenceInput.value =
      "";

  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});
