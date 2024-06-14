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
  const name = request.body.name;
  const full_name = request.body.full_name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const display_order = request.body.display_order;
  try {
    const verification = provService.CreateProvince(name,full_name,latitude,longitude,display_order);
    return response.status(201).json("Created");
  } catch (error) {
    console.log("error al crear provincia",error);
    return response.status(400).json("error al crear provincia");
  }
});
router.put("/:id", (request, response) => {
  const id = request.params.id;
  const name = request.body.name;
  const full_name = request.body.full_name;
  const latitude = request.body.latitude;
  const longitude = request.body.longitude;
  const display_order = request.body.display_order;
  try {
    const verification = provService.EditProvince(id,name,full_name,latitude,longitude,display_order);
    return response.json("edited");
  } catch(error) {
    console.log("error al editar provincia",error);
    return response.json("error al editar provincia");
  }
});
router.delete("/:id", (request, response) => {
  const id = request.params.id
  try {
    const verification = provService.DeleteProvince(id);
    return response.json("deleted");
  } catch(error) {
    console.log("Error al borrar provincia", error);
    return response.json("Error al borrar provincia");
  }
});

export default router;
