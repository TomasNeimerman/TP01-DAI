import {Router} from "express";
import ProvinceService from "../servicios/province-service.js";
const router = Router();
const provService = new ProvinceService()

router.get("/", async (request, response) => {
  const id = request.query.id;
  const limit = request.query.limit;
  const offset = request.query.offset;

    if (limit!=null && offset!=null) {
        try {
            const allProvince = await provService.GetProvince(limit, offset,url);
            console.log(allProvince)
            return response.status(202).json(allProvince);
        } catch (error) {
            console.error("Error al buscar provincia", error);
            return response.status(500).json("Error al buscar provincia");
        }
    } else if (id != null) {
        try {
            const provinceById = await provService.getProvinceById(id);
            return response.status(202).json(provinceById);
        } catch (error) {
            console.error("No se encontró la provincia", error);
            return response.status(404).json("No se encontró la provincia");
        }
    }
    else {
        return response.status(400).json("No se obtuvo nada");
    }
});
router.get("/:id/locations", async (request, response) => {
    const id = request.params.id;

    try {
        const locations = await provService.GetLocationsByProvinceId(id);
        if (locations.length === 0) {
            return response.status(404).json("No se encontraron ubicaciones para la provincia proporcionada");
        }
        return response.status(200).json(locations);
    } catch (error) {
        console.error("Error al buscar las ubicaciones", error);
        return response.status(500).json("Error al buscar las ubicaciones");
    }
});
router.post("/create_province", (request, response) => {
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
