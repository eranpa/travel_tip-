export const mapService = {
  initMap,
  addMarker,
  panTo,
  mapClick,
};

var gMap;

function initMap(lat = 32.0749831, lng = 34.9120554) {
  console.log("InitMap");
  return _connectGoogleApi().then(() => {
    console.log("google available");
    gMap = new google.maps.Map(document.querySelector("#map"), {
      center: { lat, lng },
      zoom: 15,
    });
    console.log("Map!", gMap);

    gMap.addListener("click", (mapsMouseEvent) => {
      let { lat, lng } = mapsMouseEvent.latLng;
      mapClick(mapsMouseEvent.latLng)
      // console.log(lat(), lng());
      panTo(lat(), lng())

   
    });
  });
}

function addMarker(loc) {
  var marker = new google.maps.Marker({
    position: loc,
    map: gMap,
    title: "Hello World!",
  });
  return marker;
}

function panTo(lat, lng) {
  var laLatLng = new google.maps.LatLng(lat, lng);
  gMap.panTo(laLatLng);
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve();
  const API_KEY = "AIzaSyDAow59MaV5ebb7HEU2fL7bbYBSeT9jDeM";
  var elGoogleApi = document.createElement("script");
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  elGoogleApi.async = true;
  document.body.append(elGoogleApi);

  return new Promise((resolve, reject) => {
    elGoogleApi.onload = resolve;
    elGoogleApi.onerror = () => reject("Google script failed to load");
  });
}


function mapClick (evLoc){ 
  let { lat, lng } = evLoc;
  panTo(lat(), lng()) 
  let marker = addMarker({lat:lat(),lng: lng()})
  console.log(marker)
  let contentString = `<form onsubmit="OnNameSubmit(event,${lat()},${lng()})">
  <input type="text" name="name" placeholder="Enter locations name">
  <button>submit</button>
</form>`

  const infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
 
 
  marker.addListener("click", () => {
    infowindow.open({
      anchor: marker,
      map: gMap,
      shouldFocus: false,
    });
  });
}

