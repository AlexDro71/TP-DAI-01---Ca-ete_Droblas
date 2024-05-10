import LocationRepository from './../../src/repositories/loaction-repository'; 
export default class LocationRepository{
    getAlllocations = async () =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAlllocations();
        return returnArray;
    }
    getlocationById = async (Id) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getlocationById(Id);
        return returnArray;
    }
}