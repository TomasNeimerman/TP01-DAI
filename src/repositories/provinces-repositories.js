import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const {Client} = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async query1(name, full_name, latitude, longitude, display_order) {
        const sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${name}', '${full_name}', '${latitude}', '${longitude}', ${display_order})`;
        const answer = await this.client.query(sql);
        return answer.rows; 
    }
    async query2(id, name, full_name, latitude, longitude, display_order) {
        const sql = `UPDATE provinces SET name = '${name}', full_name = '${full_name}', latitude = '${latitude}', longitude = '${longitude}', display_order = '${display_order}'
        WHERE id = '${id}'`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }
    async query3(id) {
        const sql = `DELETE FROM provinces WHERE id = '${id}'`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }
    async query4(){
        const sql = `SELECT * FROM PROVINCES`
        const answer = await this.client.query(sql);
        return answer.rows;
    }
    async query5(id) {
        const sql = `SELECT * from provinces WHERE id = '${id}'`
        const answer = await this.client.query(sql);
        return answer.rows;
    }
    
    async query6(id,limit,offset) {
        const sql = `SELECT * FROM locations INNER JOIN Provinces WHERE id_province = '${id}' LIMIT ${limit} OFFSET ${offset}`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }  
}