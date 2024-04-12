export class EventService {
    getAllEvents(pageSize, requestedPage) {
      // Ir a base de datos...
  
    const query = `select * from event limit ${pageSize} offset ${requestedPage}`;
    const query2 = `select count(*) from event`;
    
      throw new Error("Error en el servicio  de eventos");
  
      return {
        collection: query,
        pagination: {
          limit: pageSize,
          offset: requestedPage,
          nextPage: "http://localhost:3000/pizzas?limit=15&offset=1",
          total: query2,
        },
      };
    }
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
    EventDetail(name,description,startDate,durationInMinutes,price,enabledForEnrollment,maxAssistance,fullAdress){
      const query= "SELECT events.name,events.description,events.start_date,events.duration_in_minutes,events.price,events.enabled_for_enrollment,events.max_assistance,event_location.full_adress FROM events JOIN event_location ON events.id_event_location = event_location.id WHERE id =";
      return query;
    }
    
  }