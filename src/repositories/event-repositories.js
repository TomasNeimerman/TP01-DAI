import pg from "pg";
import { BDconfig } from "../../BD.js";
import cli from "nodemon/lib/cli/index.js";

const client = new pg.Client();
client.connect();

export default class Bd{
    async Query1(pageSize,requestedPage) {
        const sql = `SELECT e.id, e.name AS event_name, e.description AS event_description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, 
                    t.name AS tag_name, 
                    u.id AS user_id, u.username, u.first_name AS user_first_name, u.last_name AS user_last_name, 
                    ec.id AS category_id, ec.name AS category_name, 
                    el.id AS location_id, el.name AS location_name, el.full_address, el.latitude, el.longitude, el.max_capacity  
                    FROM event e    
                    JOIN users u ON e.id_creator_user = u.id
                    JOIN event_categories ec ON e.id_event_category = ec.id
                    JOIN event_tags et ON e.id = et.id_event
                    JOIN tags t ON et.id_tag = t.id
                    JOIN event_location el ON e.id_event_location = el.id 
                    LIMIT ${pageSize} OFFSET ${requestedPage}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query2(id){
        const sql = `
        SELECT 
            e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance,
            el.id AS location_id, el.name AS location_name, el.full_address, el.longitude, el.latitude, el.max_capacity
        FROM 
            event e
        JOIN 
            event_locations el ON e.id_event_locations = el.id
        WHERE 
            e.id = ${id}`;
        const respuesta = await client.query(sql);
        return respuesta;

    }
    async Query3(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
    values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
    const respuesta = await client.query(sql);
    return respuesta;
    }
    async Query4(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE event SET id = '${id}', 'name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_event_location = '${$id_event_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query5(id,id_creator_user){
        const sql = `DELETE * FROM events 
    WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
    const respuesta = await client.query(sql);
    return respuesta;
    }
    async Query6(id_user,id_event){
        const sql = `INSERT INTO event_enrollments (id_event, id_user) VALUES (${id_event}, ${id_user})`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async Query7(eventId,userId,rating,feedback){
        const sql = `UPDATE event_enrollments 
                 SET rating = ${rating}, feedback = ${feedback} 
                 WHERE id_event = ${eventId} AND id_user = ${userId}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
}