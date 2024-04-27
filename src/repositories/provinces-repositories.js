import pg from "pg";
import { BDconfig } from "../../BD.js";

const client = new pg.Client();
client.connect();

export default class Bd{
    async Query1(id, name, full_name, latitude, longitude, display_order) {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${id}','${name}', '${full_name}', '${latitude}', '${longitude}', ${display_order})`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query2(id, name, full_name, latitude, longitude, display_order) {
        const sql = `UPDATE province SET id = '${id}', name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}'
        WHERE id = '${id}'`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query3(id) {
        const sql = `DELETE * FROM province WHERE id = '${id}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query4(id) {
        const sql = `SELECT * FROM PROVINCE WHERE id = '${id}'`
        const respuesta = await client.query(sql);
        return respuesta;
    }
}