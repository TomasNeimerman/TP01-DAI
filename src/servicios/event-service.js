import BD from "../repositories/event-repositories.js";
const bd = new BD();

export default class EventService {
    
    parsedOffset(offset){
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }

    parsedLimit(limit){
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 15; 
    }

     async getAllEvent(pageSize, requestedPage, path){
        const pageSizes = this.parsedLimit(pageSize)
        const requestedPages = this.parsedOffset(requestedPage)
        const answer = await bd.query1(pageSizes, requestedPages);
        const totalCount = answer.length
        console.log(answer)
        const dateBD = answer.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location = row.event_location
            event_location.location = row.location
            event_location.location.province = row.province
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags,
                pagination: {
                    limit: pageSizes,
                    offset: requestedPages,
                    nextPage: ((requestedPages + 1) * pageSizes <= totalCount) ? `${process.env.BASE_URL}/${path}?limit=${pageSizes}&offset=${requestedPages + 1}` : null,
                    total: totalCount,   
                }
            }
        })
        return (dateBD);
    }

    async searchEvents(name, category, startDate, tag, path){
        const answer = await bd.query2(name, category, startDate, tag)
        const dateBD = answer.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
            creator_user.id = row.user_id
            creator_user.username = row.username
            creator_user.first_name = row.first_name
            creator_user.last_name = row.last_name
            event_categories.id = row.eventcat_id
            event_categories.name = row.eventcat_name
            event_location = row.event_location
            event_location.location = row.location
            event_location.location.province = row.province
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags,
                pagination:{
                    nextPage: `${process.env.BASE_URL}/${path}${(event.name) ? `&eventName=${event.name}` : null}${(event_categories.id) ? `&eventCategory=${event_categories.id}` : null} ${(event.startdate) ? `&eventDate=${event.startdate}` : null}`
                }
            }
        })
        return(dateBD)
    }

     async eventDetail(id){
        const answer = bd.query3(id)
        const dateBD = answer.map(row => {
            var event = new Object();
            var creator_user = new Object();
            var event_categories  = new Object();
            var event_location = new Object();
            event.id = row.id
            event.name = row.name
            event.description = row.description
            event.start_date = row.start_date
            event.duration_in_minutes = row.duration_in_minutes
            event.price = row.price
            event.enabled_for_enrollment = row.enabled_for_enrollment
            event.max_assistance = row.max_assistance
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
            return{
                event: event,
                creator_user: creator_user,
                event_categories: event_categories,
                event_location: event_location,
                tags: row.tags
            }
        })
        return dateBD;
    }

    async peopleList(id, first_name, last_name, username, attended, rating){
        console.log(entro)
        const answer = bd.query4(id, first_name, last_name, username, attended, rating)
        var user = new Object();
        dateBD = answer.map(row => {
            user.id = row.user_id
            user.first_name = row.first_name
            user.last_name = row.last_name
            user.username = row.username
            enrollment.id = row.id
            enrollment.id_event = row.id_event
            enrollment.id_user = row.id_user
            enrollment.description = row.description
            enrollment.registration_date_time = row.registration_date_time
            enrollment.attended = row.attended
            enrollment.observations = row.observations
            enrollment.rating = row.rating          
        return{
            enrollment: enrollment,
                user: user
        }
        }) 
        return dateBD;
    }

    async createEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.query5(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento creado efectivamente")
        } catch(error){
            console.log("Error creacion de evento");
            return response.json("Error creacion de evento");
        }
    }
    
    async editEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user){
        try{
            bd.query6(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
            return("Evento editado efectivamente")
        } catch(error){
            console.log("Error edicion de evento");
            return response.json("Error edicion de evento");
        }
    }

    async deleteEvent(id, id_creator_user){
        try{
            bd.query7(id, id_creator_user)
            return("Evento borrado efectivamente")
        } catch(error){
            console.log("Error borrado de evento");
            return response.json("Error borrado de evento");
        }
    }

    async eventInscription(enrollment) {
        try{
            bd.query8(enrollment)
            return("inscrive")
        } catch(error){
            console.log(error);
            return response.json(error);
        }
      }
      async rating(id, rating) {

        await repo.query9(rating,id)
        return "rating updated";
      }
}  

  