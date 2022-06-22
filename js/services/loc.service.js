
import {utilService} from "/js/services/util.service.js";

export const locService = {
    getLocs,
    createLocation,
    updateLocs,
}




const locs = [
  { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
  { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
];

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}

function createLocation(name, lat, lng) {
    return {
        id: utilService.makeId(4),
        name,
        lat,
        lng,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    }
}





function updateLocs(location){
    console.log('updating locs', location);
    locs.push(location)
}
