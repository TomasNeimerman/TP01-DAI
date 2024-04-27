import pg from "pg";
import { BDconfig } from "../../BD.js";

const client = new pg.Client();
client.connect();

export default class Bd{
    async Query1(id, firstName, lastName, username, attended, rating) {
        const sql = `
            SELECT 
                u.id, u.username, u.first_name, u.last_name, ee.attended, ee.rating, ee.description 
            FROM 
                users u
            JOIN 
                event_enrollments ee ON u.id = ee.id_user
            WHERE 
                u.id = ${id} AND u.username = ${username} AND u.first_name = ${firstName} AND u.last_name = ${lastName} AND ee.attended = ${attended} AND ee.rating = ${rating}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query2(username) {
        const sql = `SELECT id, username, password FROM users WHERE username = '${username}'`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query3(first_name, last_name, username, password) {
        const sql = `INSERT INTO users (first_name, last_name, username, password) VALUES ('${first_name}', '${last_name}', '${username}', '${password}') RETURNING id, username`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
}
