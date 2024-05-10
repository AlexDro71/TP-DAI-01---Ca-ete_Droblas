import pg from "pg";
import { DBconfig } from "../db.js";


export default class LocationRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }

    async getAllLocations(pageSize, page, id_province){
        const sql = `SELECT *
        FROM locations 
        limit '${(pagesize)}' offset '${(requestedPage)}'`;
   
        const locationsInDB = sql.execute();

        return{
            collection: locationsInDB,
            pageSize: pageSize,
            page: requestedPage,
            nextPage: requestedPage + 1,
        }
    }

    async getLocationById(id){
        query = `SELECT * 
        FROM locations
        WHERE id = '${id}'`

        return query;
    }

    
}