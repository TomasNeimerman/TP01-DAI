import { Router } from "express";
import AuthMiddleware from "../auth/authMiddleware.js";
import EventLocationService from "../servicios/event_location-service.js";

const eventLocationService = new EventLocationService();
const router = Router();


router.get("/", AuthMiddleware, async (request, response) => {
    const user = request.user.id;
    try {
        const respuesta = await eventLocationService.getEventLocations(user);
        return response.status(200).json(respuesta);
    } catch (error) {
        console.log("Error al conseguir las localidades:", error);
        return response.status(401).json("No se encontró la localidad");
    }
});


router.get("/:id", AuthMiddleware, async (request, response) => {
    const user = request.user.id;
    const id = request.params.id;
    try {
        const respuesta = await eventLocationService.getEventLocationById(user, id);
        if (respuesta.length) {
            return response.status(200).json(respuesta);
        } else {
            return response.status(404).json("No se encontró la localidad");
        }
    } catch (error) {
        console.log("Error al conseguir la localidad buscada:", error);
        return response.status(401).json("No se encontró la localidad");
    }
});


router.post("/", AuthMiddleware, async (request, response) => {
    const { id_location, name, full_address, max_capacity, latitude, longitude } = request.body;
    const id_creator_user = request.user.id;

    const eventLocation = { id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user };

    try {
        const errorMsg = await eventLocationService.validateEventLocation(eventLocation);
        if (errorMsg) {
            return response.status(400).json({ message: errorMsg });
        }

        const created = await eventLocationService.createEventLocation(eventLocation);
        if (created) {
            return response.status(201).json({ message: "Event location created" });
        } else {
            return response.status(500).json({ message: "Error creating event location" });
        }
    } catch (error) {
        console.log(error);
        return response.status(400).json({ message: "Error creating event location" });
    }
});


router.put("/:id", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    const { id_location, name, full_address, max_capacity, latitude, longitude } = request.body;
    const id_creator_user = request.user.id;

    const eventLocation = { id, id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user };

    try {
        const errorMsg = await eventLocationService.validateEventLocation(eventLocation);
        if (errorMsg) {
            return response.status(400).json({ message: errorMsg });
        }

        const updated = await eventLocationService.updateEventLocation(eventLocation);
        if (updated) {
            return response.status(200).json({ message: "Event location updated" });
        } else {
            return response.status(404).json({ message: "Event location not found or not authorized" });
        }
    } catch (error) {
        console.log(error);
        return response.status(400).json({ message: "Error updating event location" });
    }
});


router.delete("/:id", AuthMiddleware, async (request, response) => {
    const id = request.params.id;
    const id_creator_user = request.user.id;

    try {
        const deleted = await eventLocationService.deleteEventLocation(id, id_creator_user);
        if (deleted) {
            return response.status(200).json({ message: "Event location deleted" });
        } else {
            return response.status(404).json({ message: "Event location not found or not authorized" });
        }
    } catch (error) {
        console.log(error);
        return response.status(400).json({ message: "Error deleting event location" });
    }
});

export default router;
