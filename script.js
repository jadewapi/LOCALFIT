"use strict";

const logWorkout = document.querySelector(".logWorkout");
const selectType = document.querySelector(".select");
const durationInput = document.querySelector(".durationInput");
const distanceInput = document.querySelector(".distanceInput");

const elevationGainContainer = document.querySelector(
  ".elevationGainContainer"
);
const cadenceContainer = document.querySelector(".cadenceContainer");
//
const workoutTypeInput = document.querySelectorAll(".workoutTypeInput");
const elevationGainInput = workoutTypeInput[0];
const cadenceInput = workoutTypeInput[1];
//
const workoutsContainer = document.querySelector(".workoutsContainer");

// ----------------------------------------------------------------------------------

elevationGainContainer.style.display = "none";
cadenceInput.setAttribute("required", "");

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

// // Create workout objects (Object Oriented Programming)

class Workout {
  static totalInstances = 0;
  date = new Date();
  id = this.date.getTime() + 1;
  //
  constructor(coordinates, duration, distance) {
    this.coordinates = coordinates;
    this.duration = this.roundTwoDecimalPlaces(duration);
    this.distance = this.roundTwoDecimalPlaces(distance);
    this.item = Workout.totalInstances + 1;
    Workout.totalInstances++;
  }
  roundTwoDecimalPlaces(num) {
    return Number(parseFloat(num).toFixed(2));
  }
}

class Running extends Workout {
  constructor(coordinates, duration, distance, cadence) {
    super(coordinates, duration, distance);
    this.type = "Running";
    this.cadence = this.roundTwoDecimalPlaces(cadence);
    this.calculatePace();
  }
  calculatePace() {
    const pace = this.duration / this.distance;
    return (this.pace = this.roundTwoDecimalPlaces(pace));
  }
  HTML() {
    return `<div class="specificWorkout" data-id="${this.id}">
    <p class="itemNum">#${this.item}<p>
    <article class="displayedSummary">
    <svg class="delete" data-id="${
      this.id
    }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
      <div class="summaryType">${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}</div>
      <div class="summaryDistance">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="3rem"
          viewBox="0 0 576 512"
        >
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            class="ass"
            d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
          />
        </svg>
        <p>${this.distance} <div>Miles</div></p>
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
        <p>${this.duration} <div>Minutes</div></p>
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
        <p>${this.pace} <div>MPH</div></p>
      </div>
      <div class="summaryCadence">
        <svg
          class="svgCadence"
          xmlns="http://www.w3.org/2000/svg"
          height="3.5rem"
          viewBox="0 0 448 512"
        >
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <path
            d="M320 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM125.7 175.5c9.9-9.9 23.4-15.5 37.5-15.5c1.9 0 3.8 .1 5.6 .3L137.6 254c-9.3 28 1.7 58.8 26.8 74.5l86.2 53.9-25.4 88.8c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l28.7-100.4c5.9-20.6-2.6-42.6-20.7-53.9L238 299l30.9-82.4 5.1 12.3C289 264.7 323.9 288 362.7 288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H362.7c-12.9 0-24.6-7.8-29.5-19.7l-6.3-15c-14.6-35.1-44.1-61.9-80.5-73.1l-48.7-15c-11.1-3.4-22.7-5.2-34.4-5.2c-31 0-60.8 12.3-82.7 34.3L57.4 153.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l23.1-23.1zM91.2 352H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h69.6c19 0 36.2-11.2 43.9-28.5L157 361.6l-9.5-6c-17.5-10.9-30.5-26.8-37.9-44.9L91.2 352z"
          />
        </svg>
        <p>${this.cadence} <div>SPM</div></p>
      </div>
    </article>
  </div>`;
  }
  displayText() {
    return `#${this.item}: ${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}`;
  }
}

class Cycling extends Workout {
  constructor(coordinates, duration, distance, elevationGain) {
    super(coordinates, duration, distance);
    this.type = "Cycling";
    this.elevationGain = this.roundTwoDecimalPlaces(elevationGain);
    this.calculateSpeed();
  }
  calculateSpeed() {
    return (this.speed = this.distance / (this.duration / 60));
  }
  calculateSpeed() {
    const speed = this.distance / (this.duration / 60);
    return (this.speed = this.roundTwoDecimalPlaces(speed));
  }
  HTML() {
    return `<div class="specificWorkout" data-id="${this.id}">
    <p class="itemNum">#${this.item}<p>
    <article class="displayedSummary">
    <svg class="delete" data-id="${
      this.id
    }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
      <div class="summaryType">${this.type} on  ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}</div>
      <div class="summaryDistance">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="3rem"
          viewBox="0 0 576 512"
        >
          <path
            d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
          />
        </svg>
        <p>${this.distance} <div>Miles</div></p>
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
        <p>${this.duration} <div>Minutes</div></p>
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
        <p>${this.speed} <div>MPH</div></p>
      </div>
      <div class="summaryElevationGain">
        <svg
          class="svgElevationGain"
          xmlns="http://www.w3.org/2000/svg"
          height="3rem"
          viewBox="0 0 640 512"
        >
          <path
            d="M400 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm27.2 64l-61.8-48.8c-17.3-13.6-41.7-13.8-59.1-.3l-83.1 64.2c-30.7 23.8-28.5 70.8 4.3 91.6L288 305.1V416c0 17.7 14.3 32 32 32s32-14.3 32-32V288c0-10.7-5.3-20.7-14.2-26.6L295 232.9l60.3-48.5L396 217c5.7 4.5 12.7 7 20 7h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H427.2zM56 384a72 72 0 1 1 144 0A72 72 0 1 1 56 384zm200 0A128 128 0 1 0 0 384a128 128 0 1 0 256 0zm184 0a72 72 0 1 1 144 0 72 72 0 1 1 -144 0zm200 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
          />
        </svg>
        <p>${this.elevationGain} <div>Meters</div></p>
      </div>
    </article>
  </div>`;
  }
  displayText() {
    return `#${this.item}: ${this.type} on ${
      months[this.date.getMonth()]
    } ${this.date.getDay()}`;
  }
}

