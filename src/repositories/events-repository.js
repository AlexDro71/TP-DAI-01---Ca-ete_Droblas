import pg from "pg";
import { DBconfig } from "../../database/DB.js";



export default class EventRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        console.log(DBconfig)
        this.DBClient.connect();
        
    }
   
    async BusquedaEvento(name, category, startDate, tag, page, pageSize) {
        // Convertir page y pageSize a enteros
        const intPage = parseInt(page);
        const intPageSize = parseInt(pageSize)

        console.log(page, pageSize)
        let queryAgregado=``
        if(name != null){
            queryAgregado += `AND e.name = "${name}"`
        }
        if(startDate != null){
            queryAgregado += `AND e.start_date = "${startDate}"`
        }
        if(category != null){
            queryAgregado += `AND ec.name = "${category}"`
        }
        if(tag != null){
            queryAgregado += `AND t.name = "${tag}"`
        }

        const sql = `
            SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name, u.id, u.username, u.first_name, u.last_name, ec.id, ec.name, el.id, el.name, el.full_address, el.latitude, el.longitude, el.max_capacity,
            json_build_object(
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'max_capacity', el.max_capacity
            ) AS event_location,
            array(
                SELECT json_build_object(
                    'id', tags.id,
                    'name', tags.name
                )
                FROM tags
            ) AS tags  
            FROM events e    
            JOIN users u ON e.id_creator_user = u.id
            JOIN event_categories ec ON e.id_event_category = ec.id
            JOIN event_tags et ON e.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
            JOIN event_locations el ON e.id_event_location = el.id 
            WHERE 1=1 `
            +queryAgregado+
            ` LIMIT ${intPage} OFFSET ${intPageSize}`;
            const g = ` GROUP BY 1,2,3,4,5,6, el.id`
            console.log(sql)
        const response = await this.DBClient.query(sql);
        return response.rows;
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
          const responsa = await this.client.query(sql); 
          return responsa;
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
        if(first !== null){
            queryAgregado += `AND E.first_name = '${categorias.first}'`
        }
        if(last !== null){
            queryAgregado += `AND U.last_name = '${categorias.last}'`
        }
        if(username !== null){
            queryAgregado += `AND U.username = '${categorias.username}'`
        }
        if(attended !== null){
            queryAgregado += `AND ER.attended = '${categorias.attended}'`
        }
        if(rating !== null){
            queryAgregado += `AND ER.rating = '${categorias.rating}'`
        }
        const responsa = await this.client.query(sql); 
        return responsa;
    }
   

    //punto 8
    async crearEvent(eventData) {
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
    const sql = `
        INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;
    const { rows } = await this.DBClient.query(sql, [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user]);
    if(result.rows.length > 0){
        return rows[0];
    }else{
        return console.error("Sad Papu :V");
    }
    }
    async getEventById(eventId) {
    const sql = `
        SELECT * FROM events
        WHERE id = $1`;
    const { rows } = await this.DBClient.query(sql, [eventId]);
    if(result.rows.length > 0){
        return rows[0];
    }else{
        return console.error("Sad Papu :V");
    }
    }
    async putEvent(eventId, eventData) {
    const { name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user } = eventData;
    const sql = `
        UPDATE events
        SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9
        WHERE id = $10
        RETURNING *
    `;
    const { rows } = await this.DBClient.query(sql, [name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, eventId]);
    if(result.rows.length > 0){
        return rows[0];
    }else{
        return console.error("Sad Papu :V");
    }
    }
    async borrarEvent(eventId) {
    const sql = `
        DELETE FROM events
        WHERE id = '${eventId}'
    `;
    await this.DBClient.query(sql, [eventId]);
}

//punto 9
async registerUser(id_event, id_user){
    const sql = `INSERT INTO enrollments (id_event, id_user)
    VALUES ($1, $2)
    RETURNING *`
    const {rows} = await this.DBClient.query(sql, [id_event, id_user])
    if(result.rows.length > 0){
        return rows[0];
    }else{
        return console.error("Sad Papu :V");
    }
}
async unregisterUser(id_event, id_user){

        const sql = `
            DELETE FROM event_enrollments
            WHERE id_event = $1 and id_user = $2
        `;
        await this.DBClient.query(sql, [id_event, id_user]);
        return true;
}

//Punto 10
async ratingEvento(id_event, rating){
    const inscripto = incripto(id_event)
    if(!inscripto){
        response.status(404).json({message: "El usuario no esta inscripto al evento"})
    }else{
        const sql = `UPDATE event_enrollments
        SET rating = $1
        RETURNING *`
        const { rows } = await this.DBClient.query(sql, [rating]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

}

async inscripto(id_event){
    const id_user = req.user.id;
    const sql = `SELECT * 
    FROM event_enrollments ee
    INNER JOIN events e ON e.'${id_event}'=ee.'${id_event}' 
    INNER JOIN users u ON u'${id_user}'=ee.'${id_user}'`
    if(await this.DBClient.query(sql)){
        return true;
    }else{
        return false;
    }
}
}




