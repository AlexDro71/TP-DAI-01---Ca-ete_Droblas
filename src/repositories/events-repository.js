import pg from "pg";
import DBconfig from "../db.js";

const client = new pg.Client(DBconfig);
Client.connect();

export default class EventRepository{
  
    async getAllEvents(){//punto 2
        const pageSize = 10;
        const requestedPage = 0;
        //ir a base de datos...
        query = `select *
        from events 
        limit '${(pagesize)}' offset '${(requestedPage)}'`;
        const eventsInDB = query.execute();

        return{
            collection: eventsInDB,
            pageSize: pageSize,
            page: requestedPage,
            nextPage: requestedPage + 1,
        }
        
    }
    async BusquedaEvento(name, category, startDate, tag){//punto 3
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
        JOIN event_location el ON e.id_envet_location = el.id 
        WHERE 1=1`
        + queryAgregado + 
        ` limit '${page}' offset '${pageSize}'`

        if(name != null && sql.includes("WHERE")){
            queryAgregado += `AND e.name = '${categorias.name}'`
        }
        if(startDate != null && sql.includes("WHERE")){
            queryAgregado += `AND e.start_date = '${categorias.startDate}'`
        }
        if(category != null && sql.includes("WHERE")){
            queryAgregado += `AND ec.name = '${categorias.category}'`
        }
        if(tag != null && sql.includes("WHERE")){
            queryAgregado += `AND t.name = '${categorias.tag}'`
        }

    }
    //Punto 4
    async DetalleEvento(id){
          const sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance, U.id, U.username, U.first_name, U.,last_name, EC.id, EC.name, EL.id, EL.name, EL.full_address, EL.latitude, EL.longitude, EL.max_capacity, P.name, T.name 
          FROM events E 
          JOIN users U on E.id_creator_user = U.id 
          JOIN event_categories EC on E.id_event_category = EC.id 
          JOIN event_locations EL on E.id_event_location = EL.id 
          JOIN locations L on EL.id_location = L.id 
          JOIN provinces P on L.id_province = P.id JOIN event_tags ET on E.id = ET.id_event 
          JOIN tags T on ET.id_tag = T.id
          WHERE E.id = '${id}' 
          limit '${(pagesize)}' offset '${(requestedPage)}'`; 
          return sql;
    }
    //Punto 5
    async listaUsuarios(id, first, last, username, attended, rating){
        var categorias = [first, last, username, attended, rating];
        var queryAgregado = "";
        for(var i = 0; i < categorias.length; i++){
            if(categorias[i] == null){
                categorias.pop(i)
            }
        }
        const sql = `SELECT U.first_name, U.last_name, U.username,
        ER.description, ER.attended, ER.rating
        FROM users U 
        JOIN event_enrollments ER on ER.id_user = U.id 
        JOIN events E on E.id = ER.id_event
        WHERE E.id = '${id}' 
        limit '${(pagesize)}' offset '${(requestedPage)}'`
        if(first != null){
            queryAgregado += `AND E.first_name = '${categorias.first}'`
        }
        if(last != null){
            queryAgregado += `AND U.last_name = '${categorias.last}'`
        }
        if(username != null){
            queryAgregado += `AND U.username = '${categorias.username}'`
        }
        if(attended != null){
            queryAgregado += `AND ER.attended = '${categorias.attended}'`
        }
        if(rating != null){
            queryAgregado += `AND ER.rating = '${categorias.rating}'`
        }
    }
   

    //punto 8
    async crearEvent(eventData) {
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
    const sql = `
        INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;
    const values = [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user];
    const { rows } = await pool.query(sql, values);
    return rows[0];
    }
    async getEventById(eventId) {
    const sql = `
        SELECT * FROM events
        WHERE id = $1
    `;
    const { rows } = await pool.query(sql, [eventId]);
    return rows[0];
    }
    async putEvent(eventId, eventData) {
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
    const sql = `
        UPDATE events
        SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9
        WHERE id = $10
        RETURNING *
    `;
    const values = [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, eventId];
    const { rows } = await pool.query(sql, values);
    return rows[0];
    }
    async borrarEvent(eventId) {
    const sql = `
        DELETE FROM events
        WHERE id = '${eventId}'
    `;
    await pool.query(sql, [eventId]);
}
}




