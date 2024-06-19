import {Router} from "express";
import LocationService from "../servicios/location-service.js";

const locationService = new LocationService();
const router = Router() 

router.get("/",  async (request, response) => {
    const limit = request.query.limit;
    const offset = request.query.offset;
    const id = request.params.id;
    try{
        const res = await locationService.getAllLocations(limit,offset);
        if(id != null){
            try{
                const res = await locationService.locationById(id);
                return response.status(201).json(res);
            }catch(error){
                console.log("Hubo un error:", error);
                return response.status(400).json("No se pudo encontrar la localidad")
            }
        }
        return response.status(201).json(res);
    }catch(error){
        console.log("Hubo un error: ", error);
        return response.status(400).json("No se pudo mostrar las localidades")
    }
})

export default router;