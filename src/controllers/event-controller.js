import express from "express";
import {
  EventService
}from "../servicios/event-service.js/"
const router = express.Router();
const eventService = new EventService();

router.get("/", (request, response) => {
  const limit = request.query.limit;
  const offset = request.query.offset;

  try {
    const allEvents = eventService.getAllEvents(pageSize, page);
    return response.json(allEvents);
  } catch (error) {
    console.log("Un Error");
    return response.json("Un Error");
  }
})
router.get("/{id}", () => {
  
})



router.post("/", (req, res) => {
  const body = req.body;
  console.log(body);
  return res.status(201).send({
    id: 1,
    name: body.name,
    description: body.description,
    catergories: body.catergories,
    location: body.location,
    date: body.date,
    eventDuration: body.eventDuration,
    price: body.price,
    habilitado: body.habilitado,
    eventCapacity: body.eventCapacity,
    creatorUser: body.creatorUser
  });
});

export default router;