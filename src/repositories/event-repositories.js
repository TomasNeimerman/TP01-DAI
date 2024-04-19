import pg from "pg";
import { BDconfig } from "../../BD.js";

const client = new pg.Client();
client.connect();

export class Bd{
    async Consulta(sql) {
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
}