"use strict";

const logWorkout = document.querySelector(".logWorkout");
const selectType = document.querySelector(".select");
const elevationGainContainer = document.querySelector(
  ".elevationGainContainer"
);
const cadenceContainer = document.querySelector(".cadenceContainer");
//
const durationInput = document.querySelector(".durationInput");
const distanceInput = document.querySelector(".distanceInput");
const elevationGainInput = document.querySelector(".elevationGainInput");
const cadenceInput = document.querySelector(".cadenceInput");

cadenceContainer.style.display = "none";
elevationGainInput.setAttribute("required", "");

class App {
  constructor() {}
  _getPosition() {}
  _loadMap() {}
  _showForm() {}
  _toggleElevationField() {}
  _newWorkout() {}
}

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    //
    const map = L.map("map").setView(coordinates, 13);
    //
    L.tileLayer("https://{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
      attribution:
        'CycloSM &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    //
    //
    map.on("click", function (e) {
      console.log(e);
      const { lat } = e.latlng;
      const { lng } = e.latlng;
      const clickCoordinates = [lat, lng];
      logWorkout.classList.toggle("hidden");
      //
      L.marker(clickCoordinates)
        .addTo(map)
        .bindPopup(
          L.popup({
            minWidth: 200,
            maxWidth: 70,
            autoClose: false,
            closeOnClick: false,
          })
        )
        .setPopupContent('<p class="booty">This is some good shit</p>')
        .openPopup();
    });
  },
  function () {
    alert("Please allow location");
  }
);

selectType.addEventListener("change", function () {
  const selectedOption = selectType.value;
  //
  if (selectedOption === "Running") {
    elevationGainContainer.style.display = "";
    elevationGainInput.setAttribute("required", "");
    cadenceInput.removeAttribute("required");
    cadenceContainer.style.display = "none";
  } else if (selectedOption === "Cycling") {
    cadenceContainer.style.display = "";
    cadenceInput.setAttribute("required", "");
    elevationGainInput.removeAttribute("required");
    elevationGainContainer.style.display = "none";
  }
});
//
logWorkout.addEventListener("input", function (e) {
  const target = e.target;
  if (target.tagName === "INPUT") {
    const currentValue = target.value;
    const sanitizedValue = currentValue.replace(/[^0-9]/g, "");
    target.value = sanitizedValue;
  }
});
//
logWorkout.addEventListener("submit", function (e) {
  e.preventDefault();
  durationInput.value =
    distanceInput.value =
    elevationGainInput.value =
    cadenceInput.value =
      "";
});
