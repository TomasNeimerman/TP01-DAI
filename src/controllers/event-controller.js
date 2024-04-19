import express from "express";
import {
  EventService
}from "../servicios/event-service.js/"
const router = express.Router();
const eventService = new EventService();

router.get("/", (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;
  if(limit != null && offset != null){
  try {
    const allEvents = eventService.getAllEvents(pageSize, page);
    return response.json(allEvents);
  } catch (error) {
    console.log("ErrorEj2");
    return response.json("ErrorEj2");
  }
  }
  else{
    console.log("ENDPOINT ERROR")
}
})
router.get("/", (request,response) => {
    const limit = request.query.limit;
  const offset = request.query.offset;
  const name = request.query.name;
    const category = request.query.category;
    const startDate = request.query.startDate;
    const tag = request.query.tag;
    if(limit != null && offset != null){
    try{
      var BusquedaEvento = eventService.SearchEvents(name,category,)
      return console.log(BusquedaEvento);
    }catch(error){
      console.log("ErrorEj3");
      return response.json("ErrorEj3")
    }
  }
})
router.get("/:id", (request, response) => {
  try {  
      const evento = eventService.EventDetail(request.params.id);
      return response.json(evento)
  } catch(error){
      console.log("ErrorEj4")
      return response.json("ErrorEj4")
  }
})
router.post("/create_event", (request, response) => {
  const id = request.query.id
  const name = request.name.id
  const description = request.description.id
  const id_event_category = request.id_event_category.id
  const id_envet_location = request.id_envet_location.id
  const start_date = request.start_date.id
  const duration_in_minutes = request.duration_in_minutes.id
  const price = request.price.id
  const enabled_for_enrollment = request.enabled_for_enrollment.id
  const max_assistance = request.max_assistance.id
  const id_creator_user = request.id_creator_user.id
  try{
      const verification = eventService.CreateEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
      return response.json(verification)
  } catch(error){
      console.log("error")
      return response.json("error")
  }
})

router.put("/:id/:id_creator_user/edition_event", (request, response) => {
  const name = request.query.name
  const description = request.query.description
  const id_event_category = request.query.id_event_category
  const id_event_location = request.query.id_envet_location
  const start_date = request.query.start_date
  const duration_in_minutes = request.query.duration_in_minutes
  const price = request.query.price
  const enabled_for_enrollment = request.query.enabled_for_enrollment
  const max_assistance = request.query.max_assistance
  try{
      const verification = eventService.EditEvent(request.params.id, request.params.id_creator_user, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
      return response.json(verification)
  } catch(error){
      console.log("error")
      return response.json("errror")
  }
})

router.delete("/:id/:id_creator_user/delete_event", (request, response) => {
  try{
      const verification = eventService.DeleteEvent(request.params.id, request.params.id_creator_user)
      return response.json(verification)
  }catch(error){
      console.log("error")
      return response.json("error")
  }
})
router.get('/:id/:id_creator_user/get_event', (request, response) => {
  try{
    const verification = eventService.GetEvent(request.params.id, request.params.id_creator_user)
    return response.json(verification)
  }catch(error){
    console.log("error")
    return response.json("error")
  }
})


router.post('/event/:id/enrollment', (request, response) => {
  const eventId = request.params.id;
  const userId = request.body.userId;

  try {
      const inscripcion = eventosServicios.inscribirseEnEvento(eventId, userId);
      return response.json({ message: inscripcion });
  } catch (error) {
      console.error('error');
      return response.json('error');
  }
});
router.patch('/event/:id/enrollment', (request, response) => {
  const eventId = request.params.id;
  const userId = request.body.userId; 
  const rating = request.body.rating; 
  const feedback = request.body.feedback; 

  try {
      const resultado = eventService.GiveRating(eventId, userId, rating, feedback);
      return response.json(resultado);
  } catch (error) {
      console.error('error');
      return response.json('error');
  }
});


export default router;