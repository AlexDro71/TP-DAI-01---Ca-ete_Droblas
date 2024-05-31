import EventRepository from './../../src/repositories/events-repository.js';  

export default class EventsService{

    BusquedaEvento = async (name, category, startDate, tag, page, pageSize) =>{
    const repo = new EventRepository();
    const returnArray = await repo.BusquedaEvento(name, category, startDate, tag, page, pageSize);
    return {
        collection: returnArray,
        pageSize: pageSize,
        page: page,
        nextPage: `http://localhost/3508/events?limit=${parseInt(pageSize)}&offset=${parseInt(page) + pageSize}`,
    };
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
    registerUser = async(eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.registerUser(id_event, id_user);
        return returnArray;
    }
    unregisterUser = async(eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.unregisterUser(id_event, id_user);
        return returnArray;
    }
    ratingEvento = async(id_event, rating) =>{
        const repo = new EventRepository();
        const returnArray = await repo.ratingEvento(id_event, rating);
        return returnArray;
    }

            desencriptarToken = async (vtoken) =>{
            const secretKey = 'UmDoisTreisTriesDoisUmoTodoMundoSobreDoisRaizEmCadaUno';
            let token = vtoken;
            let payloadOriginal = null;
            try{
                payloadOriginal = await jwt.verify(token, secretKey);
            } catch (e){
                console.error(e);
            }
        }
        
    

}