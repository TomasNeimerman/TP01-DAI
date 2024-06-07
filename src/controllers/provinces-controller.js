import {Router} from "express";
import ProvinceService from "../servicios/province-service.js";
const router = Router();
const provService = new ProvinceService()

router.get("/", async (request, response) => {
  const id = request.query.id;
  const locations = request.query.locations
    try {
      const allProvinces = await provService.getProvince();
      if(id != null){
        try{
          const provId = await provService.getProvinceById(id);
          if(locations != null){
            try{
              const location = await provService.getLocationsByProvinceId(id);
              return response.json(location);
            }catch{
              console.error("Error al encontrar las localidades", error);
              return response.status(401)("No se encontraron las localidades")
            }
          }
          console.log(provId)
          return response.json(provId)
        }catch{
          console.error("Error al buscar la provincia", error);
          return response.status(404)("No se encontro la provincia")
        }
      }
      return response.json(allProvinces);
    }catch (error) {
            console.error("Error al buscar provincia", error);
            return response.status(500)("Error al buscar provincia");
    }
      
});

router.post("/", (request, response) => {
  const id = request.id;
  const name = request.name;
  const full_name = request.full_name;
  const latitude = request.latitude;
  const longitude = request.longitude;
  const display_order = request.display_order;
  try {
    const verification = provService.CreateProvince(
      id,
      name,
      full_name,
      latitude,
      longitude,
      display_order
    );
    return response.status(201).json(verification);
  } catch (error) {
    console.log("error al crear provincia");
    return response.status(400).json("error al crear provincia");
  }
});
router.post("/:id/edition_province", (request, response) => {
  const id = request.query.id;
  const name = request.query.name;
  const full_name = request.query.full_name;
  const latitude = request.query.latitude;
  const longitude = request.query.longitude;
  const display_order = request.query.display_order;
  try {
    const verification = ProvinceService.EditProvince(
      id,
      name,
      full_name,
      latitude,
      longitude,
      display_order
    );
    return response.json(verification);
  } catch {
    console.log("error al editar provincia");
    return response.json("error al editar provincia");
  }
});
router.delete("/:id/delete_event", (request, response) => {
  try {
    const verification = ProvinceService.DeleteProvince(2);
    return response.json("Se borro correctamente la provincia");
  } catch {
    console.log("Error al borrar provincia");
    return response.json("Error al borrar provincia");
  }
});

export default router;
