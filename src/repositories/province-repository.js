import pg from "pg";
import { DBconfig } from "../../database/DB.js";

export default class ProvinceRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }
 
    //Punto 7
     async crearProvince(name, fullName, latitude, longitude) {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const { rows } = await this.DBClient.query(sql, [name, fullName, latitude, longitude]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async getAllProvinces(pageSize, page) {
        const offset = pageSize * page;
        const intPage = parseInt(page);
        const intPageSize = parseInt(pageSize)
        const sql = `SELECT * FROM provinces
            ORDER BY id
            LIMIT ${intPage} OFFSET ${intPageSize}`;
        const response = await this.DBClient.query(sql);
        return response.rows
    }

    async getProvinceById(id) {
        const sql = `SELECT * FROM provinces
            WHERE id = ${id}`;
       
        const response = await this.DBClient.query(sql);
        return response.rows
    }

    async getAllLocationsByProvinceId(id, page, pageSize){
        const intPage = parseInt(page);
        const intPageSize = parseInt(pageSize)
        const sql = `SELECT 
        L.id AS location_id,
        L.name AS location_name,
        L.latitude,
        L.longitude,
        P.id AS province_id,
        P.name AS province_name
    FROM 
        Locations L 
    INNER JOIN 
        Provinces P ON L.id_province = P.id 
    WHERE 
        P.id = ${id}
    LIMIT
        ${intPage} OFFSET ${intPageSize}
    `;
        console.log(sql)
    
        const response = await this.DBClient.query(sql);
        return response.rows

    }

    async putProvince(id, name, fullName, latitude, longitude) {
        const sql = `UPDATE provinces
            SET name = ${id}, full_name = ${name}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = $5
            RETURNING *`;
        const { rows } = await this.DBClient.query(sql, [name, fullName, latitude, longitude, id]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
        
    }

    async borrarProvince(id) {
        const sql = `DELETE FROM provinces
            WHERE id = $1`;
        await this.DBClient.query(sql, [id]);
    }
}

