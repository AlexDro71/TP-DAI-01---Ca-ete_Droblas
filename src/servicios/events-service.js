import EventRepository from './../../src/repositories/events-repository.js';  

export default class EventsService{

    BusquedaEvento = async (name, category, startDate, tag, page, pageSize) =>{
    const repo = new EventRepository();
    const returnArray = await repo.BusquedaEvento(name, category, startDate, tag, page, pageSize);
    return {
        collection: returnArray,
        pageSize: pageSize,
        page: page,
        nextPage: `http://localhost:3508/api/event/?limit=${parseInt(pageSize)}&offset=${parseInt(page) + pageSize}`,
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
    crearEvent = async(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) =>{
        const repo = new EventRepository();
        const returnArray = await repo.crearEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return returnArray;
    }
    getEventById = async (eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.DetalleEvento(eventId);
        return returnArray;
    }
    putEvent = async(eventId, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) =>{
        const repo = new EventRepository();
        const returnArray = await repo.putEvent(eventId.id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user);
        return returnArray;
    }
    borrarEvent = async(eventId) =>{
        const repo = new EventRepository();
        const returnArray = await repo.borrarEvent(eventId.id);
        return returnArray;
    }    


    registerUser = async(id_event, id_user, description, attended, observations, rating, registration_date_time) =>{
        const repo = new EventRepository();
        const returnArray = await repo.registerUser(id_event, id_user, description, attended, observations, rating, registration_date_time);
        return returnArray;
    }
    unregisterUser = async(id_event, id_user) =>{
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
        conseguirHora = async() => {
                let fecha = new Date();
            
                let dia = fecha.getDate();
                let mes = fecha.getMonth() + 1; 
                let año = fecha.getFullYear();
                let horas = fecha.getHours();
                let minutos = fecha.getMinutes();
                let segundos = fecha.getSeconds();
                minutos = minutos < 10 ? '0' + minutos : minutos;
                segundos = segundos < 10 ? '0' + segundos : segundos;
            
                let fechaHoraActual = año + '-' + mes + '-' + dia + ' ' + horas + ':' + minutos + ':' + segundos;
            
                return fechaHoraActual;
            
        }
        
    

}