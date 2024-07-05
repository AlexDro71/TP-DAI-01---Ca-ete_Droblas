import pg from "pg";
import { DBconfig } from "../../database/DB.js";

export default class UsersRepository{
    constructor () {
        const {Client} = pg;
        this.DBClient = new Client(DBconfig);
        this.DBClient.connect();
    }
    
    async crearUsuario(first_name, last_name, username, password){
        const sql = `INSERT INTO users (id, first_name, last_name, username, password)
        VALUES (nextval('users_id_seq'), '${first_name}', '${last_name}', '${username}', '${password}')
        RETURNING *;`;
            console.log(sql)
            const response = await this.DBClient.query(sql);
            return response.rows, console.log(`Usuario '${username}' creado Correctamente`)
    }

    async usuarioExiste(username, password){
        const sql = `SELECT * 
        FROM users
        WHERE username = '${username}' and password = '${password}'`
        console.log(sql)
        const response = await this.DBClient.query(sql);
        if(response.rows == ""){
            return false;
        }else{
        return response.rows
        }
    }
}

