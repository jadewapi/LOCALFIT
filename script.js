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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "November",
  "December",
];

class Workout {
  date = new Date();
  id = (new Date() + "").slice(-10);
  //
  constructor(coordinates, duration, distance) {
    this.coordinates = coordinates;
    this.duration = duration;
    this.distance = distance;
  }
}

class Running extends Workout {
  constructor(coordinates, duration, distance, cadence) {
    super(coordinates, duration, distance);
    this.type = "Running";
    this.cadence = cadence;
    this.calculatePace();
  }
  calculatePace() {
    return (this.pace = this.duration / this.distance);
  }
  displayHTML() {
    return ``;
  }
}

class Cycling extends Workout {
  constructor(coordinates, duration, distance, elevationGain) {
    super(type, duration, distance);
    this.type = "Cycling";
    this.elevationGain = elevationGain;
    this.calculateSpeed();
  }
  calculateSpeed() {
    return (this.speed = this.distance / (this.duration / 60));
  }
}

class App {
  // the map div
  #map;
  // a specific coordinate that is an object that is clicked in the map div
  #mapEvent;
  #inputValues;
  #allWorkouts;
  //
  constructor() {
    this.#allWorkouts = [];
    this._getPosition();
    selectType.addEventListener(
      "change",
      this._toggleElevationField.bind(this)
    );
    //
    logWorkout.addEventListener("input", this._checkInputForNumbers.bind(this));
    //
    logWorkout.addEventListener("submit", this._newWorkout.bind(this));
  }
  // uses geolocation APU to get position object.
  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadMap.bind(this),
      function () {
        alert("Please allow location");
      }
    );
  }
  // produces the map and adds the user's location
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    //
    this.#map = L.map("map").setView(coordinates, 13);
    //
    L.tileLayer("https://{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
      attribution:
        'CycloSM &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);
    //
    //
    this.#map.on("click", this._showForm.bind(this));
  }
  // shows form for each odd number amount of clicks.
  _showForm(mapEvent) {
    this.#mapEvent = mapEvent;
    console.log(this.#mapEvent);
    const { lat } = this.#mapEvent.latlng;
    const { lng } = this.#mapEvent.latlng;
    logWorkout.classList.toggle("hidden");
  }
  // toggles the options in the select HTML tag to show either elevation(running) or cadence(cycling)
  _toggleElevationField() {
    //
    if (selectType.value === "Running") {
      elevationGainContainer.style.display = "";
      elevationGainInput.setAttribute("required", "");
      cadenceInput.removeAttribute("required");
      cadenceContainer.style.display = "none";
    } else if (selectType.value === "Cycling") {
      cadenceContainer.style.display = "";
      cadenceInput.setAttribute("required", "");
      elevationGainInput.removeAttribute("required");
      elevationGainContainer.style.display = "none";
    }
  }
  // validates form input by restricting to only numbers
  _checkInputForNumbers(inputValues) {
    this.#inputValues = inputValues;
    const target = this.#inputValues.target;
    if (target.tagName === "INPUT") {
      const currentValue = target.value;
      const sanitizedValue = currentValue.replace(/[^0-9]/g, "");
      target.value = sanitizedValue;
    }
  }
  // adds a new workout based on the options selected in the select HTML tag.
  _newWorkout(e) {
    e.preventDefault();
    //
    let workout;
    if (selectType.value === "Running") {
      workout = new Running(
        Number(durationInput.value),
        Number(distanceInput.value),
        Number(elevationGainInput.value)
      );
    } else if (selectType.value === "Cycling") {
      workout = new Running(
        Number(durationInput.value),
        Number(distanceInput.value),
        Number(cadenceInput.value)
      );
    }
    console.log(workout);
    //
    durationInput.value =
      distanceInput.value =
      elevationGainInput.value =
      cadenceInput.value =
        "";
  }
}

const app = new App();
