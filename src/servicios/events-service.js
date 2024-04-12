export default class EventsService {
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
        var queryAgregado = "";
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
        JOIN event_location el ON e.id_envet_location = el.id ` + queryAgregado + ` limit '${page}' offset '${pageSize}'`

        if(name){
            queryAgregado += `WHERE e.name = '${categorias.name}'`            
        }else if(name && sql.includes("WHERE")){
            queryAgregado += `AND e.name = '${categorias.name}'`
        }
        if(startDate){
            queryAgregado += `WHERE e.start_date = '${categorias.startDate}'`

        }else if(startDate && sql.includes("WHERE")){
            queryAgregado += `AND e.start_date = '${categorias.startDate}'`
        }
        if(category){
            queryAgregado += `WHERE ec.name = '${categorias.category}'`

        }else if(category && sql.includes("WHERE")){
            queryAgregado += `AND ec.name = '${categorias.category}'`
        }
        if(tag){
            queryAgregado += `WHERE t.name = '${categorias.tag}'`

        }else if(tag && sql.includes("WHERE")){
            queryAgregado += `AND t.name = '${categorias.tag}'`
        }

        //seguir con el script
    }

    DetalleEvento(id){
        const sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, U.id, U.username, U.first_name, U.,last_name, EC.id, EC.name, EL.id, EL.name, EL.full_address, EL.latitude, EL.longitude, EL.max_capacity, P.name, T.name 
        FROM events E 
        JOIN users U on E.id_creator_user = U.id 
        JOIN event_categories EC on E.id_event_category = EC.id 
        JOIN event_locations EL on E.id_event_location = EL.id 
        JOIN locations L on EL.id_location = L.id 
        JOIN provinces P on L.id_province = P.id JOIN event_tags ET on E.id = ET.id_event 
        JOIN tags T on ET.id_tag = T.id
        WHERE E.id = '${id}'`;

        return sql;
    }

}




    
