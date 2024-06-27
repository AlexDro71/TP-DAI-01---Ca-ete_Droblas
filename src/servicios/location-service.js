import LocationRepository from './../../src/repositories/location-repository.js'; 
export default class LocationService{
    getAlllocations = async (page, pageSize) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getAllLocations();
        return{
            collection: returnArray,
            pageSize: pageSize,
            page: page,
            nextPage: `http://localhost/3508/events?limit'${pageSize}'&offset='${offset+=pageSize}'`,
        }
    }
    getlocationById = async (Id) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getlocationById(Id);
        return returnArray;
    }
}