import pg from 'pg';
import { Bd_config } from './BD_Config.js';

export default class BD {
    constructor() {
        const { Client } = pg;
        this.client = new Client(Bd_config);
        this.client.connect();
    }

    async qAllE(pageSize, requestedPage) {
        const validations = [];
        if (pageSize) validations.push(`LIMIT ${pageSize}`);
        if (requestedPage) validations.push(`OFFSET ${requestedPage}`);
        const sql = `
            SELECT 
                e.id, e.name, e.description, e.start_date, e.duration_in_minutes, 
                e.price, e.enabled_for_enrollment, e.max_assistance, e.id_event_category, 
                e.id_event_location, e.id_creator_user, u.id AS user_id, u.username, 
                u.first_name, u.last_name, ec.id AS eventcat_id, ec.name AS eventcat_name, 
                ec.display_order,
                json_build_object('id', el.id, 'name', el.name, 'full_address', el.full_address,
                'latitude', el.latitude, 'longitude', el.longitude, 'max_capacity', el.max_capacity) AS event_location,
                json_build_object('id', l.id, 'name', l.name, 'latitude', l.latitude, 'longitude', l.longitude) AS location,
                json_build_object('id', p.id, 'name', p.name, 'full_name', p.full_name, 'latitude', p.latitude,
                'longitude', p.longitude, 'display_order', p.display_order) AS province,
                 array(
            SELECT json_build_object(
                'id', tags.id,
                'name', tags.name
            )
            FROM tags
        ) AS tags
            FROM 
                events e
            JOIN 
                users u ON e.id_creator_user = u.id
            JOIN 
                event_categories ec ON e.id_event_category = ec.id
            JOIN 
                event_locations el ON e.id_event_location = el.id
            JOIN 
                event_tags et ON e.id = et.id_event
            JOIN 
                tags t ON et.id_tag = t.id
            JOIN 
                locations l ON el.id_location = l.id
            JOIN 
                provinces p ON l.id_province = p.id
            GROUP BY 
                e.id, u.id, ec.id, el.id, l.id, p.id
            ${validations.join(' ')}
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async query2(name, category, startDate, tag) {
        const verify = [];
        if (name)verify.push(`e.name = '${name}'`);
        if (category) verify.push(`ec.id = '${category}'`);
        if (startDate) verify.push(`e.start_date = '${startDate}'`);
        if (tag) verify.push(`t.id = '${tag}'`);
        const sql = `
           SELECT 
                e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, 
                e.enabled_for_enrollment, e.max_assistance, e.id_event_category, e.id_event_location, 
                e.id_creator_user, u.id AS user_id, u.username, u.first_name, u.last_name, 
                ec.id AS eventcat_id, ec.name AS eventcat_name, ec.display_order,
                json_build_object('id', el.id, 'name', el.name, 'full_address', el.full_address,
                'latitude', el.latitude, 'longitude', el.longitude, 'max_capacity', el.max_capacity) AS event_location,
                json_build_object('id', l.id, 'name', l.name, 'latitude', l.latitude, 'longitude', l.longitude) AS location,
                json_build_object('id', p.id, 'name', p.name, 'full_name', p.full_name, 'latitude', p.latitude,
                'longitude', p.longitude, 'display_order', p.display_order) AS province,
                array(
                    SELECT json_build_object(
                        'id', tags.id,
                        'name', tags.name
                    )
                    FROM tags
                ) AS tags
            FROM 
                events e
            JOIN 
                users u ON e.id_creator_user = u.id
            JOIN 
                event_categories ec ON e.id_event_category = ec.id
            JOIN 
                event_locations el ON e.id_event_location = el.id
            JOIN 
                event_tags et ON e.id = et.id_event
            JOIN 
                tags t ON et.id_tag = t.id
            JOIN 
                locations l ON el.id_location = l.id
            JOIN 
                provinces p ON l.id_province = p.id
            ${verify.length > 0 ? `WHERE ${verify.join(' AND ')}` : ''}
            GROUP BY  e.id, u.id, ec.id, el.id, l.id, p.id    
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async qEventD(id) {
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
        LEFT JOIN users u ON e.id_creator_user = u.id
        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN event_locations el ON e.id_event_location = el.id
        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id
        LEFT JOIN locations l ON el.id_location = l.id
        LEFT JOIN provinces p ON l.id_province = p.id
        WHERE e.id = '${id} 'GROUP BY 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16, el.id, l.id, p.id`;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async query4(id, first_name, last_name, username, attended, rating) {
        const sql = `
            SELECT
                en.id AS enrollment_id,
                en.id_event AS event_id,
                en.id_user AS user_id,
                en.description AS enrollment_description,
                en.registration_date_time AS registration_date,
                en.attended AS attended,
                en.observations AS observations,
                en.rating AS rating,
                u.id AS user_id,
                u.first_name AS first_name,
                u.last_name AS last_name,
                u.username AS username
            FROM
                event_enrollments en
            JOIN
                users u ON en.id_user = u.id
            ${verify.length > 0 ? `WHERE ${verify.join(' AND ')}` : ''}
            `;
           
        const response = await this.client.query(sql);
        return response.rows;
        
    }

    async qCreateE(evento) {
        const sql = `
            INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        const variables = [evento.name, evento.description, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.id_creator_user];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async query6(evento) {
        const sql = `
            UPDATE events 
            SET name = $1, description = $2, id_event_category = $3, id_event_location = $4, start_date = $5, duration_in_minutes = $6, price = $7, enabled_for_enrollment = $8, max_assistance = $9 
            WHERE id = $10 AND id_creator_user = $11
        `;
        const variables = [evento.name, evento.description, evento.id_event_category, evento.id_event_location, evento.start_date, evento.duration_in_minutes, evento.price, evento.enabled_for_enrollment, evento.max_assistance, evento.id, evento.id_creator_user];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async query7(id, id_creator_user) {
        const sql = `
            DELETE FROM events 
            WHERE id = $1 AND id_creator_user = $2
        `;
        const variables = [id, id_creator_user];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async query8(idEL) {
        const sql = `
            SELECT max_capacity 
            FROM event_locations 
            WHERE id = '${idEL}'
        `;
        const maxC = await this.client.query(sql);
        return maxC.rows;
    }

    async query9(idEV) {
        const sql = `
            SELECT id_creator_user 
            FROM events 
            WHERE id = '${idEV}'
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async query10(id) {
        const sql = `
            SELECT COUNT(*) 
            FROM event_enrollments 
            WHERE id_event = '${id}'
        `;
        const enrollment = await this.client.query(sql);
        return enrollment.rows;
    }

    async query11(id_event, rating, observations, id_user) {
        const sql = `
            UPDATE event_enrollments 
            SET attended = true, rating = '${rating}', observations = '${observations}', description = '${observations}' 
            WHERE id_event = '${id_event}' AND id_user = '${id_user}'
        `;
        const answer = await this.client.query(sql);
        return answer.rows;
    }

    async query12(id_user, event_id) {
        let registion = Date.now();
        const sql = `
            INSERT INTO event_enrollments (id_user, id_event, registration_date_time) 
            VALUES ($1, $2, NOW())
        `;
        const variables = [id_user, event_id];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async query13(id_user, event_id) {
        const sql = `
            DELETE FROM event_enrollments 
            WHERE id_user = $1 AND id_event = $2
        `;
        const variables = [id_user, event_id];
        const answer = await this.client.query(sql, variables);
        return answer;
    }

    async query14(id_user) {
        const sql = `
            SELECT * 
            FROM users 
            WHERE id = $1
        `;
        const answer = await this.client.query(sql, [id_user]);
        return answer.rows;
    }
}
