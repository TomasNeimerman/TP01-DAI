import express from "express";
import {ProvinceService} from "../servicios/province-service.js/"
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
  
  
  
  router.post("/", (req, res) => {
    const body = req.body;
    console.log(body);
    return res.status(201).send({
        id: 1,
        name: body.name,
        full_name: body.full_name,
        latitude: body.latitude,
        longitude: body.longitude,
        display_order: body.display_order
    });
  });
export default router;