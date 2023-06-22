"use strict";

navigator.geolocation.getCurrentPosition(
  function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    const coordinates = [latitude, longitude];
    console.log(coordinates);
    const map = L.map("map").setView(coordinates, 15);

    L.tileLayer(
      "https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png",
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }
    ).addTo(map);

    L.marker(coordinates)
      .addTo(map)
      .bindPopup("A pretty CSS popup.<br> Easily customizable.")
      .openPopup();

    map.on("click", function (mapEvent) {
      const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
          }).openPopup()
        );
    });
  },
  function () {
    console.log("none");
  }
);
