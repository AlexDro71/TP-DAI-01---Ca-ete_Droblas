import EventLocationRepository from './../../src/repositories/event-loaction-repository'; 
export default class EventlocationService{
    getAllEventlocations = async () =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAllEventlocations();
        return returnArray;
    }
    getEventLocationById = async (Id) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getEventLocationById(Id);
        return returnArray;
    }
    getAllEventLocationXLocationById = async(id) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAllEventLocationXLocationById(id);
        return returnArray
    }

}