import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
        async query1(pageSize,requestedPage) {
        const validations = []
        if (pageSize) validations.push(`limit ${pageSize}`)
        if (requestedPage) validations.push(`offset ${requestedPage}`)
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, t.name as tags_name, u.id as user_id, u.username, u.first_name, u.last_name, ec.id as event_id, ec.name as eventcat_id, el.id as el_id, el.name as el_name, el.full_address, el.latitude, el.longitude, el.max_capacity    
        FROM events e    
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN event_locations el ON e.id_event_location = el.id limit  ${pageSize} offset ${requestedPage}`;
        const respuesta =  await this.client.query(sql);
        return respuesta;
    }
    async query2(name, category, startDate, tag){
        const sql =
        `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, u.id as user_id, u.username, u.first_name, u.last_name, ec.id as eventcat_id, ec.name as eventcat_name, el.id as el_id, el.name as el_name, el.full_address, el.latitude, el.longitude, el.max_capacity, 
            array( select json_build_object(
            'id', tags.id,
            'name', tags.name
            )FROM tags ) as tags
            FROM events e    
            JOIN users u ON e.id_creator_user = u.id
            INNER JOIN event_categories ec ON e.id_event_category = ec.id
            JOIN event_locations el ON e.id_event_location = el.id
            INNER JOIN event_tags et ON e.id = et.id_event
            JOIN tags t ON et.id_tag = t.id
            WHERE et.id_tag = t.id
        ${variables.length > 0 ?  ` AND ${validaciones.join(' AND ')}` : null}`;
        const groupby = ` group by 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15`
        const respuesta = await client.query(sql);
        return respuesta + groupby;

    }
    async query3(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
    values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
    const respuesta = await client.query(sql);
    return respuesta;
    }
    async query4(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE event SET id = '${id}', 'name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_event_location = '${$id_event_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async query5(id,id_creator_user){
        const sql = `DELETE * FROM events 
    WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
    const respuesta = await client.query(sql);
    return respuesta;
    }
    async query6(id_user,id_event){
        const sql = `INSERT INTO event_enrollments (id_event, id_user) VALUES (${id_event}, ${id_user})`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    async query7(eventId,userId,rating,feedback){
        const sql = `UPDATE event_enrollments 
                 SET rating = ${rating}, feedback = ${feedback} 
                 WHERE id_event = ${eventId} AND id_user = ${userId}`;
        const respuesta = await client.query(sql);
        return respuesta;
    }
    
}