class App {
  // the map div
  #map;
  #mapZoom = 13;
  // a specific coordinate that is an object that is clicked in the map div
  #mapEvent;
  #allWorkouts;
  //
  constructor() {
    this.clickCount = 0;
    this.marker = null;
    this.#allWorkouts = [];
    this._getPosition();
    selectType.addEventListener("change", this._toggleElevationField);
    //
    logWorkout.addEventListener("submit", this._newWorkout.bind(this));
    logWorkout.addEventListener("input", this._checkInputValues);
    // workoutsContainer.addEventListener("click", this._flyToMarker.bind(this));
    workoutsContainer.addEventListener;
  }
  _flyToMarker(e) {
    if (e.target.closest(".delete")) {
    }
    if (e.target.closest(".specificWorkout")) {
      const specificWorkout = e.target.closest(".specificWorkout").dataset.id;
      const specificWorkoutObj = this.#allWorkouts.find(
        (obj) => obj.id === Number(specificWorkout)
      );
      this.#map.flyTo(specificWorkoutObj.coordinates, this.#mapZoom, {
        duration: 1,
        easeLinearity: 2,
      });
    }
  }
  // toggles the options in the select HTML tag to show either elevation(running) or cadence(cycling)
  _toggleElevationField() {
    if (selectType.value === "Cycling") {
      elevationGainContainer.style.display = "";
      elevationGainInput.setAttribute("required", "");
      cadenceInput.removeAttribute("required");
      cadenceContainer.style.display = "none";
    } else if (selectType.value === "Running") {
      cadenceContainer.style.display = "";
      cadenceInput.setAttribute("required", "");
      elevationGainInput.removeAttribute("required");
      elevationGainContainer.style.display = "none";
    }
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
  //  produces the map and adds the user's location
  _loadMap(position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    //
    this.#map = L.map("map").setView(coordinates, this.#mapZoom);
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
    durationInput.focus();
    this.#mapEvent = mapEvent;
    const { lat } = this.#mapEvent.latlng;
    const { lng } = this.#mapEvent.latlng;
    this.clickCount++;
    if (this.clickCount % 2 === 1) {
      this.marker = L.marker([lat, lng]).addTo(this.#map).openPopup();
    } else if (this.clickCount % 2 === 0) {
      if (this.marker) {
        this.#map.removeLayer(this.marker);
        this.marker = null;
      }
    }
    logWorkout.classList.toggle("hidden");
  }
  _checkInputValues(event) {
    if (event.target.tagName === "INPUT") {
      const inputValue = event.target.value;
      const sanitizedValue = inputValue.replace(/[^0-9.]/g, "");
      event.target.value = sanitizedValue;
    }
  }
  // adds a new workout based on the options selected in the select HTML tag.
  _newWorkout(e) {
    durationInput.focus();
    e.preventDefault();
    let workout;
    const { lat } = this.#mapEvent.latlng;
    const { lng } = this.#mapEvent.latlng;
    //
    if (
      !isNaN(durationInput.value) &&
      !isNaN(distanceInput.value) &&
      !isNaN(this._determineWorkOutInput(selectType.value))
    ) {
      workout = this._instantiateWorkoutType(
        selectType.value,
        durationInput.value,
        distanceInput.value,
        this._determineWorkOutInput(selectType.value),
        lat,
        lng
      );
    } else {
      alert("Please enter a valid number.");
      this._clearInputValues();
    }
    //
    this.#allWorkouts.push(workout);
    this._addOnHTMLWorkouts(workout.HTML());
    this._addMarker(workout);
    this._clearInputValues();
    console.log(workout);
    console.log(this.#allWorkouts);
    //
  }
  _determineWorkOutInput(type) {
    if (type === "Running") {
      return Number(parseFloat(cadenceInput.value).toFixed(2));
    } else if (type === "Cycling") {
      return Number(parseFloat(elevationGainInput.value).toFixed(2));
    }
  }
  // //create an instance of either running of cycling
  _instantiateWorkoutType(type, duration, distance, workoutType, lat, lng) {
    if (type === "Running") {
      return new Running(
        [lat, lng],
        Number(duration),
        Number(distance),
        Number(workoutType)
      );
    } else if (type === "Cycling") {
      return new Cycling(
        [lat, lng],
        Number(duration),
        Number(distance),
        Number(workoutType)
      );
    }
  }
  // //clears the value attribute of the inout tags
  _clearInputValues() {
    durationInput.value =
      distanceInput.value =
      elevationGainInput.value =
      cadenceInput.value =
        "";
    cadenceInput.blur();
    elevationGainInput.blur();
    // logWorkout.classList.toggle("hidden");
    // this.clickCount++;
  }
  _addOnHTMLWorkouts(html) {
    workoutsContainer.insertAdjacentHTML("afterbegin", html);
  }
  _addMarker(workout) {
    L.marker(workout.coordinates)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}`,
        })
      )
      .setPopupContent(workout.displayText())
      .openPopup();
  }
}

const app = new App();
