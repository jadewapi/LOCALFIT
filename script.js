"use strict";

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    const map = L.map("map").setView(coordinates, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png", {
      attribution:
        'CycloSM &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
    //
    L.marker(coordinates)
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.").openPo;
    pup();
  },
  function () {}
);
