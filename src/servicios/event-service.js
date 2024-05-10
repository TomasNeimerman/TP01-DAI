import BD from "../repositories/event-repositories.js";
const bd = new BD();

export default class EventService{ 
  async getAllEvent(pageSize, requestedPage) {
        const result = await bd.query1(pageSize,requestedPage);
        var event = new Object();
        var creator_user = new Object();
        var event_categories  = new Object();
        var event_location = new Object();
        events = result.map(row => {
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            event.tags = row.tags_name
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location.id = row.el_id
            event_location.name = row.el_name
            event_location.full_address = row.full_address
            event_location.latitude = row.latitude
            event_location.longitude = row.longitude
            event_location.max_capacity = row.max_assistance
        })
        return{
            collection: events,
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: ((parsedOffset + 1) * parsedLimit <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${parsedLimit}&offset=${parsedOffset + 1}${(eventName) ? `&eventName=${eventName}` : null}${(eventCategory) ? `&eventCategory=${eventCategory}` : null} ${(eventDate) ? `&eventDate=${eventDate}` : null}${(eventTag) ? `&eventTag=${eventTag}` : null}` : null,
                total: totalCount,
                }
        };
    } catch (error) {
        console.error('Error al obtener la lista de eventos:', error);
        throw new Error('Error interno del servidor');}
 
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
     
      const result = bd.query2(id);
      const SavedData = result.map(row => ({
          event: {
            event: {
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
          collection: SavedData
      };
  }
  CreateEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    try{
        bd.query3(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return("Succesfuly created")
    } catch(error){
        console.log("Error creacion de evento");
        return response.json("Error creacion de evento");
    }
 
    }

EditEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    try{
        bd.query4(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return("Succesfuly edited")
    } catch(error){
        console.log("Error edicion de evento");
        return response.json("Error edicion de evento");
    }
   
}

DeleteEvent(id, id_creator_user){
    
    try{
        bd.query5(id,id_creator_user)
        return("Succesfuly deleted")
    } catch(error){
        console.log("Error borrado de evento");
        return response.json("Error borrado de evento");
    }   
}

InsciptEvent(id_event, id_user) {
    
    try{
        bd.query6(id_user,id_event);
        return("saved")
    } catch(error){
        console.log("error");
        return response.json("error");
    }
}
GiveRating(eventId, userId, rating, feedback) {
    
    
    try{
        bd.query7(eventId,userId,rating,feedback);
        return("saved")
    } catch(error){
        console.log("error");
        return response.json("error");
    }
    
}
    
}   
  