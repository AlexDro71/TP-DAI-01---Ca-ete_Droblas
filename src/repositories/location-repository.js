import pg from "pg";
import { DBconfig } from "../../database/DB.js";


export default class LocationRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }

    async getAllLocations(page, pageSize){
        const sql = `SELECT *
        FROM locations 
        limit '${page}' offset '${pageSize}'`;
        const response = await this.DBClient.query(sql); 
        return response.rows;

        
    }

    async getLocationById(id){
        const sql = `SELECT * 
        FROM locations
        WHERE id = '${id}'`
        const response = await this.DBClient.query(sql); 
          return response.rows;

    }

    
}