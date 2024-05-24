import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const {Client} = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async Query1(id, name, full_name, latitude, longitude, display_order) {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${id}','${name}', '${full_name}', '${latitude}', '${longitude}', ${display_order})`;
        const values = [id,name,full_name,latitude,longitude,display_order];
        const respuesta = await this.client.query(sql);
        await this.DBClient.query(sql, values);
        return respuesta;
        
    }
    async Query2(id, name, full_name, latitude, longitude, display_order) {
        const sql = `UPDATE provinces SET id = '${id}', name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}'
        WHERE id = '${id}'`;
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    async Query3(id) {
        const sql = `DELETE * FROM provinces WHERE id = '${id}`;
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    async Query4(id) {
        const sql = `SELECT * FROM PROVINCES WHERE id = '${id}'`
        const respuesta = await this.client.query(sql);
        return respuesta;
    }
    async Query5(){
        const sql = `SELECT * FROM PROVINCES`
        const respuesta = await this.client.query(sql);
        return respuesta.rows;
    }
}