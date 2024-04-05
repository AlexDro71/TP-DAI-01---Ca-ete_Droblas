class EventsService {
    getAllEvents(){//punto 2
        const pageSize = 10;
        const requestedPage = 0;
        //ir a base de datos...
        query = 'select * from events limit $(pagesize) offset $(requestedPage)';
        const eventsInDB = query.execute();

        return{
            collection: eventsInDB,
            pageSize: pageSize,
            page: requestedPage,
            nextPage: requestedPage + 1,
        }
        
    }

    BusquedaEvento(name, category, startDate, tag){//punto 3
        var categorias = [name, category, startDate, tag]
        for(var i = 0; i < categorias.length; i++){
            if(categorias[i] == null){
                categorias.pop(i)
            }
        }
        const sql = `SELECT *
             FROM event
             JOIN event_categories ec ON event.id_event_category = ec.id
             JOIN event_tags et ON event.id = et.id_event
             JOIN tags t ON et.id_tag = t.id
             WHERE event.name = '${name}' AND ec.name = '${category}'`;

        //seguir con el script
    }
}