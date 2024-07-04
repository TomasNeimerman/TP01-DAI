import pg from 'pg';
import { Bd_config  } from './BD_Config.js';

export default class BD{
    constructor (){
        const {Client} = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async query1(limit,offset){
        const sql = `SELECT * FROM locations LIMIT ${limit} OFFSET ${offset}`;
        const response = await this.client.query(sql);
        return response.rows;
    }
    async query2(id){
        const sql = `SELECT * FROM locations WHERE id = '${id}'`
        const response = await this.client.query(sql);
        return response.rows;
    }
    async query3(id,user_id){
        const sql = `SELECT * FROM event_locations WHERE id_location = '${id}' AND id_creator_user = '${user_id}'`;

        const response = await this.client.query(sql);
        return response.rows;
    }
}