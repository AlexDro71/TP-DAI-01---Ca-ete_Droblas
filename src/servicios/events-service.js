import EventRepository from './../../repositories/events-repository.js';  

export default class EventsService{
    getAllSync = async () =>{
        const repo = new EventsService();
        const returnArray = await repo.getAllSync();
        return returnArray;
    }

}