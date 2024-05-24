import LocationRepository from './../../src/repositories/location-repository.js'; 
export default class LocationService{
    getAlllocations = async () =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getAlllocations();
        return returnArray;
    }
    getlocationById = async (Id) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getlocationById(Id);
        return returnArray;
    }
}