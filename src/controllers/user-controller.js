import express, { response } from "express";
import {UserService} from "../servicios/user-service.js/"
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
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        password: body.password
    });
  });
export default router;