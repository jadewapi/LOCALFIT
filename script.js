"use strict";

navigator.geolocation.getCurrentPosition(
  function (position) {
    console.log(position);
    const map = L.map("map").setView([51.505, -0.09], 13);
    //
    L.tileLayer("https://tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
      attribution:
        'CycloSM &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
    //
    //
    //
    L.marker([51.5, -0.09])
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();
  },
  function () {
    console.log("Please enable location.");
  }
);
