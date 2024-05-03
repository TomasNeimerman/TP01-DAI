import pg from 'pg';
import { Bd_config } from './BD_Config.js';
const client = new pg.Client(Bd_config);
client.connect();

export default class BD{
    constructor (){
        const { Client } = pkg;
        this.DBClient = new Client(DBConfig);
        this.DBClient.connect();
    }
    async Query1(id, name, full_name, latitude, longitude, display_order) {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${id}','${name}', '${full_name}', '${latitude}', '${longitude}', ${display_order})`;
        const values = [id,name,full_name,latitude,longitude,display_order];
        const respuesta = await client.query(sql);
        await this.DBClient.query(sql, values);
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