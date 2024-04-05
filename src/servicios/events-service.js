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
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name,ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity  
        FROM event e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_location el ON e.id_envet_location = el.id
        WHERE e.name = '${categorias.name}' AND ec.name = '${categorias.category}' AND e.start_date = '${categorias.startDate}' AND t.name = '${categorias.tag}`;

        //seguir con el script
    }

    DetalleEvento(id){
        const sql = 'SELECT event_locations.*,locations.*,provinces.* FROM event_locations JOIN locations l ON event_locations.id_location = l.id JOIN provinces p ON locations.id_province'
    }

    
}