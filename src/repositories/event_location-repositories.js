import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
    constructor() {
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }

    async query1(uid) {
        const sql = `SELECT * FROM event_locations WHERE id_creator_user = $1`;
        const answer = await this.client.query(sql, [uid]);
        return answer.rows;
    }

    async query2(uid, id) {
        const sql = `SELECT * FROM event_locations WHERE id = $1 AND id_creator_user = $2`;
        const answer = await this.client.query(sql, [id, uid]);
        return answer.rows;
    }

    async query3(eventLocation) {
        const sql = `
            INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        const variables = [eventLocation.id_location, eventLocation.name, eventLocation.full_address, eventLocation.max_capacity, eventLocation.latitude, eventLocation.longitude, eventLocation.id_creator_user];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async updateEventLocation(eventLocation) {
        const sql = `
            UPDATE event_locations 
            SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6 
            WHERE id = $7 AND id_creator_user = $8
        `;
        const variables = [eventLocation.id_location, eventLocation.name, eventLocation.full_address, eventLocation.max_capacity, eventLocation.latitude, eventLocation.longitude, eventLocation.id, eventLocation.id_creator_user];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async deleteEventLocation(id, id_creator_user) {
        const sql = `DELETE FROM event_locations WHERE id = $1 AND id_creator_user = $2`;
        const answer = await this.client.query(sql, [id, id_creator_user]);
        return answer;
    }
}

