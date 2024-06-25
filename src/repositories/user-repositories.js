import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
  constructor() {
    this.client = new pg.Client(Bd_config);
    this.client.connect();
  }
  async query1(sql, values = []) {
    try {
        const respuesta = await this.client.query(sql, values);
        return respuesta;
    } catch (error) {
        throw new Error("Error al realizar la consulta: " + error.message);
    }
}

 async query2(username, password) {
    const sql = `
        SELECT *FROM users WHERE username = $1 AND password = $2`;
    const values = [username, password];
    
    try {
        const respuesta = await pool.query(sql, values);
        return respuesta.rows[0];
    } catch (error) {
        console.error("Error al autenticar usuario:", error);
        throw new Error("Error al autenticar usuario");
    }
}

async query3(first_name, last_name, username, password) {
    const existingUser = await this.buscarUsuarioPorUsername(username);
    if (existingUser) {
        throw new Error("El nombre de usuario ya está en uso.");
    }

    const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id`;
    const values = [first_name, last_name, username, password];

    try {
        const respuesta = await pool.query(sql, values);
        return respuesta.rows[0].id;
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        throw new Error("Error al registrar usuario");
    }
}

async query4(username) {
    const sql = `SELECT * FROM users WHERE username = $1`;
    const values = [username];

    try {
        const respuesta = await pool.query(sql, values);
        return respuesta.rows[0];
    } catch (error) {
        console.error("Error al buscar usuario por nombre de usuario:", error);
        throw new Error("Error al buscar usuario por nombre de usuario");
    }
}
}