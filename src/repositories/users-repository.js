import pg from "pg";
import { DBconfig } from "../db.js";

const client = new pg.Client(DBconfig);
Client.connect();

export default class UsersRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }
    
    async crearUsuario(first_name, last_name, username, password){
        const sql = `INSERT INTO users (first_name, last_name, username, password)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const { rows } = await this.DBClient.query(sql, [first_name, last_name, username, password]);
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }

    async usuarioExiste(username, password){
        const sql = `SELECT * 
        FROM users
        WHERE username = $1 and password = $2`
        const {rows} = await this.DBClient.query(sql, [username, password])
        if(result.rows.length > 0){
            return rows[0];
        }else{
            return console.error("Sad Papu :V");
        }
    }
}

