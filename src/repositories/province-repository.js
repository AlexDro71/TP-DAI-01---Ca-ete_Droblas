import pg from "pg";
import { DBconfig } from "../db.js";

const client = new pg.Client(DBconfig);
Client.connect();

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
        const sql = `SELECT * FROM provinces
            ORDER BY id
            LIMIT $1 OFFSET $2`;
        const { rows } = await this.DBClient.query(sql, [pageSize, offset]);
        
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async getProvinceById(id) {
        const sql = `SELECT * FROM provinces
            WHERE id = $1`;
        const { rows } = await this.DBClient.query(sql, [id]);
        
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async getAllLocationsByProvinceId(id){
        const sql = `SELECT L.name, L.latitude, L.longitude, P.name
        FROM L.Locations INNER JOIN P.Provinces  ON id_province = '${id}'`
        const { rows } = await this.DBClient.query(sql, [id]);
        
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }

    }

    async putProvince(id, name, fullName, latitude, longitude) {
        const sql = `UPDATE provinces
            SET name = $1, full_name = $2, latitude = $3, longitude = $4
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

