"use strict"


navigator.geolocation.getCurrentPosition(
    function(position) {
        const {latitude} = position.coords
        const {longitude} = position.coords
    }, function() {
        console.log("none")
    }
);