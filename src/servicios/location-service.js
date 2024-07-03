import LocationRepository from './../../src/repositories/location-repository.js'; 
export default class LocationService{
    getAlllocations = async (page, pageSize) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getAllLocations(page, pageSize);
        return{
            collection: returnArray,
            pageSize: pageSize,
            page: page,
            nextPage: `http://localhost:3508/api/location/?limit=${parseInt(page)}&offset=${parseInt(page) + pageSize}`,
        }
    }
    getlocationById = async (Id) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getlocationById(Id);
        return returnArray;
    }
}