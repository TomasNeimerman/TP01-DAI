import bd from "../repositories/provinces-repositories.js"
export class EventService {
  getAllEvent(pageSize, requestedPage) {
    try {
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
        const result = Bd.Consulta(sql, [pageSize, requestedPage]);
        const events = result.map(row => ({
            id: 1,
            name: "evento1",
            description: "hola",
            start_date: "05-23-2024",
            duration_in_minutes: 300,
            price: 15000,
            max_assistance: 300,
            tags: "fiesta",
            creator_user: {
                id: 1,
                username: "neotictom",
                first_name: "neotic",
                last_name: "tom"
            },
            category: {
                id: 1,
                name: "fiesta"
            },
            location: {
                id: 1,
                name: "caba",
                full_address: "Capital federal, Provincia de Buenos Aires, Argentina",
                latitude: 24.489102301273,
                longitude: 64.31237812387,
                max_capacity: 300
            }
        }));

        const nextPage = `http://localhost:3000/event?limit=${pageSize}&offset=${requestedPage + 1}`;

        return {
            collection: events,
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: nextPage
            }
        };
    } catch (error) {
        console.error('Error al obtener la lista de eventos:', error);
        throw new Error('Error interno del servidor');
    }
  };
  SearchEvents(name,category,startDate,tag){
      var query = "SELECT * FROM event WHERE";
      if(name != null){
        query = query + "name =" + name + "AND";      
      }else if(category != null){
        query += "category =" + category + "AND"; 
      }
      else if(startDate != null){
        query += "startDate = " + startDate + "AND";
      }else if(tag != null){
        query += "tag =" + tag+ "AND";
      }
      return query;
    }
    EventDetail(id) {
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
      const result = Bd.Consulta(sql, [id]);
      const SavedData = result.map(row => ({
          event: {
            "event": {
              "id": 2,
              "name": "navidad",
              "description": "descripcion",
              "start_date": "12-24-2024",
              "duration_in_minutes": 1440,
              "price": 0,
              "enabled_for_enrollment": true,
              "max_assistance": 2024
            },
            "location": {
              "id": 2,
              "name": "CABA",
              "full_address": "Capital Federal, Buenos Aires, Argentina",
              "longitude": 0.0,
              "latitude": 0.0,
              "max_capacity": 1000
            }
          }
      }));
  
      return {
          collection: SavedData,
      };
  }
  CreateEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    const sql = `INSERT INTO events (id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
    values ('3', 'Fiesta de Invierno', 'Una celebración para disfrutar de la nieve y el frío', '2', '3', '01-15-2025', '1200', '10', 'true', '500', '2')`;
    try{
        Bd.Consulta(sql)
        return("Succesfuly created")
    } catch(error){
        console.log("Error");
        return response.json("Error");
    }
}

EditEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    const sql = `UPDATE event SET id = '4', 'name = 'Fiesta de Cumpleaños', description = 'Una celebración para festejar un año más de vida', id_event_category = '4', id_event_location = '6', start_date = '09-30-2025', duration_in_minutes = '600', price = '15', enabled_for_enrollment = 'true', max_assistance = '300' 
    WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
    try{
        Bd.Consulta(sql)
        return("Edited Succesfuly")
    } catch(error){
        console.log("error");
        return response.json("error");
    }
}

DeleteEvent(id, id_creator_user){
    const sql = `DELETE * FROM events 
    WHERE id = '${id}' AND id_creator_user = '${id_creator_user}'`
    try{
        Bd.Consulta(sql)
        return("Succesfuly deleted")
    } catch(error){
        console.log("Error borrado de evento");
        return response.json("Error borrado de evento");
    }
}
GetEvent(id, id_creator_user){
    const sql =  `SELECT * FROM EVENTS WHERE id = '${i}' AND id_creator_user = '${id_creator_user}'`;
    const SavedData = result.map(row => ({
    id: row.id,
    name: row.name,
    description: row.description,
    start_date: row.start_date,
    duration_in_minutes: row.duration_in_minutes,
    price: row.price,
    enabled_for_enrollment: row.enabled_for_enrollment,
    max_assistance: row.max_assistance,
    }));
    return {
        collection: SavedData
    };
}
InsciptEvent(eventId, userId) {
    const sql = `INSERT INTO event_enrollments (id_event, id_user) VALUES (${eventId}, ${userId})`;
    return sql;
}
GiveRating(eventId, userId, rating, feedback) {
    const sql = `UPDATE event_enrollments 
                 SET rating = ${rating}, feedback = ${feedback} 
                 WHERE id_event = ${eventId} AND id_user = ${userId}`;
    return sql;
}
    
}   
  