import pg from "pg";
import { DBconfig } from "../db.js";

const client = new pg.Client(DBconfig);
Client.connect();

export class Bd{
    async Consulta(sql) {
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
}

