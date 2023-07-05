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

// Create workout objects (Object Oriented Programming)

class Workout {
  date = new Date();
  id = this.date.getTime() + 1;
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
  HTML() {
    return `<article class="displayedSummary">
    <div class="summaryType">${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}</div>
    <div class="summaryDistance">
      <svg
        class="svgDistance"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 416 512"
      >
        <style>
          svg {
            fill: #23508b;
          }
        </style>
        <path
          d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
        />
      </svg>
      <p>${this.distance} M</p>
    </div>
    <div class="summaryDuration">
      <svg
        class="svgDuration"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 512 512"
      >
        <style>
          svg {
            fill: #23508b;
          }
        </style>
        <path
          d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
        />
      </svg>
      <p>${this.duration} Min</p>
    </div>
    <div class="summaryCadence">
      <svg
        class="svgCadence"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 640 512"
      >
        <style>
          svg {
            fill: #23508b;
          }
        </style>
        <path
          d="M416 0C352.3 0 256 32 256 32V160c48 0 76 16 104 32s56 32 104 32c56.4 0 176-16 176-96S512 0 416 0zM128 96c0 35.3 28.7 64 64 64h32V32H192c-35.3 0-64 28.7-64 64zM288 512c96 0 224-48 224-128s-119.6-96-176-96c-48 0-76 16-104 32s-56 32-104 32V480s96.3 32 160 32zM0 416c0 35.3 28.7 64 64 64H96V352H64c-35.3 0-64 28.7-64 64z"
        />
      </svg>
      <p>${this.cadence} SPM</p>
    </div>
  </article>`;
  }
  displayText() {
    return `${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}`;
  }
}

class Cycling extends Workout {
  constructor(coordinates, duration, distance, elevationGain) {
    super(coordinates, duration, distance);
    this.type = "Cycling";
    this.elevationGain = elevationGain;
    this.calculateSpeed();
  }
  calculateSpeed() {
    return (this.speed = this.distance / (this.duration / 60));
  }
  HTML() {
    return `<article class="displayedSummary">
    <div class="summaryType">
      ${this.type} on ${months[this.date.getMonth()]} ${this.date.getDay()}
    </div>
    <div class="summaryDistance">
      <svg
        class="svgDistance"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 416 512"
      >
        <style>
          svg {
            fill: #23508b;
          }
        </style>
        <path
          d="M272 96c26.51 0 48-21.49 48-48S298.51 0 272 0s-48 21.49-48 48 21.49 48 48 48zM113.69 317.47l-14.8 34.52H32c-17.67 0-32 14.33-32 32s14.33 32 32 32h77.45c19.25 0 36.58-11.44 44.11-29.09l8.79-20.52-10.67-6.3c-17.32-10.23-30.06-25.37-37.99-42.61zM384 223.99h-44.03l-26.06-53.25c-12.5-25.55-35.45-44.23-61.78-50.94l-71.08-21.14c-28.3-6.8-57.77-.55-80.84 17.14l-39.67 30.41c-14.03 10.75-16.69 30.83-5.92 44.86s30.84 16.66 44.86 5.92l39.69-30.41c7.67-5.89 17.44-8 25.27-6.14l14.7 4.37-37.46 87.39c-12.62 29.48-1.31 64.01 26.3 80.31l84.98 50.17-27.47 87.73c-5.28 16.86 4.11 34.81 20.97 40.09 3.19 1 6.41 1.48 9.58 1.48 13.61 0 26.23-8.77 30.52-22.45l31.64-101.06c5.91-20.77-2.89-43.08-21.64-54.39l-61.24-36.14 31.31-78.28 20.27 41.43c8 16.34 24.92 26.89 43.11 26.89H384c17.67 0 32-14.33 32-32s-14.33-31.99-32-31.99z"
        />
      </svg>
      <p>${this.distance} M</p>
    </div>
    <div class="summaryDuration">
      <svg
        class="svgDuration"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 512 512"
      >
        <style>
          svg {
            fill: #23508b;
          }
        </style>
        <path
          d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
        />
      </svg>
      <p>${this.duration} Min</p>
    </div>
    <div class="summarySpeed">
      <svg
        class="svgSpeed"
        xmlns="http://www.w3.org/2000/svg"
        height="3rem"
        viewBox="0 0 576 512"
      >
        <path
          d="M288 32C128.94 32 0 160.94 0 320c0 52.8 14.25 102.26 39.06 144.8 5.61 9.62 16.3 15.2 27.44 15.2h443c11.14 0 21.83-5.58 27.44-15.2C561.75 422.26 576 372.8 576 320c0-159.06-128.94-288-288-288zm0 64c14.71 0 26.58 10.13 30.32 23.65-1.11 2.26-2.64 4.23-3.45 6.67l-9.22 27.67c-5.13 3.49-10.97 6.01-17.64 6.01-17.67 0-32-14.33-32-32S270.33 96 288 96zM96 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm48-160c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32zm246.77-72.41l-61.33 184C343.13 347.33 352 364.54 352 384c0 11.72-3.38 22.55-8.88 32H232.88c-5.5-9.45-8.88-20.28-8.88-32 0-33.94 26.5-61.43 59.9-63.59l61.34-184.01c4.17-12.56 17.73-19.45 30.36-15.17 12.57 4.19 19.35 17.79 15.17 30.36zm14.66 57.2l15.52-46.55c3.47-1.29 7.13-2.23 11.05-2.23 17.67 0 32 14.33 32 32s-14.33 32-32 32c-11.38-.01-20.89-6.28-26.57-15.22zM480 384c-17.67 0-32-14.33-32-32s14.33-32 32-32 32 14.33 32 32-14.33 32-32 32z"
        />
      </svg>
      <p>${this.speed} MPH</p>
    </div>
    </article>`;
  }
  displayText() {
    return `${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}`;
  }
}

//

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
      let sanitizedValue = currentValue.replace(/[^0-9]/g, "");
      sanitizedValue = Math.min(parseInt(sanitizedValue, 10), 99);
      target.value = sanitizedValue;
    }
  }
  // adds a new workout based on the options selected in the select HTML tag.
  _newWorkout(e) {
    e.preventDefault();
    //
    let workout;
    const { lat } = this.#mapEvent.latlng;
    const { lng } = this.#mapEvent.latlng;
    //
    if (selectType.value === "Running") {
      workout = new Running(
        [lat, lng],
        Number(durationInput.value),
        Number(distanceInput.value),
        Number(cadenceInput.value)
      );
    } else if (selectType.value === "Cycling") {
      workout = new Cycling(
        [lat, lng],
        Number(durationInput.value),
        Number(distanceInput.value),
        Number(elevationGainInput.value)
      );
    }
    this.#allWorkouts.push(workout);
    console.log(this.#allWorkouts);
    //
    this._clearInputValues();
  }
  _clearInputValues() {
    durationInput.value =
      distanceInput.value =
      elevationGainInput.value =
      cadenceInput.value =
        "";
  }
}

const app = new App();
