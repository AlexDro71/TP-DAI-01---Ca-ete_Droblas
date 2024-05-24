import pg from "pg";
import { DBconfig } from "../../database/DB.js";


export default class EventCategoryRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }

    async crearCategory(name, display_order) {
        const sql = `INSERT INTO event_categories (name, display_order)
            VALUES ($1, $2)
            RETURNING *`;
        const { rows } = await this.DBClient.query(sql, [name, display_order]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async getAllCategories(pageSize, page) {
        const offset = pageSize * page;
        const sql = `SELECT * FROM event_categories
            ORDER BY id
            LIMIT $1 OFFSET $2`;
        const { rows } = await this.DBClient.query(sql, [pageSize, offset]);
        
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async getCategoryById(id,) {
        const sql = `SELECT * FROM event_categories
            WHERE id = $1`;
        const { rows } = await this.DBClient.query(sql, [id]);
        
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async putProvince(id, name, display_order) {
        const sql = `UPDATE event_categories
            SET name = $2, display_order = $3
            WHERE id = $1
            RETURNING *`;
        const { rows } = await this.DBClient.query(sql, [id, name, display_order]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
        
    }

    async borrarCategory(id) {
        const sql = `DELETE FROM event_categories
            WHERE id = $1`;
        await this.DBClient.query(sql, [id]);
    }


}