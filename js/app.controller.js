import { locService } from "./services/loc.service.js";
import { mapService } from "./services/map.service.js";
import { utilService } from "./services/util.service.js";

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.OnNameSubmit = OnNameSubmit;
window.onDelete = onDelete;
window.onGo = onGo;
window.onPanToUserPos = onPanToUserPos;
window.onSearch = onSearch;

// window.updateLocs = updateLocs;


function onInit() {
  mapService
    .initMap()
    .then(() => {
      console.log("Map is ready");
    })
    .catch(() => console.log("Error: cannot init map"));
    onGetLocs()
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
      return `<tr><td>${location.name}</td>
        <td>${location.lat}</td>
        <td>${location.lng}</td>
        <td>${location.id}</td>
        <td>${location.createdAt}</td>
        <td>${location.updatedAt}</td>
        <td><button id = "", " onClick = "onGo(${location.lat}, ${location.lng})">go</button>
        <button id = "", " onClick = "onDelete('${location.id}')">delete</button>
 
       
        </tr>`
    });
  
    document.querySelector(".locs").innerHTML += strHTML.join("") + '</tr>';
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

function OnNameSubmit(ev, lat, lng){
  if (ev) ev.preventDefault();
  const elInputName = document.querySelector('input[name=name]');

  let location = locService.createLocation(elInputName.value, lat, lng)
  locService.updateLocs(location)
 
}


function onGo (lat, lng) { 

  mapService.panTo(lat, lng)
  console.log("going")
}

function onDelete(ID) {
  
  let location = locService.getLocById(ID)
  console.log(location)
}

function onPanToUserPos() { 
  getPosition().then((pos) =>
  
  mapService.panTo(pos.coords.latitude, pos.coords.longitude))
  
}


function onSearch(ev) {
  const API_KEY = 'AIzaSyDAow59MaV5ebb7HEU2fL7bbYBSeT9jDeM'
  if (ev) ev.preventDefault();
  const elInputSearch = document.querySelector('input[name=search]')
  console.log(elInputSearch.value)
  return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${elInputSearch.value}&key=${API_KEY}`)
  .then(res => {
    let {lat, lng} = res.data.results[0].geometry.location
    let location = locService.createLocation(elInputSearch.value, lat, lng)
    mapService.panTo(lat, lng)
    locService.updateLocs(location)
  })
}

//     console.log(res.data.results[0].geometry.location))

// }