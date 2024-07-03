import pg from "pg";
import { DBconfig } from "../../database/DB.js";
import { log } from "console";



export default class EventRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);

        this.DBClient.connect();
        
    }
   
    async BusquedaEvento(name, category, startDate, tag, page, pageSize) {
        // Convertir page y pageSize a enteros
        const intPage = parseInt(page);
        const intPageSize = parseInt(pageSize)

  
        let queryAgregado=``
        if(name != null){
            queryAgregado += `AND e.name = '${name}'`
        }
        if(startDate != null){
            queryAgregado += `AND e.start_date = '${startDate}'`
        }
        if(category != null){
            queryAgregado += `AND ec.name = '${category}'`
        }
        if(tag != null){
            queryAgregado += `AND t.name = '${tag}'`
        }

        const sql = `
            SELECT e.id, e.name, e.description, e.id_event_category, e.id_event_location, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance,
             e.id_creator_user,
            json_build_object(
                'id', el.id,
                'name', el.name,
                'full_address', el.full_address,
                'latitude', el.latitude,
                'longitude', el.longitude,
                'max_capacity', el.max_capacity
            ) AS event_location,
            json_build_object(
                'id', l.id,
                'name', l.name,
                'latitude', l.latitude,
                'longitude', l.longitude
            ) AS location,
            json_build_object(
                'id', p.id,
                'name', p.name,
                'full_name', p.full_name,
                'latitude', p.latitude,
                'longitude', p.longitude,
                'display_order', p.display_order
            ) AS province,
            json_build_object(
                'id', u.id,
                'first_name', u.first_name,
           'last_name', u.last_name,
           'username', u.username,
           'password', u.password
           ) AS creator_user,
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
            JOIN locations l ON el.id_location = l.id
        JOIN provinces p ON l.id_province = p.id
            WHERE 1=1 `
            +queryAgregado+
            ` LIMIT ${intPage} OFFSET ${intPageSize}`;
            console.log(sql)
        const response = await this.DBClient.query(sql);
        return response.rows;
    }
    
    
    //Punto 4
    async DetalleEvento(id){
        console.log(id)
          const sql = `SELECT E.id, E.name, E.description, E.start_date, E.duration_in_minutes, E.price, E.enabled_for_enrollment, E.max_assistance,
          U.id AS user_id, U.username, U.first_name, U.last_name, 
          json_build_object(
              'id', EL.id,
              'id_location', EL.id_location
              'name', EL.name,
              'full_address', EL.full_address,
              'latitude', EL.latitude,
              'longitude', EL.longitude,
              'max_capacity', EL.max_capacity
          ) AS event_location,
          json_build_object(
              'id', L.id,
              'name', L.name,
              'latitude', L.latitude,
              'longitude', L.longitude
          ) AS location,
          json_build_object(
              'id', P.id,
              'name', P.name,
              'full_name', P.full_name,
              'latitude', P.latitude,
              'longitude', P.longitude,
              'display_order', P.display_order
          ) AS province,
          (
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags  
              JOIN event_tags ET ON tags.id = ET.id_tag
              WHERE ET.id_event = E.id
          ) AS tags
      FROM events E 
      JOIN users U ON E.id_creator_user = U.id 
      JOIN event_categories EC ON E.id_event_category = EC.id 
      JOIN event_locations EL ON E.id_event_location = EL.id 
      JOIN locations L ON EL.id_location = L.id 
      JOIN provinces P ON L.id_province = P.id 
      WHERE E.id = '${id}'`;
        console.log(sql)
          const response = await this.DBClient.query(sql); 
          return response.rows;
    }
    //Punto 5
    async listaUsuarios(id, first, last, username, attended, rating){
        let queryAgregado=``
        if(first != null){
            queryAgregado += `AND E.first_name = "${first}"`
        }
        if(last != null){
            queryAgregado += `AND U.last_name = "${last}"`
        }
        if(username != null){
            queryAgregado += `AND U.username = "${username}"`
        }
        if(attended != null){
            queryAgregado += `AND ER.attended = "${attended}"`
        }
        if(rating != null){
            queryAgregado += `AND ER.rating = "${rating}"`
        }

        
        const sql = `SELECT ER.id, ER.id_event, ER.id_user, ER.description, ER.attended, ER.rating
        json_build_object(
            'id', U.id,
            'first_name', U.first_name,
            'last_name', U.last_name,
            'username', U.username,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS user,
        FROM users U 
        JOIN event_enrollments ER on ER.id_user = U.id 
        JOIN events E on E.id = ER.id_event
        WHERE E.id = '${id}'`
        console.log(sql);
        const response = await this.DBClient.query(sql); 
        return responsa;
    }
   

    //punto 8
    async crearEvent(name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
    
    const sql = `
        INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        VALUES ('${name}', '${description}', '${id_event_category}', '${id_event_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')
        RETURNING *
    `;
    console.log(sql)
    const response = await this.DBClient.query(sql);
    return response.rows
    }

    async putEvent(eventId, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) {
    const sql = `
        UPDATE events
        SET name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_event_location = '${id_event_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', 
        price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}', id_creator_user = '${id_creator_user}'
        WHERE id = '${eventId}'
        RETURNING * `;
    // console.log(sql)
    const response = await this.DBClient.query(sql);
    return response.rows
    
    }
    async borrarEvent(eventId) {
    const sql = `
        DELETE FROM event_tags WHERE id_event = '${eventId}'; DELETE FROM event_enrollments WHERE id_event = '${eventId}'; DELETE FROM events WHERE id = '${eventId}' `;
    await this.DBClient.query(sql);
}

//punto 9
async registerUser(id_event, id_user, description, attended, observations, rating, registration_date_time){
    const sql = `INSERT INTO event_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating)
    VALUES ('${id_event}', '${id_user}', '${description}', '${registration_date_time}', '${attended}', '${observations}', '${rating}')
    RETURNING *`
    console.log(sql)
    const response = await this.DBClient.query(sql);
    return response.rows
}
async unregisterUser(id_event, id_user){

        const sql = `
            DELETE FROM event_enrollments
            WHERE id_event = '${id_event}' and id_user = '${id_user}'`;
            console.log(sql)
        const response = await this.DBClient.query(sql);
        return response.rows
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




