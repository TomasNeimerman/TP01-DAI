import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async query1(limit,offset){
        const sql = `SELECT * FROM event_categories LIMIT $1 OFFSET $2`;
        const response = await this.client.query(sql, [limit, offset]);
        return response.rows;
    }
    async query2(id){
        const sql = `SELECT * FROM event_categories WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response.rows;
    }
    async query3(name,display_order){
        const sql = `INSERT INTO event_categories (name,display_order) VALUES ('${name}','${display_order}')`;
        const respuesta = await this.client.query(sql);
        console.log(respuesta)
        return respuesta;
    }async query4(id,name,display_order){
        const sql = `UPDATE event_categories SET id = '${id}', name = '${name}', display_order = '${display_order}' WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response;
    }
    async query5(id){
        const sql = `DELETE FROM event_categories WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response;
    }
}