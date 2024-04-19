
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
            id: row.id,
            name: row.event_name,
            description: row.event_description,
            start_date: row.start_date,
            duration_in_minutes: row.duration_in_minutes,
            price: row.price,
            max_assistance: row.max_assistance,
            tags: row.tag_name,
            creator_user: {
                id: row.user_id,
                username: row.username,
                first_name: row.user_first_name,
                last_name: row.user_last_name
            },
            category: {
                id: row.category_id,
                name: row.category_name
            },
            location: {
                id: row.location_id,
                name: row.location_name,
                full_address: row.full_address,
                latitude: row.latitude,
                longitude: row.longitude,
                max_capacity: row.max_capacity
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
              id: row.id,
              name: row.name,
              description: row.description,
              start_date: row.start_date,
              duration_in_minutes: row.duration_in_minutes,
              price: row.price,
              enabled_for_enrollment: row.enabled_for_enrollment,
              max_assistance: row.max_assistance,
          },
          location: {
              id: row.location_id,
              name: row.location_name,
              full_address: row.full_address,
              longitude: row.longitude,
              latitude: row.latitude,
              max_capacity: row.max_capacity,
          }
      }));
  
      return {
          collection: SavedData,
      };
  }
  CreateEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    const sql = `INSERT INTO events (id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user) 
    values ('${id}', '${name}', '${description}', '${id_event_category}', '${id_envet_location}', '${start_date}', '${duration_in_minutes}', '${price}', '${enabled_for_enrollment}', '${max_assistance}', '${id_creator_user}')`;
    try{
        Bd.Consulta(sql)
        return("Succesfuly created")
    } catch(error){
        console.log("Error");
        return response.json("Error");
    }
}

EditEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    const sql = `UPDATE event SET id = '${id}', name = '${name}', description = '${description}', id_event_category = '${id_event_category}', id_event_location = '${id_event_location}', start_date = '${start_date}', duration_in_minutes = '${duration_in_minutes}', price = '${price}', enabled_for_enrollment = '${enabled_for_enrollment}', max_assistance = '${max_assistance}' 
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
  