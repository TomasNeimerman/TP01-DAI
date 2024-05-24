import {Router} from "express";
import EventService from "../servicios/event-service.js";

const eventService = new EventService();
const router = Router() 

router.get("/",  async (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  const name = request.query.name;
  const category = request.query.category;
  const startDate = request.query.startDate;
  const tag = request.query.tag;
  const url = request.originalUrl;
  if(limit != null || offset != null){
      try {
          const getAllEvent = await eventService.getAllEvent(limit, offset, url);
          return response.json(getAllEvent);
      }catch(error){
          console.log("Error ej2 controller");
          return response.json("Error ej2 controller");
      }
  }else if(name != null || category != null || startDate != null || tag != null){
      try {
          const BusquedaEvent = await eventService.searchEvents(name, category, startDate, tag);
          return response.json(BusquedaEvent);
      } catch(error){
          console.log(error)
          return response.json(error)
      }
  }else{
      console.log("error endpoint /")
      return response.json("Faltan variables para la busqueda")
  }
  
})

router.get("/:id", (request, response) => {
  try {  
      const event = eventService.eventDetail(request.params.id);
      return response.json(even)
  } catch(error){
      console.log("Error ejercicio 4 controller")
      return response.json("No se encontro evento")
  }
})

router.get("/:id/enrollment", async(request, respose) => {
  const first_name = request.body.first_name
  const last_name = request.body.last_name
  const username = request.body.username
  const attended = request.body.attended
  const rating = request.body.rating
  if(first_name != null || last_name != null || username != null || attended != attended || attended != null || rating != null){
      try{
          const user = await eventService.peopleList(request.params.id, first_name, last_name, username, attended, rating)
          if(user){
              return respose.json(user)
          } else{
              console.log("Error ejercicio 5 controller")
              return respose.json("No se encontro al usuario")
          }
      }catch(error){

      }
  }
})

router.post("/:id", async(request, response) => {
  const name = request.body.name
  const description = request.body.description
  const id_event_category = request.body.id_event_category
  const id_envet_location = request.body.id_event_location
  const start_date = request.body.start_date
  const duration_in_minutes = request.body.duration_in_minutes
  const price = request.body.price
  const enabled_for_enrollment = request.body.enabled_for_enrollment
  const max_assistance = request.body.max_assistance
  const id_creator_user = request.body.id_creator_user
  try{
      const ok = await eventService.createEvent(request.params.id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
      if(ok){
          return response.json(ok)
      } else{
          console.log("Error en creacion de eventos controller")
          return response.json("Error en la creacion")
      }
  }catch(error){

  }
})

router.put("/:id", async (request, response) => {
  const name = request.body.name
  const description = request.body.description
  const id_event_category = request.body.id_event_category
  const id_envet_location = request.body.id_envet_location
  const start_date = request.body.start_date
  const duration_in_minutes = request.body.duration_in_minutes
  const price = request.body.price
  const enabled_for_enrollment = request.body.enabled_for_enrollment
  const max_assistance = request.body.max_assistance
  const id_creator_user = request.body.id_creator_user
  try{
      const ok = await eventService.editEvent(request.params.id, id_creator_user, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
      if(ok){
      }
  } catch(error){
      console.log("Error en edicion de eventos controller")
      return response.json("Error en edicion de eventos")
  } 
})

router.delete("/:id", (request, response) => {
  const id_creator_user = request.body.id_creator_user
  try{
      const ok = eventService.deleteEvent(request.params.id,id_creator_user)
      return response.json(ok)
  }catch(error){
      console.log("Error en el delete eventos")
      return response.json("Error en borrado de evento")
  }
})

router.post("/:id/enrollment" , async (req, res) => {
  const enrollment = {};

  enrollment.idEvent = req.params.id;
  enrollment.attended = req.query.attended;
  enrollment.rating = req.query.rating;
  enrollment.descripcion = req.query.descripcion;
  enrollment.observations = req.query.observations;
  try {
    const card = await eventService.eventInscription(enrollment);
    return res.json(card);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
});

export default router;