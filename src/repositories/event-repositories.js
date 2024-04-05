import pg from "pg";
import { BDconfig } from "../../BD.js";

const client = new pg.Client();
client.connect();

const sql = "SELECT * FROM events"
const respuesta = await  client.query(sql);
client.query();