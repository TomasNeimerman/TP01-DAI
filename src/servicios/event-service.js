import Bd from "../repositories/event-repositories.js"
export class EventService {
  getAllEvent(pageSize, requestedPage) {
    try {
        
        const result = Bd.query1(pageSize,requestedPage);
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
        return{
            collection: events,
            pagination: {                
                limit: pageSize,
                offset: requestedPage,
                nextPage: `http://localhost:3000/event?limit=${pageSize}&offset=${requestedPage + 1}`
                
            },
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
     
      const result = Bd.Query2(id);
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
          collection: SavedData
      };
  }
  CreateEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    try{
        Bd.Query3(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return("Succesfuly created")
    } catch(error){
        console.log("Error creacion de evento");
        return response.json("Error creacion de evento");
    }
 
    }

EditEvent(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
    try{
        Bd.Query4(id, name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
        return("Succesfuly edited")
    } catch(error){
        console.log("Error edicion de evento");
        return response.json("Error edicion de evento");
    }
   
}

DeleteEvent(id, id_creator_user){
    
    try{
        Bd.Query5(id,id_creator_user)
        return("Succesfuly deleted")
    } catch(error){
        console.log("Error borrado de evento");
        return response.json("Error borrado de evento");
    }
}

InsciptEvent(id_event, id_user) {
    
    try{
        Bd.Query6(id_user,id_event);
        return("saved")
    } catch(error){
        console.log("error");
        return response.json("error");
    }
}
GiveRating(eventId, userId, rating, feedback) {
    
    
    try{
        Bd.Query7(eventId,userId,rating,feedback);
        return("saved")
    } catch(error){
        console.log("error");
        return response.json("error");
    }
    
}
    
}   
  