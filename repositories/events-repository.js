import pg from "pg";
import { DBconfig } from "../db.js";

const client = new pg.Client(DBconfig);
Client.connect();

const sql = "SELECT * FROM events"
const respuesta = await client.query(sql);