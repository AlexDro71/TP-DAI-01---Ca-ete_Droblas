import EventRepository from './../../src/repositories/events-repository';  

export default class EventsService{
    getAllEvents = async () =>{
        const repo = new EventRepository();
        const returnArray = await repo.getAllEvents();
        return returnArray;
    }
    BusquedaEvento = async (name, category, startDate, tag) =>{
        const repo = new EventRepository();
        const returnArray = await repo. BusquedaEvento(name, category, startDate, tag);
        return returnArray;
    }
    DetalleEvento = async (id) =>{
        const repo = new EventRepository();
        const returnArray = await repo.DetalleEvento(id);
        return returnArray;
    }
    listaUsuarios = async (id, first, last, username, attended, rating) =>{
        const repo = new EventRepository();
        const returnArray = await repo.listaUsuarios(id, first, last, username, attended, rating);
        return returnArray;
    }
    crearEvent = async(eventData) =>{
        const repo = new EventRepository();
        const returnArray = await repo.crearEvent(eventData);
        return returnArray;
    }
    getEventById = async (eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.getEventById(eventId);
        return returnArray;
    }
    putEvent = async(eventId, eventData) =>{
        const repo = new EventRepository();
        const returnArray = await repo.putEvent(eventId, eventData);
        return returnArray;
    }
    borrarEvent = async(eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.borrarEvent(eventId);
        return returnArray;
    }
    

}