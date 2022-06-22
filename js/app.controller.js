import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
    })
    .catch(() => console.log("Error: cannot init map"));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log("Getting Pos");
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

function onAddMarker() {
  console.log("Adding a marker");
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
}

function onGetLocs() {
  locService.getLocs().then((locs) => {
    let strHTML = locs.map((location) => {
      return `<tr>
      <th>Name</th>
      <th>Lat</th>
      <th>Lng</th>
        <th>Id</th>
        <th>CreatedAt</th>
        <th>UpdatedAt</th>
        </tr>
        <tr>
        <td>${location.name}</td>
        <td>${location.lat}</td>
        <td>${location.lng}</td>
        <td>${location.id}</td>
        <td>${location.createdAt}</td>
        <td>${location.updatedAt}</td>
        </tr>`;
    });
    console.log(strHTML);
    document.querySelector(".locs").innerHTML = strHTML.join("");
  });
}

function onGetUserPos() {
  getPosition()
    .then((pos) => {
      console.log("User position is:", pos.coords);
      document.querySelector(
        ".user-pos"
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`;
    })
    .catch((err) => {
      console.log("err!!!", err);
    });
}
function onPanTo() {
  console.log("Panning the Map");
  mapService.panTo(35.6895, 139.6917);
}
