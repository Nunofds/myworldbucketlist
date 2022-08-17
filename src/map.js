import { data } from "./data";

// ********** variables **********
let map;
const resetMapPosButton = document.querySelector("#resetMap");

// ********** functions **********

// all listeners events that's interact with the map
function addMapListeners() {
    resetMapPosButton.addEventListener("click", () => {
        const centerMap = { lat: 39.16841723922716, lng: 35.63266971229362 };
        zoomOn(centerMap, 3, "roadmap");
    });
}

// changes zoom, position and type of view on map
function zoomOn(position, zoom, typeOfView) {
    map.setCenter(position);
    map.setZoom(zoom);
    map.setMapTypeId(typeOfView);
}

// The markers, positioned at locations
function addMarker(dream) {
    const marker = new google.maps.Marker({
        position: dream.coords,
        map: map,
        icon: dream.done
            ? "/img/marker_maps_gray-48.png"
            : "/img/marker_maps_red-64.png",
        title: dream.iconTitle,
    });

    // event 'click' calls setZoomOn function
    marker.addListener("click", () => {
        const position = marker.getPosition();
        zoomOn(position, 20, "satellite");
    });
}

// Initialize and add the map
function initMap() {
    // The locations
    const centerMap = { lat: 39.16841723922716, lng: 35.63266971229362 };
    // The map, centered at Paris
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: centerMap,
    });

    addMapListeners();
}

export { initMap, addMarker, zoomOn };
