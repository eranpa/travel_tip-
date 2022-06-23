
import { utilService } from "/js/services/util.service.js";
import { storageService } from "/js/services/storage-service.js";

export const locService = {
    getLocs,
    createLocation,
    updateLocs,
    getLocById,
}

const STORAGE_KEY = 'locationDB'


const gLocs = storageService.loadFromStorage(STORAGE_KEY) || []


function getLocs() {
    let locs = gLocs
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


    function getLocById(locId) { 
        
       console.log(gLocs.findIndex((location) => locId === gLocs.id))
    }
    




function updateLocs(location) {
    console.log('updating locs', location);
    gLocs.push(location)
    storageService.saveToStorage(STORAGE_KEY, gLocs)
    onGetLocs()

}

