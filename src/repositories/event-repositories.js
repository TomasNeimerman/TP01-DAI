import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD{
    constructor (){
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }
    async query1(pageSize, requestedPage) {
        const validations = []
        if (pageSize) validations.push(`limit ${pageSize}`)
        if (requestedPage) validations.push(`offset ${requestedPage}`)
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
        json_build_object(
            'id', el.id,
            'name', el.name,
            'full_address', el.full_address,
            'latitude', el.latitude,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS event_location,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'latitude', l.latitude,
            'longitude', l.longitude
        ) AS location,
        json_build_object(
            'id', p.id,
            'name', p.name,
            'full_name', p.full_name,
            'latitude', p.latitude,
            'longitude', p.longitude,
            'display_order', p.display_order
        ) AS province,
        array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_locations el ON e.id_event_location = el.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN locations l ON el.id_location = l.id
        JOIN provinces p ON l.id_province = p.id
        GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id
        ${validations.length > 0 ?  `${validations.join()}` : null}`;
        const answer = await this.client.query(sql);
        return answer.rows
    
    }
    
    async query2(name, category, startDate, tag){ 
        const variables = [name, category, startDate, tag]
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
        json_build_object(
            'id', el.id,
            'name', el.name,
            'full_address', el.full_address,
            'latitude', el.latitude,
            'longitude', el.longitude,
            'max_capacity', el.max_capacity
        ) AS event_location,
        json_build_object(
            'id', l.id,
            'name', l.name,
            'latitude', l.latitude,
            'longitude', l.longitude
        ) AS location,
        json_build_object(
            'id', p.id,
            'name', p.name,
            'full_name', p.full_name,
            'latitude', p.latitude,
            'longitude', p.longitude,
            'display_order', p.display_order
        ) AS province,
        array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
        FROM events e
        JOIN users u ON e.id_creator_user = u.id
        JOIN event_categories ec ON e.id_event_category = ec.id
        JOIN event_locations el ON e.id_event_location = el.id
        JOIN event_tags et ON e.id = et.id_event
        JOIN tags t ON et.id_tag = t.id
        JOIN locations l ON el.id_location = l.id
        JOIN provinces p ON l.id_province = p.id
        GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }
    async query3(id){
        const sql = `SELECT e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, e.id_creator_user,u.id as user_id, u.username, u.first_name, u.last_name, ec.id as eventcat_id, ec.name as eventcat_name, el.id as el_id, el.name as el_name, el.full_address, el.latitude, el.longitude, el.max_capacity, 
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
        WHERE e.id = ${id} group by 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20 `;
        const answer = await this.client.query(sql);
        return answer; 
    }

    async query4(id, first_name, last_name, username, attended, rating){
        const sql = `select en.id, en.id_event, en.id_user, en.description, en.registration_date_time, en.attended, en.observations, en.rating, u.id as user_id, u.first_name, u.last_name, u.username
        FROM event_enrollments en JOIN users u ON en.id_user = u.id`
        const answer = await this.client.query(sql);
        return answer.rows
    }

    async query5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `INSERT INTO events (id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
        values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
        const answer = await this.client.query(sql);
        return answer
    }

    async query6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        const sql = `UPDATE events SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_envet_location = '${id_envet_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const answer = await this.client.query(sql);
        return answer
    }

    async query7(id, id_creator_user){
        const sql = `DELETE * FROM events 
        WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
        const answer = await this.client.query(sql);
        return answer
    }
 
    async query8(enrollment) {
        try {
          if (enrollment.enabled) {
            const sql = `Insert INTO event_enrollments (id_event, id_user, description, registration_date_time,attended,observations,rating) VALUES ($1,$2,$3,$4,$5,$6,$7)`;
          }else return "Error";
          const fecha = `${date=new Date().getFullYear()}-${date.getMonth()}-${date.getDate()} `
          const values = [enrollment.idEvent, enrollment.user_id,enrollment.description, fecha,enrollment.attended, enrollment.observations, enrollment.rating]
          await this.client.query(sql, values)
        } catch (error) {
          console.log(error);
        }
      }

      async query9(rating,id) {
        try {
          const sql = `UPDATE event_enrollments SET rating=$1 WHERE id=$2`;
          const values = [rating,id];
          await this.client.query(sql, values);
    
        } catch (error) {
          console.log(error);
        }
      } 
}   