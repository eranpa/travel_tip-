
import {utilService} from "/js/services/util.service.js";

export const locService = {
<<<<<<< HEAD
  getLocs,
};
=======
    getLocs,
    createLocation,
    updateLocs,
}

>>>>>>> 23056c51475d15b12a016f2c812d7a26addf4c35



const locs = [
<<<<<<< HEAD
  { name: "Greatplace", lat: 32.047104, lng: 34.832384 },
  { name: "Neveragain", lat: 32.047201, lng: 34.832581 },
  // id: getId(),
  // name: onNameSubmint(),
  // lat: lat,
  // lng: lng,
  // createdAt,
  // updatedAt,
];
=======
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]
>>>>>>> 23056c51475d15b12a016f2c812d7a26addf4c35

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs);
    }, 2000);
  });
}
<<<<<<< HEAD
=======

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


// function makeId(length = 2) {
//     var txt = '' 
//     var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//     for (var i = 0; i < length; i++) {
//         txt += possible.charAt(Math.floor(Math.random() * possible.length))
//     }
//     return txt
// } 


function updateLocs(location){
    console.log('updating locs', location);
    locs.push(location)
}
>>>>>>> 23056c51475d15b12a016f2c812d7a26addf4c35
