import express from "express"
import eventService from "../servicios/event-service.js"; 
const router = express.Router()

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
  const name = "evento1";
  const category = "hola";
  const startDate = "05-23-2024";
  const tag = "fiesta";  
    if(limit != null && offset != null){
    try{
      var BusquedaEvento = eventService.SearchEvents(name,category,startDate,tag)
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
  const id = 3
  const name = "hola"
  const description = "chau"
  const id_event_category = "fiesta"
  const id_envet_location = "Argentina"
  const start_date = "05-12-2024"
  const duration_in_minutes = "300"
  const price = "300"
  const enabled_for_enrollment = "true"
  const max_assistance = "1000"
  const id_creator_user = "1"
  try{
      const verification = eventService.CreateEvent(id, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
      return response.json(verification)
  } catch(error){
      console.log("error")
      return response.json("error")
  }
})

router.put("/:id/:id_creator_user/edition_event", (request, response) => {
  const name = "nombre"
  const description = "descripcion"
  const id_event_category = "restaurant"
  const id_event_location = "Argentina"
  const start_date = "21-06-2024"
  const duration_in_minutes = "120"
  const price = "4000"
  const enabled_for_enrollment = "false"
  const max_assistance = "30"
  try{
      const verification = eventService.EditEvent(3, 1, name, description, id_event_category, id_envet_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance)
      return response.json(verification)
  } catch(error){
      console.log("error")
      return response.json("errror")
  }
})

router.delete("/:id/:id_creator_user/delete_event", (request, response) => {
  try{
      const verification = eventService.DeleteEvent(3, 1)
      return response.json(verification)
  }catch(error){
      console.log("error")
      return response.json("error")
  }
})
router.get('/:id/:id_creator_user/get_event', (request, response) => {
  try{
    const verification = eventService.GetEvent(3, 1)
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