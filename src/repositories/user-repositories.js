import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
  constructor() {
    this.client = new pg.Client(Bd_config);
    this.client.connect();
  }
async query1(first_name, last_name, username, password) {
    const num = await this.query3()
    let id = parseInt(num[0].count)
    const sql = `INSERT INTO users (id, first_name, last_name, username, password)
        VALUES ('${id+1}', '${first_name}', '${last_name}', '${username}', '${password}')
        RETURNING id`;
        console.log(sql)
    try {
        const respuesta = await this.client.query(sql);
        return respuesta.rows[0].id;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("Error al registrar usuario");
    }
}

async query2(username) {
    const sql = `SELECT * FROM users WHERE username = $1`;
    const respuesta = await this.client.query(sql, [username]);
    return respuesta.rows
    
}
async query3(){
    const sql = `SELECT COUNT(*) FROM users`;
    const respuesta = await this.client.query(sql);
    return respuesta.rows
}
}